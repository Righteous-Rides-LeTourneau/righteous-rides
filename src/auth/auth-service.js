import axios from "axios";
import url from "url";

import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
const AUTH_URL = process.env.AUTH_URL;

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

	const options = {
		method: "POST",
		url: `https://oauth2.sky.blackbaud.com/token`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: JSON.stringify(exchangeOptions),
	};

	console.log("Exchange Options:", exchangeOptions);
	console.log("Request Options:", options);

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
		// profile = jwtDecode(response.data.id_token);
		refreshToken = response.data.refresh_token;
	} catch (error) {
		throw error;
	}
}

// async function refreshTokens() {
//   const refreshToken = await keytar.getPassword(keytarService, keytarAccount);

//   if (refreshToken) {
//     const refreshOptions = {
//       method: 'POST',
//       url: `https://${auth0Domain}/oauth/token`,
//       headers: {'content-type': 'application/json'},
//       data: {
//         grant_type: 'refresh_token',
//         client_id: clientId,
//         refresh_token: refreshToken,
//       }
//     };

//     try {
//       const response = await axios(refreshOptions);

//       accessToken = response.data.access_token;
//       profile = jwtDecode(response.data.id_token);
//     } catch (error) {
//       await logout();

//       throw error;
//     }
//   } else {
//     throw new Error("No available refresh token.");
//   }
// }

// async function logout() {
//   await keytar.deletePassword(keytarService, keytarAccount);
//   accessToken = null;
//   profile = null;
//   refreshToken = null;
// }

// function getLogOutUrl() {
//   return `https://${auth0Domain}/v2/logout`;
// }

export { getAccessToken, getAuthenticationURL, loadTokens };
