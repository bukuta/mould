<template>
  <div style="margin: 30px;">
    <h1>Form Example</h1>
    <el-radio-group @change='changeExample' v-model="example">
      <el-radio-button label="simple-viewer">Simple-站点详情</el-radio-button>
      <el-radio-button label="simple-editor">Simple-编辑站点</el-radio-button>
      <el-radio-button label="simple-creator">Simple-新建站点</el-radio-button>
    </el-radio-group>
    <br />
    <el-radio-group @change='changeExample' v-model="example">
      <el-radio-button label="nested-viewer">nested-设备信息</el-radio-button>
      <el-radio-button label="nested-editor">Nested-编辑设备</el-radio-button>
      <el-radio-button label="nested-editor-shapealign">align-设备信息</el-radio-button>
    </el-radio-group>
    <br />

    <el-radio-group @change='changeExample' v-model="example">
      <el-radio-button label="multiple-viewer">多值-地址池ip列表</el-radio-button>
      <el-radio-button label="multiple-editor">多值-编辑地址池</el-radio-button>

    </el-radio-group>
    <br />

    <el-radio-group @change='changeExample' v-model="example">
      <el-radio-button label="ref-editor">ref-编辑管理员-引用站点</el-radio-button>
      <el-radio-button label="branch-editor">ref-编辑策略-分支</el-radio-button>
    </el-radio-group>
    <div style="margin-top: 30px;">
    <router-view></router-view>
  </div>
  </div>
</template>
<script>
export default {
  data(){
    return {example: 'simple-viewer'}
  },
  mounted(){
    this.$router.push('/test/simple-viewer');
  },
  methods:{
    changeExample(label){
      console.log('changeExample.,',label);
      this.$router.push('/test/'+label);
    },
  },
};
</script>
