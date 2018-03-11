import mbFlash from '../../../src/client/components/mb-flash.vue'

describe('mb-flash Component', () => {
  it('shows success message when triggered', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let store = new Vuex.Store({
      state: {}
    })
    const wrapper = shallow(mbFlash, {
      store,
      localVue
    })
  })
})
