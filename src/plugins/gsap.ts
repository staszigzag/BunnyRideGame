import * as PIXI from 'pixi.js'
import { gsap as $gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

// регистрируем сам плагин
$gsap.registerPlugin(PixiPlugin)

// даем плагину ссылку на объект PIXI
PixiPlugin.registerPIXI(PIXI)

// $gsap.ticker.add(() => {
//     // app.ticker.update()
// })

export default $gsap
