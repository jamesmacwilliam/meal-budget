import { expect } from 'chai'
import { connection, fuzzyFind, create, find } from '../../src/server/db/queries/meals'

describe('meals', () => {
  beforeEach((done) => {
    async function Runner() {
      await connection.migrate.rollback()
      await connection.migrate.latest()
      done()
    }
    Runner()
  })

  it('creates new meals and queries for them', (done) => {
    async function Runner() {
      let user = { id: 1 }
      let meal = (await create(user, 'test'))[0]
      expect(await fuzzyFind(user, 'te')).not.to.be.empty
      expect(await find(meal.id)).not.to.be.empty

      done()
    }
    Runner()
  })

  it('excludes meals that do not match query', (done) => {
    async function Runner() {
      let user = { id: 100 }
      expect(await fuzzyFind(user, 'te')).to.be.empty
      expect(await find(1)).to.be.empty

      done()
    }
    Runner()
  })
})
