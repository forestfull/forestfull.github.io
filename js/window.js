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
    })

    const pageSection = document.querySelector('body > section');
    history.replaceState(pageSection.innerHTML, document.title, location.pathname + location.search);
}
