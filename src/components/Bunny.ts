import BaseUIComponents from '@core/components/BaseUIComponents'
import CONFIG from '@/configs/ui.json'
import STYLES from '@/configs/stylesText.json'
import * as PIXI from 'pixi.js'
import $gsap from '@/plugins/gsap'

interface ITypeStateBunny<T> {
    bunnyIdle: T
    bunnyJump: T
    bunnyDead: T
}

interface IBunnyOptions {
    textures: ITypeStateBunny<string>
    scale: number
    positionX: number
    positionY: number
}

export default class Bunny extends BaseUIComponents {
    private textures: ITypeStateBunny<PIXI.Texture>
    private sprite = new PIXI.Sprite()
    private isJumping = false
    private isDead = false
    constructor(options: IBunnyOptions) {
        super()

        this.textures = {
            bunnyIdle: PIXI.Texture.from(options.textures.bunnyIdle),
            bunnyJump: PIXI.Texture.from(options.textures.bunnyJump),
            bunnyDead: PIXI.Texture.from(options.textures.bunnyDead)
        }

        this.sprite.texture = this.textures.bunnyIdle
        this.container.scale.set(options.scale)
        // важно и спрайту и контейнерру задать одинаковый якороь, что техтуры без смешения менялись
        this.container.pivot.y = this.container.height
        this.sprite.anchor.set(0, 1)
        this.addChilds(this.sprite)

        this.container.x = options.positionX
        this.container.y = options.positionY
    }

    jump(): void {
        if (this.isJumping || this.isDead) return
        this.sprite.texture = this.textures.bunnyJump
        this.isJumping = true
        $gsap
            .to(this.container, {
                y: 230,
                // pixi: { positionY: -20 },
                duration: 0.6,
                repeat: 1,
                yoyo: true,
                ease: 'power2 '
            })
            .then(() => {
                this.isJumping = false
                if (!this.isDead) this.idle()
                console.log('finish')
            })
    }
    idle(): void {
        this.isDead = false
        this.sprite.texture = this.textures.bunnyIdle
    }
    dead(): void {
        this.isDead = true
        this.sprite.texture = this.textures.bunnyDead
        if (this.isJumping) return
        $gsap.to(this.container, {
            y: '-=40',
            duration: 0.2,
            repeat: 1,
            yoyo: true,
            ease: 'power1'
        })
    }
}
