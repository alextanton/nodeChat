var socket = io();

$(document).ready(function(){
    $("#send").click(function(){
        socket.emit("chat send", {"msg":$("#m").val(), "from": document.cookie});
        $('#m').val('');
        return false;
    });
    socket.on('chat send', function(options){
      console.log(options.from)
      if(options.from == document.cookie){
        $('.row').append($('<div style="clear: both; margin-top: 10px;padding-left: 5px; padding-right: 5px;border-radius: 3px;background-color: #7bc4ef; max-width: 75%; float: right">').append("<h5>"+options.msg+"</h5>"));
      } else{
        $('.row').append($('<div style="clear: both; margin-top: 10px;padding-left: 5px; padding-right: 5px;border-radius: 3px;background-color: #62bf6e; max-width: 75%; float: left">').append("<h5>"+options.msg+"</h5>"));
      }
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