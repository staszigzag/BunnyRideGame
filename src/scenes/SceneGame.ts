import Bunny from '@/components/Bunny'
import Scene, { ISceneOptions } from '@core/components/Scene'
import CONFIG from '@/configs/ui.json'
import * as PIXI from 'pixi.js'
import StopperIceController from '@/components/StopperIceController'
import Collision from '@core/Collision'
import KeyboardController from '@core/KeyboardController'
import $gsap from '@/plugins/gsap'
import Floor from '@/components/Floor'
import ModalResult from '@/components/modals/ModalResult'

export default class SceneGame extends Scene {
    private modalResult: ModalResult
    private floor: Floor
    private generatorStoppersIce: StopperIceController
    private bunny: Bunny
    private isRun = false
    private speed = 10
    constructor(options: ISceneOptions) {
        super(options)
        this.modalResult = new ModalResult()
        this.modalResult.hiden()
        // центруем модалку посредине сцены
        this.modalResult.container.x = this.container.width / 2
        this.modalResult.container.y = 15 // margin top

        this.bunny = new Bunny(CONFIG.BUNNY)

        this.floor = new Floor({ ...CONFIG.FLOOR, width: options.width })

        this.generatorStoppersIce = new StopperIceController({
            ...CONFIG.STOPPERS_ICE_CONTROLLER,
            width: options.width
        })
        this.generatorStoppersIce.container.y = 5 // mini corrected
        // делаем генератор льда частью пола
        this.floor.addChilds(this.generatorStoppersIce.container)

        const onAction = () => {
            console.log('onAction')
            if (this.isRun) this.bunny.jump()
            else this.gameStart()
        }
        const onHover = () => {
            console.log('onHover')
        }
        const spaceKey = new KeyboardController('Space')
        spaceKey.addListenerDown(onAction)
        // document.addEventListener('touchstart', onAction)

        this.addChilds(this.floor.container, this.bunny.container, this.modalResult.container)
    }
    // при активации сцены вызывается init
    init(): void {
        this.gameStart()
    }
    private gameStart(): void {
        this.modalResult.hiden()
        this.isRun = true
        this.generatorStoppersIce.clearAll()
        this.generatorStoppersIce.spawn()
        this.generatorStoppersIce.startLoopSpawn()
        this.bunny.idle()
    }
    private gameEnd(): void {
        this.isRun = false
        this.generatorStoppersIce.stopLoopSpawn()
        this.bunny.dead()
        this.modalResult.show()
        $gsap.from(this.modalResult.container, {
            y: -640,
            delay: 0.4,
            duration: 1,
            ease: 'bounce.out'
        })
    }
    private gameLoop(): void {
        this.generatorStoppersIce.getStopersIce().forEach((s) => {
            // TODO реализовать hitBox
            const isСollision = Collision.check(this.bunny.container, s.container)
            if (isСollision) {
                s.crushed()
                this.gameEnd()
            }
            // удаляем вне зоны видимости
            // TODO можно сделать пул стопов, и при спавне брать из него, а при удалении возврращать
            const isVisiblen = Collision.check(this.generatorStoppersIce.perimeter, s.container)
            if (!isVisiblen) this.generatorStoppersIce.delete(s)
        })
    }
    private updatePositionLoop(delta: number): void {
        const d = delta * this.speed
        this.floor.addDeltaTilePositionX(-d)
        this.generatorStoppersIce.updateBecauseTick(d)
    }
    updateBecauseTick(delta: number): void {
        if (!this.isRun) return
        this.updatePositionLoop(delta)
        this.gameLoop()
    }
}
