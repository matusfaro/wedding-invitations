import * as THREE from 'three'
import CANNON from 'cannon'
import {TransformControls} from 'three/examples/jsm/controls/TransformControls.js'

export default class Car {
    constructor(_options) {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.physics = _options.physics
        this.shadows = _options.shadows
        this.materials = _options.materials
        this.controls = _options.controls
        this.sounds = _options.sounds
        this.renderer = _options.renderer
        this.camera = _options.camera
        this.debug = _options.debug
        this.config = _options.config

        // Set up
        this.container = new THREE.Object3D()
        this.position = new THREE.Vector3()

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('car')
            // this.debugFolder.open()
        }

        this.setModels()
        this.setMovement()
        this.setChassis()
        this.setLights()
        this.setWheels()
        this.setTransformControls()
        this.setShootingBall()
        this.setKlaxon()
    }

    setModels() {
        this.models = {}

        this.models.chassis = this.resources.items.carPriusChassis
        this.models.backLightsBrake = this.resources.items.carPriusBackLightsBrake
        this.models.backLightsReverse = this.resources.items.carPriusBackLightsReverse
        this.models.frontLights = this.resources.items.carPriusFrontLights
        this.models.wheel = this.resources.items.carPriusWheel
    }

    setMovement() {
        this.movement = {}
        this.movement.speed = new THREE.Vector3()
        this.movement.localSpeed = new THREE.Vector3()
        this.movement.acceleration = new THREE.Vector3()
        this.movement.localAcceleration = new THREE.Vector3()

        // Time tick
        this.time.on('tick', () => {
            // Movement
            const movementSpeed = new THREE.Vector3()
            movementSpeed.copy(this.chassis.object.position).sub(this.chassis.oldPosition)
            this.movement.acceleration = movementSpeed.clone().sub(this.movement.speed)
            this.movement.speed.copy(movementSpeed)

            this.movement.localSpeed = this.movement.speed.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -this.chassis.object.rotation.z)
            this.movement.localAcceleration = this.movement.acceleration.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -this.chassis.object.rotation.z)

            // Sound
            this.sounds.engine.speed = this.movement.localSpeed.x
            this.sounds.engine.acceleration = this.controls.actions.up ? (this.controls.actions.boost ? 1 : 0.5) : 0

            if (this.movement.localAcceleration.x > 0.01) {
                this.sounds.play('screech')
            }
        })
    }

    setChassis() {
        this.chassis = {}
        this.chassis.offset = new THREE.Vector3(0, 0, -0.22)
        this.chassis.object = this.objects.getConvertedMesh(this.models.chassis.scene.children)
        this.chassis.object.scale.set(0.042, 0.05, 0.05)
        this.chassis.object.position.copy(this.physics.car.chassis.body.position)
        this.chassis.oldPosition = this.chassis.object.position.clone()
        this.container.add(this.chassis.object)

        this.shadows.add(this.chassis.object, {sizeX: 3, sizeY: 2, offsetZ: 0.2})

        // Time tick
        this.time.on('tick', () => {
            // Save old position for movement calculation
            this.chassis.oldPosition = this.chassis.object.position.clone()

            // Update if mode physics
            if (!this.transformControls.enabled) {
                this.chassis.object.position.copy(this.physics.car.chassis.body.position).add(this.chassis.offset)
                this.chassis.object.quaternion.copy(this.physics.car.chassis.body.quaternion)
            }

            // Update position
            this.position.copy(this.chassis.object.position)
        })
    }

    setLights() {

        // Back lights brake
        this.backLightsBrake = {}

        this.backLightsBrake.material = this.materials.pures.items.red.clone()
        this.backLightsBrake.material.transparent = true
        this.backLightsBrake.material.opacity = 0

        this.backLightsBrake.object = this.objects.getConvertedMesh(this.models.backLightsBrake.scene.children)
        for (const _child of this.backLightsBrake.object.children) {
            _child.material = this.backLightsBrake.material
        }

        this.chassis.object.add(this.backLightsBrake.object)

        // Front lights
        this.frontLights = {}

        this.frontLights.material = this.materials.pures.items.white.clone()
        this.frontLights.material.transparent = true
        this.frontLights.material.opacity = 0

        this.frontLights.object = this.objects.getConvertedMesh(this.models.frontLights.scene.children)
        for (const _child of this.frontLights.object.children) {
            _child.material = this.frontLights.material
        }

        this.chassis.object.add(this.frontLights.object)

        // Back lights reverse
        this.backLightsReverse = {}

        this.backLightsReverse.material = this.materials.pures.items.white.clone()
        this.backLightsReverse.material.transparent = true
        this.backLightsReverse.material.opacity = 0

        this.backLightsReverse.object = this.objects.getConvertedMesh(this.models.backLightsReverse.scene.children)
        for (const _child of this.backLightsReverse.object.children) {
            _child.material = this.backLightsReverse.material
        }

        this.chassis.object.add(this.backLightsReverse.object)
        setTimeout(() => {
            this.frontLights.material.opacity = 1

            // Time tick
            this.time.on('tick', () => {
                this.backLightsBrake.material.opacity = this.physics.controls.actions.brake ? 1 : 0.5
                this.backLightsReverse.material.opacity = this.physics.controls.actions.down ? 1 : 0.5
            })

        }, 2000)
    }

    setWheels() {
        this.wheels = {}
        this.wheels.object = this.objects.getConvertedMesh(this.models.wheel.scene.children)
        this.wheels.object.scale.set(0.5, 0.5, 0.5)
        this.wheels.items = []

        for (let i = 0; i < 4; i++) {
            const object = this.wheels.object.clone()

            this.wheels.items.push(object)
            this.container.add(object)
        }

        // Time tick
        this.time.on('tick', () => {
            if (!this.transformControls.enabled) {
                for (const _wheelKey in this.physics.car.wheels.bodies) {
                    const wheelBody = this.physics.car.wheels.bodies[_wheelKey]
                    const wheelObject = this.wheels.items[_wheelKey]

                    wheelObject.position.copy(wheelBody.position)
                    wheelObject.quaternion.copy(wheelBody.quaternion)
                }
            }
        })
    }

    setTransformControls() {
        this.transformControls = new TransformControls(this.camera.instance, this.renderer.domElement)
        this.transformControls.size = 0.5
        this.transformControls.attach(this.chassis.object)
        this.transformControls.enabled = false
        this.transformControls.visible = this.transformControls.enabled

        document.addEventListener('keydown', (_event) => {
            if (this.mode === 'transformControls') {
                if (_event.key === 'r') {
                    this.transformControls.setMode('rotate')
                } else if (_event.key === 'g') {
                    this.transformControls.setMode('translate')
                }
            }
        })

        this.transformControls.addEventListener('dragging-changed', (_event) => {
            this.camera.orbitControls.enabled = !_event.value
        })

        this.container.add(this.transformControls)

        if (this.debug) {
            const folder = this.debugFolder.addFolder('controls')
            folder.open()

            folder.add(this.transformControls, 'enabled').onChange(() => {
                this.transformControls.visible = this.transformControls.enabled
            })
        }
    }

    setShootingBall() {
        window.addEventListener('keydown', (_event) => {
            if (_event.key === 'b') {
                const angle = Math.random() * Math.PI * 2
                const distance = 10
                const x = this.position.x + Math.cos(angle) * distance
                const y = this.position.y + Math.sin(angle) * distance
                const z = 2 + 2 * Math.random()
                const bowlingBall = this.objects.add({
                    base: this.resources.items.bowlingBallBase.scene,
                    collision: this.resources.items.bowlingBallCollision.scene,
                    offset: new THREE.Vector3(x, y, z),
                    rotation: new THREE.Euler(Math.PI * 0.5, 0, 0),
                    duplicated: true,
                    shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.15, alpha: 0.35},
                    mass: 5,
                    soundName: 'bowlingBall',
                    sleep: false
                })

                const carPosition = new CANNON.Vec3(this.position.x, this.position.y, this.position.z + 1)
                let direction = carPosition.vsub(bowlingBall.collision.body.position)
                direction.normalize()
                direction = direction.scale(100)
                bowlingBall.collision.body.applyImpulse(direction, bowlingBall.collision.body.position)
            }
        })
    }

    setKlaxon() {
        this.klaxon = {}
        this.klaxon.waitDuration = 150
        this.klaxon.can = true

        window.addEventListener('keydown', (_event) => {
            // Play horn sound
            if (_event.key === 'h' && this.klaxon.can) {
                this.klaxon.can = false
                window.setTimeout(() => {
                    this.klaxon.can = true
                }, this.klaxon.waitDuration)

                this.physics.car.jump(false, 20)
                this.sounds.play(Math.random() < 0.002 ? 'carHorn2' : 'carHorn1')
            }

            // Rain horns
            if (_event.key === 'k') {
                const x = this.position.x + (Math.random() - 0.5) * 3
                const y = this.position.y + (Math.random() - 0.5) * 3
                const z = 6 + 2 * Math.random()

                this.objects.add({
                    base: this.resources.items.hornBase.scene,
                    collision: this.resources.items.hornCollision.scene,
                    offset: new THREE.Vector3(x, y, z),
                    rotation: new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2),
                    duplicated: true,
                    shadow: {sizeX: 1.5, sizeY: 1.5, offsetZ: -0.15, alpha: 0.35},
                    mass: 5,
                    soundName: 'horn',
                    sleep: false
                })
            }
        })
    }
}
