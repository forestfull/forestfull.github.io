function spreadSectionForClickedListItem(node) {
    let containerNode = node.parentNode;
    while (containerNode.tagName.toLowerCase() !== 'ul' && containerNode.tagName.toLowerCase() !== 'ol') {
        containerNode = containerNode.parentNode;
    }

    let consoleNode = containerNode.parentNode;
    while (consoleNode.tagName.toLowerCase() !== 'console') {
        containerNode = consoleNode.parentNode;
    }


    const itemNodeList = containerNode.querySelectorAll(node.tagName);
    itemNodeList.forEach(n => n.classList.remove('active'));
    node.classList.add('active');

    const contentData = node.querySelector('section');
    let contentSection = document.querySelector('console > .explain-section');
    if (!isEmpty(contentSection)) contentSection.remove();

    contentSection = document.createElement('section');
    contentSection.className = 'explain-section';
    consoleNode.append(contentSection);
    typing(contentSection, contentData?.innerHTML, 10);
}
