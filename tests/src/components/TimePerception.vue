<template>
  <div class="container">
    <div class="time-test" :class="stateClass" @click="handleClick">
      <p v-if="!isTiming">Выберите интервал и нажмите</p>
      <p v-if="isTiming">Ждите...</p>
      <p v-if="measuredTime">Ваш результат: {{ measuredTime.toFixed(2) }} сек</p>
    </div>
    
    <div class="interval-buttons">
      <button
        v-for="sec in intervals"
        :key="sec"
        :disabled="isTiming"
        @click="startTest(sec)"
      >
        {{ sec }} сек
      </button>
    </div>

    <div v-if="records.length" class="record-list">
      <h2>Результаты</h2>
      <ul>
        <li v-for="(rec, idx) in records" :key="idx">
          <span>Запланировано:</span> <strong>{{ rec.planned }} сек</strong>,
          <span>Измерено:</span> <strong>{{ rec.measured.toFixed(2) }} сек</strong>
        </li>
      </ul>
      <button class="result-btn" @click="displayResult">Итог</button>
    </div>

    <button class="back-button" @click="$emit('exit')">Назад</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intervals: [3, 5, 7, 10],
      chosenSec: null,
      startTime: null,
      isTiming: false,
      measuredTime: null,
      records: [],
    };
  },
  computed: {
    stateClass() {
      return {
        'waiting': !this.isTiming && !this.measuredTime,
        'timing': this.isTiming,
        'result': this.measuredTime !== null,
      };
    },
  },
  methods: {
    startTest(sec) {
      this.chosenSec = sec;
      this.startTime = performance.now();
      this.isTiming = true;
      this.measuredTime = null;
    },
    handleClick() {
      if (this.isTiming) {
        const elapsed = (performance.now() - this.startTime) / 1000;
        this.records.push({ planned: this.chosenSec, measured: elapsed });
        this.measuredTime = elapsed;
        this.isTiming = false;
      }
    },
    displayResult() {
      const avgError =
        this.records.reduce((acc, rec) => acc + Math.abs(rec.planned - rec.measured), 0) /
        this.records.length;
      alert(`Среднее отклонение: ${avgError.toFixed(2)} сек`);
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
.time-test {
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
  color: white;
}
.waiting {
  background-color: gray;
}
.timing {
  background-color: red;
}
.result {
  background-color: green;
}
.interval-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
button {
  padding: 10px 16px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background: #5a67d8;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
button:hover:not(:disabled) {
  transform: scale(1.05);
}
button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}
.record-list {
  margin-top: 20px;
}
.result-btn {
  margin-top: 15px;
  padding: 8px 16px;
  font-size: 15px;
  background: #38a169;
}
.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #42b883;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.back-button:hover {
  background-color: #359a6d;
}
</style>
