<template>
  <div>
    <el-radio-group v-model='current'>
      <el-radio-button :key="item" :value='item' :label="item" v-for='item in items'>{{item}}</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  data(){
    console.warn('oneof',this.$attrs);
    let items = this.$attrs.items;
    let radioItems = items.map(item=>{
      return item.name;
    });

    console.warn('oneOf,radioItems',radioItems);

    return {
      items:radioItems,
      current: Object.keys(this.$attrs.value)[0],
    };
  },
  render(){
    return <div>jsx</div>
  },
};
</script>



