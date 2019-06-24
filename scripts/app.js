// DOM queries
const chatlist = document.querySelector('.chat-list');

// class instances
const chatui = new ChatUI(chatlist);
const chatroom = new Chatroom('gaming', 'kevin');

// get chats and render
chatroom.getChats(data => chatui.render(data));