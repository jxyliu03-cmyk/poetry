# Deploy the Jamie poetry app

## 1. Connect the request box to Gmail

1. Sign into the Gmail account that should receive poem requests.
2. Open [Google Apps Script](https://script.google.com/) and create a **New project**.
3. In `Code.gs`, delete the starter function and paste the contents of `google-apps-script.gs`.
4. Click **Deploy → New deployment**.
5. Click **Select type → Web app**.
6. Set **Execute as** to **Me**.
7. For a public portfolio, set **Who has access** to **Anyone**. If a Workspace administrator does not permit that option, deploy from a personal Google account or ask the administrator to enable public web apps.
8. Click **Deploy**, approve the requested mail permission, and copy the Web app URL ending in `/exec`.
9. Open `app.js`. At the top, replace the empty value in `const REQUEST_ENDPOINT = '';` with that URL, keeping the quotation marks.
10. Save `app.js` and test one request after publishing the app.

Your Gmail address is not stored in the public app. Apps Script sends each request to the account that deployed the script.

## 2. Publish the app with GitHub Pages

1. Sign into [GitHub](https://github.com/) and create a repository, for example `jamie-poetry-app`.
2. Use a **public** repository if you are using GitHub Free.
3. Choose **Add file → Upload files**.
4. Upload the contents of the `imagery-poem-app` folder so `index.html`, `styles.css`, and `app.js` are at the repository root. Uploading `google-apps-script.gs` and this guide is optional.
5. Commit the uploaded files to the `main` branch.
6. Open **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Select branch **main**, folder **/(root)**, and click **Save**.
9. Wait for GitHub Pages to show the published URL. It normally has the form `https://YOUR-USERNAME.github.io/jamie-poetry-app/`.
10. Open that URL and test poem generation, expansion of the request panel, and delivery of one test request.

## 3. Embed it in Google Sites

1. Open your Google Site in edit mode on a computer.
2. Go to the page where the poetry app should appear.
3. In the right sidebar, choose **Insert → Embed**.
4. Choose **By URL**, paste the GitHub Pages URL, and click **Insert**.
5. Drag the embed handles to make it wide enough. The app is responsive; a taller embed prevents an internal scrollbar.
6. For a dedicated app page, use **Pages → Add → Full page embed** instead and paste the same URL.
7. Click **Preview** and inspect the desktop and mobile views.
8. Click **Publish** to update the Google Site.

Official references: [Google Sites embeds](https://support.google.com/sites/answer/90569?hl=en), [Apps Script web apps](https://developers.google.com/apps-script/guides/web), and [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
