
const testData = require('../../fixtures/crearCuenta')

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://web-site-vue.vercel.app/')
    cy.get('#input-1').type('matiTutor')
    cy.get('#input-3').type('12345')
    cy.get('button').contains('Iniciar Sesión').last().click().wait(1000)
    cy.contains('Crear Cuenta')
  })

  it('createUser', () => {
    testData.forEach((user) => {
      cy.contains('Crear Cuenta').click()
      cy.get('.v-field__field').contains('Nombre').parent().type(user.nombre)
      cy.get('.v-field__field').contains('Apellido Paterno').parent().type(user.apellidoPaterno)
      cy.get('.v-field__field').contains('Apellido Materno').parent().type(user.apellidoMaterno)
      cy.get('.v-field__field').contains('Nombre de usuario').parent().type(user.nombreUsuario)
      cy.get('.v-field__field').contains('Correo').parent().type(user.correo)
      cy.get('.v-field__field').contains('Contraseña').parent().type(user.password)
      cy.get('.v-field__field').contains('Confirmar Contraseña').parent().type(user.passwordConfirm)
      cy.get('.v-field__field').contains('Edad').parent().type(user.edad)
      cy.get('.v-field__field').contains('Nivel de Apoyo').parent().click().get('.v-list-item').contains(user.nivel).click()
      cy.get('.v-field__field').contains('Sexo').parent().click().get('.v-list-item').contains(user.sexo).click()
      cy.get('button').contains('Registrar').click().wait(1000)
      cy.get('.v-card-title').contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`)
    })
  })
  
  it('filterUser', () => {
    testData.forEach((user) => {
      cy.get('[placeholder="Buscar..."]').parent().type(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`)
      cy.get('.v-row').find('.v-card').should('have.length', 1)
    })
  })
  
  it('editUser', () => {
    testData.forEach((user) => {
      cy.get('.v-card-title').contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`).get('button').contains('Ver Perfil').click()
      cy.get('button').contains('Editar').click()
      cy.get('.v-label').contains('Nombre').parent().find('.v-field__input').clear().type(user.nombre + 'Change')
      cy.get('.v-label').contains('Apellido Paterno').parent().find('.v-field__input').clear().type(user.apellidoPaterno + 'Change')
      cy.get('.v-label').contains('Apellido Materno').parent().find('.v-field__input').clear().type(user.apellidoMaterno + 'Change')
      cy.get('.v-label').contains('Edad').parent().find('.v-field__input').clear().type(parseInt(user.edad) + 1)
      cy.get('button').contains('Enviar').click()
    })
  })
  it('deleteUserIntoAccount', () => {
    testData.forEach((user) => {
      cy.get('.v-card-title').contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`).get('button').contains('Ver Perfil').click()
      cy.contains('Información de la Cuenta')
      cy.get('button').contains('Eliminar').last().click()
      cy.get('.v-card--variant-elevated').get('button').contains('Aceptar').click()
      cy.get('.v-card-title').contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`).get('button').contains('Ver Perfil').click()
      cy.get('.v-row').find('.v-card').should('have.length', 1)
    })
  })

  it('deleteUser', () => {
    testData.forEach((user) => {
      cy.contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`).parent().get('button').contains('Eliminar Perfil').click()
      //cy.get('.v-card--variant-elevated').get('button').contains('Aceptar').click()
      cy.get('.v-card-title').last().should('not.have.text', `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`)
    })
  })

  it('addImage', () => {
    testData.forEach((user) => {
      cy.get('.v-card-title').contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`).get('button').contains('Ver Perfil').click()
      cy.contains('Información de la Cuenta')
      cy.get('.mdi-menu').click()
      cy.get('.v-navigation-drawer__content').find('.v-list-item-title').contains('Mis imágenes').parent().parent().click({force: true})
      cy.contains('Agregar Imágen').click()
      cy.get('.v-field__field').contains('Seleccione una imagen').parent().find('input').selectFile('./public/img/Logo-Oficial.png')
      cy.get('.v-field__field').contains('Nombre del recurso').parent().find('input').type('Logo Rapni')
      cy.get('button').contains('Guardar').click().wait(1000)
      cy.contains('Logo Rapni')
    })
  })

  it('deleteImage', () => {
    testData.forEach((user) => {
      cy.get('.v-card-title').contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`).get('button').contains('Ver Perfil').click()
      cy.contains('Información de la Cuenta')
      cy.get('.mdi-menu').click()
      cy.get('.v-navigation-drawer__content').find('.v-list-item-title').contains('Mis imágenes').parent().parent().click({force: true})
      cy.get('.v-row').find('.v-card').contains('Logo Rapni').parent().find('button').contains('Eliminar').click().wait(1000)
      cy.contains('Eliminar recurso').parent().parent().find('button').contains('Eliminar').parent().click()
      cy.get('.v-row').find('.v-card').should('not.have.text', `Logo Rapni`)
    })
  })

  // problemas mantenedor de Logo Rapni
  it.only('editImage', () => {
    testData.forEach((user) => {
      cy.get('.v-card-title').contains(`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`).get('button').contains('Ver Perfil').click()
      cy.contains('Información de la Cuenta')
      cy.get('.mdi-menu').click()
      cy.get('.v-navigation-drawer__content').find('.v-list-item-title').contains('Mis imágenes').parent().parent().click({force: true})
      cy.get('.v-row').find('.v-card').contains('Logo Rapni').parent().find('button').contains('Editar').click()
      cy.get('.v-field__field').contains('Nombre del recurso').parent().find('input').type('Logo Rapni Modificado')
      cy.contains('Editar recurso').parent().parent().find('button').contains('Guardar').parent().click()
      cy.get('.v-row').find('.v-card').should('have.text', `Logo Rapni Modificado`)
    })
  })
  

})