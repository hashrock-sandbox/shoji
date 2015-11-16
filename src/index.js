var Vue = require('vue')
var App = require('./views/app.vue')

new Vue({
  el: 'body',
  components: {
    app: App
  }
})