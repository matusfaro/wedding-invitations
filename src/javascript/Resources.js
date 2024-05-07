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
import matcapEmeraldGreenSource from '../models/matcaps/emeraldGreen.png'
import matcapPurpleSource from '../models/matcaps/purple.png'
import matcapBlueSource from '../models/matcaps/blue.png'
import matcapYellowSource from '../models/matcaps/yellow.png'
import matcapMetalSource from '../models/matcaps/metal.png'
import gerFloorSource from '../models/ger/gerFloor.png'
import straight1RoadSource from '../models/road/straightLong1.png'
import straight2RoadSource from '../models/road/straightLong2.png'
import straight3RoadSource from '../models/road/straightLong3.png'
import introStaticBaseSource from '../models/intro/static/base.glb'
import introStaticCollisionSource from '../models/intro/static/collision.glb'
import introStaticFloorShadowSource from '../models/intro/static/floorShadow.png'
import introInstructionsLabelsSource from '../models/intro/instructions/labels.glb'
import introInstructionsArrowsCaSource from '../models/intro/instructions/arrows-ca.png'
import introInstructionsControlsCaSource from '../models/intro/instructions/controls-ca.png'
import introInstructionsArrowsSkSource from '../models/intro/instructions/arrows-sk.png'
import introInstructionsControlsSkSource from '../models/intro/instructions/controls-sk.png'
import introInstructionsArrowsMnSource from '../models/intro/instructions/arrows-mn.png'
import introInstructionsControlsMnSource from '../models/intro/instructions/controls-mn.png'
import introInstructionsOtherSource from '../models/intro/instructions/other.png'
import introArrowKeyBaseSource from '../models/intro/arrowKey/base.glb'
import introArrowKeyCollisionSource from '../models/intro/arrowKey/collision.glb'
import introBBaseSource from '../models/intro/b/base.glb'
import introBCollisionSource from '../models/intro/b/collision.glb'
import introRBaseSource from '../models/intro/r/base.glb'
import introRCollisionSource from '../models/intro/r/collision.glb'
import introUBaseSource from '../models/intro/u/base.glb'
import introUCollisionSource from '../models/intro/u/collision.glb'
import introNBaseSource from '../models/intro/n/base.glb'
import introNCollisionSource from '../models/intro/n/collision.glb'
import introOBaseSource from '../models/intro/o/base.glb'
import introOCollisionSource from '../models/intro/o/collision.glb'
import introSBaseSource from '../models/intro/s/base.glb'
import introSCollisionSource from '../models/intro/s/collision.glb'
import introIBaseSource from '../models/intro/i/base.glb'
import introICollisionSource from '../models/intro/i/collision.glb'
import introMBaseSource from '../models/intro/m/base.glb'
import introMCollisionSource from '../models/intro/m/collision.glb'
import introCreativeBaseSource from '../models/intro/creative/base.glb'
import introCreativeCollisionSource from '../models/intro/creative/collision.glb'
import introDevBaseSource from '../models/intro/dev/base.glb'
import introDevCollisionSource from '../models/intro/dev/collision.glb'
import crossroadsStaticFloorShadowSource from '../models/crossroads/static/floorShadow.png'
import crossroadsStaticBaseSource from '../models/crossroads/static/base.glb'
import crossroadsStaticCollisionSource from '../models/crossroads/static/collision.glb'
import carPriusChassisSource from '../models/car/prius/chassis.glb'
import carPriusBackLightsBrakeSource from '../models/car/prius/backLightsBrake.glb'
import carPriusBackLightsReverseSource from '../models/car/prius/backLightsReverse.glb'
import carPriusFrontLightsSource from '../models/car/prius/frontLights.glb'
import carPriusPlateSource from '../models/car/prius/plate.png'
import carDefaultWheelSource from '../models/car/default/wheel.glb'
import projectsBoardStructureSource from '../models/projects/board/structure.glb'
import projectsBoardCollisionSource from '../models/projects/board/collision.glb'
import projectsBoardStructureFloorShadowSource from '../models/projects/board/floorShadow.png'
import projectsBoardPlaneSource from '../models/projects/board/plane.glb'
import projectsDistinctionsAwwwardsBaseSource from '../models/projects/distinctions/awwwards/base.glb'
import projectsDistinctionsAwwwardsCollisionSource from '../models/projects/distinctions/awwwards/collision.glb'
import projectsDistinctionsFWABaseSource from '../models/projects/distinctions/fwa/base.glb'
import projectsDistinctionsFWACollisionSource from '../models/projects/distinctions/fwa/collision.glb'
import projectsDistinctionsCSSDABaseSource from '../models/projects/distinctions/cssda/base.glb'
import projectsDistinctionsCSSDACollisionSource from '../models/projects/distinctions/cssda/collision.glb'
import projectsThreejsJourneyFloorSource from '../models/projects/threejsJourney/floorTexture.png'
import projectsMadboxFloorSource from '../models/projects/madbox/floorTexture.png'
import projectsScoutFloorSource from '../models/projects/scout/floorTexture.png'
import projectsChartogneFloorSource from '../models/projects/chartogne/floorTexture.png'
import projectsZenlyFloorSource from '../models/projects/zenly/floorTexture.png'
import projectsCitrixRedbullFloorSource from '../models/projects/citrixRedbull/floorTexture.png'
import projectsPriorHoldingsFloorSource from '../models/projects/priorHoldings/floorTexture.png'
import projectsOranoFloorSource from '../models/projects/orano/floorTexture.png'
import projectsKepplerFloorSource from '../models/projects/keppler/floorTexture.png'
import informationStaticBaseSource from '../models/information/static/base.glb'
import informationStaticCollisionSource from '../models/information/static/collision.glb'
import informationStaticFloorShadowSource from '../models/information/static/floorShadow.png'
import informationBaguetteBaseSource from '../models/information/baguette/base.glb'
import informationBaguetteCollisionSource from '../models/information/baguette/collision.glb'
import informationContactTwitterLabelSource from '../models/information/static/contactTwitterLabel.png'
import informationContactGithubLabelSource from '../models/information/static/contactGithubLabel.png'
import informationContactLinkedinLabelSource from '../models/information/static/contactLinkedinLabel.png'
import informationContactMailLabelSource from '../models/information/static/contactMailLabel.png'
import informationActivitiesSource from '../models/information/static/activities.png'
import playgroundStaticFloorShadowSource from '../models/playground/static/floorShadow.png'
import playgroundStaticBaseSource from '../models/playground/static/base.glb'
import playgroundStaticCollisionSource from '../models/playground/static/collision.glb'
import brickBaseSource from '../models/brick/base.glb'
import brickCollisionSource from '../models/brick/collision.glb'
import hornBaseSource from '../models/horn/base.glb'
import hornCollisionSource from '../models/horn/collision.glb'
import webbyTrophyBaseSource from '../models/webbyTrophy/base.glb'
import webbyTrophyCollisionSource from '../models/webbyTrophy/collision.glb'
import lemonBaseSource from '../models/lemon/base.glb'
import lemonCollisionSource from '../models/lemon/collision.glb'
import bowlingBallBaseSource from '../models/bowlingBall/base.glb'
import bowlingBallCollisionSource from '../models/bowlingBall/collision.glb'
import bowlingPinBaseSource from '../models/bowlingPin/base.glb'
import bowlingPinCollisionSource from '../models/bowlingPin/collision.glb'
import areaKeyEnterSource from '../models/area/keyEnter.png'
import areaEnterSource from '../models/area/enter.png'
import areaOpenSource from '../models/area/open.png'
import areaResetSource from '../models/area/reset.png'
import areaQuestionMarkSource from '../models/area/questionMark.png'
import tilesABaseSource from '../models/tiles/a/base.glb'
import tilesACollisionSource from '../models/tiles/a/collision.glb'
import tilesBBaseSource from '../models/tiles/b/base.glb'
import tilesBCollisionSource from '../models/tiles/b/collision.glb'
import tilesCBaseSource from '../models/tiles/c/base.glb'
import tilesCCollisionSource from '../models/tiles/c/collision.glb'
import tilesDBaseSource from '../models/tiles/d/base.glb'
import tilesDCollisionSource from '../models/tiles/d/collision.glb'
import tilesEBaseSource from '../models/tiles/e/base.glb'
import tilesECollisionSource from '../models/tiles/e/collision.glb'
import konamiLabelSource from '../models/konami/label.png'
import konamiLabelTouchSource from '../models/konami/label-touch.png'
import wig1Source from '../models/wigs/wig1.glb'
import wig2Source from '../models/wigs/wig2.glb'
import wig3Source from '../models/wigs/wig3.glb'
import wig4Source from '../models/wigs/wig4.glb'
import gerSource from '../models/ger/ger.glb'
import gerCollisionSource from '../models/ger/gerCollision.glb'
import fenceSource from '../models/ger/fence.glb'
import fenceCollisionSource from '../models/ger/fenceCollision.glb'
import personNominSource from '../models/people/personNomin.glb'
import personNominCollisionSource from '../models/people/personNominCollision.glb'
import personMatusSource from '../models/people/personMatus.glb'
import personMatusCollisionSource from '../models/people/personMatusCollision.glb'
import horseSource from '../models/animals/horse.glb'
import horseCollisionSource from '../models/animals/horseCollision.glb'
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
            // { name: 'matcapGold', source: matcapGoldSource, type: 'texture' },

            // Intro
            {name: 'introStaticBase', source: introStaticBaseSource},
            {name: 'introStaticCollision', source: introStaticCollisionSource},
            {name: 'introStaticFloorShadow', source: introStaticFloorShadowSource, type: 'texture'},

            {name: 'introInstructionsLabels', source: introInstructionsLabelsSource},
            {name: 'caIntroInstructionsArrows', source: introInstructionsArrowsCaSource, type: 'texture'},
            {name: 'caIntroInstructionsControls', source: introInstructionsControlsCaSource, type: 'texture'},
            {name: 'skIntroInstructionsArrows', source: introInstructionsArrowsSkSource, type: 'texture'},
            {name: 'skIntroInstructionsControls', source: introInstructionsControlsSkSource, type: 'texture'},
            {name: 'mnIntroInstructionsArrows', source: introInstructionsArrowsMnSource, type: 'texture'},
            {name: 'mnIntroInstructionsControls', source: introInstructionsControlsMnSource, type: 'texture'},
            {name: 'introInstructionsOther', source: introInstructionsOtherSource, type: 'texture'},

            {name: 'introArrowKeyBase', source: introArrowKeyBaseSource},
            {name: 'introArrowKeyCollision', source: introArrowKeyCollisionSource},

            {name: 'introBBase', source: introBBaseSource},
            {name: 'introBCollision', source: introBCollisionSource},

            {name: 'introRBase', source: introRBaseSource},
            {name: 'introRCollision', source: introRCollisionSource},

            {name: 'introUBase', source: introUBaseSource},
            {name: 'introUCollision', source: introUCollisionSource},

            {name: 'introNBase', source: introNBaseSource},
            {name: 'introNCollision', source: introNCollisionSource},

            {name: 'introOBase', source: introOBaseSource},
            {name: 'introOCollision', source: introOCollisionSource},

            {name: 'introSBase', source: introSBaseSource},
            {name: 'introSCollision', source: introSCollisionSource},

            {name: 'introIBase', source: introIBaseSource},
            {name: 'introICollision', source: introICollisionSource},

            {name: 'introMBase', source: introMBaseSource},
            {name: 'introMCollision', source: introMCollisionSource},

            {name: 'introCreativeBase', source: introCreativeBaseSource},
            {name: 'introCreativeCollision', source: introCreativeCollisionSource},

            {name: 'introDevBase', source: introDevBaseSource},
            {name: 'introDevCollision', source: introDevCollisionSource},

            // Intro
            {name: 'crossroadsStaticBase', source: crossroadsStaticBaseSource},
            {name: 'crossroadsStaticCollision', source: crossroadsStaticCollisionSource},
            {name: 'crossroadsStaticFloorShadow', source: crossroadsStaticFloorShadowSource, type: 'texture'},

            // Car prius
            {name: 'carPriusChassis', source: carPriusChassisSource},
            {name: 'carPriusWheel', source: carDefaultWheelSource},
            {name: 'carPriusBackLightsBrake', source: carPriusBackLightsBrakeSource},
            {name: 'carPriusBackLightsReverse', source: carPriusBackLightsReverseSource},
            {name: 'carPriusFrontLights', source: carPriusFrontLightsSource},
            {name: 'carPriusPlate', source: carPriusPlateSource, type: 'texture'},

            // Project
            {name: 'projectsBoardStructure', source: projectsBoardStructureSource},
            {name: 'projectsBoardCollision', source: projectsBoardCollisionSource},
            {
                name: 'projectsBoardStructureFloorShadow',
                source: projectsBoardStructureFloorShadowSource,
                type: 'texture'
            },
            {name: 'projectsBoardPlane', source: projectsBoardPlaneSource},

            {name: 'projectsDistinctionsAwwwardsBase', source: projectsDistinctionsAwwwardsBaseSource},
            {name: 'projectsDistinctionsAwwwardsCollision', source: projectsDistinctionsAwwwardsCollisionSource},
            {name: 'projectsDistinctionsFWABase', source: projectsDistinctionsFWABaseSource},
            {name: 'projectsDistinctionsFWACollision', source: projectsDistinctionsFWACollisionSource},
            {name: 'projectsDistinctionsCSSDABase', source: projectsDistinctionsCSSDABaseSource},
            {name: 'projectsDistinctionsCSSDACollision', source: projectsDistinctionsCSSDACollisionSource},

            {name: 'projectsThreejsJourneyFloor', source: projectsThreejsJourneyFloorSource, type: 'texture'},
            {name: 'projectsMadboxFloor', source: projectsMadboxFloorSource, type: 'texture'},
            {name: 'projectsScoutFloor', source: projectsScoutFloorSource, type: 'texture'},
            {name: 'projectsChartogneFloor', source: projectsChartogneFloorSource, type: 'texture'},
            {name: 'projectsZenlyFloor', source: projectsZenlyFloorSource, type: 'texture'},
            {name: 'projectsCitrixRedbullFloor', source: projectsCitrixRedbullFloorSource, type: 'texture'},
            {name: 'projectsPriorHoldingsFloor', source: projectsPriorHoldingsFloorSource, type: 'texture'},
            {name: 'projectsOranoFloor', source: projectsOranoFloorSource, type: 'texture'},
            // { name: 'projectsGleecChatFloor', source: projectsGleecChatFloorSource, type: 'texture' },
            {name: 'projectsKepplerFloor', source: projectsKepplerFloorSource, type: 'texture'},

            // Information
            {name: 'informationStaticBase', source: informationStaticBaseSource},
            {name: 'informationStaticCollision', source: informationStaticCollisionSource},
            {name: 'informationStaticFloorShadow', source: informationStaticFloorShadowSource, type: 'texture'},

            {name: 'informationBaguetteBase', source: informationBaguetteBaseSource},
            {name: 'informationBaguetteCollision', source: informationBaguetteCollisionSource},

            {name: 'informationContactTwitterLabel', source: informationContactTwitterLabelSource, type: 'texture'},
            {name: 'informationContactGithubLabel', source: informationContactGithubLabelSource, type: 'texture'},
            {name: 'informationContactLinkedinLabel', source: informationContactLinkedinLabelSource, type: 'texture'},
            {name: 'informationContactMailLabel', source: informationContactMailLabelSource, type: 'texture'},

            {name: 'informationActivities', source: informationActivitiesSource, type: 'texture'},

            // Playground
            {name: 'playgroundStaticBase', source: playgroundStaticBaseSource},
            {name: 'playgroundStaticCollision', source: playgroundStaticCollisionSource},
            {name: 'playgroundStaticFloorShadow', source: playgroundStaticFloorShadowSource, type: 'texture'},

            // Brick
            {name: 'brickBase', source: brickBaseSource},
            {name: 'brickCollision', source: brickCollisionSource},

            // Horn
            {name: 'hornBase', source: hornBaseSource},
            {name: 'hornCollision', source: hornCollisionSource},

            // // Distinction A
            // { name: 'distinctionAStaticBase', source: distinctionAStaticBaseSource },
            // { name: 'distinctionAStaticCollision', source: distinctionAStaticCollisionSource },
            // { name: 'distinctionAStaticFloorShadow', source: distinctionAStaticFloorShadowSource, type: 'texture' },

            // // Distinction B
            // { name: 'distinctionBStaticBase', source: distinctionBStaticBaseSource },
            // { name: 'distinctionBStaticCollision', source: distinctionBStaticCollisionSource },
            // { name: 'distinctionBStaticFloorShadow', source: distinctionBStaticFloorShadowSource, type: 'texture' },

            // // Distinction C
            // { name: 'distinctionCStaticBase', source: distinctionCStaticBaseSource },
            // { name: 'distinctionCStaticCollision', source: distinctionCStaticCollisionSource },
            // { name: 'distinctionCStaticFloorShadow', source: distinctionCStaticFloorShadowSource, type: 'texture' },

            // // Cone
            // { name: 'coneBase', source: coneBaseSource },
            // { name: 'coneCollision', source: coneCollisionSource },

            // // Awwwards trophy
            // { name: 'awwwardsTrophyBase', source: awwwardsTrophyBaseSource },
            // { name: 'awwwardsTrophyCollision', source: awwwardsTrophyCollisionSource },

            // Webby trophy
            {name: 'webbyTrophyBase', source: webbyTrophyBaseSource},
            {name: 'webbyTrophyCollision', source: webbyTrophyCollisionSource},

            // Lemon
            {name: 'lemonBase', source: lemonBaseSource},
            {name: 'lemonCollision', source: lemonCollisionSource},

            // Bownling ball
            {name: 'bowlingBallBase', source: bowlingBallBaseSource},
            {name: 'bowlingBallCollision', source: bowlingBallCollisionSource},

            // Bownling ball
            {name: 'bowlingPinBase', source: bowlingPinBaseSource},
            {name: 'bowlingPinCollision', source: bowlingPinCollisionSource},

            // Floors
            {name: 'gerFloor', source: gerFloorSource, type: 'texture'},

            // Roads
            {name: 'straight1Road', source: straight1RoadSource, type: 'texture'},
            {name: 'straight2Road', source: straight2RoadSource, type: 'texture'},
            {name: 'straight3Road', source: straight3RoadSource, type: 'texture'},

            // Areas
            {name: 'areaKeyEnter', source: areaKeyEnterSource, type: 'texture'},
            {name: 'areaEnter', source: areaEnterSource, type: 'texture'},
            {name: 'areaOpen', source: areaOpenSource, type: 'texture'},
            {name: 'areaReset', source: areaResetSource, type: 'texture'},
            {name: 'areaQuestionMark', source: areaQuestionMarkSource, type: 'texture'},

            // Tiles
            {name: 'tilesABase', source: tilesABaseSource},
            {name: 'tilesACollision', source: tilesACollisionSource},

            {name: 'tilesBBase', source: tilesBBaseSource},
            {name: 'tilesBCollision', source: tilesBCollisionSource},

            {name: 'tilesCBase', source: tilesCBaseSource},
            {name: 'tilesCCollision', source: tilesCCollisionSource},

            {name: 'tilesDBase', source: tilesDBaseSource},
            {name: 'tilesDCollision', source: tilesDCollisionSource},

            {name: 'tilesEBase', source: tilesEBaseSource},
            {name: 'tilesECollision', source: tilesECollisionSource},

            // Konami
            {name: 'konamiLabel', source: konamiLabelSource, type: 'texture'},
            {name: 'konamiLabelTouch', source: konamiLabelTouchSource, type: 'texture'},

            // Wigs
            {name: 'wig1', source: wig1Source},
            {name: 'wig2', source: wig2Source},
            {name: 'wig3', source: wig3Source},
            {name: 'wig4', source: wig4Source},

            // Ger
            {name: 'ger', source: gerSource},
            {name: 'gerCollision', source: gerCollisionSource},
            {name: 'fence', source: fenceSource},
            {name: 'fenceCollision', source: fenceCollisionSource},
            {name: 'personNomin', source: personNominSource},
            {name: 'personNominCollision', source: personNominCollisionSource},
            {name: 'personMatus', source: personMatusSource},
            {name: 'personMatusCollision', source: personMatusCollisionSource},

            // Animals
            {name: 'horse', source: horseSource},
            {name: 'horseCollision', source: horseCollisionSource},
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
