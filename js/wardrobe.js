import * as THREE from 'three';

import { GLTFLoader }
from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

//camera

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 10;

//caera for the head model//

let targetX = 0;
let targetY = 0;
let targetZ = 10;


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

//head model lighting//

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);



const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    1.5
);

directionalLight.position.set(2,2,5);

scene.add(directionalLight);

//head model//

const loader = new GLTFLoader();

let head;

let wireframeEnabled = false;

loader.load(

    './models/head.glb',

    function(gltf) {

        console.log("MODEL LOADED");

        head = gltf.scene;

        //head model scale position and all//

        head.scale.set(3,3,3);

        head.position.set(0,-3,0);

        scene.add(head);

    },

    undefined,

    function(error) {

        console.error(error);

    }

);

//camera buttons html works for the centre... buttons//

window.frontView = function() {

    targetX = 0;
    targetY = 0;
    targetZ = 10;

}

window.sideView = function() {

    targetX = -3;
    targetY = -1;
    targetZ = 11;

}

window.detailView = function() {

    targetX = 0;
    targetY = 1;
    targetZ = 5;

}

let isDragging = false;

let previousMouseX = 0;

document.addEventListener(

    'mousedown',

    (event) => {

        isDragging = true;

        previousMouseX = event.clientX;

    }

);

document.addEventListener(

    'mouseup',

    () => {

        isDragging = false;

    }

);



document.addEventListener(

    'mousemove',

    (event) => {

        if(isDragging && head) {

            const deltaX =
            event.clientX - previousMouseX;

            head.rotation.y +=
            deltaX * 0.005;

            previousMouseX =
            event.clientX;

        }

    }

);

function animate() { //animation//

    requestAnimationFrame(animate);

    if(head) {

        head.rotation.y += 0.005;

        head.position.y =
            -3 + Math.sin(Date.now() * 0.001) * 0.2;

    }

    //camera movements for the centre, profile and detail//
    camera.position.x +=
    (targetX - camera.position.x) * 0.05;
    
    camera.position.y +=
    (targetY - camera.position.y) * 0.05;
    
    camera.position.z +=
    (targetZ - camera.position.z) * 0.05;
    
    renderer.render(scene, camera);

}

animate();

//resize//

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});