import * as THREE from 'three'
import Materials from './Materials.js'
import Floor from './Floor.js'
import Shadows from './Shadows.js'
import Physics from './Physics.js'
import Zones from './Zones.js'
import Objects from './Objects.js'
import Car from './Car.js'
import Areas from './Areas.js'
import Tiles from './Tiles.js'
import Walls from './Walls.js'
import IntroSection from './Sections/IntroSection.js'
import PlaygroundSection from './Sections/PlaygroundSection.js'
import Controls from './Controls.js'
import Sounds from './Sounds.js'
import {TweenLite} from 'gsap/TweenLite'
import {Power2} from 'gsap/EasePack'
import Ger from "./Ger";
import Alphabet from "./Alphabet";

export default class {
    constructor(_options) {
        // Options
        this.config = _options.config
        this.debug = _options.debug
        this.resources = _options.resources
        this.time = _options.time
        this.sizes = _options.sizes
        this.camera = _options.camera
        this.renderer = _options.renderer
        this.passes = _options.passes

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('world')
            this.debugFolder.open()
        }

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        // this.setAxes()
        this.setSounds()
        this.setControls()
        this.setFloor()
        this.setAreas()
        this.setStartingScreen()
    }

    start() {
        window.setTimeout(() => {
            this.camera.pan.enable()
        }, 2000)

        this.setReveal()
        this.setMaterials()
        this.setShadows()
        this.setPhysics()
        this.setZones()
        this.setObjects()
        this.setCar()
        this.areas.car = this.car
        this.setTiles()
        this.setWalls()
        this.setGer()
        this.setAlphabet()
        this.setSections()
    }

    setReveal() {
        this.reveal = {}
        this.reveal.matcapsProgress = 0
        this.reveal.floorShadowsProgress = 0
        this.reveal.previousMatcapsProgress = null
        this.reveal.previousFloorShadowsProgress = null

        // Go method
        this.reveal.go = () => {
            TweenLite.fromTo(this.reveal, 3, {matcapsProgress: 0}, {matcapsProgress: 1})
            TweenLite.fromTo(this.reveal, 3, {floorShadowsProgress: 0}, {floorShadowsProgress: 1, delay: 0.5})
            TweenLite.fromTo(this.shadows, 3, {alpha: 0}, {alpha: 0.5, delay: 0.5})

            if (this.sections.intro) {
                if (this.sections.intro.instructions) {
                    TweenLite.fromTo(this.sections.intro.instructions.arrows.label.material, 0.3, {opacity: 0}, {
                        opacity: 1,
                        delay: 0.5
                    })
                }
                if (this.sections.intro.otherInstructions) {
                    TweenLite.fromTo(this.sections.intro.otherInstructions.label.material, 0.3, {opacity: 0}, {
                        opacity: 1,
                        delay: 0.75
                    })
                }
            }

            // Car
            this.physics.car.chassis.body.sleep()
            this.physics.car.chassis.body.position.set(3, 0, 12)

            window.setTimeout(() => {
                this.physics.car.chassis.body.wakeUp()
            }, 300)

            // Sound
            TweenLite.fromTo(this.sounds.engine.volume, 0.5, {master: 0}, {
                master: 0.7,
                delay: 0.3,
                ease: Power2.easeIn
            })
            window.setTimeout(() => {
                this.sounds.play('reveal')
            }, 400)

            // Controls
            if (this.controls.touch) {
                window.setTimeout(() => {
                    this.controls.touch.reveal()
                }, 400)
            }
        }

        // Time tick
        this.time.on('tick', () => {
            // Matcap progress changed
            if (this.reveal.matcapsProgress !== this.reveal.previousMatcapsProgress) {
                // Update each material
                for (const _materialKey in this.materials.shades.items) {
                    const material = this.materials.shades.items[_materialKey]
                    material.uniforms.uRevealProgress.value = this.reveal.matcapsProgress
                }

                // Save
                this.reveal.previousMatcapsProgress = this.reveal.matcapsProgress
            }

            // Matcap progress changed
            if (this.reveal.floorShadowsProgress !== this.reveal.previousFloorShadowsProgress) {
                // Update each floor shadow
                for (const _mesh of this.objects.floorShadows) {
                    _mesh.material.uniforms.uAlpha.value = this.reveal.floorShadowsProgress
                }

                // Save
                this.reveal.previousFloorShadowsProgress = this.reveal.floorShadowsProgress
            }
        })

        // Debug
        if (this.debug) {
            this.debugFolder.add(this.reveal, 'matcapsProgress').step(0.0001).min(0).max(1).name('matcapsProgress')
            this.debugFolder.add(this.reveal, 'floorShadowsProgress').step(0.0001).min(0).max(1).name('floorShadowsProgress')
            this.debugFolder.add(this.reveal, 'go').name('reveal')
        }
    }

    setStartingScreen() {
        this.startingScreen = {}

        // Area
        this.startingScreen.language = {}
        const languages = [
            {
                code: 'sk',
                x: 1.5,
                y: 1,
                img: 'data:image/png;base64,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'
            },
            {
                code: 'mn',
                x: 2,
                y: 1,
                img: 'data:image/png;base64,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'
            },
            {
                code: 'ca',
                x: 2,
                y: 1,
                img: 'data:image/png;base64,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'
            },
        ]
        languages.forEach((_language, _index) => {
            this.startingScreen.language[_language.code] = {}

            // Loading label
            const label = {}
            this.startingScreen.language[_language.code].label = label
            label.geometry = new THREE.PlaneBufferGeometry(_language.x, _language.y)
            label.image = new Image()
            label.image.src = _language.img
            label.texture = new THREE.Texture(label.image)
            label.texture.magFilter = THREE.NearestFilter
            label.texture.minFilter = THREE.LinearFilter
            label.texture.needsUpdate = true
            label.material = new THREE.MeshBasicMaterial({
                transparent: true,
                depthWrite: false,
                color: 0xffffff,
                alphaMap: label.texture
            })
            label.mesh = new THREE.Mesh(label.geometry, label.material)
            label.mesh.position.y = (_index - 1) * 3.4
            label.mesh.matrixAutoUpdate = false
            label.mesh.updateMatrix()
            this.container.add(label.mesh)

            const area = this.areas.add({
                position: new THREE.Vector2(0, (_index - 1) * 3.4),
                halfExtents: new THREE.Vector2(1.5, 1.5),
                hasKey: false,
                testCar: false,
                active: true,
            });
            this.startingScreen.language[_language.code].area = area

            this.startingScreen.language[_language.code].area.on('interact', () => {
                Object.values(this.startingScreen.language).forEach(__language => {
                    __language.area.deactivate()
                    TweenLite.to(__language.area.floorBorder.material.uniforms.uProgress, 0.3, {value: 0, delay: 0.4})
                    TweenLite.to(__language.label.material, 0.3, {opacity: 0, delay: 0.4})
                })
                languageSelected(_language.code, area)
            })
        });

        // Loading label
        this.startingScreen.loadingLabel = {}
        this.startingScreen.loadingLabel.geometry = new THREE.PlaneBufferGeometry(2.5, 2.5 / 4)
        this.startingScreen.loadingLabel.image = new Image()
        this.startingScreen.loadingLabel.image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABABAMAAAAHc7SNAAAAMFBMVEUAAAD///9ra2ucnJzR0dH09PQmJiaNjY24uLjp6end3d1CQkLFxcVYWFiqqqp9fX3nQ5qrAAAEVUlEQVRo3u3YT08TQRQA8JEtW6CATGnDdvljaTwYE2IBI/HGRrwSetGTsZh4MPFQYiQe229gE++WePFY9Oqh1cRzieEDYIgXLxjPJu5M33vbZQszW+fgoS+B7ewO836znRl2lg1jGMP4P2Okw0yFvaKsklr3I99Tvl3iPPelGbQhKqxB4eN6N/7gVcsvbEAz1F4RLn67zzl/v6/oLvejGBQ9LsNphio4UFjmEAsVJuOK/zkDtc6w+gyTcZ3LyP6IAzjBDA+pj6LkEgAjW4kANsMAC6vmOvqAMU5RgVOTskQACicCmCcA9AXjkT5gj1MswqlxWcoTgKJ6HuAQAD5guNoAu8QpMnBul1ONMGD2PCBbRgDAKYq6AEtmXvtdj3S6GhRyW1t1DvkAgM0ggG7mu1t3xWFHFzAqv3wYCi0mY1UCGgiQPU+1oWIY8LoXcAA3qeYfr+kClvHW14PJ5OfCAgHYNAoDAORBQIrDvHjqH5c0ANTbORzBacbAQgUC2IAKAzI9gCSHlWEMLmgBPJxMvyARpIICALDm4nkAbwIA71EZx5UOgO48JnLoOhQIAN9sOgKoBoAE5r0aB8ARcNhtFzrg0VQmwCp8CAMeAADGc44S5GMBsF1aCEU2LcAcAPDCvwFytBDehCaUgJxRAKeF8BNUUQJ43iiAUlqwFKoBrTCAHjiagwEgU0YM5IYWYD4KoIgPwIXQwUbVgCXzgLpIBJNeDciWTQNskVsq1ADX/6kYBdCTjse5owbMiX+IpgGWOCPSuWpA2vN/TAMm5QTYg5IC4FdbMA0YF5Nb5s2rAaLyhzBgektGZWDArrgqi0U1QHxf38OABDwUDgTAjGfyPlTVgJT/67FBACbqyGYaaoBctQwD2vI4DecVAPkgZRhQlxPQks2rAePGAbZsRlaa1QBYEQBUHRCAmaXD0QDYxgFWdye05R9cDQCrmQYkeBA6gGXTgNEeQF4DMG4S4MLjOUZRA5A0CcjADgmjqgGwSwSg9wK1GIBS74KTgTxv/EHoiaVQsTOS5RoCJuiZyosB8EIrHpyowFiYofO0i4wCjhCQwL0hq2sCaFNM22S4JXloLk0AuLDTBzCBAAt3xykeA7CHe/mDbgdTvQ9GswSAwdbqA0giYASHjQUJnhQKhQ6z/d8rDA4hAG2Dsk042ejubHMM2nV6AMf93pCkaRjhh0WsWuz+6aasl2FwiAImReEts1/CSaFfwFouAJxC4RW+I4oCThBQE1X2WbKkBFDkqYDtJ0SHaYKq3pJJwCECjjiFPoC1w+2P0gumurgeBjT6AhIIGKOelGIAngWlFnRnMZjMIYBb7gtIIsAuYU+8GICpEhYyZVgIZ2g9rYYAX1lfAKvjnxzjnWrHALDn9K1h2k2aoI1ewGd2AWAVAVMHcKdW4wDYje739pNufJXhkJohgLu9zy4CHCKAJYUge4ddCojGyPrp9kaHmYjUi9N7+2wYwxjGZfEXMKxGE0GkkfIAAAAASUVORK5CYII='
        this.startingScreen.loadingLabel.texture = new THREE.Texture(this.startingScreen.loadingLabel.image)
        this.startingScreen.loadingLabel.texture.magFilter = THREE.NearestFilter
        this.startingScreen.loadingLabel.texture.minFilter = THREE.LinearFilter
        this.startingScreen.loadingLabel.texture.needsUpdate = true
        this.startingScreen.loadingLabel.material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            depthWrite: false,
            color: 0xffffff,
            alphaMap: this.startingScreen.loadingLabel.texture
        })
        this.startingScreen.loadingLabel.mesh = new THREE.Mesh(this.startingScreen.loadingLabel.geometry, this.startingScreen.loadingLabel.material)
        this.startingScreen.loadingLabel.mesh.matrixAutoUpdate = false
        this.container.add(this.startingScreen.loadingLabel.mesh)

        // Progress
        this.resources.on('progress', (_progress) => {
            // Update area
            if (this.startingScreen.selectedLanguage) {
                this.startingScreen.language[this.startingScreen.selectedLanguage].area.floorBorder.material.uniforms.uAlpha.value = 1
                this.startingScreen.language[this.startingScreen.selectedLanguage].area.floorBorder.material.uniforms.uLoadProgress.value = _progress
            }
        })

        // Ready
        let isReady = false
        this.resources.on('ready', () => {
            isReady = true
            if (this.startingScreen.selectedLanguage) {
                start(this.startingScreen.selectedLanguage)
            }
        })

        // On interact, reveal
        const languageSelected = (_language, _area) => {
            this.startingScreen.selectedLanguage = _language
            if (isReady) {
                start(_language)
            } else {
                window.requestAnimationFrame(() => {
                    // TweenLite.to(this.startingScreen.selectedLanguageArea.floorBorder.material.uniforms.uAlpha, 0.3, {value: 0.3})
                    TweenLite.to(this.startingScreen.loadingLabel.material, 0.3, {opacity: 1, delay: 0.4})
                })
            }
        }

        const start = (_language) => {
            this.config.language = _language.code

            window.requestAnimationFrame(() => {
                TweenLite.to(this.startingScreen.loadingLabel.material, 0.3, {opacity: 0, delay: 0.4})
                TweenLite.to(this.startingScreen.language[this.startingScreen.selectedLanguage].area.floorBorder.material.uniforms.uProgress, 0.3, {
                    value: 0,
                    delay: 0.4
                })
            })

            this.camera.angle.set('reading')

            this.start()

            window.setTimeout(() => {
                this.reveal.go()
            }, 600)
        }
    }

    setSounds() {
        this.sounds = new Sounds({
            debug: this.debugFolder,
            time: this.time
        })
    }

    setAxes() {
        this.axis = new THREE.AxesHelper()
        this.container.add(this.axis)
    }

    setControls() {
        this.controls = new Controls({
            config: this.config,
            sizes: this.sizes,
            time: this.time,
            camera: this.camera,
            sounds: this.sounds
        })
    }

    setMaterials() {
        this.materials = new Materials({
            resources: this.resources,
            debug: this.debugFolder
        })
    }

    setFloor() {
        this.floor = new Floor({
            debug: this.debugFolder
        })

        this.container.add(this.floor.container)
    }

    setShadows() {
        this.shadows = new Shadows({
            time: this.time,
            debug: this.debugFolder,
            renderer: this.renderer,
            camera: this.camera
        })
        this.container.add(this.shadows.container)
    }

    setPhysics() {
        this.physics = new Physics({
            config: this.config,
            debug: this.debug,
            time: this.time,
            sizes: this.sizes,
            controls: this.controls,
            sounds: this.sounds
        })

        this.container.add(this.physics.models.container)
    }

    setZones() {
        this.zones = new Zones({
            time: this.time,
            physics: this.physics,
            debug: this.debugFolder
        })
        this.container.add(this.zones.container)
    }

    setAreas() {
        this.areas = new Areas({
            config: this.config,
            resources: this.resources,
            debug: this.debug,
            renderer: this.renderer,
            camera: this.camera,
            car: this.car,
            sounds: this.sounds,
            time: this.time
        })

        this.container.add(this.areas.container)
    }

    setTiles() {
        this.tiles = new Tiles({
            resources: this.resources,
            objects: this.objects,
            debug: this.debug
        })
    }

    setWalls() {
        this.walls = new Walls({
            resources: this.resources,
            objects: this.objects
        })
    }

    setGer() {
        this.ger = new Ger({
            resources: this.resources,
            objects: this.objects,
            shadows: this.shadows,
        })
    }

    setAlphabet() {
        this.alphabet = new Alphabet({
            resources: this.resources,
            objects: this.objects,
        })
    }

    setObjects() {
        this.objects = new Objects({
            time: this.time,
            resources: this.resources,
            materials: this.materials,
            physics: this.physics,
            shadows: this.shadows,
            sounds: this.sounds,
            debug: this.debugFolder
        })
        this.container.add(this.objects.container)

        // window.requestAnimationFrame(() =>
        // {
        //     this.objects.merge.update()
        // })
    }

    setCar() {
        this.car = new Car({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            physics: this.physics,
            shadows: this.shadows,
            materials: this.materials,
            controls: this.controls,
            sounds: this.sounds,
            renderer: this.renderer,
            camera: this.camera,
            debug: this.debugFolder,
            config: this.config
        })
        this.container.add(this.car.container)
    }

    setSections() {
        this.sections = {}

        // Generic options
        const options = {
            config: this.config,
            time: this.time,
            resources: this.resources,
            camera: this.camera,
            passes: this.passes,
            objects: this.objects,
            areas: this.areas,
            zones: this.zones,
            walls: this.walls,
            tiles: this.tiles,
            ger: this.ger,
            alphabet: this.alphabet,
            debug: this.debugFolder
        }

        // Intro
        this.sections.intro = new IntroSection({
            ...options,
            x: 0,
            y: 0
        })
        this.container.add(this.sections.intro.container)

        // Playground
        this.sections.playground = new PlaygroundSection({
            ...options,
            x: 0,
            y: -15
            // x: - 15,
            // y: - 4
        })
        this.container.add(this.sections.playground.container)
    }
}
