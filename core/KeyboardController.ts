import PubSub from './store/PubSub'

export default class KeyboardController {
    private keyName: string
    isDown = false
    isUp = true
    // pattern Observer
    private eventsObserver = new PubSub()
    private nameEventUp = 'UP'
    private nameEventDown = 'Down'
    constructor(keyName: string) {
        this.keyName = keyName
        // TODO оптимизировать подписку, сделать одну глобальню
        window.addEventListener('keydown', this.onButtonDown.bind(this))
        window.addEventListener('keyup', this.onButtonUp.bind(this))
    }
    private onButtonDown(evt: KeyboardEvent): void {
        if (evt.code !== this.keyName) return
        if (this.isUp) this.eventsObserver.publish(this.nameEventDown)
        this.isDown = true
        this.isUp = false
        evt.preventDefault()
    }

    private onButtonUp(evt: KeyboardEvent): void {
        if (evt.code !== this.keyName) return
        if (this.isDown) this.eventsObserver.publish(this.nameEventUp)
        this.isDown = false
        this.isUp = true
        evt.preventDefault()
    }
    addListenerUp(fn: () => void): void {
        this.eventsObserver.subscribe(this.nameEventUp, fn)
    }
    addListenerDown(fn: () => void): void {
        this.eventsObserver.subscribe(this.nameEventDown, fn)
    }
    // unsubscribe(): void {
    // TODO bind вернет новую функцию, и этот способ не подходит
    //     window.removeEventListener('keydown', this.onButtonDown)
    //     window.removeEventListener('keyup', this.onButtonUp)
    // }
}
