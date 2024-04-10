// [BUILD] Build somethign;
export default [
    {path: 'button'   , name: 'guide.button'   , component: () => import('@page/guide/button')},
    {path: 'switch'   , name: 'guide.switch'   , component: () => import('@page/guide/switch')},
    {path: 'textField', name: 'guide.textField', component: () => import('@page/guide/textField')}
];
