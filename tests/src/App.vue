<template>
  <div class="test-app">
    <h1 v-if="!currentTest" class="text-2xl font-bold mb-4">Тесты</h1>
    
    <div v-if="!currentTest">
      <h2 class="text-xl mb-2">Выберите тест:</h2>
      <ul class="test-list">
        <li v-for="test in tests" :key="test.id" @click="selectTest(test.id)" class="cursor-pointer text-blue-500 hover:underline">
          {{ test.name }}
        </li>
      </ul>
    </div>
    
    <div v-else>
      <component :is="currentTestComponent" @exit="currentTest = null" />
    </div>
  </div>
</template>

<script>
import SovietLogicTest from "./components/SovietLogicTest.vue";
import SpatialThinkingTest from "./components/SpatialThinkingTest.vue";

export default {
  name: "TestApp",
  components: {
    SovietLogicTest,
    SpatialThinkingTest,
  },
  data() {
    return {
      tests: [
        { id: "sovietLogic", name: "Советские загадки на логику в картинках", component: "SovietLogicTest" },
        { id: "spatialThinking", name: "Тест на пространственное мышление", component: "SpatialThinkingTest" },
      ],
      currentTest: null,
      currentTestComponent: null,
    };
  },
  methods: {
    selectTest(testId) {
      const selectedTest = this.tests.find((test) => test.id === testId);
      if (selectedTest) {
        this.currentTest = selectedTest;
        this.currentTestComponent = selectedTest.component;
      }
    },
  },
};
</script>

<style scoped>
.test-app {
  padding: 20px;
  font-family: Arial, sans-serif;
}
.test-list li {
  margin: 10px 0;
}
</style>
