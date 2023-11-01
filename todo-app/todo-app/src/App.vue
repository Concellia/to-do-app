<template>
 <div>
  <NavBar />
 <router-view />
 <!-- <footer-bar /> -->
 </div>
</template>

<script>
import FooterBar from "./components/FooterBar.vue";
import NavBar from './components/NavBar.vue'
 export default {
  name: "App",
  components: {
    NavBar,
    FooterBar
  },
};
 
</script>

<style scoped>
</style>
