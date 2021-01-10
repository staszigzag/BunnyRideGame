import BaseUIComponents from '@core/components/BaseUIComponents'
import * as PIXI from 'pixi.js'

interface ITypeStateStopperIce<T> {
    stopperIdle: T
    stopperCrushed: T
}

interface IStopperIceOptions {
    textures: ITypeStateStopperIce<string>
    scale: number
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
        // важно и спрайту и контейнерру задать одинаковый якороь, что техтуры без смешения менялись
        this.sprite.anchor.set(0, 1)
        this.container.pivot.y = this.container.height
        this.container.scale.set(options.scale)
        this.addChilds(this.sprite)
    }
    crushed(): void {
        this.sprite.texture = this.textures.stopperCrushed
    }
}
