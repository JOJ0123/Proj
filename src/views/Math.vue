<script setup>
import {ref , computed} from 'vue'

const Type = ref('Calculator')
// CurrencyConverter
const currencyOn = ref()
const num = ref('')
const selected = ref('USD')

const currencies = [{
    name:'USD',
    value:33.79 
},
{
    name:'ARS',
    value:0.30
},
{
    name:'JPY',
    value:0.26
},
{
    name:'SGD',
    value:24.73
}]

const checkvalue = (check) => {
    if(1 < currencies[check].value){
        return {color:'crimson'}
    }
    else{
        return {color:'limegreen'}
    }
}

// Calculator
const operations = ['plus' , 'minus' , 'multiply' , 'divided']
const selectedOperation = ref(operations[0])
const numberOne = ref('')
const numberTwo = ref('')
const result = ref()
const allValue = ref([])
const isdisabled = ref(false)
const selectedFilter = ref('All')
const newValue = ref([])
const summary = ref([])
const GetSum = ref('')
const clearnum = () => {
    numberOne.value = ''
    numberTwo.value = ''
}

const calc = computed(() => {
    // saved value to result from selected operation
    if(selectedOperation.value === 'plus'){
        result.value = numberOne.value + numberTwo.value
        return result
    }
    else if(selectedOperation.value === 'minus'){
        result.value = numberOne.value - numberTwo.value
        return result
    }
    else if(selectedOperation.value === 'multiply'){
        result.value = numberOne.value * numberTwo.value
        return result
    }
    else if(selectedOperation.value === 'divided'){
        result.value = numberOne.value / numberTwo.value
        result.value = result.value.toFixed(2)
        return result
    }
    else{
        return console.log('Error cannot get operation')
    }
}
)

const save = () => {
    // If user calculate number and get result user can click save to save(push) value of all two numbers include operation and result
    if(result.value != ''){
    allValue.value.push(numberOne.value + ' '  + selectedOperation.value + ' '  + numberTwo.value + ' result : '  + result.value)
    filter()
    
    summary.value.push(parseInt(result.value))
    getSum()
    // 
    isdisabled.value = true
}
    else{
        alert('You cannot insert null value')
    }
}

const filter = () => {
    newValue.value = allValue.value
    // filter to only value that include in selectedFilter (eg. plus , minus)
    newValue.value = allValue.value.filter((result) => result.includes(selectedFilter.value))
}
const getSum = () => {
    // use reduce to calculate sum value
    GetSum.value = summary.value.reduce(
    (prev , curr) => prev + curr , 0
    )
}
const remove = (index) => {
    // remove the save result from index position by 1
    if(selectedFilter.value === 'All'){
        allValue.value.splice(index , 1)   
        summary.value.splice(index , 1)
    }
    else{
        const removeValue = newValue.value.splice(index , 1)
        // filter to only value that is not in removeValue (value that has been removed)
        allValue.value = allValue.value.filter(allval => allval != removeValue)
        // Get sumValue by split : from remove value 
        // Ex: removeValut = ['12 plus 24 result : 36']
        // onlySum = " 36"
        const onlySum = removeValue.toString().split(':').slice(1)
        // And than change onlysum to Integer and filter
        summary.value = summary.value.filter(sum => sum !== parseInt(onlySum))
        console.log(removeValue)
    }
    isdisabled.value = false
    getSum()
}

const removeAll = () => {
    // remove all save result
    let confirmText = 'Do you want to remove all'
    if(confirm(confirmText) === true){
        // remove save result starting from position 0
        allValue.value.splice(0)
        newValue.value.splice(0)
        selectedFilter.value = 'All'
        isdisabled.value = false
        // remove numbers in summary to make sum back to 0 with getSum function
        summary.value.splice(0)
        getSum()
    }
    else{

    }
}

const flip = () => {
    // prevent user to click save without changing numbers or operation
    isdisabled.value = false
}

// Multiplication Table
const tables = ref([])

const numbers = ref('')

const clear = () => {
    // clear previous multiplication table when user focus on numberOne box
    tables.value = []
}

const GetTable = () => {
    if(numberOne.value === ''){
        alert('Please insert multiplication value')
    }
    else{
    tables.value = []
    // assign numberOne to numbers because if user change numberOne value -> value on multiplication tables does not change too
    numbers.value = numberOne.value
    // loop get numberOne multiply by numberTwo amount (result)
   for(let i = 1 ; i <= numberTwo.value ; i++){
       tables.value[i - 1] = numbers.value * i
   }
    }
}

</script>
 
<template>

<div>
    <p class="input-style">
    <input type="checkbox"  v-model="currencyOn">
    <label>CurrencyConverter</label>
    </p>
    <p class="input-style">
        <!-- becuase numberOne and numberTwo use in two location when change mode clear value from numberOne and numberTwo -->
    <input type="radio" name="Math" value="Calculator" v-model="Type" @click="clearnum">
    <label>Calculator</label><br>
    <input type="radio" name="Math" value="Multiplication" v-model="Type" @click="clearnum">
    <label>Multiplication_Table</label>
    </p>
    <!-- CurrencyConverter -->
    <div v-show="currencyOn === true">
    <h2>CurrencyConverter</h2>
    <div>
        <p><input type="number" v-model="num"> THB </p>
        Convert_to:
        <!-- get option to change to desired currency -->
        <select v-model="selected" :onchange="filter">
            <option v-for="(currency , index) in currencies" :key="index">
            {{currency.name}}
            </option>
        </select>
        <br>
        <div v-show="num != ''">
        <!-- (input number * currency) and fixed digit to only 2 -->
        <p v-if="selected === 'USD' ">{{ (num / currencies[0].value).toFixed(2) }} {{selected}} 
         <hr>
        <!-- if currency less than 1 THB text color is crimson but if more text color is limegreen -->
         1 {{selected }} = <span :style="checkvalue(0)">
         {{ currencies[0].value}}</span> Bath</p>
         <p v-else-if="selected === 'ARS'">{{ (num / currencies[1].value).toFixed(2) }} {{selected}}
         <hr>
          1 {{selected }} = <span :style="checkvalue(1)">{{ currencies[1].value}}</span> Bath
         </p>
         <p v-else-if="selected === 'JPY'">
        {{ (num / currencies[2].value).toFixed(2) }} {{selected}}
         <hr>
          1 {{selected }} = <span :style="checkvalue(2)">{{ currencies[2].value}}</span> Bath
         </p>
         <p v-else-if="selected === 'SGD'">
        {{ (num / currencies[3].value).toFixed(2) }} {{selected}}
         <hr>
          1 {{selected }} = <span :style="checkvalue(3)">
         {{ currencies[3].value}}</span> Bath
         </p>
         </div>
        </div>
</div>
    <!-- Calculator -->
    <div v-show="Type == 'Calculator'">
        
        <h1>Calculator</h1>

        <input type="number" class="numbox" v-model="numberOne" @focus="flip">
        <!-- contain operation for user to choose -->
        <select v-model="selectedOperation" @click="flip">
            <option v-for="(operation , index) in operations" :key="index">
              {{operation}}
            </option>
        </select>

        <input type="number" class="numbox" v-model="numberTwo" @focus="flip">
        <!-- result only show when user input all numberOne and numberTwo -->
        <div v-show="numberOne != '' && numberTwo != ''"><h3><b>Result : {{ calc }} </b></h3>
        <!-- when save push numberOne , operation , numberTwo and result to array and display for user and disable this button -->
        <button :disabled="isdisabled" @click="save" >Save</button>
        </div>
        
        <hr>
        Filter By: 
        <select v-model="selectedFilter" :onchange="filter">
            <option>All</option>
            <option v-for="(operation , index) in operations" :key="index">{{operation}}</option>
        </select>
        
        <ul v-if="selectedFilter === 'All'">
            <!-- loop show array of result and when click remove send index to splice value from array -->
            <li v-for="(value , index) in allValue" :key="index" class="showList">{{value}}
            <button @click="remove(index)" style="margin-left: 2%;">Remove</button><hr>
            </li>
        </ul>
        <ul v-else>
             <!-- loop show array of result and when click remove send index to splice value from array -->
            <li v-for="(value , index) in newValue" :key="index" class="showList">{{value}}
            <button @click="remove(index)" style="margin-left: 2%;">Remove</button><hr>
            </li>
        </ul>
        <hr>
        <p>Summary Of All Value: {{GetSum}}</p>
        <!-- when click remove all saved values -->
        <button @click="removeAll" v-show="allValue.length !== 0">RemoveAll</button>
    </div>
    <!-- Multiplicaiton Table -->
    <div v-show="Type == 'Multiplication'">
        <h1>Multiplication Table</h1>
        <!-- onfocus clear multiplication table -->
        <input type="number" v-model="numberOne" @focus="clear" class="numbox" placeholder="Number to multiple">
        <input type="number" v-model="numberTwo" class="numbox" placeholder="Multiple Length" min="0"><br>
        <!-- get multiplication table from function GetTable -->
        <button @click="GetTable" style="margin-top: 1%; margin-bottom: 1%; margin-left: 1%;">Get_Multiplication_Table</button>
        <!-- show multiplication table by loop array of tables -->
        <li v-for="(table , index) in tables" class="showList">{{numbers}} * {{index + 1 }}  = {{table}}</li>
        
    </div>
   
</div>  


</template>
 
<style>
.numbox{
    margin-left: 10px;
    margin-right: 5px;
}
.showList{
    margin: 4px;
}
.input-style{
    border-style: double;
    width: 250px;
    padding: 1.5px;
}

</style>