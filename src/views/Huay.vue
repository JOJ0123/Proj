<script setup>
import {ref} from 'vue'
const numbers = ref([0,0,0,0,0,0])
const allZero = ref(true)

// function to check if number is all zero
const check = (value) => value === 0

// Get all numbers to random 
const random = () => {
numbers.value =  numbers.value.map(numbers =>numbers = Math.floor(Math.random() * 10))
// check if numbers in array is all zero. If not than show reset button(allZero = false)
allZero.value = numbers.value.every(check)
}



const reset = () => {

  // fill zero to all numbers in array
  numbers.value.fill(0)
  // check again to make reset button disappear(all numbers in array is zero)(allZero = true)
  allZero.value = numbers.value.every(check)
}

</script>
 
<template>

<div>
<!-- Onclick random number in array -->
  <button @click="random">Random</button><hr>
<!-- show numbers in array -->
<span class="numbers" v-for="(number , index) in numbers" :key="index">
  {{number}}
</span>
<!-- reset number in array -->
<button v-show="!allZero" @click="reset">Reset</button>
</div>

</template>
 
<style>
.numbers{
  font-size: x-large;
  border-style: groove;
  margin: 10px;
  padding: 15px;
  line-height: 3.5;
}
</style>