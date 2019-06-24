//add new chat documents
// setting up a real-time listener to get new chats
// update the username 
// update the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
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
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }

    updateUsername(username) {
        this.username = username;
    }

    updateChatroom(room) {
        this.room = room;
        console.log('Room updated');
        if (this.unsub) {
            this.unsub();
        }
    }
}
