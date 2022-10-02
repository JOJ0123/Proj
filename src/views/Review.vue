<script setup>
import {ref} from 'vue'

const user = ref('')
const email = ref('')
const rating = ref('')
const suggestion = ref('')

const submit = () => {
    if(rating.value !== ''){
        // get user name from user input and display 'thank you' message with user name
    alert('Thank you for your review.' + ' ' + user.value.toUpperCase())
    rating.value = ''
    suggestion.value = ''
    user.value = ''
    }
    else{
        alert('No rating found')
    }
}
const subscribe = () => {
    // check if email is valid by check '@' and '.' and show 'thank you' message
    if(email.value !== '' && email.value.includes('@') && email.value.includes('.')){
        console.log(email.value.length)
    alert('Thank you for your subscribtion. We will continue to improve our services.')
    email.value = ''
    }
    else{
        alert('Please enter a valid email address')
    }
}
</script>
 
<template>

<div style="text-align: center;">
<h1>Review</h1>
    <!-- get user name -->
<input type="text" placeholder="Enter your name" v-model="user">
    <h3>
        Rate 1 to 5
    </h3>
    <!-- get user rating -->
    <input type="radio" name="rating" value="1" class="rating" v-model="rating">
    <label>1</label>
    <input type="radio" name="rating" value="2" class="rating" v-model="rating">
    <label>2</label>
    <input type="radio" name="rating" value="3" class="rating" v-model="rating">
    <label>3</label>
    <input type="radio" name="rating" value="4" class="rating" v-model="rating">
    <label>4</label>
    <input type="radio" name="rating" value="5" class="rating" v-model="rating">
    <label>5</label>
    <p></p>
    <!-- get user suggestion -->
    <textarea placeholder="Suggestion(optional)" rows="5" cols="50" v-model="suggestion"></textarea>
    <hr>
    <button @click="submit">Submit</button>
    <hr>
    <h2>Subscribe to our newsletters</h2>
    <!-- get user email and check if email is valid -->
    <input type="email" placeholder="Enter your Email Address" v-model="email">
    <button @click="subscribe">
        Subscribe
    </button>
</div>

</template>
 
<style>
.rating{
    margin-left: 30px;
}
</style>