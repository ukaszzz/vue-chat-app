<template>
  <div v-if="!chatVisible" class="joinChatContainer">
    <h3>Join a chat</h3>
    <input
        type="text"
        placeholder="Imię..."
        v-model="userName"
    />
    <input
        type="text"
        placeholder="room id..."
        v-model="room"
    />
    <button @click="joinRoom">Join a room</button>
  </div>
  <Chat v-if="chatVisible" :socket="socket" :user-name="userName" :room="room" />
</template>

<script>
import Chat from "./components/Chat.vue";
import {io} from "socket.io-client";
let socket = io('http://localhost:3001');

export default {
  name: 'App',
  data() {
    return {
      socket: socket,
      userName: '',
      room: '',
      chatVisible: false
    }
  },
  components: {
    Chat
  },
  methods: {
    joinRoom(){
      if(this.userName !== '' && this.room !== '') {
        this.socket.emit('join_room', this.room);
        this.chatVisible = !this.chatVisible
      }
    }
  }

}
</script>
