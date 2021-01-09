import * as PIXI from 'pixi.js'

export default abstract class BaseUIComponents {
    public container = new PIXI.Container()

    addChilds<TChildren extends PIXI.DisplayObject[]>(...children: TChildren): void {
        this.container.addChild(...children)
    }
    show(): void {
        this.container.visible = true
    }
    hiden(): void {
        this.container.visible = false
    }
}
