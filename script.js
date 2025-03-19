document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');

    function updateZIndex() {
        pages.forEach((page, index) => {
            if (index < currentPage) {
                // Páginas ya volteadas deben ir al fondo
                page.style.zIndex = 1;
            } else if (index === currentPage) {
                // Página actual debe estar al frente
                page.style.zIndex = 100;
            } else {
                // Páginas que aún no han sido volteadas deben tener orden descendente
                page.style.zIndex = pages.length - index;
            }
        });
    }

    // Función para avanzar la página
    window.nextPage = function () {
        if (currentPage < pages.length) {
            const page = pages[currentPage];
            page.classList.add('flipped');

            // Esperamos a que termine la animación antes de cambiar el z-index
            setTimeout(() => {
                page.style.zIndex = 1; // Lo mandamos al fondo después de la animación
                currentPage++;
                updateZIndex();
            }, 600); // Ajusta este tiempo según la duración de la animación en el CSS
        }
    };

    // Función para retroceder la página
    window.prevPage = function () {
        if (currentPage > 0) {
            currentPage--;
            const page = pages[currentPage];
            page.classList.remove('flipped');

            // Aseguramos que la página tenga un z-index alto para que aparezca nuevamente
            setTimeout(() => {
                page.style.zIndex = pages.length - currentPage;
                updateZIndex();
            }, 600); // Ajusta según la duración de la animación
        }
    };

    // Configura los z-index iniciales
    updateZIndex();
});
