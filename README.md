# Tiller Web Dashboard
Spreadsheets are a great tool for personal finance, but they typically aren't very user friendly when you are on the go. 

The **tiller-web-dashboard** project leverages the ability to deploy Google-Apps-Script web apps to publish a real-time, responsive dashboard for your personal-finance spreadsheets.

[Learn more about Tiller Money](https://www.tillerhq.com/how-tiller-works/).

## Adivsory
*This project is designed for intermediate users and includes only lightweight error checking. We hope it meets your needs out of the box, but further tweaks may be required to get it working in your environment. As a one-off Tiller-Labs release, Tiller offers no warranties or support for this solution. Visit the [Tiller Community](https://community.tillerhq.com/) to solicit help and share your thoughts with our user community.*

## Set Up in Your Host Spreadsheet

### Install the Sample Dashboard Configuration Sheet
Follow the steps below to install the dashboard in your spreadsheet:
1. Open the spreadsheet where you’d like to install the dashboard.
2. Copy the URL from the browser tab.
3. Open the [sample dashboard configuration sheet](https://docs.google.com/spreadsheets/d/1Tub5NMKUTU7Q6_SCtqITdsvd3yfgUb6_-CiGa6W_TGU/).
4. On the `Web Dashboard` sheet tab (at bottom), click `Copy To / Existing spreadsheet`.
5. At the bottom of the pane, below “Or paste a web address here:”, paste the URL of your spreadsheet.
6. Return to your spreadsheet.
7. Rename the new sheet from `Copy of Web Dashboard` to `Web Dashboard`.
8. Learn more about [how to personalize your dashboard](https://community.tillerhq.com/t/mobile-friendly-on-the-go-dashboard-script/2548).

### Install the Script in Your Spreadsheet
1. Open the spreadsheet where you’d like to install the dashboard.
2. Select `Tools / Script editor` in the menu bar.
3. Overwrite the contents of the default `Code.gs` file with the latest [web-dashboard.js script in Github](https://raw.githubusercontent.com/scoover/tiller-web-dashboard/master/web-dashboard.js). The script filename that hosts the code is not important. If you’d like, you can rename it `web-dashboard.gs`.
4. Save the updated script. You will be prompted for a project name (i.e. for the container for all of the project files). Consider something like `Tiller Sheet Scripts`.
5. Select `Publish / Deploy as web app…` in the menu bar.
6. For `Project version`, leave the dropdown set to “New”.
7. For `Execute the app as`, leave the dropdown set to “Me”.
8. For `Who has access to the app`, leave the dropdown set to “Only myself”.
9. Click `Deploy`.
10. An `Authorization Required` pane will appear. Click `Review Permissions` and authenticate.
11. You will be asked to grand the script the following permissions:
- See, edit, create, and delete your spreadsheets in Google Drive
- Connect to an external service
12. If you approve, click `Allow`.
13. A pane will appear that shows your new web app URL. This is what you’ll use to request your dashboard. Copy the URL. Bookmark it.
14. Paste the URL in a new browser tab and check if everything is working.

Hopefully, you're off and running at this point! Have fun and good luck.
