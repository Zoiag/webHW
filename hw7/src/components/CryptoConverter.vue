<template>
    <div class="app-wrapper">
        <h1>Криптовалютный калькулятор</h1>

        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <div v-if="rates.USD">
            <div class="info-box">
                <h2>Текущий курс:</h2>
                <p>Доллар США: <span class="currency-value">{{ rates.USD }}</span> $</p>
                <p>Евро: <span class="currency-value">{{ rates.EUR }}</span> €</p>
                <p>Фунт стерлингов: <span class="currency-value">{{ rates.GBP }}</span> £</p>
            </div>

            <div class="conversion">
                <label>Количество BTC:</label>
                <input type="number" v-model.number="btcAmount" min="0" placeholder="Введите сумму" class="input-field" />

                <label>Конвертировать в:</label>
                <select v-model="targetCurrency" class="input-field">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>

                <p v-if="btcAmount && rates[targetCurrency]" class="result">
                    Результат: <span>{{ calculateResult().toFixed(2) }}</span> {{ targetCurrency }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            rates: {},
            btcAmount: 1,
            targetCurrency: 'USD',
            errorMessage: ''
        };
    },
    methods: {
        async fetchRates() {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                    params: { ids: 'bitcoin', vs_currencies: 'usd,eur,gbp' },
                    timeout: 5000
                });
                if (response.data.bitcoin) {
                    this.rates = {
                        USD: response.data.bitcoin.usd,
                        EUR: response.data.bitcoin.eur,
                        GBP: response.data.bitcoin.gbp
                    };
                    this.errorMessage = '';
                } else {
                    throw new Error('Некорректный ответ от API');
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
                this.errorMessage = 'Не удалось загрузить курсы криптовалют. Попробуйте позже.';
            }
        },
        calculateResult() {
            return this.btcAmount * (this.rates[this.targetCurrency] || 0);
        }
    },
    mounted() {
        this.fetchRates();
    }
};
</script>

<style scoped>
@import '../assets/shared-styles.css';
</style>
