import Bunny from '@/components/Bunny'
import Scene, { ISceneOptions } from '@core/components/Scene'
import CONFIG from '@/configs/ui.json'
import * as PIXI from 'pixi.js'

interface IGameOptions extends ISceneOptions {
    textures: {
        floor: string
    }
}

export default class SceneGame extends Scene {
    private floorSprite: PIXI.TilingSprite
    private bunny: Bunny
    private speed = 4
    constructor(options: IGameOptions) {
        super(options)
        this.floorSprite = new PIXI.TilingSprite(
            PIXI.Texture.from(options.textures.floor),
            options.width,
            options.height / 2
        )
        // this.floorSprite.anchor.set(0.5, 0)
        this.floorSprite.y = options.height / 2
        this.bunny = new Bunny(CONFIG.BUNNY)

        this.addChilds(this.floorSprite, this.bunny.container)
    }
    // при активации сцены вызывается init
    init(): void {
        // this.modalIntro.setScoreText(`${randomNumder(100, 900)}`)
    }
    updateBecauseTick(delta: number): void {
        this.floorSprite.tilePosition.x -= delta * this.speed
    }
}
