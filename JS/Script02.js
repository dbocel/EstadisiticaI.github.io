var header = document.getElementById('header');
window.addEventListener('scroll', () => {
    var scroll = window.scrollY;
    if (scroll > 10) {
        header.style.backgroundColor = 'rgb(0, 41, 78)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

const checkbox = document.querySelector("#Menu");
const menu = document.querySelector("ul.menu");

checkbox.addEventListener("click", () => {
    ul.menu.classList.toggle("menu_visible");
});

// Dirigir al otro archivo HTML (calculo.html)
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("CalculoHTML").addEventListener("click", function () {
        window.location.href = "calculo.html";
    });
});

//evento clicl de los bottones del header 
document.addEventListener("DOMContentLoaded", function () {
    // Obtén todos los elementos <li> dentro de la lista
    const menuItems = document.querySelectorAll(".menu li");

    // Agrega un evento de clic a cada elemento
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("click", function () {
            // Obtén la URL de la página desde el atributo data-url
            const url = menuItem.getAttribute("data-url");
            
            // Redirecciona a la página
            if (url) {
                window.location.href = url;
            }
        });
    });
});