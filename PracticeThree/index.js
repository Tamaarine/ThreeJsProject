import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {FirstPersonControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/FirstPersonControls.js'


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
    canvas : document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(10)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color:0xFF6347} )
const torus = new THREE.Mesh( geometry, material )

scene.add(torus)

const ambientLight = new THREE.AmbientLight(0x00ff44)
const lightHelper = new THREE.PointLightHelper(ambientLight)
scene.add(ambientLight)
scene.add(lightHelper)

// const control = new OrbitControls(camera, renderer.domElement)
// const control = new FirstPersonControls( camera , renderer.domElemenet)
// control.lookSpeed = 0.2
// control.movementSpeed = 2
// control.activeLook = false
// control.enabled = false
// scene.add(control)
// control.lookAt(5, 2, 10)

const grid = new THREE.GridHelper(200, 50)
scene.add(grid)

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

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame( animate )
    
    // torus.rotation.x += 0.01
    torus.rotation.y += 0.01
    torus.rotation.z -= 0.01    
    
    const delta = clock.getDelta()
    mixer.update(delta)
    
    camera.position.x += 0.01
    // control.update()
    
    renderer.render( scene, camera )
}

window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    
    renderer.setSize(window.innerWidth, window.innerHeight)
}
