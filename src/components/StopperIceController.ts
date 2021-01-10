import BaseUIComponents from '@core/components/BaseUIComponents'
import StopperIce from './StopperIce'
import CONFIG from '@/configs/ui.json'
import * as PIXI from 'pixi.js'
import { randomNumder } from '@/utils'

interface IStopperIceControllerOptions {
    minSpawnDelay: number
    maxSpawnDelay: number
    width: number
}

export default class StopperIceController extends BaseUIComponents {
    perimeter: PIXI.Graphics
    private stoppers: StopperIce[] = []
    private width: number
    private minSpawnDelay: number
    private maxSpawnDelay: number
    private idTimer: number | undefined

    constructor(options: IStopperIceControllerOptions) {
        super()
        this.width = options.width

        this.minSpawnDelay = options.minSpawnDelay
        this.maxSpawnDelay = options.maxSpawnDelay

        // используем периметр для определения места спавна и для чека что стопор вышел за граници
        this.perimeter = new PIXI.Graphics()
        // this.perimeter.lineStyle(1, 0xff00ff)
        this.perimeter.drawRect(0, 0, this.width, 1)
        this.addChilds(this.perimeter)
    }
    getStopersIce(): StopperIce[] {
        return this.stoppers
    }
    spawn(): void {
        const stopper = new StopperIce(CONFIG.STOPPER_ICE)
        stopper.container.x = this.width
        this.addChilds(stopper.container)
        this.stoppers.push(stopper)
    }
    startLoopSpawn(): void {
        // TODO привязать цикл спавна к тикам самой игры вместо глобального setTimeout
        this.idTimer = (setTimeout(() => {
            this.spawn()
            this.startLoopSpawn()
        }, randomNumder(this.minSpawnDelay, this.maxSpawnDelay)) as unknown) as number
    }
    stopLoopSpawn(): void {
        clearTimeout(this.idTimer)
    }
    delete(stopper: StopperIce): void {
        const index = this.stoppers.indexOf(stopper)
        if (!index) return
        this.stoppers.splice(index, 1)
        this.container.removeChild(stopper.container)
    }
    clearAll(): void {
        this.stoppers.forEach((s) => {
            s.container.destroy()
        })
        this.stoppers = []
    }
    updateBecauseTick(delta: number): void {
        console.log('count stoppers', this.container.children.length - 1, this.stoppers.length)
        this.stoppers.forEach((s) => {
            s.container.x -= delta
        })
    }
}
