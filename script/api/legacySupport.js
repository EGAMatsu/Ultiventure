function padStart(str, targetLength, padString) {
    str = String(str);
    targetLength = targetLength >> 0;
    padString = String(padString || ' ');
    if (str.length > targetLength) {
        return str;
    } else {
        targetLength = targetLength - str.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + str;
    }
}

function getElementsByClassName(className, tagName) {
    tagName = tagName || '*';
    var elements = document.getElementsByTagName(tagName);
    var result = [];
    for (var i = 0; i < elements.length; i++) {
        if ((' ' + elements[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
            result.push(elements[i]);
        }
    }
    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

window.padStart = padStart;
window.getElementsByClassName = getElementsByClassName;

window.getRandomInt = getRandomInt;