import mobileDoubleTriangle from '../../images/mobile/doubleTriangle.png'
import mobileTriangle from '../../images/mobile/triangle.png'
import mobileCross from '../../images/mobile/cross.png'
import mobileBowlingBall from '../../images/mobile/bowlingball.png'
import mobileKlaxon from '../../images/mobile/klaxon.png'
import EventEmitter from '../Utils/EventEmitter'

export default class Controls extends EventEmitter {
    constructor(_options) {
        super()

        this.config = _options.config
        this.sizes = _options.sizes
        this.time = _options.time
        this.camera = _options.camera
        this.sounds = _options.sounds

        this.setActions()
        this.setKeyboard()
    }

    setCar(car) {
        this.car = car
    }

    setActions() {
        this.actions = {}
        this.actions.up = false
        this.actions.right = false
        this.actions.down = false
        this.actions.left = false
        this.actions.brake = false
        this.actions.boost = false

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.actions.up = false
                this.actions.right = false
                this.actions.down = false
                this.actions.left = false
                this.actions.brake = false
                this.actions.boost = false
            }
        })
    }

    setKeyboard() {
        this.keyboard = {}
        this.keyboard.events = {}

        this.keyboard.events.keyDown = (_event) => {
            switch (_event.key) {
                case 'ArrowUp':
                case 'z':
                case 'w':
                    this.camera.pan.reset()
                    this.actions.up = true
                    break

                case 'ArrowRight':
                case 'd':
                    this.actions.right = true
                    break

                case 'ArrowDown':
                case 's':
                    this.camera.pan.reset()
                    this.actions.down = true
                    break

                case 'ArrowLeft':
                case 'q':
                case 'a':
                    this.actions.left = true
                    break

                case 'Control':
                case ' ':
                    this.actions.brake = true
                    break

                case 'Shift':
                    this.actions.boost = true
                    break

                case 'k':
                    this.car.shootBall()
                    break

                case 'h':
                    this.car.shootKlaxon()
                    break

                // case ' ':
                //     this.jump(true)
                //     break
            }
        }

        this.keyboard.events.keyUp = (_event) => {
            switch (_event.key) {
                case 'ArrowUp':
                case 'z':
                case 'w':
                    this.actions.up = false
                    break

                case 'ArrowRight':
                case 'd':
                    this.actions.right = false
                    break

                case 'ArrowDown':
                case 's':
                    this.actions.down = false
                    break

                case 'ArrowLeft':
                case 'q':
                case 'a':
                    this.actions.left = false
                    break

                case 'Control':
                case ' ':
                    this.actions.brake = false
                    break

                case 'Shift':
                    this.actions.boost = false
                    break

                case 'r':
                    this.trigger('action', ['reset'])
                    break
            }
        }

        document.addEventListener('keydown', this.keyboard.events.keyDown)
        document.addEventListener('keyup', this.keyboard.events.keyUp)
    }

    setTouch() {
        this.touch = {}

        /**
         * Joystick
         */
        this.touch.joystick = {}
        this.touch.joystick.active = false

        // Element
        this.touch.joystick.$element = document.createElement('div')
        this.touch.joystick.$element.style.userSelect = 'none'
        this.touch.joystick.$element.style.position = 'fixed'
        this.touch.joystick.$element.style.bottom = '10px'
        this.touch.joystick.$element.style.left = '10px'
        this.touch.joystick.$element.style.width = '170px'
        this.touch.joystick.$element.style.height = '170px'
        this.touch.joystick.$element.style.borderRadius = '50%'
        this.touch.joystick.$element.style.transition = 'opacity 0.3s 0.0s'
        this.touch.joystick.$element.style.willChange = 'opacity'
        this.touch.joystick.$element.style.opacity = '0'
        // this.touch.joystick.$element.style.backgroundColor = '#ff0000'
        document.body.appendChild(this.touch.joystick.$element)

        this.touch.joystick.$cursor = document.createElement('div')
        this.touch.joystick.$cursor.style.position = 'absolute'
        this.touch.joystick.$cursor.style.top = 'calc(50% - 30px)'
        this.touch.joystick.$cursor.style.left = 'calc(50% - 30px)'
        this.touch.joystick.$cursor.style.width = '60px'
        this.touch.joystick.$cursor.style.height = '60px'
        this.touch.joystick.$cursor.style.border = '2px solid #ffffff'
        this.touch.joystick.$cursor.style.borderRadius = '50%'
        this.touch.joystick.$cursor.style.boxSizing = 'border-box'
        this.touch.joystick.$cursor.style.pointerEvents = 'none'
        this.touch.joystick.$cursor.style.willChange = 'transform'
        this.touch.joystick.$element.appendChild(this.touch.joystick.$cursor)

        this.touch.joystick.$limit = document.createElement('div')
        this.touch.joystick.$limit.style.position = 'absolute'
        this.touch.joystick.$limit.style.top = 'calc(50% - 75px)'
        this.touch.joystick.$limit.style.left = 'calc(50% - 75px)'
        this.touch.joystick.$limit.style.width = '150px'
        this.touch.joystick.$limit.style.height = '150px'
        this.touch.joystick.$limit.style.border = '2px solid #ffffff'
        this.touch.joystick.$limit.style.borderRadius = '50%'
        this.touch.joystick.$limit.style.opacity = '0.25'
        this.touch.joystick.$limit.style.pointerEvents = 'none'
        this.touch.joystick.$limit.style.boxSizing = 'border-box'
        this.touch.joystick.$element.appendChild(this.touch.joystick.$limit)

        // Angle
        this.touch.joystick.angle = {}

        this.touch.joystick.angle.offset = Math.PI * 0.18

        this.touch.joystick.angle.center = {}
        this.touch.joystick.angle.center.x = 0
        this.touch.joystick.angle.center.y = 0

        this.touch.joystick.angle.current = {}
        this.touch.joystick.angle.current.x = 0
        this.touch.joystick.angle.current.y = 0

        this.touch.joystick.angle.originalValue = 0
        this.touch.joystick.angle.value = -Math.PI * 0.5

        // Resize
        this.touch.joystick.resize = () => {
            const boundings = this.touch.joystick.$element.getBoundingClientRect()

            this.touch.joystick.angle.center.x = boundings.left + boundings.width * 0.5
            this.touch.joystick.angle.center.y = boundings.top + boundings.height * 0.5
        }

        this.sizes.on('resize', this.touch.joystick.resize)
        this.touch.joystick.resize()

        // Time tick
        this.time.on('tick', () => {
            // Joystick active
            if (this.touch.joystick.active) {
                // Calculate joystick angle
                this.touch.joystick.angle.originalValue = -Math.atan2(
                    this.touch.joystick.angle.current.y - this.touch.joystick.angle.center.y,
                    this.touch.joystick.angle.current.x - this.touch.joystick.angle.center.x
                )
                this.touch.joystick.angle.value = this.touch.joystick.angle.originalValue + this.touch.joystick.angle.offset

                // Update joystick
                const distance = Math.hypot(this.touch.joystick.angle.current.y - this.touch.joystick.angle.center.y, this.touch.joystick.angle.current.x - this.touch.joystick.angle.center.x)
                let radius = distance
                if (radius > 20) {
                    radius = 20 + Math.log(distance - 20) * 5
                }
                if (radius > 43) {
                    radius = 43
                }
                const cursorX = Math.sin(this.touch.joystick.angle.originalValue + Math.PI * 0.5) * radius
                const cursorY = Math.cos(this.touch.joystick.angle.originalValue + Math.PI * 0.5) * radius
                this.touch.joystick.$cursor.style.transform = `translateX(${cursorX}px) translateY(${cursorY}px)`
            }
        })

        // Events
        this.touch.joystick.events = {}
        this.touch.joystick.touchIdentifier = null
        this.touch.joystick.events.touchstart = (_event) => {
            _event.preventDefault()

            const touch = _event.changedTouches[0]

            if (touch) {
                this.touch.joystick.active = true

                this.touch.joystick.touchIdentifier = touch.identifier

                this.touch.joystick.angle.current.x = touch.clientX
                this.touch.joystick.angle.current.y = touch.clientY

                this.touch.joystick.$limit.style.opacity = '0.5'

                document.addEventListener('touchend', this.touch.joystick.events.touchend)
                document.addEventListener('touchmove', this.touch.joystick.events.touchmove, {passive: false})

                this.trigger('joystickStart')
            }
        }

        this.touch.joystick.events.touchmove = (_event) => {
            _event.preventDefault()

            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.joystick.touchIdentifier)

            if (touch) {
                this.touch.joystick.angle.current.x = touch.clientX
                this.touch.joystick.angle.current.y = touch.clientY

                this.trigger('joystickMove')
            }
        }

        this.touch.joystick.events.touchend = (_event) => {
            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.joystick.touchIdentifier)

            if (touch) {
                this.touch.joystick.active = false

                this.touch.joystick.$limit.style.opacity = '0.25'

                this.touch.joystick.$cursor.style.transform = 'translateX(0px) translateY(0px)'

                document.removeEventListener('touchend', this.touch.joystick.events.touchend)

                this.trigger('joystickEnd')
            }
        }

        this.touch.joystick.$element.addEventListener('touchstart', this.touch.joystick.events.touchstart, {passive: false})

        /**
         * Boost
         */
        this.touch.boost = {}

        // Element
        this.touch.boost.$element = document.createElement('div')
        this.touch.boost.$element.style.userSelect = 'none'
        this.touch.boost.$element.style.position = 'fixed'
        this.touch.boost.$element.style.bottom = 'calc(70px * 3 + 15px)'
        this.touch.boost.$element.style.right = '0px'
        this.touch.boost.$element.style.width = '95px'
        this.touch.boost.$element.style.height = '70px'
        this.touch.boost.$element.style.transition = 'opacity 0.3s 0.4s'
        this.touch.boost.$element.style.willChange = 'opacity'
        this.touch.boost.$element.style.opacity = '0'
        // this.touch.boost.$element.style.backgroundColor = '#00ff00'
        document.body.appendChild(this.touch.boost.$element)

        this.touch.boost.$border = document.createElement('div')
        this.touch.boost.$border.style.position = 'absolute'
        this.touch.boost.$border.style.top = 'calc(50% - 30px)'
        this.touch.boost.$border.style.left = 'calc(50% - 30px)'
        this.touch.boost.$border.style.width = '60px'
        this.touch.boost.$border.style.height = '60px'
        this.touch.boost.$border.style.border = '2px solid #ffffff'
        this.touch.boost.$border.style.borderRadius = '10px'
        this.touch.boost.$border.style.boxSizing = 'border-box'
        this.touch.boost.$border.style.opacity = '0.25'
        this.touch.boost.$border.style.willChange = 'opacity'
        this.touch.boost.$element.appendChild(this.touch.boost.$border)

        this.touch.boost.$icon = document.createElement('div')
        this.touch.boost.$icon.style.position = 'absolute'
        this.touch.boost.$icon.style.top = 'calc(50% - 13px)'
        this.touch.boost.$icon.style.left = 'calc(50% - 11px)'
        this.touch.boost.$icon.style.width = '22px'
        this.touch.boost.$icon.style.height = '26px'
        this.touch.boost.$icon.style.backgroundImage = `url(${mobileDoubleTriangle})`
        this.touch.boost.$icon.style.backgroundSize = 'cover'
        this.touch.boost.$element.appendChild(this.touch.boost.$icon)

        // Events
        this.touch.boost.events = {}
        this.touch.boost.touchIdentifier = null
        this.touch.boost.events.touchstart = (_event) => {
            _event.preventDefault()

            const touch = _event.changedTouches[0]

            if (touch) {
                this.camera.pan.reset()

                this.touch.boost.touchIdentifier = touch.identifier

                this.actions.up = true
                this.actions.boost = true

                this.touch.boost.$border.style.opacity = '0.5'

                document.addEventListener('touchend', this.touch.boost.events.touchend)
            }
        }

        this.touch.boost.events.touchend = (_event) => {
            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.boost.touchIdentifier)

            if (touch) {
                this.actions.up = false
                this.actions.boost = false

                this.touch.boost.$border.style.opacity = '0.25'

                document.removeEventListener('touchend', this.touch.boost.events.touchend)
            }
        }

        this.touch.boost.$element.addEventListener('touchstart', this.touch.boost.events.touchstart)

        /**
         * Forward
         */
        this.touch.forward = {}

        // Element
        this.touch.forward.$element = document.createElement('div')
        this.touch.forward.$element.style.userSelect = 'none'
        this.touch.forward.$element.style.position = 'fixed'
        this.touch.forward.$element.style.bottom = 'calc(70px * 2 + 15px)'
        this.touch.forward.$element.style.right = '0px'
        this.touch.forward.$element.style.width = '95px'
        this.touch.forward.$element.style.height = '70px'
        this.touch.forward.$element.style.transition = 'opacity 0.3s 0.3s'
        this.touch.forward.$element.style.willChange = 'opacity'
        this.touch.forward.$element.style.opacity = '0'
        // this.touch.forward.$element.style.backgroundColor = '#00ff00'
        document.body.appendChild(this.touch.forward.$element)

        this.touch.forward.$border = document.createElement('div')
        this.touch.forward.$border.style.position = 'absolute'
        this.touch.forward.$border.style.top = 'calc(50% - 30px)'
        this.touch.forward.$border.style.left = 'calc(50% - 30px)'
        this.touch.forward.$border.style.width = '60px'
        this.touch.forward.$border.style.height = '60px'
        this.touch.forward.$border.style.border = '2px solid #ffffff'
        this.touch.forward.$border.style.borderRadius = '10px'
        this.touch.forward.$border.style.boxSizing = 'border-box'
        this.touch.forward.$border.style.opacity = '0.25'
        this.touch.forward.$border.style.willChange = 'opacity'
        this.touch.forward.$element.appendChild(this.touch.forward.$border)

        this.touch.forward.$icon = document.createElement('div')
        this.touch.forward.$icon.style.position = 'absolute'
        this.touch.forward.$icon.style.top = 'calc(50% - 9px)'
        this.touch.forward.$icon.style.left = 'calc(50% - 11px)'
        this.touch.forward.$icon.style.width = '22px'
        this.touch.forward.$icon.style.height = '18px'
        this.touch.forward.$icon.style.backgroundImage = `url(${mobileTriangle})`
        this.touch.forward.$icon.style.backgroundSize = 'cover'
        this.touch.forward.$element.appendChild(this.touch.forward.$icon)

        // Events
        this.touch.forward.events = {}
        this.touch.forward.touchIdentifier = null
        this.touch.forward.events.touchstart = (_event) => {
            _event.preventDefault()

            const touch = _event.changedTouches[0]

            if (touch) {
                this.camera.pan.reset()

                this.touch.forward.touchIdentifier = touch.identifier

                this.actions.up = true

                this.touch.forward.$border.style.opacity = '0.5'

                document.addEventListener('touchend', this.touch.forward.events.touchend)
            }
        }

        this.touch.forward.events.touchend = (_event) => {
            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.forward.touchIdentifier)

            if (touch) {
                this.actions.up = false

                this.touch.forward.$border.style.opacity = '0.25'

                document.removeEventListener('touchend', this.touch.forward.events.touchend)
            }
        }

        this.touch.forward.$element.addEventListener('touchstart', this.touch.forward.events.touchstart)

        /**
         * Brake
         */
        this.touch.brake = {}

        // Element
        this.touch.brake.$element = document.createElement('div')
        this.touch.brake.$element.style.userSelect = 'none'
        this.touch.brake.$element.style.position = 'fixed'
        this.touch.brake.$element.style.bottom = 'calc(70px + 15px)'
        this.touch.brake.$element.style.right = '0px'
        this.touch.brake.$element.style.width = '95px'
        this.touch.brake.$element.style.height = '70px'
        this.touch.brake.$element.style.transition = 'opacity 0.3s 0.2s'
        this.touch.brake.$element.style.willChange = 'opacity'
        this.touch.brake.$element.style.opacity = '0'
        // this.touch.brake.$element.style.backgroundColor = '#ff0000'
        document.body.appendChild(this.touch.brake.$element)

        this.touch.brake.$border = document.createElement('div')
        this.touch.brake.$border.style.position = 'absolute'
        this.touch.brake.$border.style.top = 'calc(50% - 30px)'
        this.touch.brake.$border.style.left = 'calc(50% - 30px)'
        this.touch.brake.$border.style.width = '60px'
        this.touch.brake.$border.style.height = '60px'
        this.touch.brake.$border.style.border = '2px solid #ffffff'
        this.touch.brake.$border.style.borderRadius = '10px'
        this.touch.brake.$border.style.boxSizing = 'border-box'
        this.touch.brake.$border.style.opacity = '0.25'
        this.touch.brake.$border.style.willChange = 'opacity'
        this.touch.brake.$element.appendChild(this.touch.brake.$border)

        this.touch.brake.$icon = document.createElement('div')
        this.touch.brake.$icon.style.position = 'absolute'
        this.touch.brake.$icon.style.top = 'calc(50% - 7px)'
        this.touch.brake.$icon.style.left = 'calc(50% - 7px)'
        this.touch.brake.$icon.style.width = '15px'
        this.touch.brake.$icon.style.height = '15px'
        this.touch.brake.$icon.style.backgroundImage = `url(${mobileCross})`
        this.touch.brake.$icon.style.backgroundSize = 'cover'
        this.touch.brake.$icon.style.transform = 'rotate(180deg)'
        this.touch.brake.$element.appendChild(this.touch.brake.$icon)

        // Events
        this.touch.brake.events = {}
        this.touch.brake.touchIdentifier = null
        this.touch.brake.events.touchstart = (_event) => {
            _event.preventDefault()

            const touch = _event.changedTouches[0]

            if (touch) {
                this.touch.brake.touchIdentifier = touch.identifier

                this.actions.brake = true

                this.touch.brake.$border.style.opacity = '0.5'

                document.addEventListener('touchend', this.touch.brake.events.touchend)
            }
        }

        this.touch.brake.events.touchend = (_event) => {
            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.brake.touchIdentifier)

            if (touch) {
                this.actions.brake = false

                this.touch.brake.$border.style.opacity = '0.25'

                document.removeEventListener('touchend', this.touch.brake.events.touchend)
            }
        }

        this.touch.brake.$element.addEventListener('touchstart', this.touch.brake.events.touchstart)

        /**
         * Backward
         */
        this.touch.backward = {}

        // Element
        this.touch.backward.$element = document.createElement('div')
        this.touch.backward.$element.style.userSelect = 'none'
        this.touch.backward.$element.style.position = 'fixed'
        this.touch.backward.$element.style.bottom = '15px'
        this.touch.backward.$element.style.right = '0px'
        this.touch.backward.$element.style.width = '95px'
        this.touch.backward.$element.style.height = '70px'
        this.touch.backward.$element.style.transition = 'opacity 0.3s 0.1s'
        this.touch.backward.$element.style.willChange = 'opacity'
        this.touch.backward.$element.style.opacity = '0'
        // this.touch.backward.$element.style.backgroundColor = '#0000ff'
        document.body.appendChild(this.touch.backward.$element)

        this.touch.backward.$border = document.createElement('div')
        this.touch.backward.$border.style.position = 'absolute'
        this.touch.backward.$border.style.top = 'calc(50% - 30px)'
        this.touch.backward.$border.style.left = 'calc(50% - 30px)'
        this.touch.backward.$border.style.width = '60px'
        this.touch.backward.$border.style.height = '60px'
        this.touch.backward.$border.style.border = '2px solid #ffffff'
        this.touch.backward.$border.style.borderRadius = '10px'
        this.touch.backward.$border.style.boxSizing = 'border-box'
        this.touch.backward.$border.style.opacity = '0.25'
        this.touch.backward.$border.style.willChange = 'opacity'
        this.touch.backward.$element.appendChild(this.touch.backward.$border)

        this.touch.backward.$icon = document.createElement('div')
        this.touch.backward.$icon.style.position = 'absolute'
        this.touch.backward.$icon.style.top = 'calc(50% - 9px)'
        this.touch.backward.$icon.style.left = 'calc(50% - 11px)'
        this.touch.backward.$icon.style.width = '22px'
        this.touch.backward.$icon.style.height = '18px'
        this.touch.backward.$icon.style.backgroundImage = `url(${mobileTriangle})`
        this.touch.backward.$icon.style.backgroundSize = 'cover'
        this.touch.backward.$icon.style.transform = 'rotate(180deg)'
        this.touch.backward.$element.appendChild(this.touch.backward.$icon)

        // Events
        this.touch.backward.events = {}
        this.touch.backward.touchIdentifier = null
        this.touch.backward.events.touchstart = (_event) => {
            _event.preventDefault()

            const touch = _event.changedTouches[0]

            if (touch) {
                this.camera.pan.reset()

                this.touch.backward.touchIdentifier = touch.identifier

                this.actions.down = true

                this.touch.backward.$border.style.opacity = '0.5'

                document.addEventListener('touchend', this.touch.backward.events.touchend)
            }
        }

        this.touch.backward.events.touchend = (_event) => {
            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.backward.touchIdentifier)

            if (touch) {
                this.actions.down = false

                this.touch.backward.$border.style.opacity = '0.25'

                document.removeEventListener('touchend', this.touch.backward.events.touchend)
            }
        }

        this.touch.backward.$element.addEventListener('touchstart', this.touch.backward.events.touchstart)

        /**
         * Bowling ball
         */
        this.touch.bowlingball = {}

        // Element
        this.touch.bowlingball.$element = document.createElement('div')
        this.touch.bowlingball.$element.style.userSelect = 'none'
        this.touch.bowlingball.$element.style.position = 'fixed'
        this.touch.bowlingball.$element.style.top = 'calc(70px * 0 + 15px)'
        this.touch.bowlingball.$element.style.left = '0px'
        this.touch.bowlingball.$element.style.width = '95px'
        this.touch.bowlingball.$element.style.height = '70px'
        this.touch.bowlingball.$element.style.transition = 'opacity 0.3s 0.2s'
        this.touch.bowlingball.$element.style.willChange = 'opacity'
        this.touch.bowlingball.$element.style.opacity = '0'
        // this.touch.bowlingball.$element.style.backgroundColor = '#ff0000'
        document.body.appendChild(this.touch.bowlingball.$element)

        this.touch.bowlingball.$border = document.createElement('div')
        this.touch.bowlingball.$border.style.position = 'absolute'
        this.touch.bowlingball.$border.style.top = 'calc(50% - 30px)'
        this.touch.bowlingball.$border.style.left = 'calc(50% - 30px)'
        this.touch.bowlingball.$border.style.width = '60px'
        this.touch.bowlingball.$border.style.height = '60px'
        this.touch.bowlingball.$border.style.border = '2px solid #ffffff'
        this.touch.bowlingball.$border.style.borderRadius = '10px'
        this.touch.bowlingball.$border.style.boxSizing = 'border-box'
        this.touch.bowlingball.$border.style.opacity = '0.25'
        this.touch.bowlingball.$border.style.willChange = 'opacity'
        this.touch.bowlingball.$element.appendChild(this.touch.bowlingball.$border)

        this.touch.bowlingball.$icon = document.createElement('div')
        this.touch.bowlingball.$icon.style.position = 'absolute'
        this.touch.bowlingball.$icon.style.top = 'calc(50% - 7px)'
        this.touch.bowlingball.$icon.style.left = 'calc(50% - 7px)'
        this.touch.bowlingball.$icon.style.width = '15px'
        this.touch.bowlingball.$icon.style.height = '15px'
        this.touch.bowlingball.$icon.style.backgroundImage = `url(${mobileBowlingBall})`
        this.touch.bowlingball.$icon.style.backgroundSize = 'cover'
        this.touch.bowlingball.$icon.style.transform = 'rotate(180deg)'
        this.touch.bowlingball.$element.appendChild(this.touch.bowlingball.$icon)

        // Events
        this.touch.bowlingball.events = {}
        this.touch.bowlingball.touchIdentifier = null
        this.touch.bowlingball.events.touchstart = (_event) => {
            _event.preventDefault()

            const touch = _event.changedTouches[0]

            if (touch) {
                this.touch.bowlingball.touchIdentifier = touch.identifier

                this.car.shootBall()

                this.touch.bowlingball.$border.style.opacity = '0.5'

                document.addEventListener('touchend', this.touch.bowlingball.events.touchend)
            }
        }

        this.touch.bowlingball.events.touchend = (_event) => {
            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.bowlingball.touchIdentifier)

            if (touch) {
                this.touch.bowlingball.$border.style.opacity = '0.25'

                document.removeEventListener('touchend', this.touch.bowlingball.events.touchend)
            }
        }

        this.touch.bowlingball.$element.addEventListener('touchstart', this.touch.bowlingball.events.touchstart)

        /**
         * Klaxon
         */
        this.touch.klaxon = {}

        // Element
        this.touch.klaxon.$element = document.createElement('div')
        this.touch.klaxon.$element.style.userSelect = 'none'
        this.touch.klaxon.$element.style.position = 'fixed'
        this.touch.klaxon.$element.style.top = 'calc(70px * 1 + 15px)'
        this.touch.klaxon.$element.style.left = '0px'
        this.touch.klaxon.$element.style.width = '95px'
        this.touch.klaxon.$element.style.height = '70px'
        this.touch.klaxon.$element.style.transition = 'opacity 0.3s 0.2s'
        this.touch.klaxon.$element.style.willChange = 'opacity'
        this.touch.klaxon.$element.style.opacity = '0'
        // this.touch.klaxon.$element.style.backgroundColor = '#ff0000'
        document.body.appendChild(this.touch.klaxon.$element)

        this.touch.klaxon.$border = document.createElement('div')
        this.touch.klaxon.$border.style.position = 'absolute'
        this.touch.klaxon.$border.style.top = 'calc(50% - 30px)'
        this.touch.klaxon.$border.style.left = 'calc(50% - 30px)'
        this.touch.klaxon.$border.style.width = '60px'
        this.touch.klaxon.$border.style.height = '60px'
        this.touch.klaxon.$border.style.border = '2px solid #ffffff'
        this.touch.klaxon.$border.style.borderRadius = '10px'
        this.touch.klaxon.$border.style.boxSizing = 'border-box'
        this.touch.klaxon.$border.style.opacity = '0.25'
        this.touch.klaxon.$border.style.willChange = 'opacity'
        this.touch.klaxon.$element.appendChild(this.touch.klaxon.$border)

        this.touch.klaxon.$icon = document.createElement('div')
        this.touch.klaxon.$icon.style.position = 'absolute'
        this.touch.klaxon.$icon.style.top = 'calc(50% - 7px)'
        this.touch.klaxon.$icon.style.left = 'calc(50% - 7px)'
        this.touch.klaxon.$icon.style.width = '15px'
        this.touch.klaxon.$icon.style.height = '15px'
        this.touch.klaxon.$icon.style.backgroundImage = `url(${mobileKlaxon})`
        this.touch.klaxon.$icon.style.backgroundSize = 'cover'
        this.touch.klaxon.$icon.style.transform = 'rotate(180deg)'
        this.touch.klaxon.$element.appendChild(this.touch.klaxon.$icon)

        // Events
        this.touch.klaxon.events = {}
        this.touch.klaxon.touchIdentifier = null
        this.touch.klaxon.events.touchstart = (_event) => {
            _event.preventDefault()

            const touch = _event.changedTouches[0]

            if (touch) {
                this.touch.klaxon.touchIdentifier = touch.identifier

                this.car.shootKlaxon()

                this.touch.klaxon.$border.style.opacity = '0.5'

                document.addEventListener('touchend', this.touch.klaxon.events.touchend)
            }
        }

        this.touch.klaxon.events.touchend = (_event) => {
            const touches = [..._event.changedTouches]
            const touch = touches.find((_touch) => _touch.identifier === this.touch.klaxon.touchIdentifier)

            if (touch) {
                this.touch.klaxon.$border.style.opacity = '0.25'

                document.removeEventListener('touchend', this.touch.klaxon.events.touchend)
            }
        }

        this.touch.klaxon.$element.addEventListener('touchstart', this.touch.klaxon.events.touchstart)

        /**
         * Reveal all
         */
        this.touch.reveal = () => {
            this.touch.joystick.$element.style.opacity = 1
            this.touch.backward.$element.style.opacity = 1
            this.touch.brake.$element.style.opacity = 1
            this.touch.forward.$element.style.opacity = 1
            this.touch.boost.$element.style.opacity = 1
            this.touch.bowlingball.$element.style.opacity = 1
            this.touch.klaxon.$element.style.opacity = 1
        }
    }
}
