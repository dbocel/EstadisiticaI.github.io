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

//funciones de tabla
// Función para ordenar los datos de la tabla
document.querySelector('.BTNOrdenar').addEventListener('click', function() {
    // Obtener todas las celdas de la tabla 1
    const tabla1 = document.querySelectorAll('.TablaNo1 input[type="number"]');
    const valores = [];

    // Filtrar y obtener solo los valores que no están vacíos
    tabla1.forEach(function(celda) {
        const valor = parseFloat(celda.value);
        if (!isNaN(valor)) { // Verificar si es un número válido
            valores.push(valor);
        }
    });

    // Verificar si la tabla 1 está vacía
    if (valores.length === 0) {
        const alerta = document.querySelector('.alerta');
        alerta.textContent = "La tabla está vacía. Agrega datos antes de ordenar.";
        alerta.style.display = "block"; // Mostrar la alerta
        setTimeout(function() {
            alerta.style.display = "none"; // Ocultar la alerta después de un tiempo
        }, 3000); // Ocultar después de 3 segundos (puedes ajustar el tiempo)
        return; // Detener la ejecución de la función
    }
    
     // Ordenar los valores
     valores.sort(function(a, b) {
        return a - b;
    });

    // Calcular la suma de los valores
    const suma = valores.reduce((acc, val) => acc + val, 0);
    //calcular la media 
    const media = suma / valores.length;
    //Calcular la Varianza Muestral
    const diferenciaAlCuadrado = valores.map(valor => Math.pow(valor - media, 2));
    const VarianzaMuestral = diferenciaAlCuadrado.reduce((acc, val) => acc + val, 0)/ (valores.length -1);
    //Calcular la desviacion estandar 
    const desviacionEstandar = Math.sqrt(VarianzaMuestral);
    //Monstrar en el input 
    document.getElementById('desviacionEstandar').value = desviacionEstandar.toFixed(4);
    document.getElementById('Varianza').value = VarianzaMuestral.toFixed(2);
    //Calcular la mediana
    let mediana; 
    const mitad = Math.floor(valores.length / 2);
    if(valores.length % 2 !== 0){
        //Si la cantidad de datos es impar, la mediana es el valor del dato qu esta en el centro del grupo de datos ordenados
        mediana = valores[mitad];
    }else{
        //si la cantidad de datos es par, la media seria la suma de los dos numero centrados en el conjunto de datos divido entre dos
        mediana = (valores[mitad - 1] + valores[mitad]) / 2;
    }

    //mostrar en el input de la mediana
    document.getElementById('Mediana').value = mediana.toFixed(0);
    //mostrar en el input 
    document.getElementById('Media').value = media.toFixed(2);

    //Mostrar el dato minimo y maximo 
    const numeroMayor = valores[valores.length -1];
    const numeroMenor = valores[0];

    //Llenar los campos de entrada correspondientes

    document.getElementById('NumeroMayor').value = numeroMayor.toFixed(0);
    document.getElementById('NumeroMenor').value = numeroMenor.toFixed(0);
    //Resultado del rango
    const Rango = numeroMayor - numeroMenor;
    document.getElementById('NumeroRango').value = Rango.toFixed(0);

    //mostrar el numero de intervalo
    const NoNumeros = valores.length;
    const intervalo = parseInt(1 + 3.322 * Math.log10(NoNumeros));
    document.getElementById('NumeroIntervalo').value = intervalo.toFixed(0);

    //Amplitud de intervalo
    const ampIntervalo = Rango / intervalo;
    document.getElementById('NumeroAmpIntervalo').value = ampIntervalo.toFixed(0);

    const RMedio = (numeroMayor + numeroMenor)/2;
    document.getElementById('NumeroRangoMedio').value = RMedio.toFixed(0);

    //Calcular la moda
    let moda = null;
    const freq ={};
    let maxFreq = 0;

    valores.forEach(function(valor){
        freq[valor] = (freq[valor] || 0) + 1;
        if(freq[valor]> maxFreq){
            maxFreq = freq[valor];
            moda = valor;
        }
    });
    //mostrar la moda en el input correspondiente 
    document.getElementById('Moda').value = moda !== null ? moda.toFixed(0): "No    hay moda";

    // Llenar la tabla 2 con los valores ordenados
    const tabla2 = document.querySelectorAll('.TablaNo2 input[type="number"]');
    const numerosREpetidos = {};
    let colorIndex = 0;
    const colores = ['orange', 'blue', 'red', 'pink', 'yellow', 'purple', 'green']
    valores.forEach(function(valor, index) {
        tabla2[index].value = valor.toFixed(0);
        if(valores.indexOf(valor) !== index){
            if(!numerosREpetidos[valor]){
               numerosREpetidos[valor] = colores[colorIndex % colores.length];
               colorIndex++;
            }
            tabla2[index].style.color = numerosREpetidos[valor];
        }
    });
    //restaurar el color el fondo original en los numeros no repetidos
    tabla2.forEach(function(celda){
        const valor = parseFloat(celda.value);
        if(!numerosREpetidos[valor]){
            celda.style.backgroundColor = 'transparent';
        }
    });

    // Mostrar la cantidad de números en el input NoNumeros
    const cantidadDatos = valores.length;
    document.getElementById('NoNumeros').value = cantidadDatos;
});


// Agregar un evento de clic al elemento con la clase "BTNBorrar" para borrar los datos
document.querySelector('.BTNBorrar').addEventListener('click', function() {
    // Obtener todas las celdas de la tabla 1 y 2
    const tabla1 = document.querySelectorAll('.TablaNo1 input[type="number"]');
    const tabla2 = document.querySelectorAll('.TablaNo2 input[type="number"]');

    // Borrar los datos en la tabla 1
    tabla1.forEach(function(celda) {
        celda.value = '';
    });

    // Borrar los datos en la tabla 2
    tabla2.forEach(function(celda) {
        celda.value = '';
    });

    // Reiniciar la cantidad de números en el input NoNumeros y la leyenda
    document.getElementById('NoNumeros').value = '';
    document.getElementById('NumeroMayor').value = '';
    document.getElementById('NumeroMenor').value = '';
    document.getElementById('NumeroRango').value = '';
    document.getElementById('NumeroIntervalo').value = '';
    document.getElementById('NumeroAmpIntervalo').value = '';
    document.getElementById('NumeroRangoMedio').value = '';
    document.getElementById('Moda').value = '';
    document.getElementById('Media').value = '';
    document.getElementById('Mediana').value = '';
    document.getElementById('Varianza').value = '';
    document.getElementById('desviacionEstandar').value = '';
});

