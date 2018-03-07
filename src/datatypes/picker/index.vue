<template>
  <div class="picker">
    <el-tag type='primary' :key="item.id" v-for='item in items'>{{item.name}}</el-tag>
    <el-button v-if='!picking' @click="openDialog">选择</el-button>
    <el-dialog :visible.sync="picking">
      <el-table :data="gridData">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="name" label="站点名" width="150"></el-table-column>
        <el-table-column property="adminCount" label="管理员数" width="150"></el-table-column>
      </el-table>
      <div>
        selected items: 
          <el-tag type='primary' :key="item.id" v-for='item in selected'>{{item.name}}</el-tag>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="picking = false">取 消</el-button>
        <el-button type="primary" @click="picking = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  multipleValue(){
    return true;
  },
  data(){
    return {
      gridData:[],
      items: this.$attrs.value.slice(0),
      selected: [{id:'xxx',name:'站点x'}],
      picking: false,
    };
  },
  watch:{
    items:function(newValue){
      console.warn('picker .. newValue',newValue);
    },
  },
  methods:{
    openDialog(){
      console.log('onOpenDialog');
      this.picking=true;
    },
    getValue(){
      return this.items.slice(0);
    },
  },
};
</script>
<style lang='less'>
.picker{
  .el-tag{
    margin-right: 10px;
  }
}
</style>

