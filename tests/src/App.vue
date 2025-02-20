<template>
  <div class="app-container">
    <h1 v-if="!activeTest" class="main-title">Выберите тест</h1>

    <div v-if="!activeTest" class="test-selector">
      <h2 class="subtitle">Список тестов:</h2>
      <ul class="test-options">
        <li
          v-for="item in testList"
          :key="item.code"
          @click="selectTest(item.code)"
          class="test-option"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>

    <div v-else class="test-display">
      <component :is="activeComponent" @exit="exitTest" @go-to-main-menu="exitTest" />
    </div>
  </div>
</template>

<script>
import SovietLogicTest from "./components/SovietLogicTest.vue";
import SpatialSkillTest from "./components/SpatialThinkingTest.vue";
import QuickResponseTest from "./components/ReactionTimeTest.vue";
import NBackMemory from "./components/NBackGame.vue";
import TimeEvaluator from "./components/TimePerception.vue";

export default {
  name: "App",
  components: {
    SovietLogicTest,
    SpatialSkillTest,
    QuickResponseTest,
    NBackMemory,
    TimeEvaluator,
  },
  data() {
    return {
      testList: [
        { code: "soviet", label: "Логические загадки", component: "SovietLogicTest" },
        { code: "spatial", label: "Пространственное мышление", component: "SpatialSkillTest" },
        { code: "reaction", label: "Тест на реакцию", component: "QuickResponseTest" },
        { code: "nback", label: "N-Back тренировка памяти", component: "NBackMemory" },
        { code: "time", label: "Тест оценки времени", component: "TimeEvaluator" },
      ],
      activeTest: null,
      activeComponent: null,
    };
  },
  methods: {
    selectTest(code) {
      const chosen = this.testList.find((item) => item.code === code);
      if (chosen) {
        this.activeTest = chosen;
        this.activeComponent = chosen.component;
      }
    },
    exitTest() {
      this.activeTest = null;
      this.activeComponent = null;
    }
  },
};
</script>


<style scoped>
.app-container {
  padding: 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.main-title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  color: #9c9c9c;
}

.test-selector {
  text-align: center;
}

.subtitle {
  font-size: 22px;
  margin-bottom: 12px;
  color: #9c9c9c;
}

.test-options {
  list-style: none;
  padding: 0;
}

.test-option {
  margin: 10px 0;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.test-option:hover {
  color: #333;
}

.test-display {
  margin-top: 20px;
}
</style>
