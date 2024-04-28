export default function() {return [
    {key:'home', name: 'Home page'},
    {key:'show', name: 'Showcase', pid:'home'},
    {key:'elem', name: 'Element component', pid:'show'},
    {key:'elem.button'   , name: 'Button component'   , pid:'elem', path: '/home/button'},
    {key:'elem.switch'   , name: 'Switch component'   , pid:'elem', path: '/home/switch'},
    {key:'elem.textField', name: 'TextField component', pid:'elem', path: '/home/textField'},
    {key:'dumb', name: 'Dummy Page', pid:'home'},
] as Menu[]};