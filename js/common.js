const pageSection = document.querySelector('body > section');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';
const isDevelopMode = ['localhost', '127.0.0.1'].includes(location.hostname);

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
            if (!isDevelopMode) history.pushState(pageSection.innerHTML, document.title, uri);

            pageSection.innerHTML = '';
            typing(pageSection, xhr.responseText, 10);
        }
    }
    xhr.send();
}