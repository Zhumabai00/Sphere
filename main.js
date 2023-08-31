import * as THREE from 'three';
import './style.css';
import gsap from 'gsap'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// Scene
const scene = new THREE.Scene()

// Load Model
// let loader = new THREE.GLTFLoader();
// loader.load('./3D/scene.gltf', function (gltf) {
// 	scene.add(gltf.scene)
// })


// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
// const geometry = new THREE.BoxGeometry(5.5, 5.5, 5.5, 5.5, 5.5, 5.5);
const material = new THREE.MeshStandardMaterial({ color: "#00ff83", roughness: 0.5 })
const mesh = new THREE.Mesh(geometry, material)
mesh.receiveShadow = true;
mesh.castShadow = true;
scene.add(mesh)

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xfffff, 90, 100);
light.position.set(0, 10, 10);
light.intensity = 250
// light.position.z = 7;
scene.add(light);

// //Light2
// const light2 = new THREE.PointLight(0xfffff, 70, 180);
// light2.position.set(4, 10, 10);
// light2.position.z = -20;
// light2.position.x = -12;
// light2.position.y = -12;
// // scene.add(light, light2);
// //Light3
// const light3 = new THREE.PointLight(0xfffff, 70, 180);
// light3.position.set(4, 10, 10);
// light3.position.z = -20;
// light3.position.x = 12;
// light3.position.y = 12;
// scene.add(light, light2, light3);

const nothing = NaN
//Camera
const camera = new THREE.PerspectiveCamera(45,
	sizes.width / sizes.height,
	0.1, 100
);
camera.position.z = 20;
scene.add(camera)



//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(2)
// renderer.setPixelRatio(window.devicePixelRatio)
// renderer.WebGLRenderer({ antialias: true })
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener('resize', () => {
	// UpdateSizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	// Update Camera
	camera.updateProjectionMatrix()
	camera.aspect = sizes.width / sizes.height
	renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
	controls.update()
	renderer.render(scene, camera)
	window.requestAnimationFrame(loop)
}
loop()

// TimeLine Magiccc
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo('nav', { y: '-100%' }, { y: "0%" });
tl.fromTo('.title', { opacity: 0 }, { opacity: 1 })

// Mouse Animation Colorrrr
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))
window.addEventListener("mousemove", (e) => {
	if (mouseDown) {
		rgb = [
			Math.round((e.pageX / sizes.width) * 255),
			Math.round((e.pageY / sizes.width) * 255),
			150,
		]
		// Let's Animate
		let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
		gsap.to(mesh.material.color, {
			r: newColor.r,
			g: newColor.g,
			b: newColor.b,
		})
	}
})
