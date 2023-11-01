<template>
  <div class="landing">
    <div class="slide-show">
      <img src="../assets/land.png" alt="" />
    </div>
    <div class="buttons-container">
      <button @click="onCreateCategory" class="add-category">
        Create Category
      </button>
      <button class="add-task">Add Task</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useTaskManagerStore } from "../stores/taskManager";
export default {
  name: "LandingPage",
  setup() {
    const router = useRouter();

    // authenticated.value;
    const onCreateCategory = () => {
      router.push("/createCategory");
    };

    return {
      onCreateCategory,
    };
  },
};
</script>

<style scoped>
.slide-show {
  height: 85vh;
  width: 100vw;
}

.landing {
  align-content: center;
  align-items: center;
  text-align: center;
}

.buttons-container {
  margin-top: 3vh;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.buttons-container button {
  padding: 0.5rem;
  background: #6290c8;
  width: 10rem;
  color: white;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
}

.slide-show img {
  width: 100vw;
  height: 85vh;
}
</style>
