<template>
    <div class="movie-card">
      <img :src="movie.image" :alt="movie.title" />
      <div class="movie-info">
        <h2>{{ movie.title }}</h2>
        <p><strong>Рейтинг:</strong> {{ movie.rating }}</p>
        <p><strong>Дата выхода:</strong> {{ movie.release_date }}</p>
        <p><strong>Жанр:</strong> {{ movie.genre }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s;
  }
  
  .movie-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .movie-card:hover {
    transform: translateY(-5px);
  }
  
  .movie-info {
    padding: 15px;
  }
  
  h2 {
    margin: 10px 0;
    font-size: 1.5rem;
    color: #333;
  }
  
  p {
    margin: 5px 0;
    color: #555;
  }
  </style>
  