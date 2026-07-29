import * as THREE from 'three';

import { GLTFLoader }
from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls }
from 'three/addons/controls/OrbitControls.js';



//scene//

const scene = new THREE.Scene();


//camera//

const camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth * 0.6) / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 6;


//render//

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth * 0.6,
    window.innerHeight
);

document
    .getElementById("scene-container")
    .appendChild(renderer.domElement);



//control//

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;


//lighting//

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambientLight);

window.consumeMustard = function() {

    document
    .getElementById("mustardSound")
    .play();

    squirting = true;

    if(action) {

        action.reset();

        action.play();

    }

}

const spotLight = new THREE.SpotLight(
    0xffffff,
    15
);

spotLight.position.set(0, 10, 0);

spotLight.angle = 0.50;

spotLight.penumbra = 1;

spotLight.decay = 2;

spotLight.distance = 100;

spotLight.intensity = 150;

scene.add(spotLight);

const helper = new THREE.SpotLightHelper(
    spotLight
);


//model//

let baseHeight = -4.5;

const loader = new GLTFLoader();

let mustardModel;

let mixer;

let action;

const clock = new THREE.Clock();

let wireframeEnabled = false;



let squirting = false; //it kinda works come back to it if time//

loader.load(

    './models/mustard.glb',

    function(gltf) {

        mustardModel = gltf.scene;

        mustardModel.scale.set(1,1,1);

        mustardModel.position.set(0,-2.5,0);

        scene.add(mustardModel);
        
        mixer = new THREE.AnimationMixer(
            mustardModel
        );

        action = mixer.clipAction(

            gltf.animations[0]
        );

        action.setLoop(
            THREE.LoopOnce
        );
        action.clampWhenFinished = true;

    },

    undefined,

    function(error) {

        console.error(error);

    }

);


//wireframe//

document
    .getElementById("wireframeBtn")
    .addEventListener("click", () => {

        wireframeEnabled = !wireframeEnabled;

        if(mustardModel) {

            mustardModel.traverse((child) => {

                if(child.isMesh) {

                    child.material.wireframe =
                        wireframeEnabled;

                }

            });
            
        }

    });



//animation//

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    if(mustardModel) {

        mustardModel.rotation.y += 0.002;

        mustardModel.position.y =
            -2.5 + Math.sin(Date.now() * 0.001) * 0.1;

    }

    if(mixer) {

    mixer.update(
        clock.getDelta()
    );

}

    renderer.render(scene, camera);

}

animate();

//resire//

window.addEventListener('resize', () => {

    camera.aspect =
        (window.innerWidth * 0.6) / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth * 0.6,
        window.innerHeight
    );

    if(squirting) {

    mustardModel.rotation.z = 0.08;

    mustardStream.visible = true;

    mustardStream.position.set(
        -0.3,
        2,
        0
    );

    mustardStream.rotation.z = 1;

}

});