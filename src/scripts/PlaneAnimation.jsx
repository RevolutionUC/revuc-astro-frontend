import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 1.3;

const scene = new THREE.Scene();
let plane;
let mixer;
const loader = new GLTFLoader();
loader.load('plane.glb',
    function (gltf) {
        plane = gltf.scene;
        // plane.scale.set(20, 20, 20);
        scene.add(plane);

        mixer = new THREE.AnimationMixer(plane);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.01);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0.075, y: 0, z: 0},
        rotation: {x: 0.3, y: -0.5, z: 0}
    },
    {
        id: "intro",
        position: { x: -0.2, y: 0, z: -1 },
        rotation: { x: 0.5, y: 0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: 0.15, y: 0, z: 0 },
        rotation: { x: 0, y: -0.5, z: 0 },
    },
    {
        id: "contact",
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0.3, y: 0.5, z: 0 },
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(plane.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(plane.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })
    }
}
window.addEventListener('scroll', () => {
    if (plane) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// Minimal behavior: stop the fixed #container3D overlay when the contact section is reached
;(function () {
    const container = document.getElementById('container3D');
    const contact = document.getElementById('contact');
    if (!container || !contact) return;

    function updateContainerMode() {
        if (window.innerWidth <= 767) {
            container.style.position = 'absolute';
            container.style.top = '';
            return;
        }

        const contactBottom = contact.getBoundingClientRect().bottom + window.scrollY;
        const switchPoint = Math.max(0, contactBottom - window.innerHeight);

        if (window.scrollY >= switchPoint) {
            container.style.position = 'absolute';
            container.style.top = (contactBottom - window.innerHeight) + 'px';
            container.style.left = '0';
            container.style.right = '0';
        } else {
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.right = '0';
        }
    }

    window.addEventListener('scroll', updateContainerMode, { passive: true });
    window.addEventListener('resize', updateContainerMode);
    window.requestAnimationFrame(updateContainerMode);
})();