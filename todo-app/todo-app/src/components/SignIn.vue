<template>
    <div class="login">
    
        <form @submit.prevent="onLogin">
    
            <div class="column">
                <div class="form-group">
    
                    <label for="email">Email</label>
    
                    <input id="email" type="email" class="form-control" placeholder="Email Address.." v-model="login.email">
    
                </div>
    
                <div class="form-group">
    
                    <label for="password">Password</label>
    
                    <input id="password" type="password" class="form-control" placeholder="Password.." v-model="login.password">
    
                </div>
    
                <div class="form-group">
    
                    <input type="submit" value="Sign In">
    
                </div>
    
            </div>
    
        </form>
    </div>

</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name:'SignIn',
    setup() {
    const login = ref({});
    const router = useRouter();

    const onLogin = () =>{
        if(login.value.email == 'tiyi@gmail.com' && login.value.password == '123456'){
            router.push("/");
        }
        
    }


    return{
        login,
        onLogin
    };
        
    },
}
</script>

<style scoped>
.login {
    color: white;
    height: 40vh;
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
input:focus{
       outline: none;
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