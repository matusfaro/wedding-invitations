import * as THREE from 'three'

export default class WeddingSection {
    constructor(_options) {
        // Options
        this.config = _options.config
        this.i18n = _options.i18n
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.wedding = _options.wedding
        this.alphabet = _options.alphabet
        this.animals = _options.animals
        this.road = _options.road
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setStage()
        const textMaterial = 'purple'
        this.setSeatMarkerOwnName(textMaterial)
        this.setText(textMaterial)
    }

    setStage() {
        this.wedding.addArch({
            offset: new THREE.Vector2(
                this.x + -8,
                this.y + 2),
            rotation: 90
        });

        const rows = 3
        const cols = 6
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.wedding.addChair({
                    offset: new THREE.Vector2(
                        this.x + row * 1.5 + -3,
                        this.y + col * 1.5 + -3 + (col >= cols / 2 ? 2 : 0)),
                    rotation: 265
                })
            }
        }

        [
            // Behind arch
            {x: -11, y: -4},
            {x: -14, y: -2},
            {x: -12, y: -1},
            {x: -13, y: 2},
            {x: -14.5, y: 4},
            {x: -11, y: 5},

            // Left of arch
            {x: -7, y: -6},
            {x: -6, y: -8},
            {x: -5, y: -7},
            {x: -4, y: -10},
            {x: -3, y: -8},

            // Right of arch
            {x: -11, y: 10},
            {x: -9, y: 12},

            // Near entrance
            {x: 6, y: 14},
            {x: 8, y: 19},
            {x: 11, y: 16},
            {x: 14, y: 18},

        ].forEach(_tree => {
            this.road.addTree({
                offset: new THREE.Vector2(
                    this.x + _tree.x,
                    this.y + _tree.y),
                rotation: Math.random() * 360
            });
        })
    }

    setSeatMarkerOwnName(textMaterial) {
        if (this.config.language !== 'mn') {
            let name
            if (this.config.name) {
                name = this.config.name
            } else {
                name = this.i18n.get('youSitHere')
            }
            const words = name.split(' ');
            words.forEach((word, index) => {
                this.alphabet.add({
                    text: word,
                    direction: 'xy',
                    offset: new THREE.Vector3(
                        this.x - 2,
                        this.y - 2,
                        1.5 + words.length - index),
                    materialName: textMaterial,
                })
            })
            this.alphabet.add({
                text: '↓',
                direction: 'xy',
                offset: new THREE.Vector3(
                    this.x - 2,
                    this.y - 2,
                    1.5),
                materialName: textMaterial,
            })
        }
    }

    setText(textMaterial) {

        if (this.config.language === 'mn') {
            this.alphabet.add({
                text: 'Хүндэтгэлийн',
                direction: 'xy',
                offset: new THREE.Vector3(
                    this.x - 5,
                    this.y - 14,
                    1),
                materialName: textMaterial,
            })
            this.alphabet.add({
                text: 'арга хэмжээ',
                direction: 'xy',
                offset: new THREE.Vector2(
                    this.x - 5,
                    this.y - 14),
                materialName: textMaterial,
            })
        }

        this.alphabet.add({
            text: this.i18n.get('2024.8.4'),
            direction: 'x',
            offset: new THREE.Vector3(
                this.x,
                this.y + 42 - 3,
                2),
            materialName: textMaterial,
        })
        this.alphabet.add({
            text: this.i18n.get('skyResort'),
            direction: 'x',
            offset: new THREE.Vector3(
                this.x,
                this.y + 41 - 3,
                1),
            materialName: textMaterial,
        })
        this.alphabet.add({
            text: this.i18n.get('sixPm'),
            direction: 'x',
            offset: new THREE.Vector3(
                this.x,
                this.y + 40 - 3,
                0),
            materialName: textMaterial,
        })

        // this.alphabet.add({
        //     text: this.i18n.get('seeYouSoon'),
        //     direction: 'x',
        //     offset: new THREE.Vector3(
        //         this.x - 2,
        //         this.y + 40,
        //         0),
        //     materialName: textMaterial,
        // })
    }
}
