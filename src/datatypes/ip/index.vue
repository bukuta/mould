<template>
  <div class="el-ip">
    <el-input placeholder="0" width="20" v-model='ip[0]'/>
    <span class="seprater">.</span>
    <el-input placeholder="0" v-model='ip[1]'/>
    <span class="seprater">.</span>
    <el-input placeholder="0" v-model='ip[2]'/>
    <span class="seprater">.</span>
    <el-input placeholder="0" v-model='ip[3]'/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ip:(this.$attrs.value||'-.-.-.-').split('.')
    };
  },
  watch:{
    'value':function(){
      this.ip=(this.$attrs.value||'-.-.-.-').split('.');
    },
    'ip':function(value){
      console.warn('Input.watch',value);
      this.$emit('change',value.join('.'));
    },
  },
  method:{

  }
};
</script>
<style lang="less">
.el-ip{
  display:flex;
  .el-input{
    flex: 1;
    .el-input__inner{
      text-align: center;
    }
  }
  .seprater{
    width: 20px;
    text-align: center;
    font-size: 24px;
  }
}
</style>

