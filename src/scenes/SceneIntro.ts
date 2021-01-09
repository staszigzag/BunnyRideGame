import Scene, { ISceneOptions } from '@core/components/Scene'
import ModalIntro from '@/components/ModalIntro'
import { randomNumder } from '@/utils'

export default class SceneIntro extends Scene {
    protected modalIntro: ModalIntro
    constructor(options: ISceneOptions) {
        super(options)
        this.modalIntro = new ModalIntro()
        // центруем модалку посредине сцены
        this.modalIntro.container.x = this.container.width / 2
        this.modalIntro.container.y = 15 // margin top
        this.addChilds(this.modalIntro.container)
    }
    // при активации сцены вызывается init
    init(): void {
        this.modalIntro.setScoreText(`${randomNumder(100, 900)}`)
    }
}
