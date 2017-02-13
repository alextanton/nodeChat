var socket = io();
if(!document.cookie){
  document.cookie = "test=test";
}

$(document).ready(function(){
    $("#send").click(function(){
        socket.emit("chat send", $("#m").val());
        $('#m').val('');
        return false;
    });
    socket.on('chat send', function(msg){
      $('#messages').append($('<li style="float:right;">').text(msg));
    });
});

// $('textarea').submit(function(){
//   socket.emit('chat message', $('#m').val());
//   $('#m').val('');
//   return false;
// });
// socket.on('chat message', function(msg){
//   $('#messages').append($('<li>').text(msg));
// });