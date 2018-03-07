<template>
  <div>
    <form-builder :entity="entity" :data="data" :shape="shape" />
  </div>
</template>
<script>
import {ResourceViewer} from '$src/casual/view-builder';

import AddressPool from '$src/casual/resources/addresspool/entity.js';
import data from '$src/casual/resources/addresspool/data.js';
import ViewShape  from '$src/casual/resources/addresspool/shapes/viewer.js';

export default {
  components:{
    'form-builder':ResourceViewer,
  },
  data(){
    return {data:data,entity:AddressPool,shape:ViewShape};
  },
};


</script>
