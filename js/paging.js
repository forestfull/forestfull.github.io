const pageSection = document.getElementById('mainPagingSection');
const devUriPrefix = location.protocol === 'http:' ? '/forestfull.github.io' : '';
const isDevelopMode = ['localhost', '127.0.0.1'].includes(location.hostname);

const decorator = {
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

    get(devUriPrefix + '/page' + uri.replaceAll('.html', '') + '.html',
        false,
        xhr => {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                if (!isDevelopMode) history.pushState(pageSection.innerHTML, document.title, uri);

                pageSection.innerHTML = '';

                typing(pageSection, xhr.responseText, 10);
            }
        });
}

function get(url, isAsync, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, isAsync);
    xhr.onreadystatechange = e => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            callback(xhr);
        }
    }
    xhr.send();
}