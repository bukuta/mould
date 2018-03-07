// 创建时，传入空的data对象
// 在有嵌套数据以及数组时，需要特殊处理: 构造新的对象或数组
//
// 对于引用和分支，组件需要拥有顶层的Formbuilder能力,进行递归调用和生成
// 注册组件时，需要拿到「组件池」,可能也需要拿到FormBuilder的能力
// creator中可以只有录入组件，
// profile中只有渲染组件，
// editor中两者皆有

import Element from 'element-ui';
const {Form, FormItem} = Element;

import datatypes from './datatypes.js';

import flatten from './flatten.js';

import utils from './utils.js';

function genItem({item,index,data,Entity},h,host){
  let key = item.name;
  let ComponentType = utils.getFieldRender(item.name, item.render, item);
  let name = utils.getFieldName(item.name, Entity)||item.description||item.name;
  let valueType = utils.getFieldValueType(item.name,Entity);
  let value = utils.getFieldValue(item.name, Entity, data);
  console.warn('genItem',name,value,ComponentType);
  let rawType = item.render=='textarea'?'textarea':'text';

  let content = null;
  if(item.items){
    // 嵌套shape
    content = (
      <div>
        {
          item.items.map((_item,_index)=>{
            return genItem({item:_item,index:_index,data,Entity},h, host);
          })
        }
      </div>
    );
  }else if(ComponentType.multipleValue&&ComponentType.multipleValue()){
    // 选择器
    //let enumItems = getFieldEnumValue(item.name,Entity);
    if(_.isFunction(ComponentType)){
      content = ComponentType({data:value},h,host);
    }else{
      content = <ComponentType
                value={value}
                itemsFetcher={()=>{}}
                type={rawType}
                onChange={(newValue)=>host.handle('change',{key,name,newValue,value,valueType,form:host})}/>
    }
  }else if(valueType=='array'){
    // 数组类多值
    value = Array.isArray(value)?value:[value]
    let length= value.length;
    content =(
      <div>
        {value.map((v,i)=>{
          let kk = [index,key,name,i,v].join('-');
          return (
              <div key={kk} style=" display:flex;">
            {_.isFunction(ComponentType)?ComponentType({data:v},h,host):<ComponentType
                  value={v}
                  type={rawType}
                  onChange={(newValue)=>host.handle('change',{key,index:i,name,value,newValue,valueType,form:host})}/>}
                <span onClick={()=>{host.handle('delete',{key,index:i,name,value,valueType,form:host});}}>Delete</span>
              </div>
          );
        })}
        <span onClick={()=>{host.handle('add',{key,name,value,valueType,form:host});}}>Add</span>
      </div>);
  }else if(valueType=='enum'||valueType=='oneof'){
    // 枚举
    let enumItems = utils.getFieldEnumValue(item.name,Entity);
    content = <ComponentType
                value={value}
                items={enumItems}
                type={rawType}
                formBuilder={FormBuilder}
                entity={utils.getFieldEntity(key,Entity)}
                shape={item}
                onChange={(newValue)=>host.handle('change',{key,name,newValue,value,valueType,form:host})}/>
  }else{
    // 普通组件
    content = <ComponentType
                value={value}
                type={rawType}
                onChange={(newValue)=>host.handle('change',{key,name,newValue,value,valueType,form:host})}/>
  }

  return (
    <FormItem label={Array.isArray(name)?name.join(''):String(name)} key={[index,key,name].join('-')} value={value}>
      {content}
    </FormItem>
  );
}

let FormBuilder = {
  data(){
    return {
      showConfig:false,
      localData: JSON.parse(JSON.stringify(this.$attrs.data))||{},
    };
  },
  beforeMount(){
    console.warn('lifecycle beforeMount',...arguments);
  },
  mounted(){
    console.warn('lifecycle mounted',...arguments);
  },

  beforeUpdate(){
    console.warn('lifecycle before update',...arguments);
    console.warn('lifecycle before update',JSON.stringify(this.$attrs.data),JSON.stringify(this.localData));
    if(JSON.stringify(this.$attrs.data)!==JSON.stringify(this.localData)){
      this.$set(this,'localData',this.$attrs.data);
    }

  },
  updated(){
    console.warn('lifecycle updated',...arguments);
  },
  beforeDestroy(){
    console.warn('lifecycle before destroy',...arguments);
  },
  destroyed(){
    console.warn('lifecycle destroyed',...arguments);
  },
  watch:{
    'data':function(data){
      console.warch('watch.data',data);
      this.localData=data;
    },
  },
  computed:{
    model: function(){
      return this.localData;
    }
  },
  render(){
    console.log('render',this);
    let data = this.localData;
    let shape = this.$attrs.shape;
    let Entity = this.$attrs.entity;
    console.log(this.model,shape,Entity);
    if(!shape){
      debugger;
    }

    let flattenShape = [];
    flatten(shape,[flattenShape],[]);
    //console.warn('flatten',JSON.stringify(shape,0,2),JSON.stringify(flattenShape,0,2));

    let self = this;
    let host = this;

    // 先处理层级，再将结果渲染出来？
    // vs
    // 迭代
    // ==>
    // 1.先处理层级flatten，将top,parent处理完，可能需要多趟扫描
    // 1.1 name由字符串变成数组:   name:['hardwareInfo','cpu'],
    // 2.self层级不处理
    // 3.遍历执行，递归生成（如果有层级且self）, 无法完全flatten
    //
    return (
      <div>
        <Form model={this.model} label-position="right" label-width="80px" onAdd={this.onAdd} onDelete={this.onDelete}>
          {
            flattenShape.map((item, index)=>{
              return genItem({item,index,data,Entity},this.$createElement, host);
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
                    <pre>{JSON.stringify(this.$attrs.entity,0,2)}</pre>
                </td>
                <td style="vertical-align: top;">
                    <pre>{JSON.stringify(this.$attrs.data,0,2)}</pre>
                </td>
                <td style="vertical-align: top;">
                    <pre>{JSON.stringify(this.$attrs.shape,0,2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>:null}
        </div>
      </div>);
  },

  methods:{
    handle(type,params={key,index,name,value,valueType,form}){
      console.warn('handle',...arguments);
      if(type=='add'){
        this.onAdd(params);
      }else if(type=='delete'){
        this.onDelete(params);
      }else if(type=='change'){
        this.onChange(params);
      }
    },
    onAdd({key,index,name,value,valueType,form}){
      console.warn('onAdd',...arguments);
      this.localData[key[0]].push('');
    },
    onDelete({key,index,name,value,valueType,form}){
      console.warn('onDelete',...arguments);
      let r = this.localData[key[0]].splice(index,1);
      console.warn('deleted',index,r);
    },
    onChange ({key,index,name,newValue,value,valueType,form}){
      console.warn('onChange',...arguments);
      let parent = this.localData[key[0]];
      if(Array.isArray(parent)){
        parent[index]=newValue;
      }else{
        this.localData[key[0]]=newValue;
      }
      this.$emit('change', this.getValue());
    },

    getValue(){
      console.warn('getValue',this.model);
      return this.model;
    },
  },
};

FormBuilder.register=function(name,component){
  console.warn('form.register',name,component);
  if(!datatypes[name]){
    datatypes[name]=component;
  }
}

export default FormBuilder;



