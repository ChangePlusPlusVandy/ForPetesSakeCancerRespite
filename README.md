# For Pete's Sake Cancer Respite App

This is the official app for For Pete's Sake Cancer Respite Foundation, a non-profit organization that provides respite experiences for cancer patients, caregivers, and their families.

This app is produced by Change++, a non-profit organization at Vanderbilt University which strives to help different charities out by utilizing their software development skills.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (Version 16)
- Yarn
- Expo CLI
- React Native
- Android Studio
- Docker

To get more information on the environment setup, refer to [this doc](https://docs.google.com/document/d/12zr_F1eWDRWJvzlfVJhqumhATxToWSkSEzoUbEGexXI/edit)

### Installation

#### Frontend:

1. Clone the repository: `https://github.com/ChangePlusPlusVandy/ForPetesSakeCancerRespite`
2. Navigate to the project directory: `cd ForPetesSakeCancerRespite`
3. Navigate to the frontend directory: `cd frontend`
4. Install Dependencies: `yarn install`
5. Make sure to set the Configuration file in `frontend/src/Config.js` (create this file if it does not already exist) \
	Create `Config.js` in the same format as `SampleConfig.js`
6. Run the frontend with the command: `npx expo start`

#### Backend:

1. Navigate to Backend Directory: `cd ./backend`
2. Install Dependencies with `npm install`
3. Make sure to also install `docker` and run `sudo docker pull mongo` to get the mongo container
4. Make sure to create a mongoDB database called `FPSCR`
5. Make a new file called `Config.ts` in the `backend/src` folder and fill it in the same format as `SampleConfig.ts`
6. Run the backend by simply typing in `npm run dev` or press f5 on `index.ts` in VSCODE

### Running Application:

#### Frontend:

To simply run it on the web, cd into the frontend folder and type in `npm start` or `npx expo start`
After that pressing w would take you to the webpage, which you can also view as a mobile view by going into [the developer option](https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome)

If you want to run the app on your phone, you might need to tunnel your connection. Do this by running the app with `npx expo start --tunnel` and scan the QR code with the Expo Go app

If you are on WSL, you may also need to run adb (Android Debugger), do this by running the following commands in your powershell (after installing Android Studio and all the other prereqs as outlined in the above doc)

`cd C:\Users\[YOUR_USERNAME_HERE]\AppData\Local\Android\sdk\platform-tools`
`.\adb kill-server`
`.\adb -a nodaemon server start`

#### Backend:

Start up the docker daemon with `sudo dockerd` and then to run the mongoDB container run `sudo docker run --name FPSCR_MongoDB -d -p 27017:27017 mongo`

After that to run the actual project, simply cd into the src directory and type `npm run dev`. You can also run it in the VSCode environment by going to `index.ts` and pressing f5


### NOTE ON PROXYING:

You might run into troubles with trying to connect to your server from your phone. To counter this, use an app like LocalTunnel.
Localtunnel proxies your requests, you can use it by doing the following:
1. Install localtunnel with: `npm install -g localtunnel`
2. Start Localtunnel with: `lt --port <PORT>` (ex: `lt ``port 19000`)

After running localtunnel you will get a URL that you can connect to and paste into your `Config.js` in your `frontend/src` folder

## Best Practices

Make sure to keep up to keep up the same code structure / styling that already exists inside the codebase
In terms of code-style, make sure to install the `Prettier` Extension on VSCODE and format your code by pressing `Ctrl + shift + P` and typing into the textbox `Format Document`

Also make sure to use thorough documentation, adding at the very least a comment at the top of every file/class detailing what the file does as well as comments on any public / non-obvious functions and even comments through the code itself if you ever do anything confusing. Make the code as readable as possible for anyone else to read it and be able to have a good understanding as to what it does, and don't be afraid to split up code into multiple functions

## Contributing 

Make sure when contributing that you create your own branch and create whatever sprint / feature in that branch. Then after you are finished with that, [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). We will review the pull request and might possibly also ask you to update some code before finally merging it into the main branch. 
