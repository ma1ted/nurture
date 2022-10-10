import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 15;

const rotationSpeed = 1;
const seed = Math.random();
const noise = createNoise2D(() => {
	return seed;
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material1 = new THREE.LineBasicMaterial({
	color: 0xffffff,
});

const points = [];

let oldVec = new THREE.Vector3(0, -20, 0);
for (let baseY = -20; baseY < 20; baseY += 0.01) {
	const scale = ((19.9 - Math.abs(baseY)) / 10) ** 3;

	const x = noise(baseY, seed) * scale;
	const z = noise(baseY, seed + 1) * scale;
	const offsetY = noise(baseY, seed + 2) * scale;

	points.push(new THREE.Vector3(x, baseY + offsetY, z));
}

console.log(points);

const geometry1 = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry1, material1);
scene.add(line);

const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame(animate);

	camera.position.set(
		Math.sin(clock.getElapsedTime() * rotationSpeed) * 25,
		0,
		Math.cos(clock.getElapsedTime() * rotationSpeed) * 25
	);

	camera.lookAt(0, 0, 0);

	renderer.render(scene, camera);
}

animate();
