# Model-Shape-Data 表单生成

## 概念
- Model 定义了资源的实体，包括属性名，类型，mock数据，验证等
  - Model定义使用OpenApi3.0规则
  - 支持常规对象，数组，嵌套，引用，oneOf
- Shape 资源在不同场景下的展示轮廓，比如A场景下是显示详情，B场景下是编辑，只展示某几个属性，以及各属性以什么形式渲染出来
  - Shape支持常规对象，嵌套，数组，
  - 引用需要组件自己注册
  - oneOf
- Data 资源数据

- 场景：查看，创建，编辑，三类典型场景，每种都可以有不同的shape以应对不同的具体需求
  - 场景构建器：
  - 管理数据及组件，管理验证，管理动态数组等
- 业务组件： 属性值在项目的中业务含意和渲染方式，校验规则等


## Example

```
<ResourceViwer entity={} shape={} data={}/>
<ResourceModifier entity={} shape={} data={}/>
<ResourceCreator entity={} shape={} data={}/>

<FormBuilder entity={} shape={} data={}/>
```

