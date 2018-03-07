var debug = require('debug')('flatten');
function flatten(items,paths,keys){
  let self = paths[0];
  let top = paths[paths.length-1];
  let parent = paths[1]||top;
  let [e1,e2,...e3]=paths;

  items.forEach((item,index)=>{
    if(item.shapeAlign=='top'){
      if(item.items&&item.items.length){
        flatten(item.items,[top],[...keys,item.name]);
      }else{
        (top.items||top).push({...item,name: [...keys,item.name]});
      }
    }else if(item.shapeAlign=='parent'){
      if(item.items&&item.items.length){
        //flatten(item.items,parent==top?[top]:paths.slice(0),[...keys,item.name]);
        //
        let t = {name:[...keys,item.name],items:[]};
        flatten(item.items,[t,...paths.slice(1)],[...keys,item.name]);
        if(t.items.length){
          (parent.items||parent).push(t);
        }
      }else{
        (parent.items||parent).push({...item,name:[...keys,item.name]});
      }
    }else{
      if(item.items&&item.items.length){
        let t = {name:[...keys,item.name],items:[]};
        flatten(item.items,[t,...paths],[...keys,item.name]);
        if(t.items.length){
          (self.items||self).push(t);
        }
      }else{
        (self.items||self).push({...item,name:[...keys,item.name]})
      }
    }
  });
}

const viewShape = [
  {
    name:"id",
    render: 'text',
  },
  {
    name:"name",
    render: 'text',
  },
  {
    name: 'hardwareInfo',
    items:[
      {
        name:"cpu",
        render: 'text',
      },
      {
        name:"memory",
        render: 'text',
      },
    ]
  },
  {
    name:"updateAt",
    render: 'text',
  },
];
const viewShape2 = [
  {
    name:"id",
    render: 'text',
  },
  {
    name:"name",
    render: 'text',
  },
  {
    name: 'hardwareInfo',
    shapeAlign: 'top',
    items:[
      {
        name:"cpu",
        render: 'text',
      },
      {
        name:"memory",
        render: 'text',
      },
    ]
  },
  {
    name:"updateAt",
    render: 'text',
  },
];

const viewShape3 = [
  {
    name:"id",
    render: 'text',
  },
  {
    name:"name",
    render: 'text',
  },
  {
    name: 'hardwareInfo',
    shapeAlign: 'self', // self,parent,top,
    items:[
      {
        name:"cpu",
        shapeAlign: 'parent',
        items:[
          {
            name: 'cputype',
            render: 'text',
          },
          {
            name:'price',
            render: 'text'
          }
        ],
      },
      {
        name:"memory",
        render: 'text',
      },
    ]
  },
  {
    name:"updateAt",
    render: 'text',
  },
];

const viewShape4 = [
  {
    name:"id",
    render: 'text',
  },
  {
    name:"name",
    render: 'text',
  },
  {
    name: 'hardwareInfo',
    shapeAlign: 'self', // self,parent,top,
    items:[
      {
        name:"cpu",
        //shapeAlign: 'parent',
        items:[
          {
            name: 'cputype',
            shapeAlign: 'top',
            render: 'text',
          },
          {
            name:'price',
            render: 'text'
          }
        ],
      },
      {
        name:"memory",
        render: 'text',
      },
    ]
  },
  {
    name:"updateAt",
    render: 'text',
  },
];

function test(items){
  let r = [];
  flatten(items,[r],[]);
  debug(JSON.stringify(items,0,2));
  debug('------');
  debug(JSON.stringify(r,0,2));
}

//test(viewShape); // nested
//test(viewShape2); //top
//test(viewShape3); //parent
//test(viewShape4); //parent.particial

//exports.flatten=flatten;
export default flatten;
