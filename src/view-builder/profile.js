import Assembly from '@bbfe/components-assembly';
const {Form, FormItem} = Assembly;

import datatypes from './datatypes.js';

import flatten from './flatten.js';

import utils from './utils.js';

function genItem({item, index, data, Entity}, h, host) {
  let key = item.name;
  let name = utils.getFieldName(item.name, Entity) || item.description || item.name;
  let valueType = utils.getFieldValueType(item.name, Entity);
  let value = utils.getFieldValue(item.name, Entity, data);

  let ComponentType = utils.getFieldRender(item.name, item.render, item);
  let rawType = item.render == 'textarea' ? 'textarea' : 'text';
  console.warn('genItem', name, value, ComponentType);

  let content = null;
  if (item.items) {
    // 嵌套shape
    content = (
      <div>
        { item.items.map((_item, _index) => {
            return genItem({
              item: _item,
              index: _index,
              data,
              Entity
            }, h, host);
          }) }
      </div>
    );
  } else if (valueType == 'array') {
    // 数组类多值
    value = Array.isArray(value) ? value : [value]
    let length = value.length;
    content = (
      <div>
        {value.map((v, i) => {
        let kk = [index, key, name, i, v].join('-');
        return (
          <div key={kk} style=" display:flex;">
              {_.isFunction(ComponentType) ?
            ComponentType({
              data: v
            }, h, host) :
            <ComponentType
            value={v}
            type={rawType}
            />}
              </div>
          );
      })}
      </div>);
  } else if (valueType == 'enum' || valueType == 'oneof') {
    // 枚举
    let enumItems = utils.getFieldEnumValue(item.name, Entity);
    content = <ComponentType
    value={value}
    items={enumItems}
    type={rawType}
    formBuilder={FormBuilder}
    entity={utils.getFieldEntity(key, Entity)}
    shape={item}
    />
  } else {
    // 普通组件
    content = <ComponentType
    value={value||'-'}
    type={rawType}
    onChange={(newValue) => host.handle('change', {
      key,
      name,
      newValue,
      value,
      valueType,
      form: host
    })}/>
  }

  return (
    <FormItem label={Array.isArray(name) ? name.join('') : String(name)} key={[index, key, name].join('-')} value={value}>
      {content}
    </FormItem>
    );
}

let FormBuilder = {
  data() {
    return {
      showConfig:false,
      localData: this.$attrs.data||{},
    };
  },
  beforeMount() {
    console.warn('lifecycle beforeMount', ...arguments);
  },
  mounted() {
    console.warn('lifecycle mounted', ...arguments);
  },

  beforeUpdate() {
    console.warn('lifecycle before update', ...arguments);

  },
  updated() {
    console.warn('lifecycle updated', ...arguments);
  },
  beforeDestroy() {
    console.warn('lifecycle before destroy', ...arguments);
  },
  destroyed() {
    console.warn('lifecycle destroyed', ...arguments);
  },
  watch: {
    'data': function(data) {
      console.warch('watch.data', data);
      this.localData = data;
    },
  },
  computed: {
    model: function() {
      return this.$attrs.data;
    }
  },
  render() {
    let data = this.localData;
    let shape = this.$attrs.shape;
    let Entity = this.$attrs.entity;
    if (!shape) {
      throw new Error('one shape needed to render');
    }
    console.log('render', this.model, shape, Entity);

    // TODO. 后续将flattenShape生成移出render, 提高速度
    // 1.先处理层级flatten，将top,parent处理完，可能需要多趟扫描
    // 1.1 name由字符串变成数组:   name:['hardwareInfo','cpu'],
    let flattenShape = [];
    flatten(shape, [flattenShape], []);

    let host = this;

    return (
      <div>
        <Form label-position="right" label-width="80px">
          {
            flattenShape.map((item, index) => {
              return genItem({
                item,
                index,
                data,
                Entity
              }, this.$createElement, host);
            })
          }
        </Form>
        <div style="overflow:scroll; border-top: 1px solid #aaa;display:none;" class="x-data">
          <h3 onClick={()=>{this.showConfig=!this.showConfig;}}>showConfig</h3>
            {this.showConfig?
          <table style="vertical-align: top; table-layout: fixed; width: 100%;">
            <thead>
              <tr style="background: #999; height: 40px;">
                <th> entity </th>
                <th> data </th>
                <th> shape </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="vertical-align: top;">
                    <pre>{JSON.stringify(this.$attrs.entity, 0, 2)}</pre>
                </td>
                <td style="vertical-align: top;">
                    <pre>{JSON.stringify(this.$attrs.data, 0, 2)}</pre>
                </td>
                <td style="vertical-align: top;">
                    <pre>{JSON.stringify(this.$attrs.shape, 0, 2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>:null}
        </div>
      </div>);
  },
};

FormBuilder.register = function(name, component) {
  console.warn('form.register', name, component);
  if (!datatypes[name]) {
    datatypes[name] = component;
  }
}

export default FormBuilder;

