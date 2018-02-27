import chai from 'chai'
import chaiHttp from 'chai-http'
chai.use(chaiHttp)

import server from '../src/server/app'
import { conn } from '../src/server/db/connection'

const expect = chai.expect


describe('authentication', () => {
  beforeEach((done) => {
    async function Runner() {
      await conn.truncate('users')
      await conn.truncate('ingredients')
      done()
    }
    Runner()
  })

  describe('without existing users', () => {
    it('signs up new user', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send({ username: 'admin@admin.com', password: 'password' })
        .end((err, res) => {
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })

  describe('with existing users', () => {
    beforeEach((done) => { conn.seed.run().then(() => done()) })

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
      chai.request(server)
      .get('/api/ingredients')
      .end((err, res) => {
        expect(res.status).to.eql(401)
        expect(res.text).to.contain('Unauthorized')
        done()
      })
    })

    it('should display page if logged in', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({ username: 'admin@admin.com', password: 'password' })
        .end((err, res) => {
          chai.request(server)
            .get('/api/ingredients')
            .set('Authorization', `Bearer ${res.body.token}`)
            .end((apiErr, apiRes) => {
              expect(apiRes.body[0].name).to.eql('test-ingredient')
              done()
            })
        })
    })
  })
});
