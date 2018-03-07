<template>
  <div>
    <form-builder :entity="entity" :data="data" :shape="shape" />
  </div>
</template>
<script>
import {ResourceViewer} from '$src/casual/view-builder';

import Device from '$src/casual/resources/device/entity.js';
import data from '$src/casual/resources/device/data.js';
import CreateShape from '$src/casual/resources/device/shapes/create.js';
 import  ViewShape from '$src/casual/resources/device/shapes/view.js';

export default {
  components:{
    'form-builder':ResourceViewer,
  },
  data(){
    return {data:data,entity:Device,shape:ViewShape};
  },
};


</script>
