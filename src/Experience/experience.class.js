import Cube from "./world/Cube.class"
import Camera from "./camera.class"
import Renderer from "./renderer.class"
import Sizes from "./Utils/sizes.class"
import Time from "./Utils/time.class"
import * as THREE from 'three'
import Resources from "./Utils/resources.class"
import sources from "./sources"
import debug from "./Utils/debug.class"
import ShaderMaterial from "./world/ShaderMaterial.class"
import FPSTracker from "./Utils/stats.class"
import canvas2D from "./world/utils/canvas.class"


export default class Experience {
    constructor() {
        //starting
        console.log('experience started')
        // global access
        window.experience = this
        //options
        this.canvas = canvas

        //setup
        this.debug=new debug()
        this.stats=new FPSTracker()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        // this.cube = new Cube()
        this.canvasClass=new canvas2D()
        this.shaderMaterial= new ShaderMaterial()
        
        //listen triggers
        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time.on('tick', () => {
            this.update()
        })
    }
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }
    update() {
        this.stats.begin()
        this.camera.update()
        this.renderer.render()
        this.canvasClass.update()
        this.stats.end()
    }
}