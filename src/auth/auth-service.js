import axios from "axios";
import url from "url";
import dotenv from "dotenv";
import os from "os";
import keytar from "keytar";

dotenv.config();

const CLIENT_ID = process.env.AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
const AUTH_URL = process.env.AUTH_URL;

const keytarService = 'rr-oauth';
const keytarAccount = os.userInfo().username;

const REDIRECT_URI = "https://localhost/callback";

let accessToken = null;
let refreshToken = null;

function getAccessToken() {
	return accessToken;
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

		accessToken = response.data.access_token;
		refreshToken = response.data.refresh_token;

		if(refreshToken) {
			console.log("setting refresh token in keytar");
			await keytar.setPassword(keytarService, keytarAccount, refreshToken);
		}
	} catch (error) {
		throw error;
	}
}

async function refreshForAccess() {
  const currentRefreshToken = await keytar.getPassword(keytarService, keytarAccount);

  if (currentRefreshToken) {
	console.log("refresh token found");
	console.log(currentRefreshToken);
    const refreshOptions = {
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
        refresh_token: currentRefreshToken,
    };

    try {
      const response = await axios.post('https://oauth2.sky.blackbaud.com/token', 
		refreshOptions,
		{
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded',
			},
		}
	  );
	  console.log(response.data);

      accessToken = response.data.access_token;
	  refreshToken = response.data.refresh_token;

	  if(refreshToken) {
		console.log("setting refresh token in keytar");
		await keytar.setPassword(keytarService, keytarAccount, refreshToken);
	  }
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("No available refresh token.");
  }
}

export { getAccessToken, getAuthenticationURL, loadTokens, refreshForAccess };
