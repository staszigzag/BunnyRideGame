import Bunny from '@/components/Bunny'
import Scene, { ISceneOptions } from '@core/components/Scene'
import CONFIG from '@/configs/ui.json'
import * as PIXI from 'pixi.js'
import StopperIceController from '@/components/StopperIceController'
import Collision from '@core/Collision'
import KeyboardController from '@core/KeyboardController'
import $gsap from '@/plugins/gsap'
import Floor from '@/components/Floor'

export default class SceneGame extends Scene {
    private floor: Floor
    private generatorStoppersIce: StopperIceController
    private bunny: Bunny
    private isRun = false
    private speed = 12 // 8
    constructor(options: ISceneOptions) {
        super(options)
        this.bunny = new Bunny(CONFIG.BUNNY)

        this.floor = new Floor({ ...CONFIG.FLOOR, width: options.width })

        this.generatorStoppersIce = new StopperIceController({
            ...CONFIG.STOPPERS_ICE_CONTROLLER,
            width: options.width
        })
        this.generatorStoppersIce.container.y = 5 // mini corrected
        // делаем генератор льда частью пола
        this.floor.addChilds(this.generatorStoppersIce.container)

        const spaceKey = new KeyboardController('Space')
        spaceKey.addListenerDown(() => {
            this.bunny.jump()
        })

        this.addChilds(this.floor.container, this.bunny.container)
    }
    // при активации сцены вызывается init
    init(): void {
        this.gameStart()
    }
    gameStart(): void {
        this.isRun = true
        this.generatorStoppersIce.stopLoopSpawn()
        this.generatorStoppersIce.clearAll()
        this.generatorStoppersIce.spawn()
        this.generatorStoppersIce.startLoopSpawn()
        this.bunny.idle()
    }
    gameEnd(): void {
        this.isRun = false
        this.bunny.dead()
    }
    gameLoop(): void {
        this.generatorStoppersIce.getStopersIce().forEach((s) => {
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
    updatePositionLoop(delta: number): void {
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
