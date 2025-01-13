import Cookies from "js-cookie";

export function getJWTToken() {
	let token = Cookies.get("accessToken");
	// //console.log(token);
	if (token) {
		return token;
	} else {
		//console.error("getJWTToken: No access token found");
		return "";
	}
}

export function ParseJwtToken(token: string) {
	if (!token) {
		return;
	}
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace("-", "+").replace("_", "/");
	return JSON.parse(atob(base64));
}

export function getUserIdFromToken() {
	let userId = "";
	const accessToken = getJWTToken();
	if (accessToken) {
		let token = ParseJwtToken(accessToken);
		userId = token["nameid"];
	}
	return userId;
}

export function getUsernameFromToken() {
	let username = "";
	const accessToken = getJWTToken();
	if (accessToken) {
		let token = ParseJwtToken(accessToken);
		username = token["email"];
	}
	return username;
}


export function getUserRoleFromToken() {
	let role = "";
	const accessToken = getJWTToken();
	if (accessToken) {
		let token = ParseJwtToken(accessToken);
		role = token["role"];
	}
	return role;
}

export function getUserRoleFromSpecificToken(accessToken: string) {
	let role = "";
	if (accessToken) {
		let token = ParseJwtToken(accessToken);
		role = token["role"];
	}
	return role;
}

export function getTokenExpirationFromToken(accessToken: string) {
	let expiration = "";
	if (accessToken) {
		let token = ParseJwtToken(accessToken);
		expiration = token["exp"];
	}
	return expiration;
}

export function setJWTToken(token: string) {
	var unixTime = getTokenExpirationFromToken(token);
	const expirationDate = new Date(Number(unixTime) * 1000);
	Cookies.set("accessToken", token, { expires: expirationDate, sameSite: "strict" });
}

export function destroyJWTToken() {
	Cookies.remove("accessToken");
}

export function isJWTTokenValid() {
	return getJWTToken() ? true : false;
}

export function getCsrfTokenFromJwt(accessToken) {
	let csrfToken = "";
	if (accessToken) {
		let token = ParseJwtToken(accessToken);
		csrfToken = token["csrf"];
	}
	return csrfToken;
}


