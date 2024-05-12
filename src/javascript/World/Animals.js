import * as THREE from "three";

export default class Animals {
    constructor(_options) {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects

        this.items = []
    }

    addHorse(_options) {
        this.objects.add({
            base: this.resources.items.horse.scene,
            collision: this.resources.items.horseCollision.scene,
            soundName: 'horse',
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0.8),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 0.1,
            shadow: {sizeX: 1.2, sizeY: 1.8, alpha: 0.35},
            duplicated: true,
        })
    }

    addHorseHolder(_options) {
        this.objects.add({
            base: this.resources.items.horseHolder.scene,
            soundName: 'horse',
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0.8),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            duplicated: true,
        })
    }

    addSheep(_options) {
        this.objects.add({
            base: this.resources.items.sheep.scene,
            collision: this.resources.items.sheepCollision.scene,
            soundName: 'sheep',
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0.8),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 0.1,
            shadow: {sizeX: 1.2, sizeY: 1.8, alpha: 0.35},
            duplicated: true,
        })
    }
}
