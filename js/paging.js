const pageSection = document.getElementById('mainPagingSection');
const devUriPrefix = location.protocol === 'http:' ? '/forest-full.github.io' : '';
const isDevelopMode = ['localhost', '127.0.0.1'].includes(location.hostname);

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
    explain(parsedXML) {
        return `<div class="container-xxl bd-gutter pt-md-1 pb-md-4">
            <h1 class="bd-title mt-3 mb-5 fw-bold">${parsedXML.get('explain > title')?.innerHTML}</h1>
            <div>${parsedXML.get('explain > contents')?.innerHTML}</div>
        </div>`;
    },
    body(string) {
        return `${string}`;
    },
    snippet: {
        maven(option) {
          return `<dependency>
                    <groupId>${option.group}</groupId>
                    <artifactId>${option.artifact}</artifactId>
                    <version>${option.version}</version>
                </dependency>`;
        },
        gradle(option) {
            return `implementation group: '${option.group}', name: '${option.artifact}', version: '${option.version}'`;
        },
        gradle_shot(option) {
            return `implementation '${option.group}:${option.artifact}:${option.version}'`;
        },
        gradle_kotlin(option) {
            return `implementation("${option.group}:${option.artifact}:${option.version}")`;
        },
        sbt(option) {
            return `libraryDependencies += "${option.group}" % "${option.artifact}" % "${option.version}"`;
        },
        ivy(option) {
            return `<dependency org="${option.group}" name="${option.artifact}" rev="${option.version}"/>`;
        },
        grape(option) {
            return `@Grapes(
                              @Grab(group='${option.group}', module='${option.artifact}', version='${option.version}')
                          )`;
        },
        leiningen(option) {
            return `[${option.group}/${option.artifact} "${option.version}"]`;
        },
        buildr(option) {
            return `'${option.group}:${option.artifact}:jar:${option.version}'`;
        },
    }
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

            const parsedXML = XML.parse(xhr.responseText);
            let templateHTML = '';
            templateHTML += decorator.explain(parsedXML);
            let section = parsedXML.get('section');
            templateHTML += decorator.body(section?.innerHTML);

            typing(pageSection, templateHTML, 10);
        }
    }
    xhr.send();
}