function typing(nodeQueryName, contentXML, intervalMilliSeconds) {
    function sleep(milliSeconds) {
        let checkTime = Date.now();
        while (Date.now() - checkTime < milliSeconds) {
        }
    }

    const util = {
        isEmpty: function (firstTagContent) {
            return firstTagContent === null || firstTagContent === undefined || firstTagContent.trim() === '';
        },

        isSingleTag: function (tag) {
            let tagName = tag.split(/\s|>/)[0];
            return tag.indexOf('/>', tag.length - 2) !== -1
                || ['br', 'hr', 'img', 'input'].filter(name => tagName?.toLowerCase()?.indexOf(name) !== -1).length !== 0;
        },

        parsingTagObject: function (tag) {
            let tagObject = {name: undefined, attributeSet: {}, content: []};
            let tagContents = tag.substring(tag.indexOf('<') + 1, tag.lastIndexOf('>'));

            if (tagContents.indexOf('=') === -1) tagObject.name = tagContents?.trim();

            if (tagContents.indexOf('=') !== -1) {
                const tagSpace = tagContents.indexOf(' ');
                tagObject.name = tagContents.substring(0, tagSpace)?.trim();
                tagContents = tagContents.substring(tagSpace)?.trim();

                const valueRegExpSplitter = /=["'`](.*?["'`])/;
                let tagAttributes = tagContents.split(valueRegExpSplitter);
                if (tagAttributes.length % 2 !== 0) tagAttributes.pop();

                for (let i = 0; i < tagAttributes.length; i = i + 2) {
                    const name = tagAttributes[i]?.trim();
                    tagObject.attributeSet[name] = tagAttributes[i + 1]?.replaceAll("\"", '')?.replaceAll("'", '')?.replaceAll("\`", '')?.trim();
                }
            }

            return tagObject;
        },

        substringPrefixTagContent: function (text) {
            const tagPrefix = text.search(/(<\w+)|(<\w+\/>)/);
            return text.substring(tagPrefix, text.indexOf('>', tagPrefix + 1) + 1);
        },

        convertXmlToJSON: function (text) {
            let contentArrays = [];
            let remainString = text;

            //TIP: 다음 정규식에 해당하는 태그가 있는지 테스트한다.
            while (/(<\w+\/>)/.test(remainString) || /(<\w+)/.test(remainString) && /(<\/\w+>)/.test(remainString)) {
                const firstTagContent = util.substringPrefixTagContent(remainString);
                if (util.isEmpty(firstTagContent)) break;

                const firstTagIndex = remainString.indexOf(firstTagContent);

                // TIP: 찾게된 'firstTagContent' 변수 앞에 다른 텍스트가 있다면
                if (firstTagIndex !== 0) {
                    const beforeText = remainString.substring(0, firstTagIndex);
                    contentArrays.push(beforeText);
                    remainString = remainString.replace(beforeText, '');
                }

                let tag = util.parsingTagObject(firstTagContent);

                if (util.isSingleTag(firstTagContent)) {
                    contentArrays.push(tag);
                    remainString = remainString.replace(firstTagContent, '');
                    continue;
                }

                const startTagString = '<' + tag.name;
                const endTagString = '</' + tag.name + '>';

                let endTagIndex = remainString.indexOf(endTagString);
                let tagContent = remainString.substring(firstTagContent.length, endTagIndex);

                let startTagCount = tagContent.split(startTagString).length - 1;
                let endTagCount = tagContent.split(endTagString).length - 1;

                while (startTagCount > endTagCount) {
                    endTagIndex = remainString.indexOf(endTagString, endTagIndex + 1);
                    tagContent = remainString.substring(firstTagContent.length, endTagIndex);

                    startTagCount = tagContent.split(startTagString).length - 1;
                    endTagCount = tagContent.split(endTagString).length - 1;
                }

                if (util.isEmpty(tagContent)) {
                    tag.content = tagContent;
                } else {
                    sleep(10);
                    tag.content = util.convertXmlToJSON(tagContent);
                }

                remainString = remainString.substring(endTagIndex + endTagString.length);
                contentArrays.push(tag);
            }

            if (!util.isEmpty(remainString)) contentArrays.push(remainString);

            return contentArrays;
        }
    };

    const writer = {
        appendObject: function (target, json) {
            if (Array.isArray(json) && json.length !== 0) {
                for (let element of json) {
                    if (typeof element === 'string') {
                        target.innerHTML += element;
                    } else {
                        writer.appendObject(target, element);
                    }
                }
                return json;

            } else if (json.name === undefined) {
                return json;

            } else {
                const node = document.createElement(json.name);
                for (let name in json.attributeSet)
                    node.setAttribute(name, json.attributeSet[name]);

                target.appendChild(node);
                return node;
            }
        },
        // TIP: 비동기로 실행됨 여러 노드에 드라마틱하게 컨텐츠를 채울 수 있음
        injectContent: function (node, content, interval) {
            sleep(interval);
            let lengthCount = 0;
            const intervalAddress = setInterval(() => {
                if (lengthCount < content.length) {
                    node.innerHTML += content.substring(lengthCount, lengthCount + 1);
                } else {
                    clearInterval(intervalAddress);
                }
            }, interval);
        },
    };

    /************************************START**FUNCTION***LINE************************************/
    const convertedJsonArray = util.convertXmlToJSON(contentXML);
    const targetNode = document.querySelector(nodeQueryName);
    const nodeQueue = [];

    targetNode.innerHTML = '';

    for (let node of convertedJsonArray) {
        let appendedObject = writer.appendObject(targetNode, node);
        nodeQueue.push(appendedObject);
    }


    for (let node of nodeQueue) { //TODO: 자식 노드도 먼저 따와서 인서트필요

    }
}
