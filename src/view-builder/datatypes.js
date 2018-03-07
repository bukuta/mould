import IP from '../datatypes/ip';
import Enum from '../datatypes/enum';
import Picker from '../datatypes/picker';
import SitesPicker from '../resources/site/shapes/picker';
import StaticText from '../datatypes/static';
import Branch from '../datatypes/branch';
import Select from '../datatypes/select';

import Element from 'element-ui';
const {Checkbox, Input, Textarea } = Element;

const datatypes = {
  'ip': IP,
  'input': Input,
  'port': Input,
  'textarea': Textarea,
  'text': StaticText,
  'picker': Picker,
  'oneof': Branch,
  'checkbox': Checkbox,
  //'picker@Sites': SitesPicker,
  'radio-group': Enum,
  'select': Select,
  'static': StaticText,
};

export default datatypes;

