const createShape = [
  {
    name:"id",
    render: 'static',
  },
  {
    name:"name",
    render: 'input',
  },
  {
    name:"description",
    render: 'textarea',
  },
  {
    name:"ip",
    render: 'static',
  },
  {
    name:"port",
    render: 'static',
  },
  {
    name: 'hardwareInfo',
    //shapeAlign: 'parent',
    items:[
      {
        name: 'cpu',
        shapeAlign: 'parent',
        items:[
          {
            name: 'type',
            shapeAlign: 'parent',
            render: 'input',
          },
          {
            name: 'price',
            //shapeAlign: 'top',
            render: 'static',
          },
        ],
      },
      {
        name: 'memory',
        //shapeAlign: 'parent',
        render: 'input'
      },
    ],
  },
];

export default createShape;


