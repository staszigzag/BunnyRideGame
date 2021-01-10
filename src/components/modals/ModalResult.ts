import * as PIXI from 'pixi.js'
import ModalBase from './ModalBase'
import TEXTS from '@/configs/texts.json'
import STYLES from '@/configs/stylesText.json'
import Button from '@core/components/Button'
import CONFIG from '@/configs/ui.json'
import $store from '@/store'
import { SCENES_IDS } from '@/scenes/scenes_ids'

export default class ModalResult extends ModalBase {
    private btnAgree: Button
    private scoreText: PIXI.Text

    constructor() {
        super()
        this.setTitleText(TEXTS.MODAL_RESULT.header)

        this.btnAgree = new Button(CONFIG.BTN_AGREE)
        this.btnAgree.addClickListener(() => {
            // обновляем текущую сцену
            $store.updateState({ currentScene: SCENES_IDS.INTRO })
        })
        this.btnAgree.container.pivot.x = this.btnAgree.container.width / 2 // align center
        this.btnAgree.container.x = this.container.width / 2

        this.scoreText = new PIXI.Text('94', new PIXI.TextStyle(STYLES.RESULT_SCORE))
        this.scoreText.anchor.set(0.5, 0) // align center
        this.scoreText.x = this.container.width / 2
        this.scoreText.y = 60 // margin top

        this.addChilds(this.btnAgree.container, this.scoreText)
    }
    setScoreText(text: string): void {
        this.scoreText.text = text
    }
}
