import paths from "./paths";
import components from "./components";
import schemas from "./schemas";

export default {
  openapi: '3.0.0',
  info: {
    title: 'crud-person-ts-api',
    description: 'API para realizar CRUD de pessoas',
    version: '4.1.1'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Pessoa'
  }],
  paths: paths,
  schemas: schemas,
  components: components
}