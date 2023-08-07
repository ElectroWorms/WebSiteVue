<template>
    <v-data-table
      :headers="computedHeaders"
      :items="solicitudes"
      :sort-by="[{ key: 'Usuario tutor', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          density="compact"
        >
          <v-toolbar-title  >Mis Solicitudes</v-toolbar-title>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          > 
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
        </v-toolbar>
      </template>


        <template v-slot:item.estado="{ item }">
            <v-chip :color="getColor(item.columns.estado)">
                {{ item.columns.estado }}
            </v-chip>
        </template>
      <template v-slot:item.actions="{ item }">
        <v-btn 
            @click="editItem(item.raw)" 
            icon=" mdi-pencil"  
            color="info"
            class="mr-2"
            size="small"
            fab elevation="2"
        > 
        </v-btn>
        <!--
        <v-icon
          size="small"
          @click="deleteItem(item.raw)"
        >
          mdi-delete
        </v-icon>
        -->
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>

<script>
import axios from 'axios'
import {useUserStore} from "../../store/app"
const store = useUserStore()
  export default {
    data: () => ({
      dialog: false,
      estados: ['En espera', 'Rechazado', 'Aprobado'],
      dialogDelete: false,
      headers: [
        { title: 'Nombre de usuario tutor', key: 'tutorName' },
        { title: 'Correo tutor', key: 'tutorEmail' },
        { title: 'Nombre tutor', key: 'firstName' },
        { title: 'Apellido tutor', key: 'secondName' },
        { title: 'Estado', key: 'estado' },
        { title: '_id', key: '_id' },
        { title: 'Acciones', key: 'actions', sortable: false },
      ],
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
        console.log("hola")
        return this.headers.filter(header => header.title != '_id')  
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        var url = `http://localhost:4000/solicitudes/listSolicitudes/${store.user._id}`
        axios.get(url)
        .then(response => {
            var solicitudes = response.data
            console.log(solicitudes)
            solicitudes.forEach(solicitud => {
                let structureSolicitud = {
                    tutorName: solicitud.tutor.userName,
                    firstName: solicitud.tutor.firstName,
                    secondName: solicitud.tutor.secondName,
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

      deleteItem (item) {
        this.editedIndex = this.solicitudes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.solicitudes.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        console.log(this.editedIndex)
        if (this.editedIndex > -1) {
            var url = 'http://localhost:4000/solicitudes/finalizar'
            Object.assign(this.solicitudes[this.editedIndex], this.editedItem)
            let formData = {
                _id: this.editedItem._id,
                estado: this.editedItem.estado
            }
            axios.post(url, formData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>