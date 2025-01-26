import { test, expect } from '@playwright/test'
import { RedditLandingPage } from '../pages/RedditLandingPage'
import { RedditLoginPopup } from '../pages/RedditLoginPopup'
import { RedditCommentsPage } from '../pages/RedditCommentsPage'
import { RedditEyeBleach } from '../pages/RedditEyeBleach'

test.describe('reddit', () => {
    test.beforeEach(async ({ page }) => {
      const redditLandingPage = new RedditLandingPage(page)
      await redditLandingPage.goto()
      /* Deal with the Google Sign-in dialog that sometimes appears */
      await redditLandingPage.closeGoogleDialog()
    })
  
    test('can register new users', async ({ page }) => {
      /* Generating a unique username so the test can be run multiple times in parallel.
         This can be much more complex depending on our needs, but this seems adequate
         for this exercise. I've also assumed that the assignment warning about not
         exposing account details is meant for my own personal account and not this 
         test password.  If we needed to hide this, we would do so by using local environment
         files and/or secrets in our CI tool */
      const user = `example${Date.now()}@yopmail.com`
      const password = 'test1234'
      const redditLandingPage = new RedditLandingPage(page)
      const redditLoginPopup = new RedditLoginPopup(page)

      await redditLandingPage.loginBtn.click()
      await redditLoginPopup.signUpBtn.click()
      await redditLoginPopup.emailSignUpTextBox.fill(user)
      await redditLoginPopup.emailContinueBtn.click()
      await redditLoginPopup.skipBtn.click()
      await redditLoginPopup.passwordTextBox.fill(password)
      await expect(redditLoginPopup.passwordContinueBtn).toBeEnabled()
      /* It seems that reddit blocks account creation via automated tooling.  I've ended the 
         test here as a result, but if it were to continue there would be two more dialogs to get
         through.  They are skippable, so their inclusion would depend on whether or not that was 
         functionality we were aiming to test.  Once complete, I would verify the process worked
         by checking for the absence of the Login button and validating user details in the profile
         menu */
    })

    test('can click through to first story', async ({ page }) => {
        const redditLandingPage = new RedditLandingPage(page)
        const redditCommentsPage = new RedditCommentsPage(page)
        const firstStoryTitle: string = await redditLandingPage.firstStory.textContent() || ''
        const searchPlaceHolder: string = await redditLandingPage.firstStorySubreddit.textContent() || ''

        await redditLandingPage.firstStory.click()
        expect(redditCommentsPage.storyHasTitle(firstStoryTitle)).toBeTruthy()
        expect(redditLandingPage.searchHasPlaceholder(searchPlaceHolder)).toBeTruthy()
        await expect(redditLandingPage.popularBtn).not.toBeFocused()
    })

    test('can join subreddit', async ({ page }) => {
        const user = 'playwrightdemo'
        const password = 'test1234'
        const redditLandingPage = new RedditLandingPage(page)
        const redditLoginPopup = new RedditLoginPopup(page)
        const redditEyeBleach = new RedditEyeBleach(page)

        await redditEyeBleach.goto()
        await redditLandingPage.closeGoogleDialog()
        await redditLandingPage.loginBtn.click()
        await redditLoginPopup.emailTextBox.fill(user)
        await redditLoginPopup.passwordTextBox.fill(password)
        await redditLoginPopup.loginBtn.click()

        await redditEyeBleach.joinBtn.click()
        await expect(redditEyeBleach.joinedBtn).toBeVisible()

        // Cleaning up the default state for the next test run
        await redditEyeBleach.joinedBtn.click()
        await expect(redditEyeBleach.joinBtn).toBeVisible()
    })
  })