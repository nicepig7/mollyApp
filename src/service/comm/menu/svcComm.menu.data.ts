export default function() {return [
    {key:'home', name: 'Home page'},
    {key:'show', name: 'Showcase', pid:'home'},
    {key:'elem', name: 'Element component', pid:'show'},
    {key:'elem.button'   , name: 'Button component'   , pid:'elem'},
    {key:'elem.switch'   , name: 'Switch component'   , pid:'elem'},
    {key:'elem.textField', name: 'TextField component', pid:'elem'},
    {key:'dumb', name: 'Dummy Page', pid:'home'},
] as Menu[]};