import { personPath, personParamPath } from './paths/index';

export default {
  '/persons': personPath,
  '/persons/{id}': personParamPath
}