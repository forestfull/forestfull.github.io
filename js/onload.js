window.onload = e => {
    /*TIP popper library*/
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    history.replaceState(pageSection.innerHTML, document.title, location.pathname + location.search);
}
