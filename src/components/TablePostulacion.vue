<template>
    <v-data-table
      :headers="headers"
      :items="postulaciones"
      class="elevation-1 mt-4 mb-5"
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
      <v-toolbar-title>Postulaciones</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogPostulacion"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar postulación
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
                <span class="text-h5">{{formTitle}}</span>
            </v-card-title>

            <v-card-text class="mt-4 px-10">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                    <v-row>
                        <v-select
                        :items="programas"
                        label="Programa"
                        v-model="editedItem.programa"
                        :rules="[v => !!v || 'Programa es requerido']"
                        
                        ></v-select>
                    </v-row>

                    <v-row>
                        <v-select
                        :items="periodos"
                        label="Periodo"
                        v-model="editedItem.periodo"
                        :rules="[v => !!v || 'Periodo es requerido']"
                        ></v-select>
                    </v-row>
                    <v-row>
                        <v-select
                        :items="vias"
                        label="Vía de ingreso"
                        v-model="editedItem.via_ingreso"
                        :rules="[v => !!v || 'Vía de ingreso es requerido']"
                        
                        ></v-select>
                    </v-row>

                    <v-row>
                        <v-select
                        :items="carreras"
                        label="Carrera"
                        v-model="editedItem.carrera"
                        :rules="[v => !!v || 'Carrera es requerido']"
                        ></v-select>
                    </v-row>

                    <v-row>
                        <v-select
                        :items="campuss"
                        label="Campus"
                        v-model="editedItem.campus"
                        :rules="[v => !!v || 'Campus es requerido']"
                        ></v-select>
                    </v-row>
                    
                  </v-form>
            </v-card-text>
            <v-card-actions class="mt-5 pt-5">
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="validate"
                    >
                    Guardar
                </v-btn>

                <v-btn
                    color="red darken-1"
                    text
                    @click="close"
                    >
                    Cancelar
                </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 justify-center">¿Está seguro que desea eliminar?</v-card-title>
            <v-card-text class="text-center">
              <v-icon size="75" class="mr-2" max-widht="300px" elevation="2"
                
                fab
                color="error"
                >
                mdi-delete
              </v-icon>
          </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Aceptar</v-btn>
              <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card class="text-center">
            <v-card-title class="text-h5 justify-center">
                <span class="text-h5">{{changeTitle}}</span>
            </v-card-title>
            <v-card-text class="text-center">
              <v-icon size="75" class="align-text" max-widht="300px" color="green">
                mdi-checkbox-marked-circle-outline
              </v-icon>
          </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn color="blue darken-1" text @click="dialogEdit =false">Aceptar</v-btn>
              
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-toolbar>

    </template>
      <template v-slot:[`item.estado`]="{ item }">
        <v-chip
          :color="getColor(item.estado)"
          dark
        >
          {{ item.estado }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          elevation="2"
          small
          fab
          color="success"
          class="mr-2"
          @click="editItem(item)"
        >
          <v-icon >
          mdi-pencil
        </v-icon> 
        
      </v-btn>

      <v-btn
          elevation="2"
          small
          fab
          color="error"
          class="mr-2"
          @click="deleteItem(item)"
        >
          <v-icon >
          mdi-delete
      </v-icon>
      
      </v-btn>

    </template>
    </v-data-table>
      
</template>

<script>
  export default {
    data () {
      return {dialogPostulacion:false, dialogDelete:false,editedIndex: -1,dialogEdit:false,editedIndex2:-1,valid: true,
        headers: [
          {
            text: 'Programa',
            align: 'start',
            sortable: false,
            value: 'programa',
          },
          { text: 'Periodo', value: 'periodo' },
          { text: 'Vía de ingreso', value: 'via_ingreso' },
          { text: 'Estado', value: 'estado' },
          
          { text: 'Carrera', value: 'carrera' },
          { text: 'Campus', value: 'campus' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
        postulaciones: [
        ],
        editedItem: {
            programa: '',
            periodo: '',
            via_ingreso: '',
            estado: '',
            fecha_creacion: '',
            carrera:'',
            campus:'',
        },
        defaultItem: {
          programa: '',
            periodo: '',
            via_ingreso: '',
            estado: '',
            fecha_creacion: '',
            carrera:'',
            campus:'',
      },
        periodos: ['2023-1', '2023-2', '2024-1', '2024-2'],
        vias: ['Deportista Destacado', 'Promedio de notas', 'Mujeres Líderess', 'Emprendedores Jóvenes'],
        programas: ['PPT (Preliminar Técnico)', 'PPI (Preliminar de Ingeniería)', 'STEM (Science, Technology, Engineering y Mathematics)'],
        carreras: ['Ing Civil Informática', 'Ténico en informática', 'Ing Civil Industrial', 'Ing Comercial', 'Ing Química'],
        campuss: ['San Joaquín', 'Casa Central', 'Viña del Mar'],
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva postulación' : 'Editar postulación'
      },
      changeTitle () {
        return this.editedIndex2 === -1 ? 'Postulación agregada correctamente' : 'Postulación editada correctamente'
      },
    },
    methods: {
      getColor (estado) {
        if (estado == 'Revisión') return 'red'
        else if (estado == 'Aceptado') return 'green'
        else return 'orange'
      },
      validate () {
        
        if(this.$refs.form.validate()){
          this.save()
          
          
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      save (){  
        //Calcular fecha actual
        this.dialogEdit = true;
        
        console.log(this.editedIndex)
        if (this.editedIndex> -1){
          this.editedIndex2 = this.editedIndex;
          Object.assign(this.postulaciones[this.editedIndex], this.editedItem)
        }
        else{
          let today = new Date();
          let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`
          let month = `${(today.getMonth() +1 ) <10 ? "0" : ""}${today.getMonth()+1}`
          let year = today.getFullYear()
          this.editedItem.fecha_creacion = `${day}/${month}/${year}`
          this.editedItem.estado = "En espera"
          
          this.editedIndex2 = -1
          this.postulaciones.push(this.editedItem)
          
          
        }
        this.close()
        this.resetValidation()
       
      },
      editItem (item) {
        
        this.editedIndex = this.postulaciones.indexOf(item)
        
        this.editedItem = Object.assign({}, item)
        this.dialogPostulacion = true
      },

      deleteItem (item) {
        
        this.editedIndex = this.postulaciones.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.postulaciones.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialogPostulacion = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
      })},
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })},

    },
    /*created(){
        let data = localStorage.getItem("postulaciones");
        if (data != null){
            this.postulaciones = JSON.parse(data);
        }
    }*/
  }
</script>