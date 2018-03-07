import {MessageBox} from 'element-ui';
import {ResourceModifier} from '$src/casual/view-builder/'

function viewer(host,h,{title,data,entity,shape}){
  let message = <ResourceModifier entity={entity} data={data} shape={shape}/>;
  console.log(message);
  return MessageBox({
    title: title,
    message: message,
    beforeClose:function(action,instance,done){
      done();
    },
    lockScroll: true,
    showCancelButton: true,
  }).then((action,instance)=>{
    console.log('then.',action,instance);
    return message.componentInstance.getValue();
  });

}

export default viewer;

