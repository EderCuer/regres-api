import 'cypress-plugin-api'
import 'cypress-mochawesome-reporter/register';
import './commands'
import chaiJsonSchema from 'chai-json-schema';
chai.use(chaiJsonSchema);