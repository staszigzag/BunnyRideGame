import BaseUIComponents from '@core/components/BaseUIComponents'
import Cache from '@core/store/Cache'
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
    scale: number
    namePositionX: number
    nameTextPositionX: number
    scorePositionX: number
    scoreTextPositionX: number
    countPosition?: number
    countPositionTextPositionX?: number
}

export default class ModalLeaderboardRow extends BaseUIComponents {
    private nameSprite: PIXI.Sprite
    private scoreSprite: PIXI.Sprite
    private nameTextSprite: PIXI.Text
    private scoreTextSprite: PIXI.Text
    private countPositionTextSprite: PIXI.Text | undefined
    static cacheTexture: Cache<PIXI.Texture> = new Cache<PIXI.Texture>()

    constructor(options: IRowOptions) {
        super()
        this.nameSprite = new PIXI.Sprite(this.createTexture(options.textures.name))
        this.scoreSprite = new PIXI.Sprite(this.createTexture(options.textures.score))
        this.nameTextSprite = new PIXI.Text('', options.styles.name)
        this.scoreTextSprite = new PIXI.Text('', options.styles.score)

        this.nameSprite.anchor.set(0, 0.5) // vertical align center
        // this.nameSprite.width = options.nameWidth
        this.nameSprite.x = options.namePositionX

        this.scoreSprite.anchor.set(0, 0.5) // vertical align center
        this.scoreSprite.x = options.scorePositionX

        this.nameTextSprite.anchor.set(0, 0.5) // vertical align center
        this.nameTextSprite.x = options.nameTextPositionX

        this.scoreTextSprite.anchor.set(0, 0.5) // vertical align center
        this.scoreTextSprite.x = options.scoreTextPositionX

        this.container.scale.set(options.scale)
        // если есть порядковая позиция вополняем этот блок
        if (options.countPosition) {
            this.countPositionTextSprite = new PIXI.Text(`${options.countPosition}`, options.styles.countPosition)
            this.countPositionTextSprite.anchor.set(0, 0.5) // vertical align center
            this.countPositionTextSprite.x = options.countPositionTextPositionX!
            this.addChilds(this.countPositionTextSprite)
        }
        this.addChilds(this.nameSprite, this.scoreSprite, this.nameTextSprite, this.scoreTextSprite)
    }
    createTexture(path: string): PIXI.Texture {
        // локальный кэш для текстур
        // TODO переделать на один глобальный для всех
        let texture = ModalLeaderboardRow.cacheTexture.get(path)
        if (!texture) {
            texture = PIXI.Texture.from(path)
            ModalLeaderboardRow.cacheTexture.add(path, texture)
        }
        return texture
    }
    setNameText(text: string): void {
        this.nameTextSprite.text = text
    }
    setScoreText(text: string): void {
        this.scoreTextSprite.text = text
    }
}
