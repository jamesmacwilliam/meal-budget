process.env.NODE_ENV = 'test'

//var ingredients = require('../src/server/db/queries/ingredients')
const assert = require('assert')

describe('ingredients', () => {
  //beforeEach(() => { ingredients.base.truncate() })

  it('passes', () => {
    assert.equal(1, 1)
  })
})
