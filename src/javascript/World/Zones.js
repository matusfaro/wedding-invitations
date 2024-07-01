import * as THREE from 'three'
import Zone from './Zone.js'

export default class Zones {
    constructor(_options) {
        // Options
        this.time = _options.time
        this.sizes = _options.sizes
        this.physics = _options.physics
        this.camera = _options.camera
        this.passes = _options.passes
        this.debug = _options.debug

        // Set up
        this.container = new THREE.Object3D()
        this.container.visible = false
        this.container.matrixAutoUpdate = false

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('zones')
            this.debugFolder.open()

            this.debugFolder.add(this.container, 'visible').name('visible')
        }

        this.setTester()
        this.setItems()
    }

    setTester() {
        this.tester = {}
        this.tester.x = 0
        this.tester.y = 0

        this.time.on('tick', () => {
            this.tester.x = this.physics.car.chassis.body.position.x
            this.tester.y = this.physics.car.chassis.body.position.y
        })
    }

    setItems() {
        this.items = []

        this.time.on('tick', () => {
            for (const _zone of this.items) {
                const isIn = this.tester.x < _zone.position.x + _zone.halfExtents.x && this.tester.x > _zone.position.x - _zone.halfExtents.x && this.tester.y < _zone.position.y + _zone.halfExtents.y && this.tester.y > _zone.position.y - _zone.halfExtents.y

                if (isIn && !_zone.isIn) {
                    _zone.trigger('in', [_zone.data])
                } else if (!isIn && _zone.isIn) {
                    _zone.trigger('out', [_zone.data])
                }

                _zone.isIn = isIn
            }
        })
    }

    addZone(_settings) {
        // Set up
        const zone = new Zone(_settings)
        this.container.add(zone.mesh)

        // Save
        this.items.push(zone)

        return zone
    }

    addCameraZone(_settings) {
        const zone = this.addZone({
            position: {
                x: _settings.x + (_settings.xLength / 2),
                y: _settings.y + (_settings.yLength / 2)
            },
            halfExtents: {
                x: _settings.xLength,
                y: _settings.yLength
            },
        })

        zone.on('in', () => {
            try {
                this.camera.angle.set(_settings.cameraAngle)
                TweenLite.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, 2, {x: 0})
                TweenLite.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, 2, {y: 0})
            } catch (e) {
                console.log("in error", e)
            }
        })

        zone.on('out', () => {
            try {
                this.camera.angle.set('driving')
                TweenLite.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, 2, {x: this.passes.horizontalBlurPass.strength})
                TweenLite.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, 2, {y: this.passes.verticalBlurPass.strength})
            } catch (e) {
                console.log("out error", e)
            }
        })

        return zone
    }
}
