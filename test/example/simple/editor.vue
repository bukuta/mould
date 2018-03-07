<template>
  <div>
    <form-builder :entity="entity" :data="data" :shape="shape" />
  </div>
</template>
<script>
import {ResourceModifier} from '$src/casual/view-builder';

import Site from '$src/casual/resources/site/entity.js';
import data from '$src/casual/resources/site/data.js';
import EditShape from '$src/casual/resources/site/shapes/edit.js';
import ViewShape from '$src/casual/resources/site/shapes/view.js';

export default {
  components:{
    'form-builder':ResourceModifier,
  },
  data(){
    return {data:data,entity:Site,shape:EditShape};
  },
};


</script>

