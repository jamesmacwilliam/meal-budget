export default function crudRoutesFor(router, model, baseUrl) {
  router.get(baseUrl, async (ctx) => {
    try {
      ctx.type = 'json'
      const ingredients = await model.query()
      ctx.body = ingredients
    } catch (err) {
      console.log(err)
    }
  })

  router.get(`${baseUrl}/:id`, async (ctx) => {
    ctx.type = 'json'
    let ingredient = null
    try {
      ingredient = await model.query().findById(ctx.params.id)
    } catch(err) {}
    if (ingredient) {
      ctx.body = ingredient
    }else{
      ctx.status = 404
      ctx.body = { status: 'error', message: 'record not found' }
    }
  })

  router.post(baseUrl, async (ctx) => {
    ctx.type = 'json'
    let ingredient = null
    try {
      const ingredient = await model.query().insert(ctx.request.body)
      ctx.body = ingredient
    } catch(err) {
      ctx.status = 400
      ctx.body = { status: 'error', message: err.detail }
    }
  })

  router.put(`${baseUrl}/:id`, async (ctx) => {
    ctx.type = 'json'
    let ingredient = null
    try {
      ingredient = await model.query().updateAndFetchById(ctx.params.id, ctx.request.body)
      ctx.body = ingredient
    } catch(err) {
      ctx.status = 400
      ctx.body = { status: 'error', message: err.detail }
    }
  })

  router.delete(`${baseUrl}/:id`, async (ctx) => {
    ctx.type = 'json'
    let deletedCount = 0
    try {
      deletedCount = await model.query().deleteById(ctx.params.id)
    } catch(err) {}
    if (deletedCount > 0) {
      ctx.body = { status: 'success' }
    }else{
      ctx.status = 404
      ctx.body = { status: 'error' }
    }
  })
}
