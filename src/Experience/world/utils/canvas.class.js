import * as THREE from 'three'

export default class canvas2D {
    constructor() {
        // this.experience = window.experience
        // this.camera = window.experience.camera
        // this.sizes = this.experience.sizes
        // this.scene = this.experience.scene
        // this.displacement = {}
        // this.displacement.glowImg = new Image()
        // this.displacement.glowImg.src = '/texture/map/glow.png'
        // this.canvas()
    }
    canvas() {
        // this.displacement.canvas = document.createElement("canvas")
        // this.displacement.canvas.width = 128
        // this.displacement.canvas.height = 128

        // //style
        // this.displacement.canvas.style.position = 'fixed'
        // this.displacement.canvas.style.width = "256px"
        // this.displacement.canvas.style.height = "256px"
        // this.displacement.canvas.style.bottom = 0
        // this.displacement.canvas.style.left = 0
        // this.displacement.canvas.style.zIndex = 10

        // //context
        // this.displacement.context = this.displacement.canvas.getContext("2d")
        // this.displacement.context.fillRect(0, 0, this.displacement.canvas.width, this.displacement.canvas.height)

        // //in case of particaks we cannot raycast  over it so we have to make a plane :
        // this.displacement.plane = new THREE.Mesh(
        //     new THREE.PlaneGeometry(2.5, 2.5),
        //     new THREE.MeshBasicMaterial({ color: 'red',side:THREE.DoubleSide })
        // )
        // this.displacement.plane.visible=false
        // this.scene.add(this.displacement.plane)
        // /**
        //  * raycasting
        //  */
        // this.displacement.raycaster = new THREE.Raycaster()
        // //coordinates
        // this.displacement.canvasCursor= new THREE.Vector2(999,999)
        // this.displacement.screenCursor = new THREE.Vector2(999,999)// so that cursor on scene
        // //reload isnt at center but far away just so that the particales arent already moving when
        // //scene starts
        // // we use ponter move because it works on mobile
        // window.addEventListener('pointermove', (e) => {
        //     this.displacement.screenCursor.x = (e.clientX / this.sizes.width) * 2 - 1
        //     this.displacement.screenCursor.y = -(e.clientY / this.sizes.height) * 2 + 1
        // })

        // //texture
        // this.displacement.texture=new THREE.CanvasTexture(this.displacement.canvas)
        // /**
        //  * to see it
        //  */
        // document.body.append(this.displacement.canvas)
    }
    update() {
    //     this.displacement.raycaster.setFromCamera(this.displacement.screenCursor, this.camera.camera)
    //     const intersections = this.displacement.raycaster.intersectObjects([this.displacement.plane])
    //     if(intersections.length){
    //         const uv=intersections[0].uv
    //         this.displacement.canvasCursor.x=uv.x*this.displacement.canvas.width
    //         this.displacement.canvasCursor.y=(1-uv.y)*this.displacement.canvas.height
    //     }

    //     /**
    //      * draw image
    //     */
    //    this.displacement.context.globalCompositeOperation='source-over'
    //    this.displacement.context.globalAlpha=0.02
    //    this.displacement.context.fillRect(0,0,this.displacement.canvas.width,this.displacement.canvas.height)
    //    const glowsize =this.displacement.canvas.width*0.25
    //     this.displacement.context.globalCompositeOperation='lighten'//additive blending
    //     this.displacement.context.globalAlpha=1
    //     this.displacement.context.drawImage(
    //         this.displacement.glowImg,
    //         this.displacement.canvasCursor.x-glowsize*0.5,
    //         this.displacement.canvasCursor.y-glowsize*0.5,
    //         glowsize,
    //         glowsize
    //     )

    //     //update texture
    //     this.displacement.texture.needsUpdate=true
    }
}