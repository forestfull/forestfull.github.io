const pageSection = document.querySelector('body > section');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';

function isEmpty(firstTagContent) {
    return firstTagContent === null || firstTagContent === undefined;
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

function doubleClickCheck(object, callback) {
    const classList = object?.classList;
    if (classList?.contains('shine')) {
        document.querySelectorAll('.shine')?.forEach(obj => obj?.classList.remove('shine'));
        callback();
    } else {
        document.querySelectorAll('.shine')?.forEach(obj => obj?.classList.remove('shine'));
        classList?.add('shine');
        setTimeout(() => {
            if (classList?.contains('shine'))
                classList?.remove('shine');
        }, 10000);
    }
}
