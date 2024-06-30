import * as THREE from 'three'

export default class HomeSection {
    constructor(_options) {
        // Options
        this.config = _options.config
        this.i18n = _options.i18n
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.walls = _options.walls
        this.alphabet = _options.alphabet
        this.ger = _options.ger
        this.animals = _options.animals
        this.road = _options.road
        this.zones = _options.zones
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setZone()
        this.setGer()
        this.setPeople()
        this.setStable()
        this.setAnimals()
    }

    setZone() {
        this.zones.addCameraZone({
            cameraAngle: 'sideway',
            x: this.x + 20,
            xLength: 20,
            y: this.y,
            yLength: 15,
        })
    }

    setGer() {
        this.container.add(this.road.createGerFloor({
            offset: new THREE.Vector2(this.x, this.y + 20),
        }))
        this.ger.addGer({
            offset: new THREE.Vector2(this.x + 4, this.y + 10),
            rotation: 65,
        })
        this.ger.addBucket({
            offset: new THREE.Vector2(this.x + 5, this.y + 7.5),
        })
    }

    setPeople() {
        this.ger.addPerson({
            offset: new THREE.Vector2(this.x + 10.9, this.y + 8),
            rotation: 65,
            name: 'Nomin'
        })
        this.ger.addPerson({
            offset: new THREE.Vector2(this.x + 11, this.y + 7),
            rotation: 95,
            name: 'Matus'
        })

        const textMaterial = 'green'
        this.alphabet.add({
            text: this.i18n.get('nomin'),
            offset: new THREE.Vector3(this.x + 10, this.y + 11, 1),
            direction: 'y',
            materialName: textMaterial,
        });
        this.alphabet.add({
            text: this.i18n.get('khurelbaatar'),
            offset: new THREE.Vector2(this.x + 10, this.y + 10),
            direction: 'y',
            materialName: textMaterial,
        });
        this.alphabet.add({
            text: this.i18n.get('matus'),
            offset: new THREE.Vector3(this.x + 10, this.y + 3, 1),
            direction: 'y',
            materialName: textMaterial,
        });
        this.alphabet.add({
            text: this.i18n.get('faro'),
            offset: new THREE.Vector2(this.x + 10, this.y + 4),
            direction: 'y',
            materialName: textMaterial,
        });
        this.alphabet.add({
            text: this.i18n.get('invitesYou'),
            offset: new THREE.Vector2(this.x + 14, this.y + 1),
            direction: 'y',
            materialName: textMaterial,
        });
    }

    setStable(_options) {
        [
            {x: -7.4, y: -2.2, r: -125},
            {x: -6, y: 0.4, r: -110},
            {x: -6, y: 3.2, r: -70},
            {x: -8, y: 4.5, r: 0},
            {x: -10.8, y: 3.8, r: 35},
            {x: -13, y: 2, r: 45},
            {x: -14, y: -.5, r: 90},
            {x: -12.5, y: -3.2, r: 145},
            {x: -9.7, y: -3.7, r: 200},
        ].forEach(_fence => {
            this.ger.addFence({
                offset: new THREE.Vector2(this.x + _fence.x - 8, this.y + _fence.y + 11),
                rotation: _fence.r,
            })
        })
        this.animals.addHorseHolder({
            offset: new THREE.Vector2(this.x + 0, this.y + 22),
            rotation: 115,
        })

        this.animals.addHorse({
            offset: new THREE.Vector2(this.x + 2.4, this.y + 23),
            rotation: -30 + 90,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(this.x + .8, this.y + 21.7),
            rotation: 10 + 90,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(this.x - 1.5, this.y + 21.3),
            rotation: 190 + 90,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(this.x - 2.7, this.y + 20.2),
            rotation: 105 + 45,
        })
    }

    setAnimals(_options) {
        this.setSheepFlock({
            offset: new THREE.Vector2(this.x - 6, this.y - 10),
            disperseAmount: 1.3,
        })

        this.setHorseFlock({
            offset: new THREE.Vector2(this.x + 23, this.y),
            disperseAmount: 1.4,
            amountPercent: 1
        })
    }

    setSheepFlock(_options) {
        const disperseAmount = _options.disperseAmount || 1;
        [
            {x: 0, y: 0, r: 0},
            {x: 1, y: 2, r: 20},
            {x: 0, y: 4, r: 0},
            {x: -1, y: 6, r: 90},
            {x: 0.5, y: 9, r: -90},

            {x: 2, y: 1, r: 40},
            {x: 3, y: 3, r: 22},
            {x: 3, y: 5.5, r: 180},
            {x: 2, y: 6.5, r: 120},
            {x: 1, y: 11, r: 20},

            {x: 6, y: 3, r: 160},
            {x: 5, y: 5, r: 50},
            {x: 7, y: 6.5, r: 22},
            {x: 6, y: 8, r: 99},
            {x: 5.5, y: 18, r: -65},

            {x: 8, y: 0, r: 0},
            {x: 7, y: 2, r: 80},
            {x: 11, y: 5, r: -30},
            {x: 9, y: 1, r: -50},
            {x: 16, y: 7, r: 170},

        ].forEach((_sheep, _index) => {
            if (_options.amountPercent && Math.random() > _options.amountPercent) return
            this.animals.addSheep({
                offset: new THREE.Vector2(_options.offset.x + _sheep.x * disperseAmount, _options.offset.y + _sheep.y * disperseAmount),
                rotation: _sheep.r,
            })
        })
    }


    setHorseFlock(_options) {
        const disperseAmount = _options.disperseAmount || 1;
        [
            {x: 0, y: 0, r: 0},
            {x: 1, y: 2, r: 20},
            {x: 0, y: 4, r: 0},
            {x: -1, y: 6, r: 90},
            {x: 0.5, y: 9, r: -90},

            {x: 2, y: 1, r: 40},
            {x: 3, y: 3, r: 22},
            {x: 3, y: 5.5, r: 180},
            {x: 2, y: 6.5, r: 120},
            {x: 1, y: 11, r: 20},

            {x: 6, y: 3, r: 160},
            {x: 5, y: 5, r: 50},
            {x: 7, y: 6.5, r: 22},
            {x: 6, y: 8, r: 99},
            {x: 5.5, y: 17, r: -65},

            {x: 8, y: 0, r: 0},
            {x: 7, y: 2, r: 80},
            {x: 11, y: 5, r: -30},
            {x: 9, y: 1, r: -50},
            {x: 16, y: 7, r: 170},


        ].forEach((_horse, _index) => {
            if (_options.amountPercent && Math.random() > _options.amountPercent) return
            this.animals.addHorse({
                offset: new THREE.Vector2(_options.offset.x + _horse.x * disperseAmount, _options.offset.y + _horse.y * disperseAmount),
                rotation: _horse.r,
            })
        })
    }
}
