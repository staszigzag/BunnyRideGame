import * as PIXI from 'pixi.js'
import ModalBase from './ModalBase'
import TEXTS from '@/configs/texts.json'
import STYLES from '@/configs/stylesText.json'
import Button from '@core/components/Button'
import CONFIG from '@/configs/ui.json'
import $store from '@/store'
import { SCENES_IDS } from '@/scenes/scenes_ids'

export default class ModalIntro extends ModalBase {
    private titleText: PIXI.Text
    private scoreText: PIXI.Text
    private btnLeaderboard: Button
    private btnPlayGame: Button

    constructor() {
        super()
        this.setTitleText(TEXTS.MODAL_INTRO.header)

        this.titleText = new PIXI.Text(TEXTS.MODAL_INTRO.title, new PIXI.TextStyle(STYLES.INTRO_TITLE))
        this.titleText.anchor.set(0.5, 0) // align center
        this.titleText.x = this.container.width / 2
        this.titleText.y = 100 // margin top

        this.scoreText = new PIXI.Text('', new PIXI.TextStyle(STYLES.INTRO_TITLE))
        this.scoreText.anchor.set(0.5, 0) // align center
        this.scoreText.x = this.container.width / 2
        this.scoreText.y = 170 // margin top

        this.btnLeaderboard = new Button(CONFIG.BTN_LEADERBOARD)
        this.btnLeaderboard.addClickListener(() => {
            // обноыляем стор
            $store.updateState({ currentScene: SCENES_IDS.LEADER_BOARD })
        })
        this.btnPlayGame = new Button(CONFIG.BTN_PLAY_GAME)
        this.btnPlayGame.addClickListener(() => {
            $store.updateState({ currentScene: SCENES_IDS.GAME })
        })

        this.addChilds(this.titleText, this.scoreText, this.btnLeaderboard.container, this.btnPlayGame.container)
    }
    setScoreText(text: string): void {
        this.scoreText.text = text
    }
}
