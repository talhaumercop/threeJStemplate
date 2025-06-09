import EventEmitter from "./eventEmitter.class"


export default class Sizes extends EventEmitter {
    constructor() {
        super()
        //setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixalRatio = Math.min(window.devicePixelRatio, 2)

        //resize
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixalRatio = Math.min(window.devicePixelRatio, 2)

            //triggers
            this.trigger('resize')
        })


    }
}