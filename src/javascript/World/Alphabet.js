import * as THREE from "three";

export default class Alphabet {
    constructor(_options) {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects
    }

    addArrow(_options) {
    }

    add(_options) {
        _options.text.split('').forEach((letter, index) => {
            let collision, shadow, rotationY = 0
            switch (letter) {
                case ' ':
                    return
                case '.':
                case ',':
                    collision = this.resources.items.collisionDot
                    shadow = undefined
                    break
                case '1':
                case '?':
                case '!':
                    collision = this.resources.items.collisionI
                    shadow = {sizeX: 0.2, sizeY: 0.2, offsetZ: -0.15, alpha: 0.35}
                    break
                case '↓':
                    rotationY = -Math.PI / 2
                    letter = '←'
                case '←':
                    collision = this.resources.items.collisionArrow
                    shadow = {sizeX: 1.2, sizeY: 1.8, offsetZ: -0.15, alpha: 0.35}
                    break
                default:
                    collision = this.resources.items.collisionH
                    shadow = {sizeX: 1.2, sizeY: 1.8, offsetZ: -0.15, alpha: 0.35}
                    break
            }

            const resource = this.resources.items[letter.toUpperCase()] || this.resources.items['?']

            let offsetX = _options.offset.x, offsetY = _options.offset.y, rotation = 0
            switch (_options.direction) {
                case 'x':
                    offsetX += index * 0.65
                    break
                default:
                case 'y':
                    offsetY += index * 0.65
                    rotation = Math.PI / 2
                    break
                case 'xy':
                    offsetX += index * 0.45
                    offsetY += index * 0.45
                    rotation = Math.PI / 4
                    break
            }

            this.objects.add({
                base: resource.scene,
                collision: collision.scene,
                duplicated: true,
                materialName: _options.materialName || 'gold',
                offset: new THREE.Vector3(
                    offsetX,
                    offsetY,
                    (_options.offset.z || 0) + .5),
                rotation: new THREE.Euler(0, rotationY, rotation, 'ZYX'),
                mass: 0.5,
                shadow: shadow,
                soundName: 'brick'
            })
        })
    }
}
