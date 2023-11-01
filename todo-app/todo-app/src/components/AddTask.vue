<template>
  <Transition name="modal">
    <div
      :style="[categorySelected ? { height: '40vh' } : { height: '30vh' }]"
      class="add-task"
    >
      <div @click="closeTaskPop" class="close-pop">
        <fa icon="fa-solid fa-circle-xmark" color="white" size="m" />
      </div>
      <form novalidate>
        <div class="column">
          <div class="form-group">
            <label for="task"><strong>Describe your task</strong></label>
            <input
              id="task"
              type="text"
              list="categories"
              placeholder="Add Task"
              v-model="taskName"
            />
          </div>
          <div v-if="categorySelected" class="form-group">
            <input
              type="text"
              list="categories"
              placeholder="Create Category or Choose from List"
              v-model="catName"
            />
            <datalist id="categories">
              <option>Household</option>
              <option>School</option>
              <option>Personal</option>
              <option>Work</option>
            </datalist>
          </div>
          <div class="datepicker">
            <Datepicker v-model="date"></Datepicker>
          </div>
          <div class="add-task-icons">
            <div @click="selectCategory" class="category">Category</div>
            <fa icon="bell" color="white" size="m" />
            <div v-if="editTaskClicked" @click="editTask" class="task">
              <fa icon="fa-solid fa-pen-to-square" color="white" size="m" />
            </div>
            <div v-else @click="addTask" class="task">
              <fa icon="plus" color="white" size="m" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script>
import { storeToRefs } from "pinia";
import { useTaskManagerStore } from "../stores/taskManager";
import { ref } from "vue";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { uuid } from 'vue-uuid';
export default {
  name: "AddTask",
  components: { Datepicker },
  setup() {
    const store = useTaskManagerStore();
    const {
        showTaskPopUp,
        tasks,
        categories,
        editTaskClicked,
        editTaskId,
        beforeEdited,
        currentAction,
        activeCategory
      } = storeToRefs(useTaskManagerStore()),
      taskName = ref(""),
      catName = ref(""),
      date = ref(""),
      categorySelected = ref(false);
      const newdate = ref('');

    //Close the the pop up used to add a task.
    const closeTaskPop = () => {
      showTaskPopUp.value = false;
    };

   const getDate = ( dateObj = new Date()) => {
    var month = dateObj.getUTCMonth() + 1;
    parseInt(month) < 10? month = '0'+month:month=month;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate.value = month + "/" + day+ "/" + year;
    }
    

    //select category from swiper
    const selectCategory = () => {
      categorySelected.value
        ? (categorySelected.value = false)
        : (categorySelected.value = true);
    };

    //Edidt a to do item
    const editTask = () => {
      let indexOf = tasks.value.findIndex(
        (task) => task.taskId === editTaskId.value
      );

      if (indexOf > -1) {
        tasks.value[indexOf].taskDescription = taskName.value;
        if (catName.value.length > 0) {
          tasks.value[indexOf].category = catName.value;
          tasks.value[indexOf].active = true;
        }
      }
      showTaskPopUp.value = false;
    };

    const addTask = () => {
      let category = "";
      activeCategory.value = categories.value.filter(cat=> cat.active === true)
      catName.value.length > 0
        ? (category = catName.value)
        : (category = activeCategory.value[0].catName);

        if(date.value){
          getDate(date.value);
        }else{
          getDate();
        }
      const newTask = {
        taskId: uuid.v1(),
        taskDescription: taskName.value,
        category: category,
        active: true,
        show: true,
        date: newdate.value
      };

      let indexOf = categories.value.findIndex(
        (cat) => cat.catName === catName.value
      );

      if (taskName.value.length > 0) {
        tasks.value.unshift(newTask);
      }

      categories.value.forEach((cat) => {
        if (cat.catName != category) {
          cat.active = false;
        }
      });

      tasks.value.forEach((task) => {
    task.category == category ? (task.show = true) : (task.show = false);
      });

      if (catName.value.length > 0) {
        if (indexOf <= -1) {
          categories.value.unshift({
            catName: catName.value,
            active: true,
          });
          activeCategory.value = categories.value.filter(
            (cat) => cat.active === true
          );
          store.updateCategory(activeCategory.value[0]);
        } else {
          activeCategory.value = { catName: catName.value, active: true };
          store.updateCategory(activeCategory.value);
        }
      } else {
        activeCategory.value = { catName: activeCategory.value[0].catName, active: true };
        store.updateCategory(activeCategory.value);
      }
      showTaskPopUp.value = false;
      beforeEdited.value = newTask;
      currentAction.value = "Add";
    };
    return {
      showTaskPopUp,
      closeTaskPop,
      taskName,
      addTask,
      tasks,
      catName,
      categorySelected,
      editTaskId,
      editTaskClicked,
      currentAction,
      beforeEdited,
      activeCategory,
      selectCategory,
      editTask,
      getDate,
      categories,
      newdate,
      date
    };
  },
};
</script>

<style scoped>
.add-task {
  color: white;
  width: 80vw;
  background-color: #829cbc;
  margin-left: 10vw;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
}

input[type="text"] {
  width: 100%;
  padding: 20px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 0.5px solid white;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
}
a {
  text-decoration: none;
  color: white;
}

.add-task-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

label {
  color: white;
}
.datepicker{
  width: 70vw;
  margin-left: 5vw;
  margin-bottom: 1vh;
}
.close-pop {
  text-align: right;
  margin: 6px;
}
</style>
