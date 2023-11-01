const axios = require('axios').default;

const getAllTasks = () =>{
    axios({
        method: 'get',
        url: 'http://localhost:5678/data/task-management/getTasks'
      })
      .then(response => {
        console.log(response.data.data)
    })
      .catch(error => console.error('timeout exceeded'))
}


const getAllCategories = () =>{
    let categories = {};
    axios({
        method: 'get',
        url: 'http://localhost:5678/data/task-management/getCategories'
      })
      .then(response => {
        // console.log(response.data)
        categories = response.data;
    })
      .catch(error => console.error('timeout exceeded'))

      return categories;

}

// const axiosTest = async () => {
//     try {
//       const {data:response} = await axios.get('http://localhost:5678/data/task-management/getCategories') //use data destructuring to get data from the promise object
//       return response
//     }
      
//     catch (error) {
//       console.log(error);
//     }
//   }
// let y = {}
// let x = axiosTest().then(data =>{
//     // console.log(data)
//     y = data
// })
console.log(getAllTasks())

module.exports =  {
    getAllCategories,
    getAllTasks
}

