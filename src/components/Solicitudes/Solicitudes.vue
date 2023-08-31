<template>
    <v-app-bar :elevation="2" class="pl-4">        
      Mis Solicitudes
      <v-spacer></v-spacer>
      <v-text-field v-model="search" class="fondoBlanco" placeholder="Buscar..." variant="underlined" prepend-icon="mdi-magnify"></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-data-table :headers="computedHeaders" :items="solicitudes" :sort-by="[{ key: 'Usuario tutor', order: 'asc' }]" class="elevation-1 w-100">
      <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px"> 
            <v-card>
              <v-card-title>
                <span class="text-h5">Revisar estado</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-select
                        v-model="editedItem.estado"
                        :items = "estados"
                        label="Estado"
                      ></v-select>
                    </v-col>
                </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions class="my-2">
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  variant="outlined"
                  @click="save"
                >
                  Guardar
                </v-btn>
                <v-btn
                  color="red-darken-1"
                  variant="outlined"
                  @click="close"
                >
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>                
              <v-card-title class="text-h5">¿Estas seguro de eliminar este elemento?</v-card-title>
              <v-card-text class="">Eliminaras la solicitud del usuario: {{ editedItem.tutorName}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="outlined" @click="deleteItemConfirm">Aceptar</v-btn>
                <v-btn color="red-darken-1" variant="outlined" @click="closeDelete">Cancelar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </template>
    
      <template v-slot:item.estado="{ item }">
        <v-chip :color="getColor(item.columns.estado)">
            {{ item.columns.estado }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn @click="editItem(item.raw)" icon=" mdi-pencil" color="info" class="mr-2" size="small" fab elevation="2"> 
        </v-btn>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Actualizar
        </v-btn>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar.active" :timeout="timeout" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar.active = false">
            Close
            </v-btn>
        </template>
    </v-snackbar>    
</template>
<script>
import axios from 'axios'
import {useUserStore} from "../../store/app"
import config from '../../../config.json'
const store = useUserStore()
  export default {
    data: () => ({
      dialog: false,
      estados: ['En espera', 'Rechazado', 'Aprobado'],
      dialogDelete: false,
      headers: [
        { title: 'Nombre Tutor', key: 'fullname' },
        { title: 'Estado', key: 'estado' },
        { title: '_id', key: '_id' },
        { title: 'Acciones', key: 'actions', sortable: false },
      ],
      snackbar: {
        color: null,
        active: false,
        text: null,
        timeout: 3000,
      },
      solicitudes: [],
      editedIndex: -1,
      editedItem: {
        tutorName: '',
        firstName: '',
        secondName: '',
        tutorEmail: '',
        estado: '',
        _id: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      computedHeaders () {
        return this.headers.filter(header => header.title != '_id')  
      }
    },
    //a
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getSolicitudes()
    },

    methods: {
      // obtener las solicitudes
      getSolicitudes () {
        var url = `${config.PathAPI}solicitudes/listSolicitudes/${store.user._id}`
        axios.get(url)
        .then(response => {
            var solicitudes = response.data
            console.log(solicitudes)
            solicitudes.forEach(solicitud => {
                let structureSolicitud = {
                    fullname: solicitud.tutor.fullname,
                    tutorEmail:solicitud.tutor.email,
                    estado: solicitud.estado,
                    _id: solicitud._id
                }
                this.solicitudes.push(structureSolicitud)
            })
        })
        .catch(error => {
            console.log(error)
        })
      },
      getColor (estado) {
        if (estado == "Rechazado") return 'red'
        else if (estado == "En espera") return 'blue'
        else return 'green'
      },

      editItem (item) {
        this.editedIndex = this.solicitudes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log("indice:",this.editedIndex)
        console.log("item:",item)
        console.log("solicitudes:",this.solicitudes)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        var url = `${config.PathAPI}solicitudes/finalizar`
        var url2 = `${config.PathAPI}solicitudes/updateUsers`
        Object.assign(this.solicitudes[this.editedIndex], this.editedItem)
        let formData = {
            _id: this.editedItem._id,
            estado: this.editedItem.estado
        }

        if (this.editedIndex > -1) {
            // Cambiar el estado de la solicitud a rechazado o aprobado
            axios.post(url, formData)
            .then(response => {
                // En caso de que el tutor tenga niños que el terapeuta no tenga, deben ser agregados
                if(formData.estado === "Aprobado"){
                  let solicitud = response.data.solicitud
                  let usersTutor = solicitud.tutor.users
                  let _idUsersTerapeuta = solicitud.terapeuta.users.map( user => user._id)
                  let updateUsersTerapeuta = solicitud.terapeuta.users
                  usersTutor.forEach(user => {
                    if (!_idUsersTerapeuta.includes(user._id)){
                      updateUsersTerapeuta.push(user)
                    }
                  })
                  let formData ={
                    idTerapeuta: solicitud.terapeuta._id,
                    users: updateUsersTerapeuta
                  }
                  // Actualizar usuarios al terapeuta
                  axios.post(url2, formData)
                  .then(response => {
                    this.snackbar.text = 'El estado de la solicitud ha sido cambiado correctamente!'
                    this.snackbar.color = 'success'
                    this.snackbar.active = true

                    //Actualizar el usuario en localStorage
                    store.$patch({
                      user: response.data.terapeuta
                    })

                  })
                  .catch(error =>{
                    this.snackbar.text = 'No se ha logrado cambiar el estado de la solicitud. Intente nuevamente'
                    this.snackbar.color = 'error'
                    this.snackbar.active = true
                  })
                }
            })
            .catch(error => {
              this.snackbar.text = 'No se ha logrado cambiar el estado de la solicitud. Intente nuevamente'
              this.snackbar.color = 'error'
              this.snackbar.active = true
            })

        } else {
          this.solicitudes.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>