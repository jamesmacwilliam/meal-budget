import Router from 'koa-router'
import Ingredient from '../../models/ingredient'
import crudRoutesFor from '../shared/crud'

const router = new Router()
const BASE_URL = `/ingredients`

crudRoutesFor(router, Ingredient, BASE_URL)

module.exports = router
