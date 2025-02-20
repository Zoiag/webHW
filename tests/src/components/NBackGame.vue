<template>
    <div class="game-container">
      <div class="sequence">
        <span
          v-for="(num, index) in sequence"
          :key="index"
          :class="getOpacityClass(index)"
          class="digit"
        >
          {{ num }}
        </span>
      </div>
      <div class="controls">
        <button @click="answer(false)">Нет</button>
        <button @click="answer(true)">Да</button>
      </div>
      <div class="stats">
        <p>Жизни: {{ lives }}</p>
        <p>Счет: {{ score }}</p>
        <p>Раунд: {{ round }}/20</p>
      </div>
      <div v-if="gameOver" class="game-over">
        <p>Игра закончена</p>
        <p>Правильно: {{ correctAnswers }} из {{ round - 1 }} ({{ accuracy }}%)</p>
        <p>Очки: {{ score }}</p>
        <button @click="restartGame">Играть еще раз</button>
      </div>
      <button @click="goToMainMenu" class="main-menu-button">Выйти</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sequence: [],
        lives: 3,
        score: 0,
        round: 1,
        correctAnswers: 0,
        transparencyLevels: [0, 0, 0],
        gameOver: false,
        streak: 0,
        isBlinking: false,
        leftCounter: 0,
        centerCounter: 0,
      };
    },
    computed: {
      accuracy() {
        return this.round > 1 ? Math.round((this.correctAnswers / (this.round - 1)) * 100) : 100;
      },
    },
    created() {
      this.sequence = [
        this.getRandomDigit(false),
        this.getRandomDigit(false),
        this.getRandomDigit(true, 0.8)
      ];
    },
    methods: {
      getRandomDigit(forceMatch = false, probabilityMatch = 0.8) {
        if (forceMatch && this.sequence.length > 0 && Math.random() < probabilityMatch) {
          return this.sequence[0];
        }
        return Math.floor(Math.random() * 10);
      },
      getOpacityClass(index) {
        const level = this.transparencyLevels[index];
        return `opacity-${Math.round(level * 5)}`;
      },
      answer(isYes) {
        if (this.gameOver) return;
        const correct = (this.sequence[0] === this.sequence[2]) === isYes;
        this.leftCounter++;
        this.centerCounter++;
        if (correct) {
          this.correctAnswers++;
          this.score += 100;
          this.streak++;
        } else {
          this.lives--;
          this.streak = 0;
          this.leftCounter = 0;
          this.centerCounter = 0;
          this.transparencyLevels[0] = 0;
          this.transparencyLevels[1] = 0;
        }
        if (this.leftCounter >= 3) {
          this.transparencyLevels[0] = 1;
        } else {
          this.transparencyLevels[0] = 0;
        }
        if (this.centerCounter >= 3) {
          this.transparencyLevels[1] = 1;
        } else {
          this.transparencyLevels[1] = 0;
        }
        if (this.lives <= 0 || this.round >= 20) {
          this.gameOver = true;
          return;
        }
        if (this.streak >= 3) {
          this.blinkRightDigit();
        } else {
          this.shiftSequence();
        }
      },
      blinkRightDigit() {
        this.isBlinking = true;
        setTimeout(() => {
          this.isBlinking = false;
          this.shiftSequence();
        }, 300);
      },
      shiftSequence() {
        this.sequence = [
          this.sequence[1],
          this.sequence[2],
          this.getRandomDigit(true, 0.8)
        ];
        this.transparencyLevels = [
          this.transparencyLevels[0],
          0,
          0.4
        ];
        this.round++;
      },
      restartGame() {
        this.sequence = [
          this.getRandomDigit(false),
          this.getRandomDigit(false),
          this.getRandomDigit(true, 0.8)
        ];
        this.lives = 3;
        this.score = 0;
        this.round = 1;
        this.correctAnswers = 0;
        this.transparencyLevels = [0, 0, 0];
        this.gameOver = false;
        this.streak = 0;
        this.isBlinking = false;
        this.leftCounter = 0;
        this.centerCounter = 0;
      },
      goToMainMenu() {
        this.$emit('go-to-main-menu');
      }
    },
  };
  </script>
  
  <style scoped>
  .game-container {
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
  }
  .sequence {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .digit {
    width: 2rem;
    text-align: center;
  }
  .controls button {
    margin: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  .stats {
    margin-top: 1rem;
  }
  .opacity-0 { opacity: 1; }
  .opacity-1 { opacity: 0.8; }
  .opacity-2 { opacity: 0.6; }
  .opacity-3 { opacity: 0.4; }
  .opacity-4 { opacity: 0.2; }
  .opacity-5 { opacity: 0; }
  .main-menu-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #ff4d4d;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
