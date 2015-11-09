var serviceURL = document.URL; //Url from document source
var socket = io.connect(serviceURL); //new socket connected to serviceURL

//On socket conenction
socket.on('connect', function(){
    var chatobj=document.getElementById("chat"); //gets chat DOM object
	chatobj.innerHTML=chatobj.innerHTML+'</br>'+"Conectado al servidor";
	chatobj.scrollTop = chatobj.scrollHeight; //scrolls down
});

//On message receive (custom event)
socket.on('receive', function(msg) {
    var chatobj=document.getElementById("chat"); //gets chat DOM object
	chatobj.innerHTML=chatobj.innerHTML+'</br>'+msg; //appends msg to content
	chatobj.scrollTop = chatobj.scrollHeight; //scrolls down
});

//On disconnection
socket.on('disconnect', function() {
    var chatobj=document.getElementById("chat"); //gets chat DOM object
	chatobj.innerHTML=chatobj.innerHTML+'</br>'+"Server Desconectado";
	chatobj.scrollTop = chatobj.scrollHeight; //scrolls down
});

//sends message
function send() {
	var input = document.getElementById("userInput").value; //reads userInput value
	document.getElementById("userInput").value=""; //erases userInput value in html
	if(input.trim().length>0)	socket.emit('msg',input.trim()); //if input longer than 0, emits message
}
