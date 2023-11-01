import { defineStore } from "pinia";
import axios from "axios";
// import {uuidv4} from 'uuid/v4';

//pinia is a state management library similar to vuex which is optimized for vue 3 and the composition api. Many improvement from vuex.
//All the components have access to the methods, data and computed properties on the store which makes it easy for components to share data.
export const useTaskManagerStore = defineStore({
  id: "taskManager",
  //State is where we store our data properties.
  state: () => ({
    tasks: [],
    categories: [],
    displayedTasks: [],
    activeCategory: {},
    categorySelected: false,
    showTaskPopUp: false,
    showCatPopUp: false,
    showSchedule: false,
    editTaskClicked: false,
    editTaskId: -1,
    currentAction: "",
    beforeEdited: {},
    afterEdited: {},
    authenticated: true,
    getTodosError: '',
    getTodosEmpty: '',
    error:'',
    nextId: 0,
  }),
  //getters is where we store our computed properties, the data is cached and only updated when the dependency is changed.
  getters: {
    getAllTasks(state){
        return state.tasks;
    },

    getAllCategory(state){
      return state.categories
    }

  },
  //Actions are where we store our methods, access the data on the state and modify it.
  actions: {
    updateCategory(category) {
      this.categories.forEach((cat) => {
        if (cat.catName === category.catName) {
          let index = this.categories.indexOf(cat);
          let catIndex = this.tasks.findIndex(
            (task) => task.category === cat.catName
          );
          cat.active = true;
          this.categories.splice(0, 0, this.categories.splice(index, 1)[0]);

          if (catIndex > -1) {
            this.displayedTasks = this.tasks.filter(
              (task) => task.category === cat.catName
            );
          } else {
            this.displayedTasks = [];
          }
        } else {
          cat.active = false;
        }
      });
    },

    //get all tasks from datahub
    fetchAllTasks(){
      console.log('Called 3')
      axios.get("http://localhost:5678/data/task-management/getTasks")
      .then((response) => {
        if (response.data.status === "success") {
          this.tasks = response.data.data;
        }

        if (response.data.status === "error") {
          this.getTodosError = response.data.message;
        }

        if (response.data.status === "empty") {
          this.getTodosEmpty = response.data.message;
        }
      });
    },

    fetchAllCategories(){
      axios.get("http://localhost:5678/data/task-management/getCategories")
      .then((response) => {
        if (response.data.status === "success") {
            this.categories = response.data.data;
            this.activeCategory = this.categories.filter(cat=> cat.active === true);
            this.updateCategory(this.activeCategory[0])
        }
      });
    }
    
  },
});
