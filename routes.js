const routes = module.exports = require('next-routes')()

routes
  .add('blog/entry', '/blog/:id')