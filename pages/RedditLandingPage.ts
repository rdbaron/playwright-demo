import { type Locator, type Page } from '@playwright/test'
 
export class RedditLandingPage {
    readonly page: Page
    readonly loginBtn: Locator
    readonly loginHeader: Locator
    readonly googleCloseBtn: Locator
    readonly firstStory: Locator
    readonly popularBtn: Locator
    readonly firstStorySubreddit: Locator
    readonly homeBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.loginBtn = page.getByTestId('login-button')
        this.googleCloseBtn = page.locator('iframe[title="Sign in with Google Dialog"]').contentFrame().getByLabel('Close')
        this.popularBtn = page.getByRole('link', { name: 'Popular' })
        /* This is a highly fickle way to identify the top story on the page.  It's hard to realistically even do enough testing
           to ensure this will work consistently even in the short term, but I don't see an alternative.  If I had access to the dev
           team, I would engage them to provide better HTML attributes */
        this.firstStory = page.getByRole('link').nth(9)
        this.firstStorySubreddit = page.getByRole('link').nth(10)
    }

    async goto() {
        await this.page.goto('https://reddit.com')
    }

    async closeGoogleDialog() {
        try {
            await this.googleCloseBtn.waitFor({
                state: 'visible',
                timeout: 5000,
            })
        } catch {
            return false
        }
        await this.googleCloseBtn.click()
        return true
    }

    async searchHasPlaceholder(placeholder: string) {
        return this.page.getByPlaceholder(placeholder)
    }
}