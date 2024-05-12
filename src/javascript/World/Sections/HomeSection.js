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
        this.tiles = _options.tiles
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
            offset: new THREE.Vector2(this.x, this.y + 4),
        }))
        this.ger.addGer({
            offset: new THREE.Vector2(this.x + 4, this.y + 10),
            rotation: 65,
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

        this.alphabet.add({
            text: this.i18n.get('nominKhurelbaatar'),
            offset: new THREE.Vector2(this.x + 9, this.y + 11),
            direction: 'y',
        });
        this.alphabet.add({
            text: this.i18n.get('matusFaro'),
            offset: new THREE.Vector2(this.x + 9, this.y + 0),
            direction: 'y',
        });
    }

    setStable(_options) {
        // [
        //     {x: -7.4, y: -2.2, r: -125},
        //     {x: -6, y: 0.4, r: -110},
        //     {x: -6, y: 3.2, r: -70},
        //     {x: -8, y: 4.5, r: 0},
        //     {x: -10.8, y: 3.8, r: 35},
        //     {x: -13, y: 2, r: 45},
        //     {x: -14, y: -.5, r: 90},
        //     {x: -12.5, y: -3.2, r: 145},
        //     {x: -9.7, y: -3.7, r: 200},
        // ].forEach(_fence => {
        //     this.ger.addFence({
        //         offset: new THREE.Vector2(this.x + _fence.x, this.y + _fence.y),
        //         rotation: _fence.r,
        //     })
        // })
        this.animals.addHorseHolder({
            offset: new THREE.Vector2(this.x + 0, this.y + 0),
            rotation: 35,
        })

        this.animals.addHorse({
            offset: new THREE.Vector2(this.x - 2.5, this.y + 3),
            rotation: -30,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(this.x - 1.6, this.y + 1.35),
            rotation: 10,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(this.x + 0.7, this.y - 0.3),
            rotation: 190,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(this.x + 1.5, this.y - 2.7),
            rotation: 105,
        })
    }

    setAnimals(_options) {
        this.setSheepFlock({
            offset: new THREE.Vector2(this.x + 1, this.y + 16),
            disperseAmount: 1.8,
            amountPercent: 0.5
        })

        // TODO readd loose animals
        // this.setHorseFlock({
        //     offset: new THREE.Vector2(this.x +12, this.y-43),
        //     disperseAmount: 1.2,
        //     amountPercent: 0.5
        // })
        // this.setSheepFlock({
        //     offset: new THREE.Vector2(this.x +12, this.y-70),
        //     disperseAmount: 1.2,
        //     amountPercent: 1
        // })
        // this.setHorseFlock({
        //     offset: new THREE.Vector2(this.x +-8, this.y-80),
        //     disperseAmount: 2,
        //     amountPercent: 1
        // })
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
            {x: 5.5, y: 17, r: -65},

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
