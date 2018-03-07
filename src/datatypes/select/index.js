import Assembly from '@bbfe/components-assembly';
const {Select,Option} = Assembly;

const Index = {
  data(){
    console.warn('oneof',this.$attrs);
    let items = Object.values(this.$attrs.items);
    let radioItems = items.map(item=>{
      return item.name||item.value||item;
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
    console.warn('select.onChange',newvalue);
  },
  render(){
    let items = this.items;
    let current = this.current;

    console.warn('select.render',items);

    return <div>
      <Select value={current} onInput={(newvalue)=>{console.warn('onInput.onChange',newvalue);this.current=newvalue;}} >
      { items.map(item=>{
        return <Option key={item} label={item} value={item}>{item}</Option>;
      })}
      </Select>
      </div>
  },
}

export default Index;


