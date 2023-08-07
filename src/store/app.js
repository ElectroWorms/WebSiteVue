// Utilities
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
export const useUserStore = defineStore("app", () => {
  const user = ref({
    _id : null,
    userName: null,
    firstName: null,
    secondName: null,
    email: null,
    password: null,
    typeAccount: null,
  }) 

  const secondUser = ref({
    _id : null,
    userName: null,
    firstName: null,
    secondName: null,
    email: null,
    password: null,
    typeAccount: null,
  }) 

  const solicitud = ref({
    estado: null,
    terapeuta: null,
    tutor: null,
    _id: null,
  })

  if (localStorage.getItem("user")){
    user.value = JSON.parse(localStorage.getItem("user"))
  }

  if (localStorage.getItem("secondUser")){
    secondUser.value = JSON.parse(localStorage.getItem("secondUser"))
  }

  const getSolicitud = () => {
      var url = `http://localhost:4000/solicitudes/listSolicitud/${user.value._id}`
      axios.get(url)
      .then(response => {
          var _solicitud = response.data ? response.data[0] : null
          solicitud.value = _solicitud 
          console.log("valor solicitud", solicitud)
      })
      .catch(error => {
          console.log(error)
      })
  }

  watch(
    user,
    (userVal) =>{
      localStorage.setItem("user", JSON.stringify(userVal))
    },
    {deep: true}
  )

  watch(
    secondUser,
    (userVal) =>{
      localStorage.setItem("secondUser", JSON.stringify(userVal))
    },
    {deep: true}
  )

  

  return{
    user,
    secondUser,
    solicitud,
    getSolicitud
  }
})

/*
export const useUserStore = defineStore('app', {
  //state
  state: () => ({
    user: {
      _id : null,
      userName: null,
      firstName: null,
      secondName: null,
      email: null,
      password: null,
      typeAccount: null,
    }
  }),
  // actions
  actions: {
    setUser(user: any){
      this.user = Object.assign({}, user)
      localStorage.setItem("user", JSON.stringify(this.user))
    }
  }
})*/
