import * as PIXI from 'pixi.js'
import BaseUIComponents from './BaseUIComponents'

export interface ISceneOptions {
    id: string
    width: number
    height: number
}

export default abstract class Scene extends BaseUIComponents {
    protected perimeter: PIXI.Graphics
    public id: string

    constructor(options: ISceneOptions) {
        super()
        this.id = options.id
        // с помошью прямоугольника задаем нужный размер для пустого контейнера
        this.perimeter = new PIXI.Graphics()
        this.perimeter.lineStyle(0, 0xff1bff) // TODO
        this.perimeter.drawRect(0, 0, options.width, options.height)
        this.addChilds(this.perimeter)
    }
    abstract init(): void
    abstract updateBecauseTick(delta?: number): void
}
