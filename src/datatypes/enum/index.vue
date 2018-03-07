<template>
  <el-radio-group v-model='current'>
    <el-radio :key="item" :value='item' :label="item" v-for='item in items'>{{item}}</el-radio>
  </el-radio-group>
</template>
<script>
export default {
  data(){
    console.warn('enum',this.$attrs);

    return {
      items:this.$attrs.items,
      current: this.$attrs.value,
    };
  },
};
</script>


