function scrollY() {
    return window.pageYOffset || docElm.scrollTop;
}
var docElm = window.document.documentElement,
    support = "transition",
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
    transEndEventName = transEndEventName['transition'],
    docscroll = 0;


function init() {
    var showMenu = document.getElementById('showMenu'),
        twistWrapper = document.getElementById('twist'),
        container = twistWrapper.querySelector('container'),
        contentWrapper = container.querySelector('wrapper');
    
    showMenu.addEventListener( 'click' ,function(ev) {
        ev.stopImmediatePropagation();
        ev.preventDefault();
        docscroll = scrollY;
        //Change content wrapper
        contentWrapper.style.top = docscroll * -1 + 'px';
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        classie.add(twistWrapper, 'open');
        setTimeout(function() { classie.add(twistWrapper, 'animate'); } 25 );
    });
    
    container.addEventListener('click', function( ev ) {
        if( classie.has( twistWrapper, 'animate')) {
            var onEndTransFn = function( ev ) {
                if( support && ( ev.target.className != 'container' || ev.propertyName.indexOf('transform') == -1 )) return;
                this.removeEventListener(transEndEventName, onEndTransFn);
                classie.remove(twistWrapper, 'open');
                document.body.scrollTop = document.documentElement.scrollTop = docscroll;
                contentWrapper.style.top = '0px';
            };
            twistWrapper.addEventListener(transEndEventName, onEndTransFn);
            classie.remove(twistWrapper, 'animate');
        }
    });
    twistWrapper.addEventListener('click', function( ev ) {return false; });
}
init();
        