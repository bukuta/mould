<template>
  <div>
    <form-builder :entity="entity" :data="data" :shape="shape" />
  </div>
</template>
<script>
import {ResourceModifier} from '$src/casual/view-builder';

import  Device  from '$src/casual/resources/device/entity.js';
import  data  from '$src/casual/resources/device/data.js';
import CreateShape from '$src/casual/resources/device/shapes/create-align.js';

export default {
  components:{
    'form-builder':ResourceModifier,
  },
  data(){
    return {data:data,entity:Device,shape:CreateShape};
  },
};


</script>
