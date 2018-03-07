import Example from './index.vue';
import { SimpleViewer, SimpleEditor ,SimpleCreator} from './simple';
import { NestedViewer, NestedEditor, NestedAlignEditor } from './nested';

import RefEditor from './ref';
import BranchEditor from './branch';
import {MultipleEditor,MultipleViewer}from './multiple';

export default function getRoutes(defaultComponents) {
  return {
    path: '/test',
    components: {
      default: Example, ...defaultComponents
    },
    meta: {
      title: `Example`
    },
    children: [
      {
        path: 'simple-viewer',
        component: SimpleViewer,
      },
      {
        path: 'simple-editor',
        component: SimpleEditor,
      },
      {
        path: 'simple-creator',
        component: SimpleCreator,
      },
      {
        path: 'nested-viewer',
        component: NestedViewer,
      },
      {
        path: 'nested-editor',
        component: NestedEditor,
      },
      {
        path: 'nested-editor-shapealign',
        component: NestedAlignEditor,
      },
      {
        path: 'ref-editor',
        component: RefEditor,
      },
      {
        path: 'branch-editor',
        component: BranchEditor,
      },
      {
        path: 'multiple-viewer',
        component: MultipleViewer,
      },
      {
        path: 'multiple-editor',
        component: MultipleEditor,
      },
    ],
  }
}
;
