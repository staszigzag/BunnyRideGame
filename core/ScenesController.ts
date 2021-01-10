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

    showSceneById(id: string): void {
        const scene = this.getSceneById(id)
        if (scene) this.showScene(scene)
    }

    addScenes(...newScenes: Scene[]): void {
        this.scenes.push(...newScenes)
    }

    private showScene(scene: Scene): void {
        scene.init()
        if (this.currentScene?.id === scene.id) return
        if (this.currentScene) this.app.stage.removeChild(this.currentScene.container)
        this.currentScene = scene
        this.app.stage.addChild(this.currentScene.container)
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
