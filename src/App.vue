<script setup>
</script>
 
<template>
<h2>
<router-link :to="{ name:'Math' }">Math</router-link> |
<router-link :to="{ name:'Converter'}">Day -> Hour</router-link> |
<router-link :to="{ name:'huay' }">Random_Huay</router-link> |
<router-link :to="{ name:'Review'}">Review</router-link>
</h2>
  <div>
    <router-view></router-view>
  </div>

</template>
 
<style>

.router-link-active{
  font-family: sans-serif;
  text-decoration: underline;
  color:brown;
}
</style>