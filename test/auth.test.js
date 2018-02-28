import chai from 'chai'
import chaiHttp from 'chai-http'
import TimeKeeper from 'timekeeper'
import moment from 'moment'
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

    it('does not display page if token is expired', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({ username: 'admin@admin.com', password: 'password' })
        .end((err, res) => {
          TimeKeeper.travel(moment().add(1, 'hour').toDate())
          chai.request(server)
            .get('/api/ingredients')
            .set('Authorization', `Bearer ${res.body.token}`)
            .end((apiErr, apiRes) => {
              expect(apiRes.status).to.eql(401)
              done()
            })
        })
    })

    it('does display page if token is refreshed', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({ username: 'admin@admin.com', password: 'password' })
        .end((err, res) => {
          let travelTo = new Date()
          TimeKeeper.travel(moment().add(29, 'minutes').toDate())
          chai.request(server)
            .post('/auth/refresh')
            .set('Authorization', `Bearer ${res.body.token}`)
            .end((refErr, refRes) => {
              TimeKeeper.travel(moment().add(29, 'minutes').toDate())
              chai.request(server)
                .get('/api/ingredients')
                .set('Authorization', `Bearer ${refRes.body.token}`)
                .end((apiErr, apiRes) => {
                  expect(apiRes.body[0].name).to.eql('test-ingredient')
                  done()
                })
            })
        })
    })
  })
});
