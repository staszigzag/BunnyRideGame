import BaseUIComponents from '@core/components/BaseUIComponents'
import * as PIXI from 'pixi.js'

interface IFloorOptions {
    textureFloor: string
    width: number
    height: number
    rotation: number
    positionY: number
}

export default class Floor extends BaseUIComponents {
    private tilingSprite: PIXI.TilingSprite

    constructor(options: IFloorOptions) {
        super()

        this.tilingSprite = new PIXI.TilingSprite(
            PIXI.Texture.from(options.textureFloor),
            options.width * 1.2,
            options.height
        )

        this.container.pivot.x = this.container.width / 2
        // перводим градусы в радианы
        this.container.rotation = options.rotation * (Math.PI / 180)
        this.container.y = options.positionY

        this.addChilds(this.tilingSprite)
    }
    addDeltaTilePositionX(delta: number): void {
        this.tilingSprite.tilePosition.x += delta
    }
}
