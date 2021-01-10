import { SCENES_IDS } from '@/scenes/scenes_ids'
import Store from '@core/store/Store'

const $store = new Store({
    currentScene: SCENES_IDS.INTRO
})

export default $store
