<template>
    <div class="register">
    
        <form @submit.prevent="onRegister">
    
            <div class="column">
    
                <div class="form-group">
    
                    <label for="name">Name</label>
    
                    <input id="name" type="text" class="form-control" placeholder="eg. Jane Doe" v-model="register.fullname">
    
                </div>
    
                <div class="form-group">
    
                    <label for="username">Username</label>
    
                    <input id="username" type="text" class="form-control" placeholder="Username.." v-model="register.username">
    
                </div>
    
                <div class="form-group">
    
                    <label for="email">Email</label>
    
                    <input id="email" type="email" class="form-control" placeholder="Email Address.." v-model="register.email">
    
                </div>
    
                <div class="form-group">
    
                    <label for="password">Password</label>
    
                    <input id="password" type="password" class="form-control" placeholder="Password.." v-model="register.password">
    
                </div>
    
                <div class="form-group">
    
                    <input type="submit" value="Register">
    
                </div>
    
            </div>
    
        </form>
    </div>

</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name:'RegiserAccount',
    setup() {
    const register = ref({});
    const router = useRouter();

    const onRegister = () =>{
        router.push("/");
    }


    return{
        register,
        onRegister
    };
        
    },
}
</script>

<style scoped>
.register {
    color: white;
    height: 70vh;
    width: 80vw;
    background-color: #829CBC;
    margin-left: 10vw;
    margin-top: 5vh;
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

input[type=text],
input[type=password],
input[type=email] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 0.5px solid white;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color:#1D3461;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #2B598A;
}

label{
    text-align: left;
}
</style>