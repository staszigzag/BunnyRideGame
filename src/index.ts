import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

import '@/styles/index.scss'
import BunnyRide from './App'

// register the plugin
gsap.registerPlugin(PixiPlugin)

// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI)

// ждем когда все загрузится
window.addEventListener('load', () => {
    const app = new BunnyRide()
})
