import EventEmitter from "./eventEmitter.class";
import * as THREE from 'three';
export default class Time extends EventEmitter {
    constructor() {
        super()

        // setup
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
        const clock= new THREE.Clock();
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsedTime = clock.getElapsedTime()
        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
} 