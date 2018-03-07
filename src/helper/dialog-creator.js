import {MessageBox} from 'element-ui';
import {ResourceCreator} from '$src/casual/view-builder/'

function creator(host,h,{title,data,entity,shape}){
  let message = <ResourceCreator ref={"creator_"+Date.now()} entity={entity} data={data} shape={shape}/>;
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

export default creator;
