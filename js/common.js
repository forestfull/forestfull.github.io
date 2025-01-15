const pageSection = document.querySelector('body > section');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';


function getPage(uri) {
    const xhr = new XMLHttpRequest();
    const directory = uri === undefined ? devUriPrefix : '/page' + uri + '.html'

    xhr.open('GET', devUriPrefix + directory, false);
    xhr.onreadystatechange = e => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            history.pushState(pageSection.innerHTML, document.title, uri);
            pageSection.innerHTML = xhr.responseText;

        }
    }
    xhr.send();
}

window.onpopstate = function (e) {
    pageSection.innerHTML = e.state;
}
