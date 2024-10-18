import { BrowserWindow } from "electron";
import { loadTokens, getAuthenticationURL } from "../src/auth/auth-service.js";
import createAppWindow from "./app-process.js";

function createAuthWindow() {
	let authWin = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			enableRemoteModule: false,
		},
	});

	authWin.loadURL(getAuthenticationURL());

	const {
		session: { webRequest },
	} = authWin.webContents;

	const filter = {
		urls: ["https://localhost/callback*"],
	};

	webRequest.onBeforeRequest(filter, async ({ url }) => {
		await loadTokens(url);
		createAppWindow();
		authWin.close();
		return;
	});

	authWin.on("closed", () => {
		authWin = null;
	});
}

export default createAuthWindow;
