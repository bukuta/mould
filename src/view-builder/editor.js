import Element from 'element-ui';
const {Form, FormItem} = Element;

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
  } else if (ComponentType.multipleValue && ComponentType.multipleValue()) {
    // 选择器
    //let enumItems = getFieldEnumValue(item.name,Entity);
    if (_.isFunction(ComponentType)) {
      content = ComponentType({
        data: value
      }, h, host);
    } else {
      content = <ComponentType
      value={value}
      itemsFetcher={() => {
      }}
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
            {_.isFunction(ComponentType) ? ComponentType({
                  data: v
                }, h, host) : <ComponentType
                value={v}
                type={rawType}
                onChange={(newValue) => host.handle('change', {
                  key,
                  index: i,
                  name,
                  value,
                  newValue,
                  valueType,
                  form: host
                })}/>}
            <span onClick={() => {
              host.handle('delete', {
                key,
                index: i,
                name,
                value,
                valueType,
                form: host
              });
            }}>Delete</span>
          </div>
          );
        })}
        <span onClick={() => {
          host.handle('add', {
            key,
            name,
            value,
            valueType,
            ComponentType,
            form: host
          });
        }}>Add</span>
      </div>);
  } else if (valueType == 'enum' || valueType == 'oneof') {
    // 枚举 或分支
    let enumItems = utils.getFieldEnumValue(item.name, Entity);

    content = <ComponentType
                value={value}
                items={enumItems}
                type={rawType}
                formBuilder={FormBuilder}
                entity={utils.getFieldEntity(key, Entity)}
                shape={item}
                onChange={(newValue) => host.handle('change', {
                  key,
                  name,
                  newValue,
                  value,
                  valueType,
                  ComponentType,
                  form: host
                })}/>
  } else {
    // 普通组件
    content = <ComponentType
                value={value}
                type={rawType}
                onChange={(newValue) => host.handle('change', {
                  key,
                  name,
                  newValue,
                  value,
                  valueType,
                  form: host,
                  ComponentType,
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
      localData: this.$attrs.data,//JSON.parse(JSON.stringify(this.$attrs.data))||{},
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
    if(JSON.stringify(this.$attrs.data)!==JSON.stringify(this.localData)){
      this.localData=this.$attrs.data;
    }
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
      this.localData = JSON.parse(JSON.stringify(data))||{};
    },
  },
  computed: {
    model: function() {
      return this.localData;
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
        <Form model={this.model} label-position="right" label-width="80px" onAdd={this.onAdd} onDelete={this.onDelete}>
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
        <div style="overflow:scroll; border-top: 1px solid #aaa;" class="x-data">
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

  methods: {
    handle(type, params) {
      console.warn('handle', ...arguments);
      if (type == 'add') {
        this.onAdd(params);
      } else if (type == 'delete') {
        this.onDelete(params);
      } else if (type == 'change') {
        this.onChange(params);
      }
    },
    onAdd({key, index, name, value, valueType, form, ComponentType}) {
      console.warn('onAdd', ...arguments);
      let entity = this.$attrs.entity;
      let initData = utils.getFieldInitData(key,entity,this.$attrs.shape,ComponentType);
      //ComponentType.shape
      //let initData = utils.getFieldInit(key,entity,shape)
      console.warn(initData);
      this.localData[key[0]].push(initData);
    },
    onDelete({key, index, name, value, valueType, form}) {
      console.warn('onDelete', ...arguments);
      let r = this.localData[key[0]].splice(index, 1);
      console.warn('deleted', index, r);
    },
    onChange({key, index, name, newValue, value, valueType, form}) {
      console.warn('onChange', ...arguments);
      let parent = this.localData[key[0]];
      if (Array.isArray(parent)) {
        parent[index] = newValue;
      } else {
        this.localData[key[0]] = newValue;
      }
      //this.dispatch('change');
      //this.$emit('change', this.getValue());
      //this.dispatch('ElFormItem', 'el.form.change', [this.getValue()]);

    },

    getValue() {
      console.warn('getValue',this.model);
      return this.model;
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
  },
};

FormBuilder.register = function(name, component) {
  console.warn('form.register', name, component);
  if (!datatypes[name]) {
    datatypes[name] = component;
  }
}

export default FormBuilder;

