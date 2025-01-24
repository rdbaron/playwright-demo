import { type Locator, type Page } from '@playwright/test'
 
export class RedditEyeBleach {
    readonly page: Page
    readonly joinBtn: Locator
    readonly joinedBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.joinBtn = page.getByRole("button", { name: 'Join' })
        this.joinedBtn = page.getByRole('button', { name: 'Joined' })
    }

    async goto() {
        await this.page.goto('https://reddit.com/r/EyeBleach')
    }
}