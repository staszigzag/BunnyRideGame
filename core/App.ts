import * as PIXI from 'pixi.js'
import Scene from './components/Scene'
import ScenesController from './ScenesController'

interface IAppOptions {
    selectorMount: string
    width: number
    height: number
    backgroundColor: string
    backgroundTexture?: string
}
export default abstract class App extends ScenesController {
    protected app: PIXI.Application
    private backgroundSprite: PIXI.Sprite | undefined
    constructor(options: IAppOptions, scenes: Scene[]) {
        // добавляем все сцены в контроллер
        super(scenes)
        this.app = new PIXI.Application({
            antialias: true,
            width: options.width,
            height: options.height
        })
        this.app.renderer.backgroundColor = PIXI.utils.string2hex(options.backgroundColor)

        if (options.backgroundTexture) {
            this.backgroundSprite = new PIXI.Sprite(PIXI.Texture.from(options.backgroundTexture))
            this.backgroundSprite.width = options.width
            this.backgroundSprite.height = options.height
            this.app.stage.addChild(this.backgroundSprite)
        }

        // пробрасываем тик сценам
        this.app.ticker.add((delta: number) => this.updateScenesBecauseTick(delta))
        document.querySelector(options.selectorMount)!.appendChild(this.app.view)
    }
    addChilds<TChildren extends PIXI.DisplayObject[]>(...children: TChildren): void {
        this.app.stage.addChild(...children)
    }
}
