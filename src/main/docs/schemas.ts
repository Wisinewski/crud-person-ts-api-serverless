import { personsSchema } from './schemas/persons-schema';
import { updatePersonByIdParamsSchema } from './schemas/update-person-params-schema';
import { addPersonParamsSchema, personSchema, errorSchema } from './schemas/index';

export default {
  person: personSchema,
  persons: personsSchema,
  addPersonParams: addPersonParamsSchema,
  updatePersonByIdParams: updatePersonByIdParamsSchema,
  error: errorSchema
}