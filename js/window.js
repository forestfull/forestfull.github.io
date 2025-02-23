const indexContentsData = document.getElementById('mainPagingSection').innerHTML;
document.getElementById('mainPagingSection').innerHTML = '';

window.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
        const activeNodes = document.querySelectorAll('.active');
        for (let node of activeNodes) {
            node.classList.remove('active');
        }
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'F5') {
        e.preventDefault();
        if (location.pathname !== '' && location.pathname !== undefined && location.pathname !== null) {
            getPage(location.pathname);
        } else {
            location.href = '/';
        }
    }
});

window.onpopstate = function (e) {
    document.getElementById('mainPagingSection').innerHTML = e.state;
}

window.onload = e => {
    history.replaceState(indexContentsData, document.title, location.pathname + location.search);
    typing(document.getElementById('mainPagingSection'), indexContentsData, 1);
}
