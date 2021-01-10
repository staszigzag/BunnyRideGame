import '@/styles/index.scss'
import BunnyRide from './App'
import KeyboardController from '@core/KeyboardController'
import $store from './store'
import { SCENES_IDS } from './scenes/scenes_ids'

// ждем когда все загрузится
window.addEventListener('load', () => {
    const app = new BunnyRide()
})

const Key = new KeyboardController('KeyQ')
Key.addListenerDown(() => {
    $store.updateState({ currentScene: SCENES_IDS.INTRO })
})
