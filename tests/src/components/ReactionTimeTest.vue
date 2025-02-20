<template>
    <div class="container">
      <div class="reaction-test" :class="stateClass" @click="handleClick">
        <p v-if="state === 'waiting'">Нажмите, чтобы начать</p>
        <p v-if="state === 'ready'">Ждите зелёного...</p>
        <p v-if="state === 'click'">Жмите!</p>
        <p v-if="state === 'tooSoon'">Слишком рано!</p>
        <p v-if="state === 'result'">Ваше время: {{ reactionTime }} мс</p>
      </div>
      <button class="back-button" @click="$emit('exit')">Назад</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        state: 'waiting',
        startTime: 0,
        reactionTime: null,
        timeout: null,
      };
    },
    computed: {
      stateClass() {
        return {
          'waiting': this.state === 'waiting',
          'ready': this.state === 'ready',
          'click': this.state === 'click',
          'tooSoon': this.state === 'tooSoon',
        };
      },
    },
    methods: {
      handleClick() {
        if (this.state === 'waiting') {
          this.startTest();
        } else if (this.state === 'ready') {
          clearTimeout(this.timeout);
          this.state = 'tooSoon';
        } else if (this.state === 'click') {
          this.endTest();
        } else if (this.state === 'result' || this.state === 'tooSoon') {
          this.resetTest();
        }
      },
      startTest() {
        this.state = 'ready';
        const delay = Math.floor(Math.random() * 3000) + 2000;
        this.timeout = setTimeout(() => {
          this.state = 'click';
          this.startTime = Date.now();
        }, delay);
      },
      endTest() {
        this.reactionTime = Date.now() - this.startTime;
        this.state = 'result';
      },
      resetTest() {
        this.state = 'waiting';
        this.reactionTime = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: transparent;
  }
  .reaction-test {
    width: 500px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  .waiting, .ready, .click, .tooSoon {
    width: 500px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .waiting {
    background-color: gray;
  }
  .ready {
    background-color: red;
  }
  .click {
    background-color: green;
  }
  .tooSoon {
    background-color: orange;
  }
  .back-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    background-color: #42b883;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
  }
  .back-button:hover {
    background-color: #359a6d;
  }
  </style>