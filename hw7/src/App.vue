<template>
  <div id="app">
      <city-weather></city-weather>
      <crypto-converter></crypto-converter>
  </div>
</template>

<script>
import CityWeather from './components/CityWeather.vue';
import CryptoConverter from './components/CryptoConverter.vue';

export default {
  components: {
      CityWeather,
      CryptoConverter
  }
};
</script>

<style>
#app {
  font-family: "Roboto", Arial, sans-serif;
  text-align: center;
  color: #34495e;
  margin-top: 40px;
}
</style>
