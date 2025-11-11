import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const links = document.querySelectorAll('[data-transition]');
links.forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href) return;
        e.preventDefault();
        startWarp(href);
    });
});

function startWarp(nextUrl) {
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay active';
    const canvas = document.createElement('canvas');
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    try {
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, 1, 0.01, 2000);

        const starCount = 2500;
        const positions = new Float32Array(starCount * 3);
        const speeds = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = -Math.random() * 800;
            speeds[i] = 1 + Math.random() * 3;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ size: 0.6, sizeAttenuation: true, color: 0xffffff });
        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        let t = 0; let anim;
        const resize = () => {
            const w = overlay.clientWidth;
            const h = overlay.clientHeight;
            camera.aspect = w / h; camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };
        resize();
        window.addEventListener('resize', resize);

        const duration = 1600;

        const render = (ts) => {
            if (!t) t = ts;
            const dt = ts - t;

            const pos = geometry.attributes.position.array;
            for (let i = 0; i < starCount; i++) {
                pos[i * 3 + 2] += speeds[i] * (1 + dt / 400);
                if (pos[i * 3 + 2] > 10) {
                    pos[i * 3 + 2] = -800 - Math.random() * 400;
                    pos[i * 3 + 0] = (Math.random() - 0.5) * 200;
                    pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
                }
            }
            geometry.attributes.position.needsUpdate = true;

            renderer.setClearColor(0x000000, 1);
            renderer.render(scene, camera);

            anim = requestAnimationFrame(render);

            if (dt >= duration) {
                cancelAnimationFrame(anim);
                window.removeEventListener('resize', resize);
                window.location.assign(nextUrl);
            }
        };

        anim = requestAnimationFrame(render);
    } catch (err) {
        document.body.classList.add('fade-out');
        setTimeout(() => window.location.assign(nextUrl), 300);
    }
}
