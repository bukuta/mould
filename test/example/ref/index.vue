<template>
  <div>
    <form-builder ref='form' :entity="entity" :data="data" :shape="shape" />
    <el-button @click="submit"></el-button>
  </div>
</template>
<script>
import {ResourceViewer,ResourceModifier} from '$src/casual/view-builder';

import Sites  from '$src/casual/resources/site/entity.js';

import Admin  from '$src/casual/resources/admin/entity.js';
import data from '$src/casual/resources/admin/data.js';

import CreateShape from '$src/casual/resources/admin/shapes/edit.js';
import ViewShape from '$src/casual/resources/admin/shapes/view.js';

export default {
  components:{
    'form-builder':ResourceModifier,
  },
  data(){
    return {data:data,entity:Admin,shape:CreateShape};
  },
  methods:{
    submit(){
      console.log(this.$refs.form.getValue());

    }
  },
};


</script>
