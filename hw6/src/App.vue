<template>
  <div id="app">
    <h1>Список фильмов</h1>
    <MovieList />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";

export default {
  components: {
    MovieList,
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f8f8f8;
}

h1 {
  text-align: center;
  margin-top: 20px;
  color: #333;
}
</style>
