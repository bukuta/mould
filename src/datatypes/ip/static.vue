<template>
  <div class="el-ip">
    <span class="seg seg1" ref="segment1">{ip[0]}</span>
    <span class="seprater">.</span>
    <span class="seg seg2" ref="segment2">{ip[0]}</span>
    <span class="seprater">.</span>
    <span class="seg seg3" ref="segment3">{ip[0]}</span>
    <span class="seprater">.</span>
    <span class="seg seg4" ref="segment4">{ip[0]}</span>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        ip:(this.$attrs.value||'-.-.-.-').split('.')
      };
    },
  };
</script>
<style lang="less">
.el-ip{
  display:flex;
  .seg{
    flex: 1;
    text-align: center;
  }
  .seprater{
    width: 20px;
    text-align: center;
    font-size: 24px;
  }
}
</style>


