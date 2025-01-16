function typing(nodeQueryName, contentXML, intervalMilliSeconds) {
    let contentJson = [];

    let remainString = contentXML;

    function isSingleTag(tag) {
        return tag.indexOf('/>', tag.length - 2) !== -1;
    }

    function parsingTagObject(tag) {
        let tagObject = {name: undefined, attribute: undefined, content: []};
        let tagContents = tag.substring(tag.indexOf('<') + 1, tag.lastIndexOf('>') - 1);

        if (tagContents.indexOf('=') === -1) tagObject.name = tagContents;

        while (tagContents.indexOf('=') !== -1) {

        }

        return tagObject;
    }

    //TIP: 다음 정규식에 해당하는 태그가 있는지 테스트한다.
    const endTagRegExp = /(<\/\w+>)|(<\w+\/>)/;
    while (endTagRegExp.test(remainString)) {
        const tagPrefix = remainString.search(/(<\w+)|(<\w+\/>)/);
        const firstTagContent = remainString.substring(tagPrefix, remainString.indexOf('>', tagPrefix + 1));
        if (firstTagContent === null) break;

        const firstTagIndex = remainString.indexOf(firstTagContent);
        if (firstTagIndex !== 0) {
            const prefixText = remainString.substring(firstTagIndex + firstTagContent.length);
            contentJson.data.push(prefixText);
            remainString = remainString.replace(prefixText, '');
        }

        let firstTag = parsingTagObject(firstTagContent);


        if (isSingleTag(firstTagContent)) {

        } else {

        }
    }


    let targetNode = document.querySelector(nodeQueryName);


}

