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

        this.setForest()
        // this.setInstructions({
        //     offset: new THREE.Vector2(4, -2)
        // })
        this.setRoads()
        this.setRoadBlock()
    }

    setForest() {

        [
            // Top
            {x: -12, y: -16},
            {x: -8, y: -14},
            {x: -6, y: -10},
            {x: -4, y: -8},
            {x: -8, y: -4},
            {x: -3, y: -2},
            {x: -1, y: 1},
            {x: -7, y: 5},
            {x: -4, y: 7},
            {x: -1, y: 12},
            {x: -8, y: 14},
            {x: -4, y: 16},
            {x: -6, y: 20},
            {x: -2, y: 22},

            {x: -13, y: -24},
            {x: -17, y: -13},
            {x: -22, y: -10},
            {x: -6, y: -7},
            {x: -12, y: -4},
            {x: -8, y: -1},
            {x: -5, y: 1},
            {x: -13, y: 4},
            {x: -8, y: 7},
            {x: -12, y: 10},
            {x: -10, y: 13},
            {x: -8, y: 16},
            {x: -7, y: 19},
            {x: -9, y: 22},

            // Bottom
            {x: 15, y: -22},
            {x: 12, y: -13},
            {x: 16, y: -9},
            {x: 11, y: -5},
            {x: 13, y: 0},
            {x: 17, y: 2},
            {x: 12, y: 6},
            {x: 19, y: 10},
            {x: 16, y: 14},
            {x: 13, y: 19},
            {x: 22, y: 28},

            {x: 18, y: -24},
            {x: 16, y: -13},
            {x: 13, y: -15},
            {x: 12, y: -3},
            {x: 11, y: 1},
            {x: 12, y: 5},
            {x: 12, y: 6},
            {x: 11, y: 10},
            {x: 9, y: 13},
            {x: 6, y: 18},
        ].forEach(_tree => {
            this.road.addTree({
                offset: new THREE.Vector2(
                    this.x + _tree.x,
                    this.y + _tree.y),
                rotation: Math.random() * 360
            });
        })
    }

    setInstructions(_options) {
        this.instructions = {}

        /**
         * Arrows
         */
        this.instructions.arrows = {}

        // Label
        this.instructions.arrows.label = {}

        this.instructions.arrows.label.texture = this.config.touch
            ? this.resources.items[this.i18n.getLanguage() + 'IntroInstructionsControlsTexture']
            : this.resources.items[this.i18n.getLanguage() + 'IntroInstructionsArrowsTexture']
        this.instructions.arrows.label.texture.magFilter = THREE.NearestFilter
        this.instructions.arrows.label.texture.minFilter = THREE.LinearFilter

        this.instructions.arrows.label.material = new THREE.MeshBasicMaterial({
            transparent: true,
            alphaMap: this.instructions.arrows.label.texture,
            color: 0xffffff,
            depthWrite: false,
            opacity: 0
        })

        this.instructions.arrows.label.geometry = new THREE.PlaneGeometry(512 / 45, 96 / 45)

        this.instructions.arrows.label.mesh = new THREE.Mesh(this.instructions.arrows.label.geometry, this.instructions.arrows.label.material)
        this.instructions.arrows.label.mesh.position.y = -2.1 + _options.offset.y
        this.instructions.arrows.label.mesh.position.x = 3.5 + _options.offset.x
        this.instructions.arrows.label.mesh.matrixAutoUpdate = false
        this.instructions.arrows.label.mesh.updateMatrix()
        this.container.add(this.instructions.arrows.label.mesh)

        if (!this.config.touch) {
            // Keys
            this.instructions.arrows.up = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 0),
                rotation: new THREE.Euler(0, 0, 0),
                duplicated: true,
                shadow: {sizeX: 1, sizeY: 1, offsetZ: -0.2, alpha: 0.5},
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.down = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(_options.offset.x, _options.offset.y - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI),
                duplicated: true,
                shadow: {sizeX: 1, sizeY: 1, offsetZ: -0.2, alpha: 0.5},
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.left = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(_options.offset.x - 0.8, _options.offset.y - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5),
                duplicated: true,
                shadow: {sizeX: 1, sizeY: 1, offsetZ: -0.2, alpha: 0.5},
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.right = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(_options.offset.x + 0.8, _options.offset.y - 0.8, 0),
                rotation: new THREE.Euler(0, 0, -Math.PI * 0.5),
                duplicated: true,
                shadow: {sizeX: 1, sizeY: 1, offsetZ: -0.2, alpha: 0.5},
                mass: 1.5,
                soundName: 'brick'
            })
        }
    }

    setRoads() {
        const offset = new THREE.Vector2(0, 44)
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
        [
            {x: -10, y: 9, r: 30},
            {x: -6, y: 10, r: 0},
            {x: -7.5, y: 9, r: 10},
            {x: -3, y: 10, r: -10},
            {x: 0, y: 10, r: 0},
        ].forEach(_fence => {
            this.ger.addFence({
                offset: new THREE.Vector2(_fence.x, _fence.y),
                rotation: _fence.r,
            })
        })
    }
}
