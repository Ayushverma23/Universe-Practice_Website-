import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

// Noise function
float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(fract(sin(dot(i + vec3(0, 0, 0), vec3(12.9898, 78.233, 45.543))) * 43758.5453),
                       fract(sin(dot(i + vec3(1, 0, 0), vec3(12.9898, 78.233, 45.543))) * 43758.5453), f.x),
                   mix(fract(sin(dot(i + vec3(0, 1, 0), vec3(12.9898, 78.233, 45.543))) * 43758.5453),
                       fract(sin(dot(i + vec3(1, 1, 0), vec3(12.9898, 78.233, 45.543))) * 43758.5453), f.x), f.y),
               mix(mix(fract(sin(dot(i + vec3(0, 0, 1), vec3(12.9898, 78.233, 45.543))) * 43758.5453),
                       fract(sin(dot(i + vec3(1, 0, 1), vec3(12.9898, 78.233, 45.543))) * 43758.5453), f.x),
                   mix(fract(sin(dot(i + vec3(0, 1, 1), vec3(12.9898, 78.233, 45.543))) * 43758.5453),
                       fract(sin(dot(i + vec3(1, 1, 1), vec3(12.9898, 78.233, 45.543))) * 43758.5453), f.x), f.y), f.z);
}

void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Black Hole Shadow
    float radius = 0.15;
    float shadow = smoothstep(radius, radius + 0.01, dist);
    
    // Accretion Disk
    float diskRadius = 0.4;
    float diskWidth = 0.25;
    float disk = smoothstep(diskRadius - diskWidth, diskRadius, dist) * smoothstep(diskRadius + diskWidth, diskRadius, dist);
    
    // Spiral effect
    float spiral = noise(vec3(uv * 10.0, iTime * 0.5) + vec3(cos(angle * 5.0 + iTime), sin(angle * 5.0 + iTime), 0.0));
    
    // Color
    vec3 color = vec3(0.5, 0.2, 1.0) * disk * spiral * 2.0; // Deep Cosmic Purple
    color += vec3(0.1, 0.5, 0.9) * smoothstep(0.5, 0.0, dist) * 0.5; // Blue glow
    
    // Apply Shadow
    color *= shadow;
    
    // Gravitational Lensing (Fake)
    float lens = smoothstep(0.0, 0.5, dist);
    color += vec3(1.0) * (1.0 - lens) * 0.05;

    gl_FragColor = vec4(color, max(disk * spiral, 1.0 - shadow));
}
`;

export default class BlackHole {
    mesh: THREE.Mesh;
    material: THREE.ShaderMaterial;

    constructor() {
        const geometry = new THREE.PlaneGeometry(10, 10);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.position.z = -2; // Behind stars but visible
    }

    update(time: number) {
        this.material.uniforms.iTime.value = time;
    }
}
