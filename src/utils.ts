import { IUserLeaderboard } from './components/ModalLeaderboard'

export const randomNumder = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
export const generatMockUsersForLeaderboard = (count: number): IUserLeaderboard[] => {
    const users: IUserLeaderboard[] = []
    for (let index = 0; index < count; index += 1) {
        users.push({
            name: `User ${randomNumder(1, 300)}`,
            score: `${42 - index}`
        })
    }
    return users
}
