/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTable
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        colors: {
          primary: '#3daeff',
          secondary: 'rgb(200, 230, 252)',
        },
      },
    },
    buttons: {
      textTransform: 'lowercase', // Esto hace que el texto del botón se muestre en mayúsculas
    },
    
  },
  
})
