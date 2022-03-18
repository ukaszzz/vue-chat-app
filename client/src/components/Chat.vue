<template>
  <div>
    <p>chat </p>
  </div>
  <div>
     <div>
      <div>
        <div v-for="{message, time, userName} in messageList" style="border: 2px solid red">
          <p>{{ message }}</p>
          <div class='message-meta'>
            <p>{{ time }}</p>
            <p>{{ userName }}</p>
          </div>
        </div>
      </div>
  </div>
  </div>
  <div class='chat-footer'>
    <input type="text" v-model="currentMessage">
    <button @click="sendMessage">&#9658;</button>
  </div>
</template>

<script>

export default {

  name: 'Chat',
  props: {
    socket:Object,
    room:String,
    userName:String
  },
  data() {
    return {
      currentMessage: '',
      messageList: []
    }
  },
  methods: {
     async sendMessage () {
       if (this.currentMessage !== '') {
         const messageDate = {
           room: this.room,
           userName: this.userName,
           message: this.currentMessage,
           time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
         };
         this.messageList = [...this.messageList, messageDate]
         await this.socket.emit('send_message', messageDate);
       }
    },
  },
  created() {
    this.socket.on('receive_message', data => {
      this.messageList = [...this.messageList, data]
    })
  }
}
</script>
