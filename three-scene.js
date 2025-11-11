import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";


const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1521);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
camera.position.set(6, 3, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// luz
const hemi = new THREE.HemisphereLight(0xbdd2ff, 0x0b1020, 0.9);
scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 1.1);
dir.position.set(5, 10, 7);
scene.add(dir);

// objetos simples (nave + alvo)
const shipGeo = new THREE.ConeGeometry(0.4, 1.4, 24);
const shipMat = new THREE.MeshStandardMaterial({ color: 0x71afe5, metalness: .6, roughness: .25 });
const ship = new THREE.Mesh(shipGeo, shipMat);
ship.rotation.x = Math.PI / 2;
ship.position.set(-2, 0, 0);
scene.add(ship);

const issGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.6, 42);
const issMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: .2, roughness: .55 });
const iss = new THREE.Mesh(issGeo, issMat);
iss.position.set(2.5, 0, 0);
scene.add(iss);

// aro/guia
const torus = new THREE.TorusGeometry(1.5, 0.02, 12, 100);
const rim = new THREE.Mesh(torus, new THREE.MeshStandardMaterial({ color: 0x93a2c9 }));
rim.position.copy(iss.position);
scene.add(rim);

// estrelas
const starCount = 1500;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 300;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const starMat = new THREE.PointsMaterial({ size: 0.45, color: 0xffffff });
scene.add(new THREE.Points(starGeo, starMat));

// linha HUD simples
const lineMat = new THREE.LineBasicMaterial({ color: 0x71afe5 });
const lineGeo = new THREE.BufferGeometry().setFromPoints([ship.position, iss.position]);
const line = new THREE.Line(lineGeo, lineMat);
scene.add(line);

// responsivo
function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
}
window.addEventListener("resize", resize);
resize();

// loop
const clock = new THREE.Clock();
function tick() {
    const dt = clock.getDelta();
    controls.update();

    ship.position.x += Math.sin(performance.now() * 0.001) * 0.002;
    iss.rotation.y += dt * 0.2;
    line.geometry.setFromPoints([ship.position.clone(), iss.position.clone()]);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
