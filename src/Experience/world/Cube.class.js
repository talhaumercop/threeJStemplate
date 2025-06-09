import * as THREE from 'three'
import enviroment from './enviroment.class'
export default class Cube {
    constructor() {
        this.experience = window.experience
        this.scene = this.experience.scene

        this.resources = this.experience.resources
        this.resources.on('ready', () => {
            this.light_Envoirment()
        })

        this.cubeMaker()
    }
    cubeMaker() {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        const material = new THREE.MeshStandardMaterial({
            color: 'white',  // Adding a green color,
        })
        const box = new THREE.Mesh(geometry, material)

        // Moving the box slightly forward to ensure it's visible
        box.position.set(0, 0, 0) // Position cube at center
        this.scene.add(box)
    }
    light_Envoirment() {
        this.envoirment = new enviroment()
    }
}