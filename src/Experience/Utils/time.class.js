import EventEmitter from "./eventEmitter.class";
import * as THREE from 'three';
export default class Time extends EventEmitter {
    constructor() {
        super()

        // setup
        this.clock= new THREE.Clock();
        this.start = Date.now()
        this.current = this.start
        this.elapsedTime = 0
        this.delta = 16

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsedTime = this.clock.getElapsedTime()
        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
} 