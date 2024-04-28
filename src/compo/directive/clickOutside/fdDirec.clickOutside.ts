export default {
    name : 'fdClickOutside',
    mounted(el, binding) {
        let val = binding.value;
        if(!val || typeof val !== 'function') return; // DO Nothing
        el.fd_clickOutside_event = function (e:Event) {
            if (!(el == e.target || el.contains(e.target))) {
                val(e, el)
            }
        }
        document.addEventListener("click", el.fd_clickOutside_event)
    },
    // 부모 컴포넌트의 unmounted 전에 호출됩니다.
    unmounted(el) {
        document.removeEventListener("click", el.fd_clickOutside_event)
    }
} as FdDirective;