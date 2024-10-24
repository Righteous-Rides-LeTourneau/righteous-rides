import axios from "axios";
import url from "url";
import dotenv from "dotenv";
import os from "os";
import keytar from "keytar";
import { app } from "electron";
import path from "path";

dotenv.config({
	path: app.isPackaged
		? path.join(process.resourcesPath, ".env")
		: path.resolve(process.cwd(), ".env"),
});

const CLIENT_ID = process.env.AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
const AUTH_URL = process.env.AUTH_URL;

const keytarService = "rr-oauth";
const keytarAccount = os.userInfo().username;

const REDIRECT_URI = "https://localhost/callback";

let accessToken = null;
let refreshToken = null;

function getAccessToken() {
	return accessToken;
}

async function setAccessTokenKeytar(newAccessToken) {
	accessToken = newAccessToken;
	await keytar.setPassword(keytarService, keytarAccount, refreshToken);
}

function getAuthenticationURL() {
	return `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
}

async function loadTokens(callbackURL) {
	const urlParts = url.parse(callbackURL, true);
	const query = urlParts.query;

	const exchangeOptions = {
		grant_type: "authorization_code",
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		code: query.code,
		redirect_uri: REDIRECT_URI,
	};

	try {
		const response = await axios.post(
			"https://oauth2.sky.blackbaud.com/token",
			exchangeOptions,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		refreshToken = response.data.refresh_token;
		await setAccessTokenKeytar(response.data.access_token);
	} catch (error) {
		throw error;
	}
}

async function refreshForAccess() {
	const currentRefreshToken = await keytar.getPassword(
		keytarService,
		keytarAccount
	);

	if (!currentRefreshToken) {
		throw new Error("No available refresh token.");
	}

	const refreshOptions = {
		grant_type: "refresh_token",
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		refresh_token: currentRefreshToken,
	};

	try {
		const response = await axios.post(
			"https://oauth2.sky.blackbaud.com/token",
			refreshOptions,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		console.log(response.data);

		refreshToken = response.data.refresh_token;
		await setAccessTokenKeytar(response.data.access_token);
	} catch (error) {
		throw error;
	}
}

export { getAccessToken, getAuthenticationURL, loadTokens, refreshForAccess };
