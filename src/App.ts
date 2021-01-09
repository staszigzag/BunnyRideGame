import { CONFIG_APP } from '@/configs/app.json'
import App from '@core/App'
import SceneIntro from './scenes/SceneIntro'
import SceneLeaderboard from './scenes/SceneLeaderboard'
import { SCENES_IDS } from './scenes/scenes_ids'
import $store from './store'

export default class BunnyRide extends App {
    constructor() {
        const size = {
            height: CONFIG_APP.height,
            width: CONFIG_APP.width
        }
        // размер сцен такой же как и у всего приложения
        const sceneIntro = new SceneIntro({ id: SCENES_IDS.INTRO, ...size })
        const sceneLeaderboard = new SceneLeaderboard({ id: SCENES_IDS.LEADER_BOARD, ...size })
        // регистрируем все сцены
        super(CONFIG_APP, [sceneIntro, sceneLeaderboard])
        // и показываем нужную
        $store.subscribe((state) => {
            // TODO оптимизировать обработку событий из стора
            this.showSceneById(state.currentScene)
        })
    }
}
