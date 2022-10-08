import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 15;

const material1 = new THREE.LineBasicMaterial({
	color: 0x0000ff,
});

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry1 = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry1, material1);
scene.add(line);

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

animate();
