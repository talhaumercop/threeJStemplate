import * as THREE from 'three'

export default class enviroment {
    constructor() {
        this.experience = window.experience
        this.scene = this.experience.scene
        this.light()
        this.resources = this.experience.resources
        this.environment()
        // this.ambientLight()
    }
    light() {
        //directional
        const directionalLight = new THREE.DirectionalLight("#ffffff", 1)
        this.scene.add(directionalLight)
        directionalLight.castShadow = true
        directionalLight.shadow.camera.far = 10
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.normalBias = 0.05
        directionalLight.position.set(3, 3, -2, 25)
    }
    ambientLight(){
        const ambient= new THREE.AmbientLight()
        this.scene.add(ambient)
    }
    environment() {
        
        // Create PMREMGenerator
        const texture = this.resources.items.eviromentTextureMap
        texture.mapping = THREE.EquirectangularReflectionMapping;
        // this.scene.background = texture;
        this.scene.environment = texture;
        this.scene.environment = texture;

        this.scene.traverse((child)=>{
            if(child instanceof THREE.Mesh){
                console.log('yes')
            }
        })
    }
}