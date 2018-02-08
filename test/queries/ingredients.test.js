import assert from 'assert'
import { expect } from 'chai'
import { base, connection, findAllByName, createByName, find } from '../../src/server/db/queries/ingredients'


describe('ingredients', () => {
  beforeEach((done) => {
    async function Runner() {
      await connection.migrate.rollback()
      await connection.migrate.latest()
      done()
    }
    Runner()
  })

  it('creates new ingredients and queries for them', (done) => {
    async function Runner() {
      let ingredient = (await createByName('test'))[0]
      expect(await findAllByName('te')).not.to.be.empty
      expect(await find(ingredient.id)).not.to.be.empty

      done()
    }
    Runner()
  })

  it('excludes ingredients that do not match query', (done) => {
    async function Runner() {
      expect(await findAllByName('te')).to.be.empty
      expect(await find(1)).to.be.empty

      done()
    }
    Runner()
  })
})
