import * as THREE from "three";

export default class Alphabet {
    constructor(_options) {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects
    }

    add(_options) {
        _options.text.split('').forEach((letter, index) => {
            let collision, shadow
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
                default:
                    collision = this.resources.items.collisionH
                    shadow = {sizeX: 1.2, sizeY: 1.8, offsetZ: -0.15, alpha: 0.35}
                    break
            }
            const resource = this.resources.items[letter.toUpperCase()] || this.resources.items['?']
            this.objects.add({
                base: resource.scene,
                collision: collision.scene,
                duplicated: true,
                offset: new THREE.Vector3(_options.offset.x + index * 0.65, _options.offset.y, .5),
                mass: 0.5,
                shadow: shadow,
                soundName: 'brick'
            })
        })
    }
}
