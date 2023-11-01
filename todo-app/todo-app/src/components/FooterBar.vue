<template>
  <div class="footer">
    <div @click="openCatPop" class="category-footer">
      <fa icon="fa-solid fa-list" color="white" size="lg" />
    </div>

    <div @click="openCalendar" class="calendar-footer">
      <fa icon="fa-solid fa-calendar-days" color="white" size="lg"/>
     
    </div>
    <div @click="openTaskPop" class="task-footer">
      <fa icon="plus" color="white" size="lg" />
    </div>

    <div @click="undoTask" class="task-footer">
      <fa icon="fa-solid fa-rotate-left" color="white" size="lg" />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useTaskManagerStore } from "../stores/taskManager";
export default {
  name: "FooterBar",
  setup() {
    const store = useTaskManagerStore();
    const {
      tasks,
      categories,
      showTaskPopUp,
      showCatPopUp,
      beforeEdited,
      editTaskId,
      afterEdited,
      currentAction,
      activeCategory,
      showSchedule
    } = storeToRefs(useTaskManagerStore());

    const openTaskPop = () => {
      showTaskPopUp.value = true;
      showCatPopUp.value = false;
      showSchedule.value = false
    };

    const openCatPop = () => {
      showCatPopUp.value = true;
      showTaskPopUp.value = false;
      showSchedule.value = false;
      
    };

    const openCalendar = () =>{
      showSchedule.value = true
    }

    const undoTask = () => {
      if (currentAction.value == "Complete") {
        let afterActive = false;
        let indexOf = tasks.value.findIndex(
          (task) => task.taskId === editTaskId.value
        );
        afterEdited.value.active ? (afterActive = false) : (afterActive = true);
        beforeEdited.value = {
          taskId: afterEdited.value.taskId,
          taskDescription: afterEdited.value.taskDescription,
          category: afterEdited.value.category,
          active: afterActive,
          show: afterEdited.value.show,
        };

        if (indexOf > -1) {
          tasks.value[indexOf] = beforeEdited.value;
          currentAction.value = "";
        }
      }

      if (currentAction.value == "Delete") {
        if (Object.keys(afterEdited.value).length > 0) {
          tasks.value.splice(editTaskId.value - 1, 0, afterEdited.value);
        }
        currentAction.value = "";
      }

      if (currentAction.value == "Add") {

        tasks.value.shift();
        currentAction.value = "";
      }

      activeCategory.value = categories.value.filter(
        (cat) => cat.active === true
      );
      store.updateCategory(activeCategory.value[0]);
    };

    return {
      showTaskPopUp,
      showCatPopUp,
      beforeEdited,
      editTaskId,
      currentAction,
      afterEdited,
      activeCategory,
      openTaskPop,
      categories,
      undoTask,
      tasks,
      openCatPop,
      openCalendar,
      showSchedule
    };
  },
};
</script>

<style scoped>
.footer {
  width: 100vw;
  height: 50px;
  background-color: #1d3461;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  bottom: 0;
  line-height: 50px;
  position: absolute;
  bottom: 0;
}
</style>
