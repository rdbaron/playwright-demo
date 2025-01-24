import { type Locator, type Page } from '@playwright/test'
 
export class RedditCommentsPage {
    readonly page: Page
    readonly storyTitle: Locator

    constructor(page: Page) {
        this.page = page
    }

    async storyHasTitle(title: string) {
        return this.page.getByText(title)
    }
}