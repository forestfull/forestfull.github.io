const pageSection = document.getElementById('mainPagingSection');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';
const isDevelopMode = ['localhost', '127.0.0.1'].includes(location.hostname);

function getPage(uri) {
    const XML = {
        parse(xmlText) {
            let parsedXml = new DOMParser().parseFromString(xmlText, "application/xml");
            parsedXml.get = (query) => {
                return parsedXml.querySelector(query);
            };
            parsedXml.getAll = (query) => {
                return parsedXml.querySelectorAll(query);
            };
            return parsedXml;
        }
    }

    const decorator = {
        getTitle(string) {
            return `<div class="text-center">
                  <h2 class="display-5 my-5 mx-auto fw-bold d-flex justify-content-center">
                    <label class="align-self-center">${string}</label>
                  </h2>
                </div>`;
        },

    }


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

            const parsedXML = XML.parse(xhr.responseText);
            let templateHTML = '';
            templateHTML += decorator.getTitle(parsedXML.get('title').innerHTML);

            typing(pageSection, templateHTML, 10);
        }
    }
    xhr.send();
}