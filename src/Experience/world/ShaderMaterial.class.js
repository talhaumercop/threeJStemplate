import * as THREE from 'three'
import fragmentShader from '../../Experience/shaders/fragment.glsl'
import vertexShader from '../../Experience/shaders/vertex.glsl'

console.log(vertexShader,fragmentShader)
export default class ShaderMaterial {
    constructor() {
        this.experience = window.experience
        this.scene = this.experience.scene

        this.resources = this.experience.resources
        this.ShaderMaterial()
    }
    ShaderMaterial() {
        const geometry = new THREE.PlaneGeometry(2,2,128,128)
        const material = new THREE.ShaderMaterial({
            vertexShader:vertexShader,
            fragmentShader:fragmentShader,
        })
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(0, 0, 0)
        this.scene.add(plane)
    }
}