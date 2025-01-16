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
    let contentSection = consoleNode.querySelector('section');
    contentSection.classList.remove('active');
    contentSection.innerHTML = contentData?.innerHTML;

    if (contentSection.innerHTML !== undefined && contentSection.innerHTML !== null && contentSection.innerHTML !== '')
        contentSection.classList.add('active');
}
