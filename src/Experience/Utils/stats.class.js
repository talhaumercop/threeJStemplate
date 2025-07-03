import Stats from 'stats.js'

export default class FPSTracker {
    constructor() {
        this.stats = new Stats()

        // 0 = FPS, 1 = MS per frame, 2 = memory (if supported)
        this.stats.showPanel(0) 

        // Position the panel in top-left corner
        this.stats.dom.style.position = 'absolute'
        this.stats.dom.style.left = '0px'
        this.stats.dom.style.top = '0px'
        this.stats.dom.style.zIndex = '9999'

        document.body.appendChild(this.stats.dom)
    }

    // Call this at the start of each frame
    begin() {
        this.stats.begin()
    }

    // Call this at the end of each frame
    end() {
        this.stats.end()
    }
}
