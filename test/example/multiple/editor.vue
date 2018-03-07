<template>
  <div>
    <form-builder :entity="entity" :data="data" :shape="shape" />
  </div>
</template>
<script>
import {ResourceModifier} from '$src/casual/view-builder';

import AddressPool from '$src/casual/resources/addresspool/entity.js';
import data from '$src/casual/resources/addresspool/data.js';
import CreateShape  from '$src/casual/resources/addresspool/shapes/create.js';

export default {
  components:{
    'form-builder':ResourceModifier,
  },
  data(){
    return {data:data,entity:AddressPool,shape:CreateShape};
  },
};


</script>
