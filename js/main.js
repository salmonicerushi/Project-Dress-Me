import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

import { GLTFLoader }
from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';


//scene well duh//

const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera( //camera//
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, -1, 14);



//rendering the thing//

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document
.getElementById("head-container")
.appendChild(renderer.domElement);


//lights//

const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    0.75
);

scene.add(ambientLight);



const spotLight =
new THREE.SpotLight(
    0xffffff,
    75
);

spotLight.position.set(
    0,
    8,
    8
);

spotLight.angle = 0.4;

spotLight.penumbra = 1;

spotLight.decay = 2;

spotLight.distance = 50;

scene.add(spotLight);



//head model the g//

const loader = new GLTFLoader();

let headModel;

let wireframeHead;
let wireframeVisible = false;



loader.load(

    'models/head.glb',

    function(gltf) {

        headModel = gltf.scene;

        headModel.scale.set(
            5,
            5,
            5
        );

        headModel.rotation.x = 0.2;
        headModel.position.y = -6;

        scene.add(headModel);

        //goes on top the clone//

        wireframeHead = headModel.clone();

        wireframeHead.traverse((child) => {

            if(child.isMesh) {

                child.material =
                new THREE.MeshBasicMaterial({

                    color: 0xffffff,

                    wireframe: true,

                    transparent: true,

                    opacity: 0.15

                });

            }

        });




        wireframeHead.scale.set(
            5.06,
            5.06,
            5.06
        );

        scene.add(wireframeHead);

        wireframeHead.visible = false;

    },

    undefined,

    function(error) {

        console.error(error);

    }

);


//wireframe//

document
.getElementById("wireframeToggle")
.addEventListener("click", () => {

    wireframeVisible = !wireframeVisible;

    if(wireframeHead) {

        wireframeHead.visible =
        wireframeVisible;

    }

});



function animate() {

    requestAnimationFrame(animate); //animation obv//

    if(headModel) { //float, rotate the vibes//

        headModel.position.y =
            -6.5 +
            Math.sin(Date.now() * 0.001)
            * 0.15;

            headModel.rotation.y += 0.01;

    }



    //wireframe- goes on top//

    if(wireframeHead && headModel) {

    wireframeHead.position.copy(
        headModel.position
    );

    wireframeHead.rotation.y =
    headModel.rotation.y;

}

    renderer.render(
        
        scene,
        camera
        
    );

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

        if(isDragging && headModel) {

            const deltaX =
            event.clientX - previousMouseX;

            headModel.rotation.y +=
            deltaX * 0.03;

            console.log(headModel.rotation.y);

             if(wireframeHead) {

                wireframeHead.rotation.y =
                headModel.rotation.y;

            }

            previousMouseX =
            event.clientX;

        }

    }

);

animate();



//resize//

window.addEventListener(

'resize',

() => {

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});