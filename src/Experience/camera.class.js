import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = window.experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.setCamera()
        this.setOrbitControls()
    }
    setCamera() {
        this.camera = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.camera.position.set(0, 0, 5) // Position camera directly in front
        this.scene.add(this.camera)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.canvas)

        // Reset the target to the cube's position
        this.controls.target.set(0, 0, 0)

        // Configure controls for better feel
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
        this.controls.screenSpacePanning = true
        this.controls.enableZoom = true
        this.controls.minDistance = 2
        this.controls.maxDistance = 10

        // Update controls immediately
        this.controls.update()
    }
    resize() {
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()
    }
    update() {
        this.controls.update()
    }
}