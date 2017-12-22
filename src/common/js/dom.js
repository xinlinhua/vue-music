export function addClass(el, className){
    if(hasClass(el,className)){
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ')
}

export function hasClass(el, className){
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}
export function getData(el, name,val){
    name = 'data-'+ name
    if(val){
        return el.setAttribute(name,val);
    }else{
      
        return el.getAttribute(name);
    }
}


let elementStyle = document.createElement('div').style

let vendor = (()=>{
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O : 'OTransform',
        ms: 'msTransform',
        stander : 'transform'
    }

    for (const key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined ) {
            return key;
        }
    }
    return false;
})()

export function prefixStyle(style){

    if(vendor === false){
        return false;
    }
    if(vendor === 'stander'){
        return style;
    }else{
        return vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }
}