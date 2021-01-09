import * as PIXI from 'pixi.js'
import Scene from './components/Scene'

interface IAppOptions {
    selectorMount: string
    width: number
    height: number
    backgroundColor: string
}
export default abstract class ScenesController {
    protected scenes: Scene[] = []
    protected currentScene: Scene | null = null
    protected abstract app: PIXI.Application
    constructor(scenes: Scene[]) {
        this.addScenes(...scenes)
        // TODO обработка событий переключения
    }

    addScenes(...newScenes: Scene[]): void {
        this.scenes.push(...newScenes)
    }

    addAndShowScene(scene: Scene): void {
        if (!this.scenes.includes(scene)) this.addScenes(scene)

        scene.init()
        if (this.currentScene && this.currentScene !== scene) {
            this.app.stage.removeChild(this.currentScene.container)
        }
        this.currentScene = scene
        this.app.stage.addChild(this.currentScene.container)
    }

    showSceneById(id: string): void {
        const scene = this.getSceneById(id)
        if (scene) this.addAndShowScene(scene)
    }

    private getSceneById(id: string): Scene | null {
        const scene = this.scenes.find((sc) => sc.id === id)
        if (!scene) return null
        return scene
    }
    // сообщаем сценам что был тик приложения
    updateScenesBecauseTick(delta: number): void {
        this.scenes.forEach((s) => s.updateBecauseTick(delta))
    }
}
