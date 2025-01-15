const pageSection = document.querySelector('body > section');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';


function getPage(uri) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', devUriPrefix + '/page' + uri + '.html', false);
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
