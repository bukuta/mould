<template>
  <div>
    <form-builder :entity="entity" :data="data" :shape="shape" />
  </div>
</template>
<script>
import {ResourceModifier} from '$src/casual/view-builder';

import Service from '$src/casual/resources/vpnservice/entity.js';

import data from '$src/casual/resources/vpnservice/data.js';
import CreateShape  from '$src/casual/resources/vpnservice/shapes/create.js';

export default {
  components:{
    'form-builder':ResourceModifier,
  },
  data(){
    return {data:data,entity:Service,shape:CreateShape};
  },
};


</script>
