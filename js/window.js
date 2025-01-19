const indexContentsData = pageSection.innerHTML;
pageSection.innerHTML = '';

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
    pageSection.innerHTML = e.state;
}

window.onload = e => {
    /*TIP popper library*/
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    const pageSection = document.querySelector('body > section');
    history.replaceState(indexContentsData, document.title, location.pathname + location.search);
    typing(pageSection, indexContentsData, 1);
}
