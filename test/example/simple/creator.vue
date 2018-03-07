<template>
  <div>
    <form-builder ref='form' :entity="entity" :data="data" :shape="shape" />
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
import {ResourceModifier} from '$src/casual/view-builder';

import Site from '$src/casual/resources/site/entity.js';
import data from '$src/casual/resources/site/data.js';
import CreateShape from '$src/casual/resources/site/shapes/create.js';
import ViewShape from '$src/casual/resources/site/shapes/view.js';

import Device from '$src/casual/resources/device/entity.js';
import deviceData from '$src/casual/resources/device/data.js';
import  DeviceCreateShape from '$src/casual/resources/device/shapes/view.js';
import DeviceViewShape from '$src/casual/resources/device/shapes/view.js';

export default {
  components:{
    'form-builder':ResourceModifier,
  },
  data(){
    return {data:{},entity:Site,shape:CreateShape};
  },
  methods:{
    submit(){
      let form = this.$refs.form
      console.log(form.getValue());
    },
  },
};

</script>


