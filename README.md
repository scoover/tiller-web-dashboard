# Tiller Web Dashboard
Spreadsheets are a great tool for personal finance, but they typically aren't very user friendly when you are on the go. 

The **tiller-web-dashboard** project leverages the ability to deploy Google-Apps-Script web apps to publish a real-time, responsive dashboard for your personal-finance spreadsheets.

[Learn more about Tiller Money](https://www.tillerhq.com/how-tiller-works/).

## Warnings
- This project is designed for intermediate users and includes only lightweight error checking. We hope it meets your needs out of the box, but further tweaks may be required to get it working in your environment. As a one-off Tiller-Labs release, Tiller offers no warranties or support for this solution. Visit the [Tiller Community](https://community.tillerhq.com/) to solicit help and share your thoughts with our user community.*
- Before running the script, you will see a message from Google that says ["This app isn't verified."](https://support.google.com/cloud/answer/7454865) This is normal since you will have just created the script. Review the code and make sure you are comfortable with what it is doing— again this script is for intermediate & advanced users. You will need to click an authorization button from Google that says `Go to <your script name> (unsafe)` to run the script.

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
1. If you don't already have the spreadsheet you want to work with open the spreadsheet where you’d like to install the dashboard.
2. Select `Tools / Script editor` in the menu bar.
3. Select all and delete the default contents of the `Code.gs` file.
4. Paste in the latest [web-dashboard.js script in Github](https://raw.githubusercontent.com/scoover/tiller-web-dashboard/master/web-dashboard.js) into the `Code.gs` file. The filename for the script that hosts the code is not important. If you’d like, you can rename it `web-dashboard.gs` by clicking the triangle beside `Code.gs`.
5. Save the updated script. You will be prompted for a project name (i.e. for the container for all of the project files). Consider something like `Tiller Sheet Scripts`.
6. Select `Publish / Deploy as web app…` in the menu bar.
7. For `Project version`, leave the dropdown set to “New”.
8. For `Execute the app as`, leave the dropdown set to “Me”.
9. For `Who has access to the app`, leave the dropdown set to “Only myself”.
10. Click `Deploy`.
11. An `Authorization Required` pane will appear. Click `Review Permissions` and authenticate. 
12. You will be asked to grand the script the following permissions: "See, edit, create, and delete your spreadsheets in Google Drive" & "Connect to an external service"
13. If you approve, click `Allow`.
14. A pane will appear titled: `Deploy as web app`. It should say "This project is now deployed as a web app." Below this message, you will see your new web app URL. This is what you’ll use to request your dashboard. Copy the URL. Bookmark it.
15. Paste the URL in a new browser tab and check if everything is working.
16. Since you just created a new & unverified script, you will likely see a warning screen from Google that says ["This app isn't verified."](https://support.google.com/cloud/answer/7454865) If you have reviewed the code and are comfortable proceeding, click on Advanced link (in the lower right) then on `Go to <your script name> (unsafe)`.

Hopefully, you're off and running at this point! Have fun and good luck.

## FAQ

### Do I need to add the `web-dashboard-template.html` file to my project?
No. The default `web-dashboard-template.html` file is hosted by Tiller [here](https://storage.googleapis.com/assets.templates.tillermoney.com/tillerLabs/html/web-dashboard-template.html) and is referenced in the header of the source code. If you'd like to modify the way the dashboard renders, feel free to create and host your own version of the `web-dashboard-template.html` and update the source code to point to your personal template. (You will need to re-deploy the web app.)
