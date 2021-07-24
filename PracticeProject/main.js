import * as THREE from './three.module.js'
import { OrbitControl } from './node_modules/three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
    canvas : document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color:0xFF6347} )
const torus = new THREE.Mesh( geometry, material )

scene.add(torus)

const ambientLight = new THREE.AmbientLight(0x00ff44)
const lightHelper = new THREE.PointLightHelper(ambientLight)
scene.add(ambientLight)
scene.add(lightHelper)


function animate() {
    requestAnimationFrame( animate )
    
    // torus.rotation.x += 0.01
    torus.rotation.y += 0.01
    torus.rotation.z -= 0.01    
    
    renderer.render( scene, camera )
}

animate()