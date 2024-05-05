import * as THREE from "three";

export default class Ger {
    constructor(_options) {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects
        this.shadows = _options.shadows
    }

    addGer(_options) {
        this.objects.add({
            base: this.resources.items.ger.scene,
            collision: this.resources.items.gerCollision.scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0),
            mass: 1,
            shadow: {sizeX: 9, sizeY: 6, offsetZ: 0.2},
        })
    }

    addPerson(_options) {
        this.objects.add({
            base: this.resources.items['person' + _options.name].scene,
            collision: this.resources.items['person' + _options.name + 'Collision'].scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 1.01),
            mass: 3,
            shadow: {sizeX: 1.2, sizeY: 1.8, alpha: 0.35},
        })
    }
}
