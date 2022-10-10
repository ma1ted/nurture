import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

import f from "./infoDisplay";
import { doc } from "prettier";
f();

const startY = -20;
const endY = 20;
const lineRes = 0.01;
const rotationSpeed = 0.4;
const cameraZoom = 25;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = cameraZoom;

const noise = createNoise2D();

const ratio = window.devicePixelRatio || 1;
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true,
});
renderer.setSize(window.innerWidth * ratio, window.innerHeight * ratio);
document.body.appendChild(renderer.domElement);

const material = new THREE.LineBasicMaterial({ color: 0xffffff });

const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame(animate);

	camera.position.set(
		Math.sin(clock.getElapsedTime() * rotationSpeed) * cameraZoom,
		0,
		Math.cos(clock.getElapsedTime() * rotationSpeed) * cameraZoom
	);

	camera.lookAt(0, 0, 0);

	renderer.render(scene, camera);
}

let points, scale, x, z, offsetY, geometry, line, scroll;
function funkyLine() {
	scroll = document.scrollingElement.scrollTop / 5000;

	points = [];
	for (let baseY = startY; baseY < endY; baseY += lineRes) {
		scale = ((19.9 - Math.abs(baseY)) / 10) ** 3;

		x = noise(baseY, scroll) * scale;
		z = noise(baseY, scroll + document.body.scrollHeight) * scale;
		offsetY = noise(baseY, scroll + document.body.scrollHeight * 2) * scale;
		// x = (Math.random() * 2 - 1) * scale;
		// z = (Math.random() * 2 - 1) * scale;
		// offsetY = (Math.random() * 2 - 1) * scale;

		points.push(new THREE.Vector3(x, baseY + offsetY, z));
	}

	geometry = new THREE.BufferGeometry().setFromPoints(points);

	scene.remove(line);
	line = new THREE.Line(geometry, material);
	scene.add(line);
}
funkyLine();
window.addEventListener("scroll", () => funkyLine());
window.addEventListener("resize", () => funkyLine());

animate();
