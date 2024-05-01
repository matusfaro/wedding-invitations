import * as THREE from "three";

export default class Alphabet {
    constructor(_options) {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects
    }

    add(_options) {
        _options.text.split('').forEach((letter, index) => {
            this.objects.add({
                base: this.resources.items['ca' + letter].scene,
                collision: this.resources.items['ca' + letter].scene,
                offset: new THREE.Vector3(_options.offset.x + index * 1.2, _options.offset.y, 0),
                mass: 1,
            })
        })
    }
}
