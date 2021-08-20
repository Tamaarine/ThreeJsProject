import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {FirstPersonControls} from './FirstPersonControls.js'
import {DragControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/DragControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
    canvas : document.querySelector('#bg'),
})

const grid = new THREE.GridHelper(200, 50)
scene.add(grid)

let torus

function init() {
    renderer.setClearColor(0xfffffe) // sets the entire background color
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    camera.position.setZ(0.01) // put the camera back a little initially
    
    // Add the light source
    const ambientLight = new THREE.AmbientLight(0x00ff44)
    const lightHelper = new THREE.PointLightHelper(ambientLight)
    scene.add(ambientLight)
    scene.add(lightHelper)
    
    // Initial shape 
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial( {color:0xFF6347} )
    torus = new THREE.Mesh( geometry, material )
    torus.position.x = 100
    scene.add(torus)
}

const control = new OrbitControls(camera, renderer.domElement)
// control.enableDamping = true
// control.dampingFactor = 0.1

control.enablePan = false;
control.enableDamping = true;
control.rotateSpeed = 0.30;

// control.movementSpeed = 2
// control.activeLook = false
// control.enabled = false
// control.lookAt(5, 2, 10)



// const spaceTexture = new THREE.TextureLoader().load('space.jpg')
// scene.background = spaceTexture

var mixer;

const loader = new GLTFLoader()

loader.load('./littletokyo/tokyo.glb', function( object ) {
    const model = object.scene;
    
    model.position.set( 1, 1, 0 )
    model.scale.set( 0.05, 0.05, 0.05 )
    scene.add( model )
    
    mixer = new THREE.AnimationMixer( model )
    mixer.clipAction( object.animations[0] ).play()
    console.log(mixer)
    
    // model.scale.set( 0.01, 0.01, 0.01 )
    animate()
    
}, undefined, function ( e ) {
    console.log( e )
})

let keycontrols = {
    wUp: false,
    sUp: false,
    aUp: false,
    dUp: false
}

document.onkeydown = function(event) {
    if(event.keyCode == 87) {
        keycontrols.wUp = true;
    }
    
    if(event.keyCode == 83) {
        keycontrols.sUp = true;
    }
    
    if(event.keyCode == 65) {
        keycontrols.aUp = true;
    }
    
    if(event.keyCode == 68) {
        keycontrols.dUp = true;
    }
    
}

document.onkeyup = function(event) {
    if(event.keyCode == 87) {
        keycontrols.wUp = false;
    }
    
    if(event.keyCode == 83) {
        keycontrols.sUp = false;
    }
    
    if(event.keyCode == 65) {
        keycontrols.aUp = false;
    }
    
    if(event.keyCode == 68) {
        keycontrols.dUp = false;
    }
}

const clock = new THREE.Clock()
const speed = 0.5

init()

//! Main rendering loop
function animate() {
    requestAnimationFrame( animate )
    
    const delta = clock.getDelta()
    mixer.update(delta)
    
    if(keycontrols.wUp) {
        camera.lookAt(torus.position)
    }
    if(keycontrols.sUp) {
        camera.position.y -= speed;
    }
    if(keycontrols.aUp) {
        camera.position.x -= speed;
    }
    if(keycontrols.dUp) {
        camera.position.x += speed;
    }
    
    // if(control.target.distanceTo(control.object.position) < 2) {
    //     control2.update(delta)
    // }
    // else {
    //     control.update()
    // }
    camera.position.x += 0.01
    control.target.x += 0.01
    camera.updateProjectionMatrix()
    
    control.update()
    
    renderer.render( scene, camera )
}

window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener("contextmenu", e => e.preventDefault());
