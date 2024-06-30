import * as THREE from "three";

export default class Ger {
    constructor(_options) {
        // Options
        this.config = _options.config
        this.resources = _options.resources
        this.objects = _options.objects
        this.shadows = _options.shadows
    }

    addGer(_options) {
        this.objects.add({
            base: this.resources.items.ger.scene,
            collision: this.resources.items.gerCollision.scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 1,
            shadow: {sizeX: 9, sizeY: 6, offsetZ: 1},
            soundName: 'ger',
        })
    }

    addFence(_options) {
        this.objects.add({
            base: this.resources.items.fence.scene,
            collision: this.resources.items.fenceCollision.scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 5,
            shadow: {sizeX: 3, sizeY: 1, offsetZ: 1},
            duplicated: true,
            soundName: 'woodHit'
        })
    }

    addBucket(_options) {
        this.objects.add({
            base: this.resources.items.bucket.scene,
            collision: this.resources.items.bucketCollision.scene,
            offset: new THREE.Vector3(_options.offset.x - 12, _options.offset.y - 3, 0),
            mass: 0.3,
            shadow: {sizeX: 1, sizeY: 1, offsetZ: 1},
            duplicated: true,
        })
    }

    addPerson(_options) {
        this.objects.add({
            base: this.resources.items['person' + _options.name].scene,
            collision: this.resources.items['person' + _options.name + 'Collision'].scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 1.01),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 3,
            shadow: {sizeX: 1.2, sizeY: 1.8, alpha: 0.35},
            soundName: 'ouch-' + _options.name.toLowerCase() + '-' + this.config.language,
        })
    }
}
