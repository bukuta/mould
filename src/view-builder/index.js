// import datatypes
import datatypes from './datatypes.js';

//import Sites from '../resources/site';

import ResourceViewer from './profile.js';
import ResourceModifier from './editor.js';
import ResourceCreator from './creator.js';

function register(name, component) {
  console.warn('form.register', name, component);
  if (!datatypes[name]) {
    datatypes[name] = component;
  }
}

//Sites(FormBuilder);
export default ResourceViewer;

export {
  ResourceViewer,
  ResourceModifier,
  ResourceCreator,
  register
};
