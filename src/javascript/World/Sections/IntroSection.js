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

        this.setInstructions({
            offset: new THREE.Vector2(4, -2)
        })
        // this.setOtherInstructions()
        // this.setTitles()
        // this.setTiles()
        // this.setDikes()
        this.setGer()
        this.setRoads()
        this.setSkyResortName()
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

    setOtherInstructions() {
        if (this.config.touch) {
            return
        }

        this.otherInstructions = {}
        this.otherInstructions.x = 16
        this.otherInstructions.y = -2

        // Container
        this.otherInstructions.container = new THREE.Object3D()
        this.otherInstructions.container.position.x = this.otherInstructions.x
        this.otherInstructions.container.position.y = this.otherInstructions.y
        this.otherInstructions.container.matrixAutoUpdate = false
        this.otherInstructions.container.updateMatrix()
        this.container.add(this.otherInstructions.container)

        // Label
        this.otherInstructions.label = {}

        this.otherInstructions.label.geometry = new THREE.PlaneBufferGeometry(6, 6, 1, 1)

        this.otherInstructions.label.texture = this.resources.items.introInstructionsOtherTexture
        this.otherInstructions.label.texture.magFilter = THREE.NearestFilter
        this.otherInstructions.label.texture.minFilter = THREE.LinearFilter

        this.otherInstructions.label.material = new THREE.MeshBasicMaterial({
            transparent: true,
            alphaMap: this.otherInstructions.label.texture,
            color: 0xffffff,
            depthWrite: false,
            opacity: 0
        })

        this.otherInstructions.label.mesh = new THREE.Mesh(this.otherInstructions.label.geometry, this.otherInstructions.label.material)
        this.otherInstructions.label.mesh.matrixAutoUpdate = false
        this.otherInstructions.container.add(this.otherInstructions.label.mesh)

        // Horn
        this.otherInstructions.horn = this.objects.add({
            base: this.resources.items.hornBase.scene,
            collision: this.resources.items.hornCollision.scene,
            offset: new THREE.Vector3(this.otherInstructions.x + 1.25, this.otherInstructions.y - 2.75, 0.2),
            rotation: new THREE.Euler(0, 0, 0.5),
            duplicated: true,
            shadow: {sizeX: 1.65, sizeY: 0.75, offsetZ: -0.1, alpha: 0.4},
            mass: 1.5,
            soundName: 'horn',
            sleep: false
        })
    }

    setTitles() {
        // Title
        this.objects.add({
            base: this.resources.items.introBBase.scene,
            collision: this.resources.items.introBCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introRBase.scene,
            collision: this.resources.items.introRCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introUBase.scene,
            collision: this.resources.items.introUCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introNBase.scene,
            collision: this.resources.items.introNCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introOBase.scene,
            collision: this.resources.items.introOCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introSBase.scene,
            collision: this.resources.items.introSCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introIBase.scene,
            collision: this.resources.items.introICollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introMBase.scene,
            collision: this.resources.items.introMCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introOBase.scene,
            collision: this.resources.items.introOCollision.scene,
            offset: new THREE.Vector3(3.95, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introNBase.scene,
            collision: this.resources.items.introNCollision.scene,
            offset: new THREE.Vector3(5.85, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.4},
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introCreativeBase.scene,
            collision: this.resources.items.introCreativeCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0.25),
            shadow: {sizeX: 5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.3},
            mass: 1.5,
            sleep: false,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introDevBase.scene,
            collision: this.resources.items.introDevCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: {sizeX: 2.5, sizeY: 1.5, offsetZ: -0.6, alpha: 0.3},
            mass: 1.5,
            soundName: 'brick'
        })
    }

    setTiles() {
        this.tiles.add({
            start: new THREE.Vector2(0, -4.5),
            delta: new THREE.Vector2(0, -4.5)
        })
    }

    setDikes() {
        this.dikes = {}
        this.dikes.brickOptions = {
            base: this.resources.items.brickBase.scene,
            collision: this.resources.items.brickCollision.scene,
            offset: new THREE.Vector3(0, 0, 0.1),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: {sizeX: 1.2, sizeY: 1.8, offsetZ: -0.15, alpha: 0.35},
            mass: 0.5,
            soundName: 'brick'
        }

        // this.walls.add({
        //     object:
        //     {
        //         ...this.dikes.brickOptions,
        //         rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //     },
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: true,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x + 0, this.y - 4, 0),
        //         offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
                {
                    type: 'brick',
                    equilibrateLastLine: true,
                    widthCount: 5,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x - 12, this.y - 13, 0),
                    offsetWidth: new THREE.Vector3(0, 1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
        })

        this.walls.add({
            object:
                {
                    ...this.dikes.brickOptions,
                    rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
                },
            shape:
                {
                    type: 'brick',
                    equilibrateLastLine: true,
                    widthCount: 3,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 8, this.y + 6, 0),
                    offsetWidth: new THREE.Vector3(1.05, 0, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
                {
                    type: 'brick',
                    equilibrateLastLine: false,
                    widthCount: 3,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 9.9, this.y + 4.7, 0),
                    offsetWidth: new THREE.Vector3(0, -1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
        })

        this.walls.add({
            object:
                {
                    ...this.dikes.brickOptions,
                    rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
                },
            shape:
                {
                    type: 'brick',
                    equilibrateLastLine: true,
                    widthCount: 3,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x - 14, this.y + 2, 0),
                    offsetWidth: new THREE.Vector3(1.05, 0, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
                {
                    type: 'brick',
                    equilibrateLastLine: false,
                    widthCount: 3,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x - 14.8, this.y + 0.7, 0),
                    offsetWidth: new THREE.Vector3(0, -1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
                {
                    type: 'brick',
                    equilibrateLastLine: true,
                    widthCount: 3,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x - 14.8, this.y - 3.5, 0),
                    offsetWidth: new THREE.Vector3(0, -1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
        })

        if (!this.config.touch) {
            this.walls.add({
                object:
                    {
                        ...this.dikes.brickOptions,
                        rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
                    },
                shape:
                    {
                        type: 'brick',
                        equilibrateLastLine: true,
                        widthCount: 2,
                        heightCount: 2,
                        position: new THREE.Vector3(this.x + 18.5, this.y + 3, 0),
                        offsetWidth: new THREE.Vector3(1.05, 0, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0.2)
                    }
            })

            this.walls.add({
                object: this.dikes.brickOptions,
                shape:
                    {
                        type: 'brick',
                        equilibrateLastLine: false,
                        widthCount: 2,
                        heightCount: 2,
                        position: new THREE.Vector3(this.x + 19.9, this.y + 2.2, 0),
                        offsetWidth: new THREE.Vector3(0, -1.05, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0.2)
                    }
            })
        }
    }

    setGer() {
        this.container.add(this.road.createGerFloor({
            offset: new THREE.Vector2(2.7, 8.5),
        }))
        this.ger.addGer({
            offset: new THREE.Vector2(4, 10),
        })
        this.ger.addPerson({
            offset: new THREE.Vector2(4, 5),
            name: 'Nomin'
        })
        this.ger.addPerson({
            offset: new THREE.Vector2(3, 5),
            name: 'Matus'
        })
        this.alphabet.add({
            text: this.i18n.get('matusFaro'),
            offset: new THREE.Vector2(-5, 5),
        })
        this.alphabet.add({
            text: this.i18n.get('nominKhurelbaatar'),
            offset: new THREE.Vector2(6, 5),
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(-3, 10),
            rotation: -20,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(-2, 12),
            rotation: 10,
        })
        this.animals.addHorse({
            offset: new THREE.Vector2(-1, 15),
            rotation: -30,
        })
    }

    setRoads() {
        const offset = new THREE.Vector2(0, 0)
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

    setSkyResortName() {
        this.alphabet.add({
            text: this.i18n.get('SkyResort'),
            offset: new THREE.Vector2(6, -170),
        })

        this.alphabet.add({
            text: this.i18n.get('2024.8.4'),
            offset: new THREE.Vector2(9, -172),
        })
    }

    setAlphabetTest() {
        this.alphabet.add({
            text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ0123456789.,!?',
            offset: new THREE.Vector2(0, -10),
        })
    }
}
