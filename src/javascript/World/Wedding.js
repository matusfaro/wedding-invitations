import * as THREE from "three";

export default class Wedding {
    constructor(_options) {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects
    }

    addChair(_options) {
        this.objects.add({
            base: this.resources.items.chair.scene,
            collision: this.resources.items.chairCollision.scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0.75),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 1,
            shadow: {sizeX: 1.4, sizeY: 1.4, alpha: 0.35},
            duplicated: true,
        })
    }

    addArch(_options) {
        this.objects.add({
            base: this.resources.items.arch.scene,
            collision: this.resources.items.archCollision.scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 1.5),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 5,
            shadow: {sizeX: 1, sizeY: 1, alpha: 0.35},
        })
    }
}
