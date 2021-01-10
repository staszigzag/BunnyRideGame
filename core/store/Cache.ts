export default class Cache<T> {
    private records: Record<string, T> = {}

    get(key: string): T | null {
        return this.records[key] ? this.records[key] : null
    }

    add(key: string, data: T): void {
        this.records[key] = data
    }
}
