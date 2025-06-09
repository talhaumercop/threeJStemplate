import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three'
import EventEmitter from "./eventEmitter.class";
import { TextureLoader } from "three";

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()
        this.sources = sources
        //setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }
    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new TextureLoader()
        this.loaders.rgbeLoader = new RGBELoader()

    }
    startLoading() {
        //load each source
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (gltf) => {
                        this.sourceLoaded(source, gltf)
                    }
                )
            }
            else if (source.type === 'HDRI_texture') {
                this.loaders.rgbeLoader.load(
                    source.path,
                    (texture) => {
                        this.sourceLoaded(source,texture)
                    }
                )
            }
        }
    }
    sourceLoaded(source,file){
        this.items[source.name]=file
        this.loaded++
        if(this.loaded === this.toLoad){
            // console.log('finished')
            this.trigger('ready')
        }
    }
}