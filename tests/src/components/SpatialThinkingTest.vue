<template>
  <div class="test-container">
    <h2 class="text-xl font-bold mb-4">Тест на пространственное мышление</h2>
    
    <div v-if="!testStarted">
      <p class="test-description">
        Этот тест предназначен для изучения вашей способности мысленно визуализировать и производить манипуляции с графическими объектами (напр. вращать фигуры 3D или собирать различные части в определенное целое).  Вам будет представлено несколько различных типов заданий. У вас есть 10 минут, чтобы решить 10 вопросов.
        <br /><br />
        Как только Вы проставите ответ на последний вопрос, появится кнопка "Завершить тестирование", нажав которую, Вы можете посмотреть результаты. Как только время закончится, тест автоматически завершается, и в зачет идут те ответы, которые Вы успели проставить. Все вопросы, ответы на которые не были проставлены, будут засчитаны как неверные. Попробуйте для тестирования найти свободное время и место, где Вы не будете отвлекаться.
      </p>
      <h3 class="mb-2">Выберите режим теста:</h3>
      <div class="buttons-container">
        <button @click="startTest(true)" class="btn btn-blue">С таймером</button>
        <button @click="startTest(false)" class="btn btn-gray">Без таймера</button>
      </div>
    </div>
    
    <div v-else>
      <div v-if="currentQuestionIndex < questions.length">
        <p class="mb-2">Вопрос {{ currentQuestionIndex + 1 }} из {{ questions.length }}</p>
        <p class="question-text">{{ questions[currentQuestionIndex].questionText }}</p>
        <img :src="questions[currentQuestionIndex].image" alt="Задание" class="question-image" />
        <div v-if="!testFinished" class="answers">
          <button v-for="(answer, index) in questions[currentQuestionIndex].answers" :key="index"
            @click="selectAnswer(index)" class="answer-btn">
            {{ answer.text }}
          </button>
        </div>
        <p v-if="isTimed" class="timer">Оставшееся время: {{ formatTime(timeLeft) }}</p>
        <div class="buttons-container">
          <button v-if="currentQuestionIndex > 0" @click="prevQuestion" class="btn btn-gray">Назад</button>
        </div>
      </div>
      <div v-if="currentQuestionIndex >= questions.length && !testFinished">
        <div class="buttons-container">
          <button @click="prevQuestion" class="btn btn-gray">Назад</button>
          <button @click="finishTest" class="btn btn-blue">Завершить тестирование</button>
        </div>
      </div>
      <div v-if="testFinished">
        <h3 class="text-lg font-bold">Тест завершён!</h3>
        <p>Ваш результат: {{ correctAnswers }} / {{ questions.length }}</p>
        <h4 v-if="mistakes.length" class="text-md font-bold mt-4">Ваши ошибки:</h4>
        <ul v-if="mistakes.length">
          <li v-for="(mistake, index) in mistakes" :key="index" class="text-red-500">
            Вопрос {{ mistake.questionIndex + 1 }}: Вы выбрали "{{ mistake.selectedAnswer }}", но правильный ответ - "{{ mistake.correctAnswer }}"
          </li>
        </ul>
        <div class="buttons-container">
          <button @click="exitTest" class="btn btn-red">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testStarted: false,
      isTimed: false,
      timeLeft: 600,
      timer: null,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      mistakes: [],
      testFinished: false,
      selectedAnswers: {},
      questions: [
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (1-5). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (А, В, С), должны соприкасаться между собой. Выберите правильный ответ.",
          image: "src/assets/photos/test2/1.png",
          answers: [
            { text: "фигура 1", correct: true },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: false }
          ]
        },
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (1-5). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (А, B, С) должны соприкасаться между собой. Выберите правильный ответ.",
          image: "src/assets/photos/test2/2.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: true }
          ]
        },
        {
          questionText: "Какой из четырех возможных вариантов представляет собой куб в сложенном виде?",
          image: "src/assets/photos/test2/3.png",
          answers: [
            { text: "куб 1", correct: false },
            { text: "куб 2", correct: false },
            { text: "куб 3", correct: true },
            { text: "куб 4", correct: false }
          ]
        },
        {
          questionText: "Какой из четырех возможных вариантов представляет верхний куб, показанный с другого ракурса? Каждая грань куба уникальна и не повторяется.",
          image: "src/assets/photos/test2/4.png",
          answers: [
            { text: "куб 1", correct: false },
            { text: "куб 2", correct: true },
            { text: "куб 3", correct: false },
            { text: "куб 4", correct: false }
          ]
        },
        {
          questionText: "Вверху представлена фигура. Из следующих 5 вариантов выберите один, изображающий ту же фигуру.",
          image: "src/assets/photos/test2/5.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: true }
          ]
        },
        {
          questionText: "Укажите правильную комбинацию фигур после вращения верхней модели (обе точки должны располагаться в тех же углах).",
          image: "src/assets/photos/test2/6.png",
          answers: [
            { text: "фигура A", correct: false },
            { text: "фигура B", correct: true },
            { text: "фигура C", correct: false },
            { text: "фигура D", correct: false },
            { text: "фигура E", correct: false }
          ]
        },
        {
          questionText: "Какое изображение (1-4) является зеркальным отражением верхней фигуры?",
          image: "src/assets/photos/test2/7.png",
          answers: [
            { text: "фигура 1", correct: true },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false }
          ]
        },
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (А- Е). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (х, y, z), должны соприкасаться между собой. Выберите правильный ответ.",
          image: "src/assets/photos/test2/8.jpg",
          answers: [
            { text: "фигура A", correct: false },
            { text: "фигура B", correct: true },
            { text: "фигура C", correct: false },
            { text: "фигура D", correct: false },
            { text: "фигура E", correct: false }
          ]
        },
        {
          questionText: "Какая из следующих фигур находится внутри квадрата?",
          image: "src/assets/photos/test2/9.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: true },
            { text: "фигура 5", correct: false }
          ]
        },
        {
          questionText: "Какая фигура (1-5) получится при сложении данного шаблона бумаги? Выберите правильный ответ.",
          image: "src/assets/photos/test2/10.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: true },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: false }
          ]
        }
      ]
    };
  },
  methods: {
    startTest(timed) {
      this.testStarted = true;
      this.isTimed = timed;
      if (timed) this.startTimer();
    },
    startTimer() {
      this.timeLeft = 600;
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.finishTest();
        }
      }, 1000);
    },
    selectAnswer(index) {
      const question = this.questions[this.currentQuestionIndex];
      
      if (this.selectedAnswers[this.currentQuestionIndex] === true) {
        this.correctAnswers--;
      }
      
      this.selectedAnswers[this.currentQuestionIndex] = question.answers[index].correct;

      if (question.answers[index].correct) {
        this.correctAnswers++;
      } else {
        this.mistakes = this.mistakes.filter(m => m.questionIndex !== this.currentQuestionIndex);
        this.mistakes.push({
          questionIndex: this.currentQuestionIndex,
          selectedAnswer: question.answers[index].text,
          correctAnswer: question.answers.find(ans => ans.correct).text
        });
      }

      this.nextQuestion();
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    finishTest() {
      if (this.isTimed) clearInterval(this.timer);
      this.testFinished = true;
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    },
    exitTest() {
      this.$emit("exit");
    }
  }
};
</script>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}
.btn {
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.3s;
}
.btn-blue {
  background-color: #007bff;
  color: white;
}
.btn-gray {
  background-color: #6c757d;
  color: white;
}
.btn-red {
  background-color: #dc3545;
  color: white;
}
</style>