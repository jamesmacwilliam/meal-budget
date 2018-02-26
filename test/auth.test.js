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
      await conn.seed.run()
      done()
    }
    Runner()
  });

  describe('GET /api/ingredients', () => {
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
  });
});
