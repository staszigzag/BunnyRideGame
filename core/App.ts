import * as PIXI from 'pixi.js'
import Scene from './components/Scene'
import ScenesController from './ScenesController'

interface IAppOptions {
    selectorMount: string
    width: number
    height: number
    backgroundColor: string
}
export default abstract class App extends ScenesController {
    protected app: PIXI.Application
    constructor(options: IAppOptions, scenes: Scene[]) {
        // добавляем все сцены в контроллер
        super(scenes)
        this.app = new PIXI.Application({
            antialias: true,
            width: options.width,
            height: options.height
        })
        this.app.renderer.backgroundColor = PIXI.utils.string2hex(options.backgroundColor)
        document.querySelector(options.selectorMount)!.appendChild(this.app.view)
    }
    addChilds<TChildren extends PIXI.DisplayObject[]>(...children: TChildren): void {
        this.app.stage.addChild(...children)
    }
}
