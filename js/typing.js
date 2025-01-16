function typing(nodeQueryName, contentXML, intervalMilliSeconds) {
    const util = {
        isEmpty: function (firstTagContent) {
            return firstTagContent === null || firstTagContent === '' || firstTagContent === undefined;
        },

        isSingleTag: function (tag) {
            return tag.indexOf('/>', tag.length - 2) !== -1;
        },

        parsingTagObject: function (tag) {
            let tagObject = {name: undefined, attribute: undefined, content: []};
            let tagContents = tag.substring(tag.indexOf('<') + 1, tag.lastIndexOf('>') - 1);

            if (tagContents.indexOf('=') === -1) tagObject.name = tagContents?.trim();

            if (tagContents.indexOf('=') !== -1) {
                const tagAttributes = tagContents.split('=');
                for (let i = 0; i < tagAttributes.length; i = i + 2) {
                    const name = tagAttributes[i]?.trim();
                    tagObject.attribute[name] = tagAttributes[i + 1].trim();
                }
            }

            return tagObject;
        },

        substringPrefixTagContent: function (text) {
            const tagPrefix = text.search(/(<\w+)|(<\w+\/>)/);
            return text.substring(tagPrefix, text.indexOf('>', tagPrefix + 1));
        },

        convertXmlToJSON: function (text) {
            let contentArrays = [];
            let remainString = text;

            //TIP: 다음 정규식에 해당하는 태그가 있는지 테스트한다.
            const endTagRegExp = /(<\/\w+>)|(<\w+\/>)/;
            while (endTagRegExp.test(remainString)) {
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

                let endTagString = '<' + tag.name + '/>';
                let tagContent = remainString.substring(firstTagContent.length, remainString.indexOf(endTagString) - 1);
                tag.content = util.convertXmlToJSON(tagContent);
                remainString = remainString.substring(remainString.indexOf(endTagString) + endTagString.length);
                contentArrays.push(tag);
            }

            if (!util.isEmpty(remainString)) contentArrays.push(remainString);

            return contentArrays;
        }
    }

    /************************************START**FUNCTION***LINE************************************/



    console.log(JSON.stringify(util.convertXmlToJSON(contentXML)));


    let targetNode = document.querySelector(nodeQueryName);
}



