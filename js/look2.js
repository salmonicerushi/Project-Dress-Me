import * as THREE from 'three';

import { GLTFLoader }
from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls }
from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';



//head adding- at the top the mini one//

const headScene = new THREE.Scene();

const headCamera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
);

headCamera.position.z = 5;



const headRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

headRenderer.setSize(70, 70);

document
.getElementById("head-scene")
.appendChild(headRenderer.domElement);



const headLight = new THREE.SpotLight(
    0xffffff,
    200
);

headLight.position.set(0,15,0);

headLight.angle = 1;

headLight.penumbra = 1;

headScene.add(headLight);



const ambientHeadLight =
new THREE.AmbientLight(
    0xffffff,
    1
);

headScene.add(ambientHeadLight);



const loader = new GLTFLoader();

let headModel;

loader.load(

    './models/head.glb',

    function(gltf) {

        headModel = gltf.scene;

        headModel.scale.set(1.8,1.8,1.8);

        headModel.position.y = -2;

        headScene.add(headModel);

    }

);

//look scenes//

const lookScene = new THREE.Scene();

const lookCamera =
new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

lookCamera.position.z = 12;

const lookRenderer =
new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

lookRenderer.setSize(
    window.innerWidth * 0.55,
    window.innerHeight * 0.9
);

document
.getElementById("look-scene")
.appendChild(lookRenderer.domElement);



//camera controls/

const controls =
new OrbitControls(
    lookCamera,
    lookRenderer.domElement
);

controls.enableDamping = true;

controls.enablePan = false;

controls.enableZoom = true;

controls.autoRotate = true;

controls.autoRotateSpeed = 1;



//lighting/

const lookSpotlight =
new THREE.SpotLight(
    0xffffff,
    120
);

lookSpotlight.position.set(
    0,
    8,
    8
);

lookSpotlight.angle = 1;

lookSpotlight.penumbra = 1;

lookScene.add(lookSpotlight);


const backLight = new THREE.DirectionalLight(0xffffff, 2);

backLight.position.set(0, 5, -10); 


backLight.target.position.set(0, 0, 0);
lookScene.add(backLight);
lookScene.add(backLight.target);


const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5); 
hemiLight.position.set(0, 20, 0);
lookScene.add(hemiLight);

let lightEnabled = true;

//model//

let lookModel;

loader.load(

    './models/look2.glb',

    function(gltf) {

        lookModel = gltf.scene;

        lookModel.scale.set(7.3,7.3,7.3);

        lookModel.position.y = -5;

        lookScene.add(lookModel);

    }

);



//colour change//

window.changeColour = function(colour) {

    if(lookModel) {

        const Coat =
        lookModel.getObjectByName("Coat");

        if(Coat) {

            Coat.traverse((child) => {

                if(child.isMesh) {

                    child.material.color.set(colour);

                }

            });

        }

    }

}



//wireframe//

let wireframe = false;

window.toggleWireframe = function() {

    wireframe = !wireframe;

    if(lookModel) {

        lookModel.traverse((child) => {

            if(child.isMesh) {

                child.material.wireframe =
                wireframe;

            }

        });

    }

}

//light on and off//

window.toggleLight = function() {

    lightEnabled = !lightEnabled;

    lookSpotlight.visible =
    lightEnabled;

}

//animation//

function animate() {

    requestAnimationFrame(animate);



    /* HEAD */

    if(headModel) {

        headModel.rotation.y += 0.01;

        headModel.position.y =
            -2 + Math.sin(Date.now() * 0.001)
            * 0.1;
    }



    /* LOOK */

    if(lookModel) {

        lookModel.position.y =
            -5 +
            Math.sin(Date.now() * 0.001)
            * 0.15;
    }



    controls.update();



    headRenderer.render(
        headScene,
        headCamera
    );

    lookRenderer.render(
        lookScene,
        lookCamera
    );

}

animate();



//resize//

window.addEventListener(

'resize',

() => {

    lookCamera.aspect =
    window.innerWidth /
    window.innerHeight;

    lookCamera.updateProjectionMatrix();

    lookRenderer.setSize(
        window.innerWidth * 0.55,
        window.innerHeight * 0.9
    );

});

//popup//

const popup =
document.getElementById("popup");



document
.getElementById("head-button")
.addEventListener("click", () => {

    popup.style.display = "flex";

});



document
.getElementById("closePopup")
.addEventListener("click", () => {

    popup.style.display = "none";

});