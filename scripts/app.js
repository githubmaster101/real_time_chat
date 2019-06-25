// DOM queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateUsername(newName);
    // reset the form
    newNameForm.reset();
    // show then hide teh update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => { updateMssg.innerText = '' }, 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
    if (e.target.tagName === "BUTTON") {
        chatui.clearRoom();
        chatroom.updateChatroom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatui.render(chat));
    }
});

// check local storage for username
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatui = new ChatUI(chatlist);
const chatroom = new Chatroom('gaming', username);

// get chats and render
chatroom.getChats(data => chatui.render(data));