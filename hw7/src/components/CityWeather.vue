<template>
    <div class="app-wrapper">
        <h1>Прогноз погоды</h1>
            <div class="region-select">
            <label>Выберите регион:</label>
            <select v-model="selectedRegion" class="input-field">
                <option value="">-- Выберите --</option>
                <option value="europe">Европа</option>
                <option value="asia">Азия</option>
                <option value="america">Америка</option>
                <option value="russia">Россия</option>
            </select>
            <button @click="fetchAverageTemp" class="button">Узнать погоду</button>
        </div>

        <div v-if="cities[selectedRegion]" class="info-box">
            <h3>Доступные города:</h3>
            <div class="button-group">
                <button
                    v-for="city in cities[selectedRegion]"
                    :key="city"
                    @click="fetchWeather(city)"
                    class="button"
                >
                    {{ city }}
                </button>
            </div>
        </div>
        <div v-if="weatherDetails" class="info-box">
            <h3>Погода в {{ selectedCity }}:</h3>
            <p>Температура: {{ weatherDetails.temp }}°C</p>
            <p>Погодное описание: {{ weatherDetails.weather_state_name }}</p>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedRegion: '',
            selectedCity: '',
            averageTemperature: null,
            weatherDetails: null,
            errorMessage: '',
            cities: {
                europe: ['London', 'Berlin', 'Paris'],
                asia: ['Tokyo', 'Seoul', 'Beijing'],
                america: ['New York', 'Los Angeles', 'Miami'],
                russia: ['Moscow', 'Sochi', 'Kazan']
            },
            apiKey: '07de27f191bf58160bfeced63a7a78e8',
            apiBaseUrl: 'https://api.openweathermap.org/data/2.5/weather'
        };
    },
    methods: {
        fetchWeather(city) {
            this.selectedCity = city;
            axios
                .get(`${this.apiBaseUrl}?q=${city}&units=metric&appid=${this.apiKey}`)
                .then(response => {
                    this.weatherDetails = {
                        temp: response.data.main.temp.toFixed(1),
                        weather_state_name: response.data.weather[0].description
                    };
                    this.errorMessage = '';
                })
                .catch(error => {
                    console.error('Ошибка запроса:', error);
                    this.errorMessage = 'Ошибка при загрузке данных о погоде';
                });
        },
        fetchAverageTemp() {
            if (!this.selectedRegion) {
                this.errorMessage = 'Выберите регион';
                return;
            }
            const cityRequests = this.cities[this.selectedRegion].map(city =>
                axios.get(`${this.apiBaseUrl}?q=${city}&units=metric&appid=${this.apiKey}`)
            );
            Promise.all(cityRequests)
                .then(responses => {
                    const temps = responses.map(res => res.data.main.temp);
                    this.averageTemperature = (temps.reduce((a, b) => a + b) / temps.length).toFixed(1);
                    this.errorMessage = '';
                })
                .catch(error => {
                    console.error('Ошибка запроса:', error);
                    this.errorMessage = 'Ошибка при загрузке данных о погоде';
                });
        }
    }
};
</script>

<style scoped>
@import '../assets/shared-styles.css';
</style>
