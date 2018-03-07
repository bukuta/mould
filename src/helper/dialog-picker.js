import {Table,TableColumn,MessageBox} from 'element-ui';


let PickerBuilder = {
  data(){
    return {
      showConfig:false,
      selected:[],
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

    return (
      <div>
        <Table data={this.$attrs.data}
          onSelect={this.onSelectionChange}
          show-header={false}>
          <TableColumn type="selection" width="55" />
          <TableColumn prop='name'>
          </TableColumn>
        </Table>
      <div>共选中{this.selected.length}</div>
      </div>);
  },

  methods:{
    onSelectionChange(selection){
      console.log('handleSelectionChange',...arguments);
      this.selected=selection;
    },
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

    getValue(){
      console.warn('getValue',this.model);
      return this.selected;
    },
  },
};

function Picker(host,h,{title,data,entity,shape}){
  let message = <PickerBuilder entity={entity} data={data} shape={shape}/>;
  console.log(message);
  return MessageBox({
    title: title,
    message: message,
    beforeClose:function(action,instance,done){
      done();
    },
    lockScroll: true,
    showCancelButton: true,
  }).then((action,instance)=>{
    console.log('then.',action,instance);
    return message.componentInstance.getValue();
  });
}

export default Picker;




