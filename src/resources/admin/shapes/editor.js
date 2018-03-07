const shape = [
  {
    name: "id",
    render: 'text',
  },
  {
    name: "name",
    render: 'input',
  },
  {
    name: "description",
    render: 'textarea',
  },
  {
    name: "role",
    render: 'radio-group',
  },
  {
    name: 'sites',
    type: 'array',
    render: 'editor@Site',
    // itemRender:
    // render:
  },
];


export default shape;


