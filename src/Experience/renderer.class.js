import * as THREE from 'three'
export default class Renderer {
    constructor() {
        this.experience = window.experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera

        this.webGLRenderer()
    }
// ...existing code...
    webGLRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha:true
        })
        this.renderer.physicallyCorrectLights = true
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixalRatio)
        //set background color
      //  this.renderer.setClearColor(null) // Will just leave it transparent
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.toneMapping = THREE.CineonToneMapping
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.toneMappingExposure = 1.75
    }
    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixalRatio)
    }
    render() {
        this.renderer.render(this.scene, this.camera.camera)
    }
}