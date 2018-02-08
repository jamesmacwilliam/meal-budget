import assert from 'assert'
import { expect } from 'chai'
import { base, connection, create, find } from '../../src/server/db/queries/kitchens'
import { addUser } from '../../src/server/db/queries/users'


describe('kitchens', () => {
  beforeEach((done) => {
    async function Runner() {
      await connection.migrate.rollback()
      await connection.migrate.latest()
      done()
    }
    Runner()
  })

  it('creates new kitchens and queries for them', (done) => {
    async function Runner() {
      let user = { id: 1 }
      let kitchen = (await create(user))[0]
      expect(await find(user)).not.to.be.empty

      done()
    }
    Runner()
  })

  it('excludes kitchens that do not match query', (done) => {
    async function Runner() {
      let user = {id: 100}
      expect(await find(user)).to.be.empty

      done()
    }
    Runner()
  })
})
