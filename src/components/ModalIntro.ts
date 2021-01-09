import * as PIXI from 'pixi.js'
import ModalBase from './ModalBase'
import TEXTS from '@/configs/texts.json'
import STYLES from '@/configs/stylesText.json'
import Button from '@core/components/Button'
import CONFIG from '@/configs/ui.json'
import $store from '@/store'
import { SCENES_IDS } from '@/scenes/scenes_ids'

export default class ModalIntro extends ModalBase {
    private titleTextSprite: PIXI.Text
    private scoreTextSprite: PIXI.Text

    constructor() {
        super()
        this.setTitleText(TEXTS.MODAL_INTRO.header)

        this.titleTextSprite = new PIXI.Text(TEXTS.MODAL_INTRO.title, new PIXI.TextStyle(STYLES.INTRO_TITLE))
        this.titleTextSprite.anchor.set(0.5, 0) // align center
        this.titleTextSprite.x = this.container.width / 2
        this.titleTextSprite.y = 100 // margin top

        this.scoreTextSprite = new PIXI.Text('', new PIXI.TextStyle(STYLES.INTRO_TITLE))
        this.scoreTextSprite.anchor.set(0.5, 0) // align center
        this.scoreTextSprite.x = this.container.width / 2
        this.scoreTextSprite.y = 170 // margin top

        const btnLeaderboard = new Button(CONFIG.BTN_LEADERBOARD)
        btnLeaderboard.addClickListener(() => {
            // обноыляем стор
            $store.updateState({ currentScene: SCENES_IDS.LEADER_BOARD })
        })
        const btnPlayGame = new Button(CONFIG.BTN_PLAY_GAME)
        btnPlayGame.addClickListener(() => {
            $store.updateState({ currentScene: SCENES_IDS.GAME })
        })

        this.addChilds(this.titleTextSprite, this.scoreTextSprite, btnLeaderboard.container, btnPlayGame.container)
    }
    setScoreText(text: string): void {
        this.scoreTextSprite.text = text
    }
}
