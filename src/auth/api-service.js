import axios from "axios";
import { getAccessToken } from "./auth-service.js";

//api functions
//each requests need Authorization and Bb-api-subscription-key in header
async function getPrivateData() {
	// const result = await axios.get("http://localhost:3000/private", {
	// 	headers: {
	// 		Authorization: `Bearer ${getAccessToken()}`,
	// 	},
	// });
	console.log("API CALLED");
	return "result";
}

export default getPrivateData;
