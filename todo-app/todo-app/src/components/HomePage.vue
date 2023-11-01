<template>
  <div>
    <div v-if="!showSchedule">
    <div
      :style="[showTaskPopUp || showCatPopUp ? { opacity: '0.2' } : {}]"
      class="home"
    >
    <swiper
    :slides-per-view="3"
    :space-between="20"
    v-if="getTodosError.length <= 0 && getTodosEmpty.length <= 0"
    class="swiper"
  >
    <swiper-slide v-for="cat in categories" :key="cat">
        <div 
        :style="[ cat.active ? { 'background-color': '#7296C2' } : {'background-color': '#2B598A'}]"
        @click="store.updateCategory(cat)"
        class="category">
            {{cat.catName}}
        </div>
    </swiper-slide>
  </swiper>
      <div
        v-if="getTodosEmpty.length > 0"
        class="empty-list"
      >
        <div>
          <fa icon="fa-solid fa-face-sad-tear" color="green" size="lg" />
        </div>
        <div>
          <span>{{ getTodosEmpty }}</span>
        </div>
      </div>

      <div
        v-if="getTodosError.length > 0"
        class="error-list"
        style="color: red"
      >
        <div><fa icon="fa-solid fa-bug" color="red" size="lg" /></div>
        <div>
          <span>{{ getTodosError }}</span>
        </div>
      </div>

      <div v-for="task in displayedTasks" :key="task.taskId" class="task-container">
        <div
          v-if="getTodosError.length <= 0 && getTodosEmpty.length <= 0"
          @click="completeTask(task.taskId)"
          class="mark-done"
        >
          <fa
            v-if="task.active"
            icon="fa-regular fa-circle"
            color="white"
            size="s"
          />
          <fa v-else icon="fa-solid fa-circle-check" color="white" size="s" />
        </div>
        <div
          :style="[task.active ? {} : { 'text-decoration': 'line-through' }]"
          class="task-description"
        >
          <P>{{ task.taskDescription }}</P>
        </div>
        <div @click="editTask(task.taskId)" class="task-reminder">
          <fa icon="fa-solid fa-pen-to-square" color="white" size="xs" />
        </div>
        <div @click="removeTask(task.taskId)" class="delete-task">
          <fa icon="fa-regular fa-trash-can" color="white" size="xs" />
        </div>
      </div>
      
    </div>
    <AddTask v-if="showTaskPopUp" />
    <CreateCategory v-if="showCatPopUp" />
  </div>
    <div v-if="showSchedule">
        <TaskSchedule></TaskSchedule>
    </div>
    <footer-bar />
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { ref} from "vue";
import { useTaskManagerStore } from "../stores/taskManager";
import FooterBar from "./FooterBar.vue";
import CreateCategory from "./CreateCategory.vue";
import AddTask from "./AddTask.vue";
import TaskSchedule from "./TaskSchedule.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

export default {
  name: "HomePage",
  components: {
    FooterBar,
    CreateCategory,
    TaskSchedule,
    AddTask,
    Swiper,
    SwiperSlide,
  },
  
  setup() {
    const store = useTaskManagerStore();
    const {
      tasks,
      showTaskPopUp,
      showCatPopUp,
      categories,
      displayedTasks,
      editTaskId,
      editTaskClicked,
      beforeEdited,
      afterEdited,
      currentAction,
      activeCategory,
      showSchedule,
      getTodosError,
      getTodosEmpty,
    } = storeToRefs(useTaskManagerStore());
    store.fetchAllTasks()
    store.fetchAllCategories()

    const completeTask = (id) => {
      let indexOf = tasks.value.findIndex((task) => task.taskId === id);
      afterEdited.value = tasks.value[indexOf];
      editTaskId.value = id;
      currentAction.value = "Complete";

      if (indexOf > -1) {
        tasks.value[indexOf].active
          ? (tasks.value[indexOf].active = false)
          : (tasks.value[indexOf].active = true);
      }
      update()
    };

    const removeTask = (id) => {
      let indexOf = tasks.value.findIndex((task) => task.taskId === id);
      afterEdited.value = tasks.value[indexOf];
      editTaskId.value = id;
      currentAction.value = "Delete";
      if (indexOf > -1) {
        tasks.value.splice(indexOf, 1);
      }
      update()
    };

    const update = () =>{
        activeCategory.value = categories.value.filter(cat=> cat.active === true);
        store.updateCategory(activeCategory.value[0])
    }

    const editTask = (id) => {
      showTaskPopUp.value = true;
      editTaskId.value = id;
      editTaskClicked.value = true;
    };


    return {
      tasks,
      showTaskPopUp,
      showCatPopUp,
      categories,
      completeTask,
      removeTask,
      editTask,
      update,
      beforeEdited,
      displayedTasks,
      editTaskId,
      currentAction,
      editTaskClicked,
      afterEdited,
      store,
      activeCategory,
      getTodosError,
      getTodosEmpty,
      showSchedule
    };
  },
};
</script>

<style scoped>
.empty-list,
.error-list {
  height: 30vh;
  width: 80vw;
  margin-left: 10vw;
  background: #e8e8e8;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
  margin-top: 20vh;
  color: #525252;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.swiper {
  margin-bottom: 4vh;
  margin-left: 2vw;
  margin-right: 2vw;
}
.category {
  height: 6vh;
  line-height: 6vh;
  border-radius: 0.5rem;
  color: white;
}
.home {
  margin-top: 4vh;
  color: white;
}

.task-container {
  display: flex;
  flex-direction: row;
  margin: 2vh 5vw 2vh 5vw;
  height: 5vh;
  width: 90vw;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  line-height: 5vh;
  text-align: center;
  border-radius: 1rem;
}

.task-container:nth-of-type(odd) {
  background-color: #4D7DAF;
}

.task-container:nth-of-type(even) {
  background-color: #6A93C5;
}
.mark-done {
  margin-left: 2vw;
  margin-right: 2vw;
}

.task-description {
  width: 75vw;
  text-align: left;
}

.task-reminder {
  width: 7vw;
  margin-left: 0.5vw;
  margin-right: 3vw;
}
.delete-task {
  width: 5vw;
  margin-right: 3vw;
}
</style>
