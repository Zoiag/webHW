const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    // Данные о товарах (JSON)
    const products = ref([
      {"id": 1, "name": "Эфиопская Арабика", "price": 1200, "description": "Кофе с ягодными нотами.", "intensity": 6, "type": "arabica", "img": "./images/ethiopian.png"},
      {"id": 2, "name": "Колумбийская Арабика", "price": 1400, "description": "Сладкий кофе с ароматом шоколада.", "intensity": 5, "type": "arabica", "img": "./images/colombian.jpg"},
      {"id": 3, "name": "Робуста Вьетнам", "price": 900, "description": "Крепкий и насыщенный вкус.", "intensity": 8, "type": "robusta", "img": "./images/robusta.png"},
      {"id": 4, "name": "Бразильская смесь", "price": 1100, "description": "Баланс арабики и робусты.", "intensity": 7, "type": "blend", "img": "./images/blend.png"},
      {"id": 5, "name": "Индийский декаф", "price": 1000, "description": "Кофе без кофеина.", "intensity": 4, "type": "decaf", "img": "./images/indian.png"},
      {"id": 6, "name": "Гватемальский Бленд", "price": 1300, "description": "Сбалансированный вкус.", "intensity": 6, "type": "blend", "img": "./images/guatemalan.png"}
    ]);

    // Состояния для поиска, сортировки и модального окна
    const searchQuery = ref('');
    const selectedSort = ref('');
    const currentProduct = ref({});

    // Фильтрация и сортировка товаров
    const filteredProducts = computed(() => {
      let result = products.value;

      // Поиск по названию
      if (searchQuery.value) {
        result = result.filter(product =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      // Сортировка
      if (selectedSort.value) {
        result = [...result].sort((a, b) =>
          a[selectedSort.value] > b[selectedSort.value] ? 1 : -1
        );
      }

      return result;
    });

    // Функция открытия модального окна
    function openModal(product) {
      currentProduct.value = product;
      const modal = new bootstrap.Modal(document.getElementById('productModal'));
      modal.show();
    }

    return {
      products,
      searchQuery,
      selectedSort,
      filteredProducts,
      currentProduct,
      openModal,
    };
  },
}).mount('#app');
