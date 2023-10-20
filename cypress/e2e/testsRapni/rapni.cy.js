describe('template spec', () => {
    it('passes', () => {
      cy.visit('https://web-site-vue.vercel.app/')
      cy.contains('Contraseña')
    })
})