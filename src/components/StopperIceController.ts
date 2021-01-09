import BaseUIComponents from '@core/components/BaseUIComponents'
import StopperIce from './StopperIce'
import CONFIG from '@/configs/ui.json'
import * as PIXI from 'pixi.js'

interface IStopperIceControllerOptions {
    spawnDelay: number
    width: number
}

export default class StopperIceController extends BaseUIComponents {
    protected perimeter: PIXI.Graphics
    private stoppers: StopperIce[] = []
    private width: number
    private spawnDelay: number
    private countStopersCreated = 0

    constructor(options: IStopperIceControllerOptions) {
        super()
        this.width = options.width

        this.spawnDelay = options.spawnDelay
        this.perimeter = new PIXI.Graphics()
        this.perimeter.lineStyle(4, 0xff00ff)
        this.perimeter.drawRect(0, 0, this.width, 400)
        this.addChilds(this.perimeter)
        setInterval(() => {
            this.spawn()
        }, 1500)
        this.spawn()
        this.spawn()
    }
    updateBecauseTick(delta: number): void {
        this.stoppers.forEach((s) => {
            s.container.x -= delta
        })
    }

    clearAll(): void {
        this.container.removeChildren()
        this.stoppers = []
    }
    delete(stopper: StopperIce): void {
        const index = this.stoppers.indexOf(stopper)
        if (!index) return
        this.stoppers.splice(index, 1)
        this.container.removeChild(stopper.container)
    }

    // spawnCalc(delta): void {
    //     if (this.#stoppers.length >= this.#maxSpawn) return;
    //     if (this.#spawnTimer >= this.#spawnDelay) {
    //         this.#spawn();
    //         this.#calculateSpawnDelay();
    //         this.#spawnTimer = 0;
    //     }
    //     this.#spawnTimer += delta;
    // }

    // #calculateSpawnDelay() {
    //     this.#spawnDelay = getRandomInt(2000, 4000);
    // }

    // #handleStoppersOutside() {
    //     this.#stoppers.forEach((stopper) => {
    //         const isOutside = !Collision.check(this.#collisionRect, stopper);
    //         if (isOutside) {
    //             this.#destroy(stopper);
    //         }
    //     });
    // }

    spawn(): void {
        const stopper = new StopperIce(CONFIG.STOPPER_ICE)
        // stopper.anchor.set(0, 1)
        stopper.container.x = this.width
        this.addChilds(stopper.container)
        this.stoppers.push(stopper)
    }
}
