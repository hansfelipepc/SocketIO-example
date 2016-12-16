(function (d, io) {
    'use strict';

    var io = io(),
        chatForm = d.querySelector('#chat-form'),
        messageText = d.querySelector('#message-text'),
        chat = d.querySelector('#chat');

    chatForm.onsubmit = function (e) {
        e.preventDefault();
        io.emit('new message', messageText.value);
        messageText.value = null;
        return false;
    };

    io.on('new user', function (newUser) {
        alert(newUser.message);
    });

    io.on('user says', function (userSays) {
        chat.insertAdjacentHTML('beforeend', '<li>' + userSays + '</li>');
    });

    io.on('bye bye user', function (byeByeUser) {
        alert(byeByeUser.message);
    });
})(document, io);