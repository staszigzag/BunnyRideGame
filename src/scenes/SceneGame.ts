import Bunny from '@/components/Bunny'
import Scene, { ISceneOptions } from '@core/components/Scene'
import CONFIG from '@/configs/ui.json'
import * as PIXI from 'pixi.js'
import StopperIceController from '@/components/StopperIceController'
import Collision from '@core/Collision'
import KeyboardController from '@core/KeyboardController'

interface IGameOptions extends ISceneOptions {
    textures: {
        floor: string
    }
}

export default class SceneGame extends Scene {
    private floorSprite: PIXI.TilingSprite
    private wrapperStoppersIce: StopperIceController
    private bunny: Bunny
    private speed = 4
    constructor(options: IGameOptions) {
        super(options)
        this.floorSprite = new PIXI.TilingSprite(
            PIXI.Texture.from(options.textures.floor),
            options.width,
            options.height / 2
        )

        const spaceKey = new KeyboardController('Space')
        spaceKey.addListenerDown(() => {
            console.log('text 42')
        })

        // this.floorSprite.anchor.set(0.5, 0)
        this.floorSprite.y = options.height / 2
        this.bunny = new Bunny(CONFIG.BUNNY)
        this.wrapperStoppersIce = new StopperIceController({ ...CONFIG.STOPPERS_ICE_CONTROLLER, width: options.width })

        this.addChilds(this.floorSprite, this.bunny.container, this.wrapperStoppersIce.container)
    }
    // при активации сцены вызывается init
    init(): void {
        // this.modalIntro.setScoreText(`${randomNumder(100, 900)}`)
    }
    updateBecauseTick(delta: number): void {
        const d = delta * this.speed
        this.floorSprite.tilePosition.x -= d
        this.wrapperStoppersIce.updateBecauseTick(d)
        // const is = Collision.check(this.bunny.container, this.wrapperStoppersIce.container.children[1])
        // console.log(is)
    }
}
