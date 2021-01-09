import BaseUIComponents from '@core/components/BaseUIComponents'
import * as PIXI from 'pixi.js'

interface IRowOptions {
    textures: {
        name: string
        score: string
    }
    styles: {
        name: PIXI.TextStyle
        score: PIXI.TextStyle
        countPosition?: PIXI.TextStyle
    }
    height: number
    width: number
    nameWidth: number
    namePositionX: number
    nameTextPositionX: number
    scoreWidth: number
    scorePositionX: number
    scoreTextPositionX: number
    countPosition?: number
    countPositionTextPositionX?: number
}

export class ModalLeaderboardRow extends BaseUIComponents {
    private nameSprite: PIXI.Sprite
    private scoreSprite: PIXI.Sprite
    private nameTextSprite: PIXI.Text
    private scoreTextSprite: PIXI.Text
    private countPositionTextSprite: PIXI.Text | undefined

    constructor(options: IRowOptions) {
        super()
        this.nameSprite = new PIXI.Sprite(PIXI.Texture.from(options.textures.name))
        this.scoreSprite = new PIXI.Sprite(PIXI.Texture.from(options.textures.score))
        this.nameTextSprite = new PIXI.Text('Pavel', options.styles.name)
        this.scoreTextSprite = new PIXI.Text('4944', options.styles.score)

        this.nameSprite.anchor.set(0, 0.5) // vertical align center
        this.nameSprite.width = options.nameWidth
        this.nameSprite.x = options.namePositionX

        this.scoreSprite.anchor.set(0, 0.5) // vertical align center
        this.scoreSprite.width = options.scoreWidth
        this.scoreSprite.x = options.scorePositionX

        this.nameTextSprite.anchor.set(0, 0.5) // vertical align center
        this.nameTextSprite.x = options.nameTextPositionX

        this.scoreTextSprite.anchor.set(0, 0.5) // vertical align center
        this.scoreTextSprite.x = options.scoreTextPositionX

        this.addChilds(this.nameSprite, this.scoreSprite, this.nameTextSprite, this.scoreTextSprite)

        // если есть порядковая позиция вополняем этот блок
        if (options.countPosition) {
            this.countPositionTextSprite = new PIXI.Text(`${options.countPosition}`, options.styles.countPosition)
            this.countPositionTextSprite.anchor.set(0, 0.5) // vertical align center
            this.countPositionTextSprite.x = options.countPositionTextPositionX!
            this.addChilds(this.countPositionTextSprite)
        }
        this.container.height = options.height
        this.container.width = options.width
    }
    setNameText(text: string): void {
        this.nameTextSprite.text = text
    }
    setScoreText(text: string): void {
        this.scoreTextSprite.text = text
    }
}
