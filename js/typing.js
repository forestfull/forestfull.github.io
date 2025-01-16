function typing(nodeQueryName, contentXML, intervalMilliSeconds) {
    const util = {
        isEmpty: function (firstTagContent) {
            return firstTagContent === null || firstTagContent === undefined || firstTagContent.trim() === '';
        },

        isSingleTag: function (tag) {
            return tag.indexOf('/>', tag.length - 2) !== -1;
        },

        parsingTagObject: function (tag) {
            let tagObject = {name: undefined, attribute: {}, content: []};
            let tagContents = tag.substring(tag.indexOf('<') + 1, tag.lastIndexOf('>'));

            if (tagContents.indexOf('=') === -1) tagObject.name = tagContents?.trim();

            if (tagContents.indexOf('=') !== -1) {
                let tagSpace = tagContents.indexOf(' ');
                tagObject.name = tagContents.substring(0, tagSpace)?.trim();
                tagContents = tagContents.substring(tagSpace)?.trim();
                const tagAttributes = tagContents.split(/=|\s/);
                for (let i = 0; i < tagAttributes.length; i = i + 2) {
                    const name = tagAttributes[i]?.trim();
                    tagObject.attribute[name] = tagAttributes[i + 1]?.replaceAll("\"", '')?.replaceAll("'", '')?.replaceAll("\`", '')?.trim();
                }
            }

            return tagObject;
        },

        substringPrefixTagContent: function (text) {
            const tagPrefix = text.search(/(<\w+)|(<\w+\/>)/);
            return text.substring(tagPrefix, text.indexOf('>', tagPrefix + 1) + 1);
        },

        sleep: function (milliSeconds) {
            let checkTime = Date.now();
            while (Date.now() - checkTime < milliSeconds) {

            }
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
                    continue;
                }

                const startTagString = '<' + tag.name;
                const endTagString = '</' + tag.name + '>';

                let tagContent = remainString.substring(firstTagContent.length, remainString.indexOf(endTagString));
                do {
                    if (tagContent.indexOf(startTagString) !== -1)
                        tagContent = remainString.substring(firstTagContent.length, remainString.indexOf(endTagString, tagContent.length));

                }
                while (tagContent.indexOf(startTagString, tagContent.length) !== -1)
                {
                    tagContent = remainString.substring(firstTagContent.length, remainString.indexOf(endTagString, tagContent.length));
                }

                if (util.isEmpty(tagContent)) {
                    tag.content = tagContent;
                } else {
                    util.sleep(10);
                    tag.content = util.convertXmlToJSON(tagContent);
                }

                remainString = remainString.substring(remainString.indexOf(endTagString) + endTagString.length);
                contentArrays.push(tag);
            }

            if (!util.isEmpty(remainString)) contentArrays.push(remainString);

            return contentArrays;
        }
    }

    /************************************START**FUNCTION***LINE************************************/


    let value = util.convertXmlToJSON(contentXML);
    document.body.innerHTML = '';
    let nodes = document.createElement("textarea");
    nodes.style.width = '100%';
    nodes.style.height = '100vh';
    nodes.style.border = 'none';
    nodes.style.outline = 'none';
    nodes.style.resize = 'none';
    nodes.style.overflow = 'auto';
    nodes.style.background = 'transparent';
    nodes.style.color = 'white';
    nodes.style.fontFamily = 'monospace';
    nodes.style.fontSize = '14px';
    document.body.append(nodes);
    nodes.innerHTML = JSON.stringify(value, null, 2);
    console.dir(value);

    let targetNode = document.querySelector(nodeQueryName);
}



