type Callback = <T>(payload: T) => void
type Events = Record<string, Callback[]>

export default class PubSub {
    private events: Events = {}

    subscribe(evt: string, cb: Callback): void {
        if (!this.events[evt]) this.events[evt] = []

        this.events[evt].push(cb)
    }

    publish(evt: string, data = {}): void {
        if (!this.events[evt]) return

        this.events[evt].forEach((cb) => cb(data))
    }
}
