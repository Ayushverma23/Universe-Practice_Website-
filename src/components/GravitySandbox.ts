export default function GravitySandbox() {
    const section = document.createElement('section');
    section.id = 'gravity-sandbox';
    section.className = 'sandbox-section';

    // Insert before Footer
    const footer = document.getElementById('main-footer');
    if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(section, footer);
    }

    section.innerHTML = `
        <div class="container">
            <h2>Gravity Sandbox</h2>
            <p class="instruction">Click and drag to launch a star. Watch gravity form systems.</p>
            <canvas id="gravity-canvas"></canvas>
            <div class="controls">
                <button id="reset-gravity">Reset Universe</button>
            </div>
        </div>
    `;

    const canvas = document.getElementById('gravity-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if (rect) {
            canvas.width = rect.width;
            canvas.height = 500;
        }
    };
    window.addEventListener('resize', resize);
    resize();

    // Physics Engine
    interface Body {
        x: number;
        y: number;
        vx: number;
        vy: number;
        mass: number;
        color: string;
        radius: number;
    }

    let bodies: Body[] = [];
    const G = 0.5; // Gravitational constant (tweaked for visual feel)

    // Add a central massive black hole/sun
    const reset = () => {
        bodies = [{
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: 0,
            vy: 0,
            mass: 1000,
            color: '#bfa15f',
            radius: 20
        }];
    };
    reset();

    document.getElementById('reset-gravity')?.addEventListener('click', reset);

    // Interaction
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        isDragging = true;
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        currentX = startX;
        currentY = startY;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            currentX = e.clientX - rect.left;
            currentY = e.clientY - rect.top;
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const rect = canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        const vx = (startX - endX) * 0.05;
        const vy = (startY - endY) * 0.05;

        bodies.push({
            x: startX,
            y: startY,
            vx: vx,
            vy: vy,
            mass: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 60 + 200}, 80%, 70%)`,
            radius: Math.random() * 3 + 2
        });
    });

    // Animation Loop
    const animate = () => {
        ctx.fillStyle = 'rgba(5, 5, 10, 0.2)'; // Trails
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw drag line
        if (isDragging) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.arc(startX, startY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        }

        // Physics
        for (let i = 0; i < bodies.length; i++) {
            const b1 = bodies[i];

            for (let j = 0; j < bodies.length; j++) {
                if (i === j) continue;
                const b2 = bodies[j];

                const dx = b2.x - b1.x;
                const dy = b2.y - b1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 5) { // Collision/Singularity avoidance
                    const force = (G * b1.mass * b2.mass) / (dist * dist);
                    const ax = (force * dx / dist) / b1.mass;
                    const ay = (force * dy / dist) / b1.mass;

                    b1.vx += ax;
                    b1.vy += ay;
                }
            }

            b1.x += b1.vx;
            b1.y += b1.vy;

            // Draw
            ctx.beginPath();
            ctx.arc(b1.x, b1.y, b1.radius, 0, Math.PI * 2);
            ctx.fillStyle = b1.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = b1.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(animate);
    };
    animate();

    // Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .sandbox-section {
            padding: 4rem 0;
            text-align: center;
        }
        
        .instruction {
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 1rem;
        }

        #gravity-canvas {
            background: #000;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            cursor: crosshair;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .controls {
            margin-top: 1rem;
        }

        #reset-gravity {
            background: transparent;
            border: 1px solid var(--accent-color);
            color: var(--accent-color);
            padding: 0.5rem 1.5rem;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s;
        }

        #reset-gravity:hover {
            background: var(--accent-color);
            color: #000;
        }
    `;
    document.head.appendChild(style);
}
