function typing(nodeQueryName, contentXML) {
    let contentJson = {};

    let remainString = contentXML;

    function isSingleTag(tag) {
        return tag.indexOf('/>', tag.length - 2) !== -1;
    }

    function parsingTagObject(tag) {
        let tagObject = {name: undefined, attribute: undefined, content: undefined};
        let tagContents = tag.substring(tag.indexOf('<') + 1, tag.lastIndexOf('>') - 1);

        if (tagContents.indexOf('=') === -1) tagObject.name = tagContents;

        while (tagContents.indexOf('=') !== -1) {

        }

        return tagObject;
    }

    while (existedTag(remainString)) {
        const firstTagContent = findFirstTag(remainString);
        let firstTag = parsingTagObject(firstTagContent);


        if (isSingleTag(firstTagContent)) {

        } else {

        }
    }


    let targetNode = document.querySelector(nodeQueryName);


}

