const pageSection = document.querySelector('body > section');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';


function getPage(uri) {
    document.getElementById('nav-list').classList.remove('active');

    if (uri === undefined || uri === devUriPrefix + '/' || uri === devUriPrefix + '/index.html') {
        location.href = devUriPrefix;
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', devUriPrefix + '/page' + uri.replaceAll('.html', '') + '.html', false);
    xhr.onreadystatechange = e => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            history.pushState(pageSection.innerHTML, document.title, uri);
            pageSection.innerHTML = xhr.responseText;

        }
    }
    xhr.send();
}

window.addEventListener('keydown', e => {
    if (e.key === 'F5') {
        e.preventDefault();
        if (location.pathname !== '' && location.pathname !== undefined && location.pathname !== null) {
            getPage(location.pathname);
        } else {
            location.href = '/';
        }
    }
});

window.onpopstate = function (e) {
    pageSection.innerHTML = e.state;
}
