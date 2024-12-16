<template>
    <div class="movie-list">
      <div v-for="(movie, index) in movies" :key="index">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </template>
  
  <script>
  import MovieCard from "@/components/MovieCard.vue";
  
  export default {
    components: { MovieCard },
    data() {
      return {
        movies: [],
      };
    },
    async created() {
      // Загрузка данных из movies.json
      const response = await fetch("/movies.json");
      this.movies = await response.json();
    },
  };
  </script>
  
  <style>
  .movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
  }
  </style>
  