import BaseUIComponents from '@core/components/BaseUIComponents'
import CONFIG from '@/configs/ui.json'
import STYLES from '@/configs/stylesText.json'
import * as PIXI from 'pixi.js'

interface ITypeStateBunny<T> {
    bunnyIdle: T
    bunnyJump: T
    bunnyDead: T
}

interface IBunnyOptions {
    textures: ITypeStateBunny<string>
    width: number
    height: number
    positionX: number
    positionY: number
}

export default class Bunny extends BaseUIComponents {
    private textures: ITypeStateBunny<PIXI.Texture>
    private sprite = new PIXI.Sprite()
    constructor(options: IBunnyOptions) {
        super()

        this.textures = {
            bunnyIdle: PIXI.Texture.from(options.textures.bunnyIdle),
            bunnyJump: PIXI.Texture.from(options.textures.bunnyJump),
            bunnyDead: PIXI.Texture.from(options.textures.bunnyDead)
        }

        this.sprite.texture = this.textures.bunnyIdle
        this.sprite.width = options.width
        this.sprite.height = options.height
        this.addChilds(this.sprite)

        this.container.x = options.positionX
        this.container.y = options.positionY
        // задаем якорь посредине
        // this.container.pivot.x = this.container.width / 2
    }
}
