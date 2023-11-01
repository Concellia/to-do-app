<template>
   <div class="schedule">
    <div class="schedule-heading">
        <span>Chek out your schedule</span>
    </div>
    <div class="schedule-calendar">
        <v-calendar is-expanded show-weeknumbers :rows="1" :attributes='scheduleAtrr' />
    </div>
    <div class="schedule-heading">
        <span>Your Daily Tasks</span>
    </div>
        <div v-for="task in dailyTasks" :key="task.taskId" >
          <div v-if="task.active" class="daily-tasks">
        <div class="task-description">
          <P>{{ task.taskDescription }}</P>
        </div>
      </div>
      <div v-else class="task-done">
        <div class="task-description" style="text-decoration: line-through;">
          <P>{{ task.taskDescription }}</P>
        </div>
      </div>
    </div>
        <datepicker></datepicker>
   </div>
  </template>

  <script>
  import { ref, computed} from 'vue';
  import '@vuepic/vue-datepicker/dist/main.css'
  import { storeToRefs } from "pinia";
  import { useTaskManagerStore } from "../stores/taskManager";
  export default {
    name: "TaskSchedule",
    setup(){
    const { tasks } = storeToRefs(useTaskManagerStore());
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    parseInt(month) < 10? month = '0'+month:month=month;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const newdate = ref(month + "/" + day+ "/" + year);
  

const scheduleAtrr = computed(() => {
    return [
        ...tasks.value.map((todo) => ({
          dates: new Date(todo.date),
          dot: {
            color: todo.active? 'red':'green',
            class: todo.active ? 'opacity-75' : '',
          },
          popover: {
            label: todo.taskDescription,
          },
          customData: todo,
        })),
      ];

})

const dailyTasks = computed(() => {
  return tasks.value.filter(cat=> cat.date === newdate.value)
})

      return {
        scheduleAtrr,
        tasks,
        dailyTasks,
        newdate
      }
    }
  }
</script>
<style>

.schedule{
    margin-top: 4vh;
    height: 90vh;
    display: flex;
    flex-direction: column;
    
    }
.schedule-heading{
    color: white;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 1vh;

}

.daily-tasks,.task-done{
  display: flex;
  flex-direction: row;
  margin: 1vh 5vw 1vh 5vw;
  height: 5vh;
  width: 90vw;
  line-height: 5vh;
  text-align: center;
}


    .schedule-calendar{
    height: 35vh;
    margin-top: 3vh;
    color: white;
    width: 90vw;
    margin-left: 5vw;
    border-radius: 1rem;
    }
.daily-tasks {
  background-color: #6A93C5;
}

.task-done{
  background-color: grey;
}


.task-description {
  width: 75vw;
  text-align: left;
  margin-left: 5vw;
  margin-right: 2vw;
}
    
</style>