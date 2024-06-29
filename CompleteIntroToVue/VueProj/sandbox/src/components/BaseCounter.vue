<script>
    export default {
        data() {
            return {
                count: 0,
                incrementAmount: 6,
                counterTitle: "Counter Standard"
            }
        },
        computed: {
            displayTitle() {
                if(this.count > 20) {
                    return 'Counter Standard - Very Long'
                } else {
                    return 'Counter Standard'
                }
            },
            optimizedIncrementAmount() {
                return this.displayTitle.length * this.incrementAmount
            }
        },
        methods: {
            incrementCount(newAmount, event) {
                console.log(newAmount)
                console.log(event)
                this.count += this.incrementAmount
            }
        }
    }
</script>

<template>
<h1>{{ displayTitle }}</h1>
  <p>{{ count }}</p>
  <button v-on:click="incrementCount(10, $event)">Increment Count</button>
  <h1>{{ incrementAmount }}</h1>
  <p>Optimized: {{ optimizedIncrementAmount }}</p>
  <div>
      <label for="incrementAmount">Increment by:</label>
      <input type="number" 
      v-model="incrementAmount"
      />
  </div>
</template>