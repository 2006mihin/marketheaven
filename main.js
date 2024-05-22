document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuUl = document.getElementById('menu-ul');

    menuToggle.addEventListener('click', function() {
        menuUl.classList.toggle('active');
    });
});
