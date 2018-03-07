import datatypes from './datatypes.js';

function getProperty(name, Entity) {
  if(Array.isArray(name)){
    return name.reduce((parent,_name,index,name)=>{
      return parent.properties[_name];
    },Entity)
  }else{
    return Entity.properties[name];
  }
}

function getFieldName(name, Entity) {
  let r = getProperty(name, Entity);
  if (r) {
    return r.description;
  } else {
    throw `FieldName ${name} NotFound`;
  }
}
function getFieldValueType(name, Entity) {
  let r = getProperty(name, Entity);
  if (r) {
    if(r.enum){
      return 'enum';
    }else if(r.oneOf){
      return 'oneof';
    }
    return r.type;
  } else {
    throw `FieldValueType ${name} NotFound`;
  }
}
function getFieldEnumValue(name, Entity) {
  let r = getProperty(name, Entity);
  if (r) {
    if(r.enum){
    return r.enum;
    }else if(r.oneOf){
      return r.oneOf;
    }
  } else {
    throw `FieldEnumValue ${name} NotFound`;
  }
}
function getFieldEntity(name,Entity){
  let r = getProperty(name, Entity);
  if (r) {
    return r;
  } else {
    throw `FieldEntity ${name} NotFound`;
  }
}
function getFieldRender(name, render,itemShape) {
  if(render){
    let found = datatypes[render];
    if (found) {
      return found;
    }

    //let splitted = render.split('@');
    //if(splitted.length>1){
      //let _render = splitted[0];
      //let Ref = splitted[1];
      //console.warn('getFieldRender',_render);
      //if(datatypes[_render]){
        //return datatypes[_render];
      //}else{
        //console.warn('getFieldRender,notfount ',_render, ',default input');
        //return datatypes.input;
      //}
    //}else{
      //console.warn('getFieldRender,notfount ',render, ',default input');
      //return datatypes.input;
    //}
  }else{
    console.warn('getFieldRender, no render',itemShape);
    return datatypes.input;
  }
}

function getFieldValue(name, Entity, data) {
  console.log('getFieldValue',name,Entity,data);
  if(Array.isArray(name)){
    return name.reduce((parent,_name,index,name)=>{
      return parent[_name]||'';
    },data);
  }else{
    return data[name];
  }
}

const INIT_DATA={
  'string':'',

};

function getFieldInitData(name,Entity,shape,ComponentType){
  // 生成初始数据，用于数组型值的添加
  console.warn('getFieldInit',name,Entity,shape);
  if(ComponentType.shape){
    console.warn('ComponentType.shape',ComponentType.shape);
    let d={};
    ComponentType.shape.forEach(item=>{
      d[item.name]=INIT_DATA[item.type];
    });
    return d;
  }else{
    let _entity = getFieldEntity(name,Entity);
    console.warn('_entity',_entity);
    if(_entity.type=='array'){
      return INIT_DATA[_entity.items.type]||'';
    }else{
      return INIT_DATA[_entity.type]||'';
    }
  }
  return '';
}

export default {
  getFieldName,
  getFieldValue,
  getFieldValueType,
  getFieldEnumValue,
  getFieldEntity,
  getFieldRender,
  getFieldInitData,
};
