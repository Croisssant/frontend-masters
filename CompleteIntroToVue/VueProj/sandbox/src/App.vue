<script>
  import BaseCounter from "./components/BaseCounter.vue"
  export default {
    components: {
      BaseCounter,
    },
    data() {
      return {
        message: "Hello it wors!",
        listOfNumbers: [1, 2, 3, 4, 5],
        pokedex: [1, 2, 3]
      }
    },
    methods: {
      async fetchPokemon() {
        this.pokedex = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        ).then((response) => response.json());
      }
    },
    created() {
      setTimeout(() => {
        this.fetchPokemon(); 
      }, 30000);
      
    }
       
  }
</script>

<template>
  <BaseCounter />
  <hr />
  <p v-if="message.length % 2 === 0">Even: {{ message }}</p>
  <p v-else>Odd: {{ message }}</p>
  <ul>
      <li v-for="(number, index) in listOfNumbers" :key="`item-${index}`">
        {{ number }}
      </li>
  </ul>
  <pre>
    {{ pokedex }}
  </pre>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
