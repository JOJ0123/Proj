<script setup>
import {ref} from 'vue'
const selectedDate = ref('day')
const selectedHour = ref('hour')
const transfer = ref(1)


const tohour = ref(24)
const tominute = ref(60 * tohour.value)
const tosecond = ref(60 * tominute.value)
const tomillisec = ref(1000 * tosecond.value)
const changeto = ref(tohour.value)

const change = (select) => {
    // change according to user select
    if(select == 'hour'){
      changeto.value = tohour.value
    }
    else if(select == 'minute'){
        changeto.value = tominute.value 
    }
    else if(select == 'second'){
        changeto.value = tosecond.value 
    }
    else if(select == 'millisecond'){
        changeto.value = tomillisec.value 
    }
}

const dates = ['day' , 'month' , 'year']
const hours = [
    'hour' , 'minute' , 'second' , 'millisecond'
    ]
const reset = () => {
    // reset all value to default
    transfer.value = 1
    selectedDate.value = 'day'
    selectedHour.value = 'hour'
    change(selectedHour.value)
}
</script>
 
<template>

<div>
    <input type="number" v-model="transfer" style="margin-right: 10px;">
        <!-- user can choose to change from date , month or year -->
    <select v-model="selectedDate">
        <option v-for="(date , index) in dates" :key="index">{{date}}</option>
    </select><hr>
    <h3>Convert_to
        <!-- user can to to convert to hour , minute , second or millisecond and it will send selectedHour to process by change function -->
    <select v-model="selectedHour" @click="change(selectedHour)">
        <option v-for="(hour , index) in hours" :key="index" >{{hour}}</option>
    </select>
    </h3>
    <h3>
        <!-- change value to int and get value from changeto(hour , minute , etc.) multiply by transfer(user input number) -->
    <p v-if="selectedDate == 'day'">{{ parseInt(changeto) * parseInt(transfer) }} {{selectedHour}}</p>
        <!-- if user select month use 1 month(30 days) to multiply -->
    <p v-else-if="selectedDate == 'month'">{{ 30 *(parseInt(changeto) * parseInt(transfer)) }} {{selectedHour}}<br><span class="estimation">Estimated from: 30 days</span> </p>
    <p v-else-if="selectedDate == 'year'">{{ 365 *(parseInt(changeto) * parseInt(transfer)) }} {{selectedHour}}<br><span class="estimation">Estimated from: 365 days</span> </p>
   </h3>
   <!-- reset to default value -->
   <button @click="reset">Reset</button>
</div>

</template>
 
<style>
.estimation{
    font-size: medium; font-weight:normal; opacity: 75%;
}
</style>