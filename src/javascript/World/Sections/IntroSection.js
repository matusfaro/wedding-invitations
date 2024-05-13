import * as THREE from 'three'

export default class IntroSection {
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
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setSign()
        this.setForest()
        this.setRoads()
        this.setRoadBlock()
    }

    setSign() {
        this.alphabet.add({
            text: this.i18n.get('weddingInvitation1'),
            offset: new THREE.Vector3(this.x - 1, this.y, 1),
            direction: 'y',
        });
        this.alphabet.add({
            text: this.i18n.get('weddingInvitation2'),
            offset: new THREE.Vector2(this.x - 1, this.y),
            direction: 'y',
        });
    }

    setForest() {

        [
            // Top
            {x: -12, y: 16},
            {x: -8, y: 14},
            {x: -6, y: 10},
            {x: -4, y: 8},
            {x: -8, y: 4},
            {x: -3, y: 2},
            {x: -7, y: -5},
            {x: -4, y: -7},
            {x: -1, y: -12},
            {x: -8, y: -14},
            {x: -4, y: -16},
            {x: -6, y: -20},
            {x: -2, y: -22},

            {x: -13, y: 24},
            {x: -17, y: 13},
            {x: -22, y: 10},
            {x: -6, y: 7},
            {x: -12, y: 4},
            {x: -8, y: 1},
            {x: -5, y: -1},
            {x: -13, y: -4},
            {x: -8, y: -7},
            {x: -12, y: -10},
            {x: -10, y: -13},
            {x: -8, y: -16},
            {x: -7, y: -19},
            {x: -9, y: -22},

            // Bottom
            {x: 15, y: 22},
            {x: 12, y: 13},
            {x: 16, y: 9},
            {x: 11, y: 5},
            {x: 13, y: 0},
            {x: 17, y: -2},
            {x: 12, y: -6},
            {x: 19, y: -10},
            {x: 16, y: -14},
            {x: 13, y: -19},
            {x: 22, y: -28},

            {x: 18, y: 24},
            {x: 16, y: 13},
            {x: 13, y: 15},
            {x: 12, y: 3},
            {x: 11, y: -1},
            {x: 12, y: -5},
            {x: 12, y: -6},
            {x: 11, y: -10},
            {x: 9, y: -13},
            {x: 6, y: -18},
        ].forEach(_tree => {
            this.road.addTree({
                offset: new THREE.Vector2(
                    this.x + _tree.x,
                    this.y + _tree.y),
                rotation: Math.random() * 360
            });
        })
    }

    setRoads() {
        const offset = new THREE.Vector2(0, 170)
        const rotation = 0
        this.container.add(this.road.createRoad({
            type: 'straight1',
            offset: new THREE.Vector2(offset.x + 3, offset.y - 30),
            rotation: rotation
        }))
        this.container.add(this.road.createRoad({
            type: 'straight2',
            offset: new THREE.Vector2(offset.x + 3.1, offset.y - 91),
            rotation: rotation
        }))
        this.container.add(this.road.createRoad({
            type: 'straight3',
            offset: new THREE.Vector2(offset.x + 3.1, offset.y - 152),
            rotation: rotation
        }))
    }

    setRoadBlock() {
        const offset = new THREE.Vector2(1, -16);
        [
            {x: -10, y: 9, r: 30},
            {x: -6, y: 10, r: 0},
            {x: -7.5, y: 9, r: 10},
            {x: -3, y: 10, r: -10},
            {x: 0, y: 10, r: 0},
        ].forEach(_fence => {
            this.ger.addFence({
                offset: new THREE.Vector2(offset.x + _fence.x, offset.y + _fence.y),
                rotation: _fence.r,
            })
        })
    }
}
