function spreadSectionForClickedListItem(node) {
    let listGroupNode = node.parentNode;
    while (listGroupNode.tagName.toLowerCase() !== 'ul' && listGroupNode.tagName.toLowerCase() !== 'ol') {
        listGroupNode = listGroupNode.parentNode;
    }

    const itemNodeList = listGroupNode.querySelectorAll(node.tagName);
    itemNodeList.forEach(n => n.classList.remove('active'));
    node.classList.add('active');

    let rowNode = listGroupNode.parentNode;
    while (!rowNode.classList.contains('row')) {
        rowNode = rowNode.parentNode;
    }

    const contentData = node.querySelector('section');
    let contentSection = document.querySelector('#explainSection');
    if (!isEmpty(contentSection)) contentSection.remove();

    contentSection = document.createElement('section');
    contentSection.id = 'explainSection';
    contentSection.classList.add('col-12');
    contentSection.classList.add('col-xl-8');
    rowNode.append(contentSection);
    typing(contentSection, contentData?.innerHTML, 10);
}
