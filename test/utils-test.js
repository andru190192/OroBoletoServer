'use strict'

const test = require('ava')

test('El test pasa', t => {
  t.pass()
})

test('El test no pasa', t => {
  t.fail()
})

test('El test pasa async/await', async t => {
  let p = Promise.resolve(45)
  let secret = await p
  t.is(secret, 45)
})
