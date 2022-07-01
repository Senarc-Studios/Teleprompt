console.log("Loaded Backend JavaScript.")

const BASE_URL = "http://127.0.0.1:8050"; // Local IP for testing.
let token = null
let username = null

async function getJSON(method_, endpoint, json_ = null) {
	var request = new XMLHttpRequest();
    request.open(
        method_,
        BASE_URL + endpoint
    );
    request.setRequestHeader(
        "Authorization",
        token
    );
    request.send(
        JSON.stringify(json_)
    );

	return await response.json().data;
};

function getInfo() {
	if (token === null) {
		return null;
	};
	const tokenInfo = getJSON("GET", "/api/user/info");

	if (tokenInfo != null) {
		username = tokenInfo.username;
		return tokenInfo;
	} else {
		return console.log("API is down or an error occured.");
	};8
};

function print(content, type) {
	var tag = document.createElement("p");
    if (type === "user") {
        var text = document.createTextNode("<a id='a-colour'>> " + content + "</a>");
        tag.setAttribute("id", "username")
        // Incomplete
    } else {
        var text = document.createTextNode("<a id='b-colour'>> " + content + "</a>");
        tag.setAttribute("id", "message")
    }
	tag.appendChild(text);
	var element = document.getElementById("main");
	element.appendChild(tag);
};

function sendMessage(message=null) {
	if (username === null) {
		return print("You must login with the following command before you can talk: !login <your-senarc-token>");
	};
	if (message === null) {
		var message = document.getElementById("text-box").value;
	};
	print(`${username}: ${message}`);
	document.getElementById("text-box").value = "";
};

var input = document.getElementById("text-box");

function checkResponse(json, token_) {
	if (json['valid'] === true) {
		return true;
	} else {
		return false;
	}
	token = token_;
};

function validate() {
	
	if (input.value === "") {
		return null;
	} else if (input.value.startsWith("!login ")) {
		token = input.value.substr(7);
		const responseJson = getJSON('POST', "/token/verify");

		if (responseJson.valid == true) {
			print("You have been logged in.");
		} else {
			token = true;
			print("Invalid token.");
		};
		
	} else if (input.value.startsWith("!") === false) {
		sendMessage();
	} else {
		return print("Invalid Command.");
	};
};

input.addEventListener("keydown", function (e) {
	if (e.key === "Enter") {
		validate();
	};
});