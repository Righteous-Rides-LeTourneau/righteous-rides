import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createAppWindow() {
	let win = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			enableRemoteModule: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);
	win.setMenuBarVisibility(isDev);

	win.on("closed", () => {
		win = null;
	});
}

export default createAppWindow;
