const _import = require('../_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../../views/layout/Layout';

export default [{
  path: '/biaoqian1/name2',
  icon: 'ios-keypad',
  name: 'name2',
  title: '结果管理',
  component: Layout,
  redirect: '/biaoqian1/name2/index',
  children: [{path: 'index',  icon: 'compose',title: '结果管理', name: 'result', component: _import('dashboard/index')}]
}]
