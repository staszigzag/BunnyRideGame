import * as PIXI from 'pixi.js'

export default class Collision {
    static check(obj1: PIXI.DisplayObject, obj2: PIXI.DisplayObject): boolean {
        const { x: x1, y: y1, width: w1, height: h1 } = obj1.getBounds()
        const { x: x2, y: y2, width: w2, height: h2 } = obj2.getBounds()
        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
    }
}
