import * as THREE from 'three';
import BlackHole from './BlackHole';

const ThreeScene = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize performance

    const container = document.createElement('div');
    container.id = 'three-container';
    Object.assign(container.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        pointerEvents: 'none'
    });
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);

    // Procedural Star Texture
    const createStarTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    };

    const starTexture = createStarTexture();

    // Create Star Field Function
    const createStarField = (count: number, size: number, color: number) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20; // Spread
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: size,
            map: starTexture || undefined,
            transparent: true,
            color: color,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        return new THREE.Points(geometry, material);
    };

    // Layers of stars
    const stars1 = createStarField(3000, 0.03, 0xffffff); // Distant white stars
    const stars2 = createStarField(1500, 0.05, 0xaaaaff); // Blueish stars
    const stars3 = createStarField(800, 0.07, 0xffddaa); // Gold/Yellow stars

    scene.add(stars1);
    scene.add(stars2);
    scene.add(stars3);

    // Add Black Hole
    const blackHole = new BlackHole();
    scene.add(blackHole.mesh);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX) * 0.0001;
        mouseY = (event.clientY - windowHalfY) * 0.0001;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    const animate = (time: number) => {
        requestAnimationFrame(animate);

        // Update Black Hole
        blackHole.update(time * 0.001);

        // Scroll Parallax (Wormhole Effect)
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollFraction = Math.max(0, Math.min(1, scrollY / maxScroll));

        // Move camera forward based on scroll
        // Base position is z=5, we move it deeper into the scene
        const targetZ = 5 - (scrollFraction * 10);
        camera.position.z += (targetZ - camera.position.z) * 0.05; // Smooth damping

        // Warp Speed Effect (stretch stars based on scroll speed)
        // In a real app, we'd calculate delta scroll, but for now we'll just rotate faster
        const baseSpeed = 0.0002;
        const warpFactor = 1 + (scrollFraction * 5);

        // Rotate star fields at different speeds for depth
        stars1.rotation.y += baseSpeed * warpFactor;
        stars2.rotation.y += (baseSpeed * 2.5) * warpFactor;
        stars3.rotation.y += (baseSpeed * 4) * warpFactor;

        // Mouse parallax
        stars1.rotation.x += (mouseY - stars1.rotation.x) * 0.05;
        stars1.rotation.y += (mouseX - stars1.rotation.y) * 0.05;

        renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Update Black Hole resolution uniform
        blackHole.material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    });
};

export default ThreeScene;
