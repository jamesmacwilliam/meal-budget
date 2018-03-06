import chai from 'chai'
import chaiHttp from 'chai-http'
chai.use(chaiHttp)

import server from '../../src/server/app'
import { conn } from '../../src/server/db/connection'

const expect = chai.expect


describe('authentication', () => {
  beforeEach(async () => {
    await conn.truncate('users')
    await conn.truncate('ingredients')
  })

  describe('without existing users', () => {
    it('signs up new user', async () => {
      let res = await chai.request(server)
        .post('/auth/signup')
        .send({ username: 'admin@admin.com', password: 'password' })
      expect(res.status).to.eql(200)
    })
  })

  describe('with existing users', () => {
    beforeEach(async () => { await conn.seed.run() })

    it('fails if username already exists', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send({ username: 'admin@admin.com', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.eql(400)
          done()
        })
    })

    it('should not display data if not logged in', (done) => {
      chai.request(server).get('/api/ingredients')
        .end((err, res) => {
          expect(res.status).to.eql(401)
          expect(res.body.login).to.eql('required')
          done()
        })
    })

    it('should display page if logged in', async () => {
      let agent = chai.request.agent(server)
      let res = await agent
        .post('/auth/login')
        .send({ username: 'admin@admin.com', password: 'password' })
      expect(res).to.have.cookie('koa:sess')
      res = await agent.get('/api/ingredients')
      expect(res.body[0].name).to.eql('test-ingredient')
    })

    it('does not display page if logged out', async () => {
      let agent = chai.request.agent(server)
      let res = await agent
        .post('/auth/login')
        .send({ username: 'admin@admin.com', password: 'password' })
      await agent.get('/auth/logout')
      let ex = null
      try { await agent.get('/api/ingredients') }
      catch (e) { ex = e }
      expect(ex).not.to.be.null
    })
  })
});
