import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

import createAppWindow from "./app-process.js";
import createAuthWindow from "./auth-process.js";
import getPrivateData from "../src/auth/api-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function showWindow() {
	try {
		await refreshTokens();
		createAppWindow();
	} catch (err) {
		createAuthWindow();
	}
}

//remoteMain.initialize();

app.on("ready", () => {
	ipcMain.handle("api:get-private-data", getPrivateData);

	showWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
