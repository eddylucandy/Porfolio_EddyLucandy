// Creacion de variables  
const toggleTheme = document.getElementById('toggle-theme'); // Obtiene el elemento con el id 'toggle-theme' (el contenedor del interruptor de tema)
const toggleIcon = document.getElementById('toggle-icon'); // Obtiene el elemento con el id 'toggle-icon' (el ícono del tema actual)
const toggleText = document.getElementById('toggle-text'); // Obtiene el elemento con el id 'toggle-text' (el texto que describe el tema actual)

const toggleColors = document.getElementById("toggle-colors");
const rootStyles = document.documentElement.style; // Variables de nuestro archivo css

const flagsElement = document.getElementById("flags"); // Elemento para seleccionar idiomas
const textsToChange = document.querySelectorAll('[data-section]'); // Elementos que cambian de texto con el idioma



// Función para cambiar el idioma
const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) { // Modificación de los textos
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
        // Al reves del "innerHTML" podriamos utilizar el "textContent" esto sirve para tener en cuenta caracteristicas html 
    }
};

// Event listener para el cambio de idioma
flagsElement.addEventListener("click", (e) => {
    const selectedLanguage = e.target.parentElement.dataset.language; // Asegúrate de que el atributo sea "data-language"
    changeLanguage(selectedLanguage);
});



// Event listener para el cambio de tema (claro/oscuro)
// Agrega un event listener al contenedor del interruptor de tema que se activa al hacer clic
toggleTheme.addEventListener('click', () => {
    // Alterna la clase 'dark' en el elemento <body> para cambiar el tema de claro a oscuro o viceversa
    document.body.classList.toggle("dark");

    // Verifica si la propiedad 'src' del ícono actual contiene "moon.svg"
    if(toggleIcon.src.includes("moon.svg")){ 
        // Si es así, significa que el tema actual es oscuro y se cambiará al modo claro
        toggleIcon.src = 'assets/icons/sun.svg'; // Cambia el ícono al sol, que representa el modo claro
        toggleText.textContent = 'Light Mode'; // Actualiza el texto para indicar que el modo claro está activo
    } else {
        // Si no contiene "moon.svg", significa que el tema actual es claro y se cambiará al modo oscuro
        toggleIcon.src = 'assets/icons/moon.svg'; // Cambia el ícono a la luna, que representa el modo oscuro
        toggleText.textContent = 'Dark Mode'; // Actualiza el texto para indicar que el modo oscuro está activo
    }
});

// Event listener para cambiar colores
toggleColors.addEventListener("click", (e) => {
    //console.log(e.target.dataset); cual es la diferencia con la de abajo
    rootStyles.setProperty('--primary-color', e.target.dataset.color); 
    /* El dataset.color se debe al nombre que se dio el data en html. Habria que cambiar la palabra color si fuera otro nombre*/
});
