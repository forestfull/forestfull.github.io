const pageSection = document.querySelector('body > section');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';

function isEmpty(firstTagContent) {
    return firstTagContent === null || firstTagContent === undefined;
}

function isMobile() {
    const mobileAgent = ["iphone", "lgtelecom", "skt", "mobile", "samsung", "nokia", "blackberry", "android", "android", "sony", "phone"];
    return mobileAgent.filter(agent => navigator.userAgent.indexOf(agent) !== -1).length > 0;
}

function getPage(uri) {
    document.getElementById('nav-list').classList.remove('active');

    if (uri === undefined || uri === devUriPrefix + '/' || uri === devUriPrefix + '/index.html') {
        location.href = location.origin + devUriPrefix;
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', devUriPrefix + '/page' + uri.replaceAll('.html', '') + '.html', false);
    xhr.onreadystatechange = e => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            history.pushState(pageSection.innerHTML, document.title, uri);
            pageSection.innerHTML = '';
            typing(pageSection, xhr.responseText, 10);
        }
    }
    xhr.send();
}

let timeoutAddress;
const explainNav = document.querySelector('#explain-nav');

function doubleClickCheck(object, callback) {
    if (!isMobile()) return callback();

    if (timeoutAddress !== undefined)
        clearTimeout(timeoutAddress);

    explainNav.innerHTML = '';

    const classList = object?.classList;
    if (classList?.contains('shine')) {
        document.querySelectorAll('.shine')?.forEach(obj => obj?.classList.remove('shine'));
        timeoutAddress = undefined;
        callback();
    } else {
        document.querySelectorAll('.shine')?.forEach(obj => obj?.classList.remove('shine'));
        classList?.add('shine');
        typing(explainNav, object?.dataset?.explain, 10);
        timeoutAddress = setTimeout(() => {
            explainNav.innerHTML = '';
            timeoutAddress = undefined;
            if (classList?.contains('shine'))
                classList?.remove('shine');
        }, 10000);
    }
}
