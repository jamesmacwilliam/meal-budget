const chai = require('chai')
const expect = chai.expect
require('jsdom-global')()
const utils = require('@vue/test-utils')

global.expect = expect
global.chai = chai
global.mount = utils.mount
global.shallow = utils.shallow
global.createLocalVue = utils.createLocalVue
global.Vuex = require('vuex')
