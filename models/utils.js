'use strict'

function uniqueEmail (email) {
  return (email, next) => {
    console.log('El email actual es: ')
    console.log('La email que estoy ingresando es: ' + email)
    next()
  }
}

module.exports = {
  uniqueEmail
}
