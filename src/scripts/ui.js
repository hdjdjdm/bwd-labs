const navbutton = document.querySelector('nav button')

if (navbutton) {
    navbutton.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        const menuIcon = document.querySelector('nav button #svg');

        sidebar.classList.toggle('visible');
        menuIcon.classList.toggle('rotate');
    });
}