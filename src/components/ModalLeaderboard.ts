import * as PIXI from 'pixi.js'
import ModalBase from './ModalBase'
import TEXTS from '@/configs/texts.json'
import STYLES from '@/configs/stylesText.json'
import Button from '@core/components/Button'
import CONFIG from '@/configs/ui.json'
import { generatMockUsersForLeaderboard } from '@/utils'
import { ModalLeaderboardRow } from './ModalLeaderboard/ModalLeaderboardRow'
import $store from '@/store'
import { SCENES_IDS } from '@/scenes/scenes_ids'
import $gsap from '@/plugins/gsap'

export interface IUserLeaderboard {
    name: string
    score: string
}
export default class ModalLeaderboard extends ModalBase {
    private periodText: PIXI.Text
    private btnNext: Button
    private btnPrev: Button
    private btnAgree: Button
    private periodsTypes = [TEXTS.MODAL_LEADERBOARD.all, TEXTS.MODAL_LEADERBOARD.month, TEXTS.MODAL_LEADERBOARD.week]
    private currentCountPeriod = 0
    private currentRows: ModalLeaderboardRow[] = []
    // если нужнт острановить анимацию
    private animationTween: gsap.core.Tween | undefined
    // TODO переделать присваение конфига
    private marginRowsTop = CONFIG.LEADERBOARD_ROWS.marginRowsTop
    private offsetRow = CONFIG.LEADERBOARD_ROWS.offsetRow
    private offsetRowOther = CONFIG.LEADERBOARD_ROWS.offsetRowOther
    constructor() {
        super()
        this.setTitleText(TEXTS.MODAL_LEADERBOARD.header)

        this.periodText = new PIXI.Text(
            this.periodsTypes[this.currentCountPeriod],
            new PIXI.TextStyle(STYLES.LEADERBOARD_PERIOD)
        )
        this.periodText.anchor.set(0.5, 0) // align center
        this.periodText.x = this.container.width / 2
        this.periodText.y = 60 // margin top

        this.btnNext = new Button(CONFIG.BTN_ARROW_RIGHT)
        this.btnNext.addClickListener(() => {
            if (this.currentCountPeriod === 2) return
            this.currentCountPeriod += 1
            this.setPeriodText(this.periodsTypes[this.currentCountPeriod])
            this.createRowsForLeaderboard()
        })

        this.btnPrev = new Button(CONFIG.BTN_ARROW_LEFT)
        this.btnPrev.addClickListener(() => {
            if (this.currentCountPeriod === 0) return
            this.currentCountPeriod -= 1
            this.setPeriodText(this.periodsTypes[this.currentCountPeriod])
            this.createRowsForLeaderboard()
        })

        this.btnAgree = new Button(CONFIG.BTN_AGREE)
        this.btnAgree.addClickListener(() => {
            // обновляем текущую сцену
            $store.updateState({ currentScene: SCENES_IDS.INTRO })
        })
        this.btnAgree.container.pivot.x = this.btnAgree.container.width / 2 // align center
        this.btnAgree.container.x = this.container.width / 2

        this.addChilds(this.periodText, this.btnNext.container, this.btnPrev.container, this.btnAgree.container)
    }
    setPeriodText(text: string): void {
        this.periodText.text = text
    }
    private initializeRow(row: ModalLeaderboardRow, user: IUserLeaderboard, idx: number): void {
        row.container.y =
            idx < 3
                ? this.marginRowsTop + this.offsetRow * idx
                : this.marginRowsTop + this.offsetRow * 3 + (idx - 3) * this.offsetRowOther
        row.setNameText(user.name)
        row.setScoreText(user.score)
    }

    createRowsForLeaderboard(usersInfo: IUserLeaderboard[] = []): void {
        // исполльзуем моки если нет реальных
        if (!usersInfo.length) usersInfo = generatMockUsersForLeaderboard(10)
        // удаляем старые строки
        this.clearAllCurrentRows()
        usersInfo.forEach((user, idx) => {
            let row: ModalLeaderboardRow
            // есть повторяющиеся места, но явное лучше неявного
            switch (idx) {
                case 0:
                    row = new ModalLeaderboardRow({
                        ...CONFIG.LEADERBOARD_TOP_ROW,
                        ...CONFIG.LEADERBOARD_FIRST_TOP_NAME,
                        styles: {
                            name: new PIXI.TextStyle(STYLES.LEADERBOARD_FIRST_TOP_NAME),
                            score: new PIXI.TextStyle(STYLES.LEADERBOARD_FIRST_TOP_SCORE)
                        }
                    })
                    this.initializeRow(row, user, idx)
                    break
                case 1:
                    row = new ModalLeaderboardRow({
                        ...CONFIG.LEADERBOARD_TOP_ROW,
                        ...CONFIG.LEADERBOARD_SECOND_TOP_NAME,
                        styles: {
                            name: new PIXI.TextStyle(STYLES.LEADERBOARD_SECOND_TOP_NAME),
                            score: new PIXI.TextStyle(STYLES.LEADERBOARD_SECOND_TOP_SCORE)
                        }
                    })
                    this.initializeRow(row, user, idx)
                    break
                case 2:
                    row = new ModalLeaderboardRow({
                        ...CONFIG.LEADERBOARD_TOP_ROW,
                        ...CONFIG.LEADERBOARD_THIRD_TOP_NAME,
                        styles: {
                            name: new PIXI.TextStyle(STYLES.LEADERBOARD_THIRD_TOP_NAME),
                            score: new PIXI.TextStyle(STYLES.LEADERBOARD_THIRD_TOP_SCORE)
                        }
                    })
                    this.initializeRow(row, user, idx)
                    break
                default:
                    row = new ModalLeaderboardRow({
                        ...CONFIG.LEADERBOARD_REST_ROWS,
                        countPosition: idx + 1,
                        styles: {
                            name: new PIXI.TextStyle(STYLES.LEADERBOARD_REST_NAME),
                            score: new PIXI.TextStyle(STYLES.LEADERBOARD_REST_SCORE),
                            countPosition: new PIXI.TextStyle(STYLES.LEADERBOARD_REST_ROWS_COUNT)
                        }
                    })
                    this.initializeRow(row, user, idx)
                    break
            }
            if (row) this.currentRows.push(row)
        })
        this.showCurrentRows()
    }

    showCurrentRows(): void {
        console.log('rows', this.currentRows.length, this.container.children)
        // если есть запущенная анимация то убиваем ее
        // P.S. у прошедшей как же можно вызывать
        this.animationTween?.kill()

        const containersRows = this.currentRows.map((r) => r.container)
        this.addChilds(...containersRows)
        this.animationTween = $gsap.from(containersRows, { pixi: { alpha: 0 }, x: 60, ease: 'bounce', stagger: 0.13 })
    }
    clearAllCurrentRows(): void {
        this.currentRows.forEach((r) => {
            r.container.destroy()
        })
        this.currentRows = []
    }
}
