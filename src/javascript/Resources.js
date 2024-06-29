import * as THREE from 'three'
import Loader from './Utils/Loader.js'
import EventEmitter from './Utils/EventEmitter.js'
import matcapBeigeSource from '../models/matcaps/beige.png'
import matcapBlackSource from '../models/matcaps/black.png'
import matcapOrangeSource from '../models/matcaps/orange.png'
import matcapRedSource from '../models/matcaps/red.png'
import matcapWhiteSource from '../models/matcaps/white.png'
import matcapGreenSource from '../models/matcaps/green.png'
import matcapBrownSource from '../models/matcaps/brown.png'
import matcapGraySource from '../models/matcaps/gray.png'
import gerFloorSource from '../models/ger/gerFloor.png'
import matcapEmeraldGreenSource from '../models/matcaps/emeraldGreen.png'
import matcapPurpleSource from '../models/matcaps/purple.png'
import matcapBlueSource from '../models/matcaps/blue.png'
import matcapYellowSource from '../models/matcaps/yellow.png'
import matcapMetalSource from '../models/matcaps/metal.png'
import matcapGoldSource from '../models/matcaps/gold.png'
import straight1RoadSource from '../models/road/straightLong1.png'
import straight2RoadSource from '../models/road/straightLong2.png'
import straight3RoadSource from '../models/road/straightLong3.png'
import carPriusChassisSource from '../models/car/prius/chassis.glb'
import carPriusBackLightsBrakeSource from '../models/car/prius/backLightsBrake.glb'
import carPriusBackLightsReverseSource from '../models/car/prius/backLightsReverse.glb'
import carPriusFrontLightsSource from '../models/car/prius/frontLights.glb'
import carDefaultWheelSource from '../models/car/default/wheel.glb'
import hornBaseSource from '../models/horn/base.glb'
import hornCollisionSource from '../models/horn/collision.glb'
import bowlingBallBaseSource from '../models/bowlingBall/base.glb'
import bowlingBallCollisionSource from '../models/bowlingBall/collision.glb'
import areaKeyEnterSource from '../models/area/keyEnter.png'
import areaEnterSource from '../models/area/enter.png'
import gerSource from '../models/ger/ger.glb'
import gerCollisionSource from '../models/ger/gerCollision.glb'
import fenceSource from '../models/ger/fence.glb'
import fenceCollisionSource from '../models/ger/fenceCollision.glb'
import bucketSource from '../models/ger/bucket.glb'
import bucketCollisionSource from '../models/ger/bucketCollision.glb'
import personNominSource from '../models/people/personNomin.glb'
import personNominCollisionSource from '../models/people/personNominCollision.glb'
import personMatusSource from '../models/people/personMatus.glb'
import personMatusCollisionSource from '../models/people/personMatusCollision.glb'
import horseSource from '../models/animals/horse.glb'
import horseCollisionSource from '../models/animals/horseCollision.glb'
import horseHolderSource from '../models/animals/horseHolder.glb'
import sheepSource from '../models/animals/sheep.glb'
import sheepCollisionSource from '../models/animals/sheepCollision.glb'
import chairSource from '../models/wedding/chair.glb'
import chairCollisionSource from '../models/wedding/chairCollision.glb'
import archSource from '../models/wedding/arch.glb'
import archCollisionSource from '../models/wedding/archCollision.glb'
import treeSource from '../models/wedding/tree.glb'
import treeCollisionSource from '../models/wedding/treeCollision.glb'
import collisionISource from '../models/alphabet/collisionI.glb'
import collisionHSource from '../models/alphabet/collisionH.glb'
import collisionDotSource from '../models/alphabet/collisionDot.glb'
import ASource from '../models/alphabet/A.glb'
import BSource from '../models/alphabet/B.glb'
import CSource from '../models/alphabet/C.glb'
import DSource from '../models/alphabet/D.glb'
import ESource from '../models/alphabet/E.glb'
import FSource from '../models/alphabet/F.glb'
import GSource from '../models/alphabet/G.glb'
import HSource from '../models/alphabet/H.glb'
import ISource from '../models/alphabet/I.glb'
import JSource from '../models/alphabet/J.glb'
import KSource from '../models/alphabet/K.glb'
import LSource from '../models/alphabet/L.glb'
import MSource from '../models/alphabet/M.glb'
import NSource from '../models/alphabet/N.glb'
import OSource from '../models/alphabet/O.glb'
import PSource from '../models/alphabet/P.glb'
import QSource from '../models/alphabet/Q.glb'
import RSource from '../models/alphabet/R.glb'
import SSource from '../models/alphabet/S.glb'
import TSource from '../models/alphabet/T.glb'
import USource from '../models/alphabet/U.glb'
import VSource from '../models/alphabet/V.glb'
import WSource from '../models/alphabet/W.glb'
import XSource from '../models/alphabet/X.glb'
import YSource from '../models/alphabet/Y.glb'
import ZSource from '../models/alphabet/Z.glb'
import АSource from '../models/alphabet/А.glb'
import БSource from '../models/alphabet/Б.glb'
import ВSource from '../models/alphabet/В.glb'
import ГSource from '../models/alphabet/Г.glb'
import ДSource from '../models/alphabet/Д.glb'
import ЕSource from '../models/alphabet/Е.glb'
import ЁSource from '../models/alphabet/Ё.glb'
import ЖSource from '../models/alphabet/Ж.glb'
import ЗSource from '../models/alphabet/З.glb'
import ИSource from '../models/alphabet/И.glb'
import ЙSource from '../models/alphabet/Й.glb'
import КSource from '../models/alphabet/К.glb'
import ЛSource from '../models/alphabet/Л.glb'
import МSource from '../models/alphabet/М.glb'
import НSource from '../models/alphabet/Н.glb'
import ОSource from '../models/alphabet/О.glb'
import ӨSource from '../models/alphabet/Ө.glb'
import ПSource from '../models/alphabet/П.glb'
import РSource from '../models/alphabet/Р.glb'
import СSource from '../models/alphabet/С.glb'
import ТSource from '../models/alphabet/Т.glb'
import УSource from '../models/alphabet/У.glb'
import ҮSource from '../models/alphabet/Ү.glb'
import ФSource from '../models/alphabet/Ф.glb'
import ХSource from '../models/alphabet/Х.glb'
import ЦSource from '../models/alphabet/Ц.glb'
import ЧSource from '../models/alphabet/Ч.glb'
import ШSource from '../models/alphabet/Ш.glb'
import ЩSource from '../models/alphabet/Щ.glb'
import ЪSource from '../models/alphabet/Ъ.glb'
import ЫSource from '../models/alphabet/Ы.glb'
import ЬSource from '../models/alphabet/Ь.glb'
import ЭSource from '../models/alphabet/Э.glb'
import ЮSource from '../models/alphabet/Ю.glb'
import ЯSource from '../models/alphabet/Я.glb'
import ÁSource from '../models/alphabet/AA.glb'
import ÄSource from '../models/alphabet/AE.glb'
import ČSource from '../models/alphabet/Č.glb'
import ĎSource from '../models/alphabet/Ď.glb'
import ÉSource from '../models/alphabet/EE.glb'
import ÍSource from '../models/alphabet/II.glb'
import ĹSource from '../models/alphabet/Ĺ.glb'
import ĽSource from '../models/alphabet/Ľ.glb'
import ŇSource from '../models/alphabet/Ň.glb'
import ÓSource from '../models/alphabet/OO.glb'
import ÔSource from '../models/alphabet/UO.glb'
import ŔSource from '../models/alphabet/Ŕ.glb'
import ŠSource from '../models/alphabet/Š.glb'
import ŤSource from '../models/alphabet/Ť.glb'
import ÚSource from '../models/alphabet/UU.glb'
import ÝSource from '../models/alphabet/YY.glb'
import ŽSource from '../models/alphabet/Ž.glb'
import num0Source from '../models/alphabet/0.glb'
import num1Source from '../models/alphabet/1.glb'
import num2Source from '../models/alphabet/2.glb'
import num3Source from '../models/alphabet/3.glb'
import num4Source from '../models/alphabet/4.glb'
import num5Source from '../models/alphabet/5.glb'
import num6Source from '../models/alphabet/6.glb'
import num7Source from '../models/alphabet/7.glb'
import num8Source from '../models/alphabet/8.glb'
import num9Source from '../models/alphabet/9.glb'
import dotSource from '../models/alphabet/dot.glb'
import commaSource from '../models/alphabet/comma.glb'
import exclamationSource from '../models/alphabet/exclamation.glb'
import questionSource from '../models/alphabet/question.glb'
import arrowLeftSource from '../models/alphabet/arrow.glb'
import arrowLeftCollisionSource from '../models/alphabet/arrowCollision.glb'

export default class Resources extends EventEmitter {
    constructor() {
        super()

        this.loader = new Loader()
        this.items = {}

        this.loader.load([
            // Matcaps
            {name: 'matcapBeige', source: matcapBeigeSource, type: 'texture'},
            {name: 'matcapBlack', source: matcapBlackSource, type: 'texture'},
            {name: 'matcapOrange', source: matcapOrangeSource, type: 'texture'},
            {name: 'matcapRed', source: matcapRedSource, type: 'texture'},
            {name: 'matcapWhite', source: matcapWhiteSource, type: 'texture'},
            {name: 'matcapGreen', source: matcapGreenSource, type: 'texture'},
            {name: 'matcapBrown', source: matcapBrownSource, type: 'texture'},
            {name: 'matcapGray', source: matcapGraySource, type: 'texture'},
            {name: 'matcapEmeraldGreen', source: matcapEmeraldGreenSource, type: 'texture'},
            {name: 'matcapPurple', source: matcapPurpleSource, type: 'texture'},
            {name: 'matcapBlue', source: matcapBlueSource, type: 'texture'},
            {name: 'matcapYellow', source: matcapYellowSource, type: 'texture'},
            {name: 'matcapMetal', source: matcapMetalSource, type: 'texture'},
            {name: 'matcapGold', source: matcapGoldSource, type: 'texture'},

            // Floors
            {name: 'gerFloor', source: gerFloorSource, type: 'texture'},

            // Roads
            {name: 'straight1Road', source: straight1RoadSource, type: 'texture'},
            {name: 'straight2Road', source: straight2RoadSource, type: 'texture'},
            {name: 'straight3Road', source: straight3RoadSource, type: 'texture'},

            // Car prius
            {name: 'carPriusChassis', source: carPriusChassisSource},
            {name: 'carPriusWheel', source: carDefaultWheelSource},
            {name: 'carPriusBackLightsBrake', source: carPriusBackLightsBrakeSource},
            {name: 'carPriusBackLightsReverse', source: carPriusBackLightsReverseSource},
            {name: 'carPriusFrontLights', source: carPriusFrontLightsSource},

            // Horn
            {name: 'hornBase', source: hornBaseSource},
            {name: 'hornCollision', source: hornCollisionSource},

            // Bownling ball
            {name: 'bowlingBallBase', source: bowlingBallBaseSource},
            {name: 'bowlingBallCollision', source: bowlingBallCollisionSource},

            // Floors
            {name: 'gerFloor', source: gerFloorSource, type: 'texture'},

            // Areas
            {name: 'areaKeyEnter', source: areaKeyEnterSource, type: 'texture'},
            {name: 'areaEnter', source: areaEnterSource, type: 'texture'},

            // Ger
            {name: 'ger', source: gerSource},
            {name: 'gerCollision', source: gerCollisionSource},
            {name: 'fence', source: fenceSource},
            {name: 'fenceCollision', source: fenceCollisionSource},
            {name: 'bucket', source: bucketSource},
            {name: 'bucketCollision', source: bucketCollisionSource},
            {name: 'personNomin', source: personNominSource},
            {name: 'personNominCollision', source: personNominCollisionSource},
            {name: 'personMatus', source: personMatusSource},
            {name: 'personMatusCollision', source: personMatusCollisionSource},

            // Animals
            {name: 'horse', source: horseSource},
            {name: 'horseCollision', source: horseCollisionSource},
            {name: 'horseHolder', source: horseHolderSource},
            {name: 'sheep', source: sheepSource},
            {name: 'sheepCollision', source: sheepCollisionSource},

            // Wedding
            {name: 'chair', source: chairSource},
            {name: 'chairCollision', source: chairCollisionSource},
            {name: 'arch', source: archSource},
            {name: 'archCollision', source: archCollisionSource},
            {name: 'tree', source: treeSource},
            {name: 'treeCollision', source: treeCollisionSource},

            // Alphabet
            {name: 'collisionH', source: collisionHSource},
            {name: 'collisionI', source: collisionISource},
            {name: 'collisionDot', source: collisionDotSource},
            {name: 'collisionArrow', source: arrowLeftCollisionSource},
            {name: 'A', source: ASource},
            {name: 'B', source: BSource},
            {name: 'C', source: CSource},
            {name: 'D', source: DSource},
            {name: 'E', source: ESource},
            {name: 'F', source: FSource},
            {name: 'G', source: GSource},
            {name: 'H', source: HSource},
            {name: 'I', source: ISource},
            {name: 'J', source: JSource},
            {name: 'K', source: KSource},
            {name: 'L', source: LSource},
            {name: 'M', source: MSource},
            {name: 'N', source: NSource},
            {name: 'O', source: OSource},
            {name: 'P', source: PSource},
            {name: 'Q', source: QSource},
            {name: 'R', source: RSource},
            {name: 'S', source: SSource},
            {name: 'T', source: TSource},
            {name: 'U', source: USource},
            {name: 'V', source: VSource},
            {name: 'W', source: WSource},
            {name: 'X', source: XSource},
            {name: 'Y', source: YSource},
            {name: 'Z', source: ZSource},
            {name: 'А', source: АSource},
            {name: 'Б', source: БSource},
            {name: 'В', source: ВSource},
            {name: 'Г', source: ГSource},
            {name: 'Д', source: ДSource},
            {name: 'Е', source: ЕSource},
            {name: 'Ё', source: ЁSource},
            {name: 'Ж', source: ЖSource},
            {name: 'З', source: ЗSource},
            {name: 'И', source: ИSource},
            {name: 'Й', source: ЙSource},
            {name: 'К', source: КSource},
            {name: 'Л', source: ЛSource},
            {name: 'М', source: МSource},
            {name: 'Н', source: НSource},
            {name: 'О', source: ОSource},
            {name: 'Ө', source: ӨSource},
            {name: 'П', source: ПSource},
            {name: 'Р', source: РSource},
            {name: 'С', source: СSource},
            {name: 'Т', source: ТSource},
            {name: 'У', source: УSource},
            {name: 'Ү', source: ҮSource},
            {name: 'Ф', source: ФSource},
            {name: 'Х', source: ХSource},
            {name: 'Ц', source: ЦSource},
            {name: 'Ч', source: ЧSource},
            {name: 'Ш', source: ШSource},
            {name: 'Щ', source: ЩSource},
            {name: 'Ъ', source: ЪSource},
            {name: 'Ы', source: ЫSource},
            {name: 'Ь', source: ЬSource},
            {name: 'Э', source: ЭSource},
            {name: 'Ю', source: ЮSource},
            {name: 'Я', source: ЯSource},
            {name: 'Á', source: ÁSource},
            {name: 'Ä', source: ÄSource},
            {name: 'Č', source: ČSource},
            {name: 'Ď', source: ĎSource},
            {name: 'É', source: ÉSource},
            {name: 'Í', source: ÍSource},
            {name: 'Ĺ', source: ĹSource},
            {name: 'Ľ', source: ĽSource},
            {name: 'Ň', source: ŇSource},
            {name: 'Ó', source: ÓSource},
            {name: 'Ô', source: ÔSource},
            {name: 'Ŕ', source: ŔSource},
            {name: 'Š', source: ŠSource},
            {name: 'Ť', source: ŤSource},
            {name: 'Ú', source: ÚSource},
            {name: 'Ý', source: ÝSource},
            {name: 'Ž', source: ŽSource},
            {name: '0', source: num0Source},
            {name: '1', source: num1Source},
            {name: '2', source: num2Source},
            {name: '3', source: num3Source},
            {name: '4', source: num4Source},
            {name: '5', source: num5Source},
            {name: '6', source: num6Source},
            {name: '7', source: num7Source},
            {name: '8', source: num8Source},
            {name: '9', source: num9Source},
            {name: '.', source: dotSource},
            {name: ',', source: commaSource},
            {name: '!', source: exclamationSource},
            {name: '?', source: questionSource},
            {name: '←', source: arrowLeftSource},
        ])

        this.loader.on('fileEnd', (_resource, _data) => {
            this.items[_resource.name] = _data

            // Texture
            if (_resource.type === 'texture') {
                const texture = new THREE.Texture(_data)
                texture.needsUpdate = true

                this.items[`${_resource.name}Texture`] = texture
            }

            // Trigger progress
            this.trigger('progress', [this.loader.loaded / this.loader.toLoad])
        })

        this.loader.on('end', () => {
            // Trigger ready
            this.trigger('ready')
        })
    }
}
