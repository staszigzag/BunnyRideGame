import BaseUIComponents from '@core/components/BaseUIComponents'
import * as PIXI from 'pixi.js'

interface ITypeStateStopperIce<T> {
    stopperIdle: T
    stopperCrushed: T
}

interface IStopperIceOptions {
    textures: ITypeStateStopperIce<string>
    width: number
    height: number
}

export default class StopperIce extends BaseUIComponents {
    private textures: ITypeStateStopperIce<PIXI.Texture>
    private sprite = new PIXI.Sprite()
    constructor(options: IStopperIceOptions) {
        super()

        this.textures = {
            stopperIdle: PIXI.Texture.from(options.textures.stopperIdle),
            stopperCrushed: PIXI.Texture.from(options.textures.stopperCrushed)
        }

        this.sprite.texture = this.textures.stopperIdle
        this.sprite.width = options.width
        this.sprite.height = options.height
        this.addChilds(this.sprite)
    }
    crushed(): void {
        this.sprite.texture = this.textures.stopperIdle
    }
}
