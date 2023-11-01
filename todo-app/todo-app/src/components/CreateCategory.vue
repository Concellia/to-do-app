<template>
     <Transition name="modal">
    <div class="create-category">
        <div @click="closeCatPop" class="close-pop"><fa icon="fa-solid fa-circle-xmark" color="white" size="m" /></div>
        <form novalidate @submit.prevent @submit="addCat">
            <div class="column">
                <div class="form-group">
                    <input type="text" list="categories" placeholder="Create Category or Choose from List" v-model="catName" />
                    <datalist id="categories">
                        <option>Household</option>
                        <option>School</option>
                        <option>Medical Appointment</option>
                        <option>Work</option>
                    </datalist>
                </div>
                <div class="form-group">
                    <input type="submit" value="Create">
                </div>
            </div>
        </form>
    </div>
</Transition>
</template>
<script>
    import { storeToRefs } from 'pinia';
    import  { useTaskManagerStore } from '../stores/taskManager';
    import { ref } from 'vue'
    export default ({
        name: 'CreateCategory',
        setup() {
            const store = useTaskManagerStore();
            const { showCatPopUp, categories,activeCategory } = storeToRefs(useTaskManagerStore()),
            catName = ref('');
    
            const closeCatPop = () =>{
                showCatPopUp.value = false;
            }

            const addCat = () =>{
                const newCat = {
                catName: catName.value,
                active:true
                        }
            
        let indexOf = categories.value.findIndex(
        (cat) => cat.catName === catName.value
      );

            if(catName.value.length > 0){
                if(indexOf > -1){
                activeCategory.value =  newCat;
                store.updateCategory(activeCategory.value);
                }else{
                categories.value.unshift(newCat);
                activeCategory.value =  newCat;
                store.updateCategory(activeCategory.value);
                }
             
            }
            showCatPopUp.value = false;
       }
            return {
                showCatPopUp,
                closeCatPop,
                catName,
                categories,
                activeCategory,
                addCat
            };
        },
    });
    </script>

<style scoped>
.create-category {
    color: #ffffff;
    height: 45vh;
    width: 80vw;
    background-color: #829cbc;
    margin-left: 10vw;
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

input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #829cbc;
}

input:focus{
    outline: none;
}
input[type=submit] {
    width: 100%;
    background-color: #2B598A;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    margin-top: 20vh;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #2B598A;
}

label {
    text-align: left;
}

.close-pop{
    text-align: right;
    margin: 6px;
}
</style>


