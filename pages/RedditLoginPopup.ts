import { type Locator, type Page } from '@playwright/test'
 
export class RedditLoginPopup {
    readonly page: Page
    readonly signUpBtn: Locator
    readonly loginHeader: Locator
    readonly signUpHeader: Locator
    readonly emailSignUpTextBox: Locator
    readonly emailContinueBtn: Locator
    readonly skipBtn: Locator
    readonly passwordTextBox: Locator
    readonly passwordContinueBtn: Locator
    readonly loginBtn: Locator
    readonly emailTextBox: Locator

    constructor(page: Page) {
        this.page = page
        this.signUpBtn = page.getByText('New to Reddit?').getByRole('link', { name: 'Sign Up' })
        this.signUpHeader = page.getByRole('heading', { name: 'Sign Up' })
        this.emailSignUpTextBox = page.getByRole('textbox', { name: 'Email *' })
        this.emailContinueBtn = page.locator('faceplate-tabpanel > auth-flow-modal > div:nth-child(3)').first().getByRole('button', { name: 'Continue' })
        this.skipBtn = page.getByRole('button', { name: 'Skip' })
        this.passwordTextBox = page.getByRole('textbox', { name: 'Password *' })
        this.passwordContinueBtn = page.locator('auth-flow-modal:nth-child(3) > div:nth-child(3)').getByRole('button', { name: 'Continue' })
        this.loginBtn = page.getByRole('button', { name: 'Log In' })
        this.emailTextBox = page.getByRole('textbox', { name: 'Email or username *' })
    }
}