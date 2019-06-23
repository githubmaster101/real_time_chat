//add new chat documents
// setting up a real-time listener to get new chats
// update the username 
// update the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }

    async addChat(message) {
        //format chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback) {
        this.chats
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }
}

const chatroom = new Chatroom('gaming', 'kevin');

chatroom.addChat('Live amazing life');

chatroom.getChats(data => {
    console.log(data);
});
