<template>
  <div class="nav">
    <div class="logo-container">
      <div @click="goHome" class="logo-image">
       <img src="../assets/logo4.png" alt="" />
      </div>
    </div>
    <div class="button-container">
      <div v-if="authenticated" class="register-button">
        <router-link to="/Landing">Logout</router-link>
      </div>
      <div v-else class="register-button">
        <router-link to="/register">About</router-link>
      </div>
      <div class="login-button">
        <router-link to="/signin"> <fa icon="fa-solid fa-user" color="white" size="lg" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeToRefs } from "pinia";
  import { useRouter } from 'vue-router';
  import { useTaskManagerStore } from "../stores/taskManager";
    export default ({
        name: 'NavBar',
        setup() {
         const {showSchedule} = storeToRefs(useTaskManagerStore());
         const router = useRouter();
         
        const goHome = () =>{
            router.push("/");
            showSchedule.value = false
    }
         return {
          showSchedule,
          goHome
         }
        }

    })
</script>

<style scoped>
.nav {
    width: 100vw;
    height: 50px;
    background-color: #1D3461;
    display: grid;
    grid-template-columns: 50% 50%;
}

.logo-container,
.button-container {
  display: flex;
  flex-direction: row;
}

p {
  color: #e8e8e8;
}

.logo-image img {
  height: 50px;
  width: 50px;
}

.button-container a {
  text-decoration: none;
  text-align: center;
  color:white;
  padding: 5px;
}

.button-container{
    text-align: center;
    align-content: center;
    align-items: center;
    margin-left: 20vw;
}

.login-button{
    padding-right: 20px;
    margin-left: 4vw;
}
</style>
