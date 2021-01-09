// import PubSub from './pubSub'

type Callback<P> = (payload: P) => void

export default class Store<S> {
    // private events = new PubSub()
    private subscribers: Callback<S>[] = []
    private state: S

    constructor(initState: S) {
        this.state = initState
    }
    getState(): S {
        return this.state
    }

    updateState(newState: Partial<S>): void {
        this.state = {
            ...this.state,
            ...newState
        }
        this.notifySubscribers()
    }

    subscribe(subscriber: Callback<S>): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber)
            this.notifySubscriber(subscriber)
        }
    }

    unsubscribe(subscriber: Callback<S>): void {
        if (!this.subscribers.includes(subscriber)) return

        const index = this.subscribers.indexOf(subscriber)
        this.subscribers.splice(index, 1)
    }

    private notifySubscribers(): void {
        this.subscribers.forEach((subscriber) => {
            this.notifySubscriber(subscriber)
        })
    }

    private notifySubscriber(subscriber: Callback<S>): void {
        subscriber(this.state)
    }
}
