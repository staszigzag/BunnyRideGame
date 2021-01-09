import BaseUIComponents from '@core/components/BaseUIComponents'
import CONFIG from '@/configs/ui.json'
import STYLES from '@/configs/stylesText.json'
import * as PIXI from 'pixi.js'

interface IModalOptions {
    textures: {
        main: string
        header: string
    }
    width: number
    height: number
}

export default abstract class ModalBase extends BaseUIComponents {
    protected mainSprite: PIXI.Sprite
    protected headerSprite: PIXI.Sprite
    protected headerTextSprite: PIXI.Text
    constructor(options: IModalOptions = CONFIG.MODAL_BASE) {
        super()

        this.mainSprite = new PIXI.Sprite(PIXI.Texture.from(options.textures.main))
        this.headerSprite = new PIXI.Sprite(PIXI.Texture.from(options.textures.header))
        this.headerTextSprite = new PIXI.Text('', new PIXI.TextStyle(STYLES.MODAL_HEADER))
        // главный фон
        this.mainSprite.width = options.width
        this.mainSprite.height = options.height
        // фон для заголовка
        this.headerSprite.width = options.width / 1.3
        this.headerSprite.height = 60
        // центруем заголовок
        this.headerSprite.anchor.set(0.5, 0)
        this.headerSprite.y = 5 // margine top
        this.headerSprite.x = options.width / 2
        // центруем текст заголовка
        this.headerTextSprite.anchor.set(0.5, 0)
        this.headerTextSprite.x = options.width / 2

        this.addChilds(this.mainSprite, this.headerSprite, this.headerTextSprite)
        // задаем якорь посредине
        this.container.pivot.x = this.container.width / 2
    }
    setTitleText(text: string): void {
        this.headerTextSprite.text = text
    }
}
