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

            if (tagContents.indexOf('=') === -1) tagObject.name = tagContents;

            while (tagContents.indexOf('=') !== -1) {

            }

            return tagObject;
        },

        substringPrefixTagContent: function (text) {
            const tagPrefix = text.search(/(<\w+)|(<\w+\/>)/);
            return text.substring(tagPrefix, text.indexOf('>', tagPrefix + 1));
        }
    }

    /************************************START**FUNCTION***LINE************************************/

    let contentJson = [];
    let remainString = contentXML;

    //TIP: 다음 정규식에 해당하는 태그가 있는지 테스트한다.
    const endTagRegExp = /(<\/\w+>)|(<\w+\/>)/;
    while (endTagRegExp.test(remainString)) {
        const firstTagContent = util.substringPrefixTagContent(remainString);
        if (util.isEmpty(firstTagContent)) break;

        const firstTagIndex = remainString.indexOf(firstTagContent);
        if (firstTagIndex !== 0) {
            const prefixText = remainString.substring(firstTagIndex + firstTagContent.length);
            contentJson.push(prefixText);
            remainString = remainString.replace(prefixText, '');
        }

        let firstTag = util.parsingTagObject(firstTagContent);

        if (util.isSingleTag(firstTagContent)) {
            contentJson.push(firstTag);
        } else {



        }
    }


    let targetNode = document.querySelector(nodeQueryName);

    console.log(JSON.stringify(contentJson));
}
