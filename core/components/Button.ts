import PubSub from '@core/store/PubSub'
import * as PIXI from 'pixi.js'
import BaseUIComponents from './BaseUIComponents'

// type TypeStateBtn = 'active' | 'hover' | 'press'

interface ITypeStateBtn<T> {
    active: T
    hover: T
    press: T
}
interface IButtonOptions {
    textures: ITypeStateBtn<string>
    mirror: boolean
    width?: number
    height?: number
    positionX?: number
    positionY?: number
}

export default class Button extends BaseUIComponents {
    private textures: ITypeStateBtn<PIXI.Texture>
    private sprite = new PIXI.Sprite()
    private isDown = false
    private isOver = false
    // pattern Observer
    private eventsObserver = new PubSub()
    private nameEvent = 'CLICK'
    constructor(options: IButtonOptions) {
        super()
        this.textures = {
            active: PIXI.Texture.from(options.textures.active),
            hover: PIXI.Texture.from(options.textures.hover),
            press: PIXI.Texture.from(options.textures.press)
        }
        this.sprite.texture = this.textures.active
        // зеркалим если нужно
        if (options.mirror) this.sprite.scale.x = -this.sprite.scale.x

        if (options.width) this.sprite.width = options.width
        if (options.height) this.sprite.height = options.height
        this.addChilds(this.sprite)

        if (options.positionX) this.container.x = options.positionX
        if (options.positionY) this.container.y = options.positionY

        this.container.interactive = true
        this.container.buttonMode = true

        // вешаем обработчики
        this.container
            .on('pointerdown', this.onButtonDown.bind(this))
            .on('pointerup', this.onButtonUp.bind(this))
            .on('pointerupoutside', this.onButtonUp.bind(this))
            .on('pointerover', this.onButtonOver.bind(this))
            .on('pointerout', this.onButtonOut.bind(this))
    }

    private onButtonDown(): void {
        this.isDown = true
        this.sprite.texture = this.textures.press
    }

    private onButtonUp(): void {
        this.isDown = false
        if (this.isOver) this.sprite.texture = this.textures.hover
        else this.sprite.texture = this.textures.active
        // эмитим событие клика
        this.eventsObserver.publish(this.nameEvent)
    }

    private onButtonOver(): void {
        this.isOver = true
        if (this.isDown) return
        this.sprite.texture = this.textures.hover
    }

    private onButtonOut(): void {
        this.isOver = false
        if (this.isDown) return
        this.sprite.texture = this.textures.active
    }
    addClickListener(fn: () => void): void {
        this.eventsObserver.subscribe(this.nameEvent, fn)
    }
}
