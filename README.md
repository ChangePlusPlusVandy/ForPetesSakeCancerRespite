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

### Installation

1. Clone the repository: `https://github.com/ChangePlusPlusVandy/ForPetesSakeCancerRespite`
2. Navigate to the project directory: `cd ForPetesSakeCancerRespite`
3. Navigate to the frontend directory: `cd frontend`
4. Install Dependencies: `yarn install`
5. Make sure to set the Configuration file in `frontend/src/Config.js` (create this file if it does not already exist) \
	Create `Config.js` in the same format as `SampleConfig.js`
6. Run the frontend with the command: `npx expo start`

Now working on the Backend;

1. Navigate to Backend Directory: `cd ./backend`
2. Install Dependencies with `npm install`

TODO: (Add other steps about starting docker / setting up configuration files)

3. Run the backend by simply typing in `npm run dev` or press f5 on `index.ts` in VSCODE


### NOTE ON PROXYING:

You might run into troubles with trying to connect to your server from your phone. To counter this, use an app like LocalTunnel.
Localtunnel proxies your requests, you can use it by doing the following:
1. Install localtunnel with: `npm install -g localtunnel`
2. Start Localtunnel with: `lt --port <PORT>` (ex: `lt ``port 19000`)