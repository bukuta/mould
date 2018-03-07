import {RadioGroup, Radio,RadioButton} from 'element-ui';

const Index = {
  data(){
    console.warn('oneof',this.$attrs);
    let items = Object.values(this.$attrs.items);
    let radioItems = items.map(item=>{
      return item.name;
    });

    let current = Object.keys(this.$attrs.value);
    let _current = current[0]||radioItems[0];
    console.warn('oneOf,radioItems',radioItems,_current);

    return {
      items:radioItems,
      current: _current,
    };
  },
  onChange(newvalue){
    console.warn('oneOf.onChange',newvalue);
  },
  render(){
    let items = this.items;
    let current = this.current;
    let FormBuilder = this.$attrs.formBuilder;
    let Entity = this.$attrs.entity;
    let shape = this.$attrs.shape;
    console.warn('shap',FormBuilder,Entity,shape);
    let _data={};
    let _entity=Entity.oneOf[current];
    let _shape = shape.oneOf[current];
    console.warn('build',_data,_entity,_shape);
    return <div>
      <RadioGroup value={current} onInput={(newvalue)=>{console.warn('onInput.onChange',newvalue);this.current=newvalue;}} >
      { items.map(item=>{
        return <RadioButton key={item} label={item} >{item}</RadioButton>;
      })}
      </RadioGroup>
      <div>
        <FormBuilder data={_data} entity={_entity} shape={_shape} />
      </div>
      </div>
  },
}

export default Index;

