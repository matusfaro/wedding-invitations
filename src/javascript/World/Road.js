import * as THREE from "three";

export default class Road {
    constructor(_options) {
        // Options
        this.resources = _options.resources
        this.objects = _options.objects
        this.shadows = _options.shadows

        this.items = []
    }

    createGerFloor(_options) {
        _options.type = 'gerFloorTexture'
        _options.color = 0xcec5a9
        _options.width = 4096
        _options.height = 4096
        return this.create(_options)
    }

    createRoad(_options) {
        _options.type = _options.type + 'RoadTexture'
        _options.color = 0xcec5a9

        _options.width = 720
        _options.height = 720
        if (_options.type.startsWith('straight')) {
            _options.height = 7200
        }

        return this.create(_options)
    }

    create(_options) {
        const item = {}

        item.texture = this.resources.items[_options.type]
        item.texture.magFilter = THREE.NearestFilter
        item.texture.minFilter = THREE.LinearFilter

        item.material = new THREE.MeshBasicMaterial({
            transparent: true,
            alphaMap: item.texture,
            color: _options.color,
            depthWrite: false,
            opacity: 0,
        })

        item.geometry = new THREE.PlaneGeometry(_options.width / 115, _options.height / 115)

        item.mesh = new THREE.Mesh(item.geometry, item.material)
        item.mesh.position.y = _options.offset.y || 0
        item.mesh.position.x = _options.offset.x || 0
        item.mesh.rotation.z = (_options.rotation || 0) / 180 * Math.PI
        item.mesh.matrixAutoUpdate = false
        item.mesh.updateMatrix()

        this.items.push(item)
        return item.mesh
    }

    addTree(_options) {
        this.objects.add({
            base: this.resources.items.tree.scene,
            collision: this.resources.items.treeCollision.scene,
            offset: new THREE.Vector3(_options.offset.x, _options.offset.y, 2),
            rotation: new THREE.Euler(0, 0, (_options.rotation || 0) / 180 * Math.PI),
            mass: 10,
            shadow: {sizeX: 1, sizeY: 1, alpha: 0.35},
            duplicated: true,
        })
    }
}
