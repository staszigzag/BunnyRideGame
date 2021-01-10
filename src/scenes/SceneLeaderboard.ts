import Scene, { ISceneOptions } from '@core/components/Scene'
import ModalLeaderboard from '@/components/ModalLeaderboard'

export default class SceneLeaderboard extends Scene {
    private modalLeaderboard: ModalLeaderboard
    constructor(options: ISceneOptions) {
        super(options)
        this.modalLeaderboard = new ModalLeaderboard()
        // центруем модалку посредине сцены
        this.modalLeaderboard.container.x = this.container.width / 2
        this.modalLeaderboard.container.y = 15 // margin top
        this.addChilds(this.modalLeaderboard.container)
    }
    // при активации сцены вызывается init
    init(): void {
        // заполняем юзерами таблицу
        this.modalLeaderboard.createRowsForLeaderboard()
    }
    updateBecauseTick(): void {
        // TODO
    }
}
