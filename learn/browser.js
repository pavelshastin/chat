if (!window.WebSocket) console.log("No websockets are available. Upgrade your browser");

var socket = new WebSocket("wss:/localhost:8080");

document.forms.publish.onsubmit = function(e) {

	var message = this.message.value; 

	socket.send(message);
}


function showMessage(message) {

	var mes = document.createElement("div");
	mes.appendChild(document.appendTextNode(message));

	document.getElementById("subscribe").appendChild(mes);
}


socket.onmessage = function(event) {
	var incommingMessage = event.data;
	showMessage(incommingMessage)

}