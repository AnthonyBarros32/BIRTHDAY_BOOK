document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');
    const audio = document.getElementById("backgroundMusic");
    let audioPlayed = false; // Bandera para evitar múltiples inicios

    function updateZIndex() {
        pages.forEach((page, index) => {
            if (index < currentPage) {
                page.style.zIndex = 1; // Páginas ya volteadas van al fondo
            } else if (index === currentPage) {
                page.style.zIndex = 100; // Página actual al frente
            } else {
                page.style.zIndex = pages.length - index; // Orden descendente
            }
        });
    }

    // Función para avanzar página
    function nextPage() {
        if (!audioPlayed) {
            audio.play().then(() => {
                console.log("🎶 Audio reproduciéndose...");
            }).catch(error => {
                console.log("⚠️ El navegador bloqueó la reproducción automática.");
            });
            audioPlayed = true;
        }

        if (currentPage < pages.length - 1) {
            const page = pages[currentPage];
            page.classList.add('flipped');

            setTimeout(() => {
                page.style.zIndex = 1; // Mandamos la página al fondo
                currentPage++;
                updateZIndex();

                // Si estamos en la última página, mostramos el mensaje final
                if (currentPage === pages.length - 1) {
                    document.querySelector('.final-message').style.opacity = "1";
                }
            }, 600);
        }
    }

    // Función para retroceder página
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            const page = pages[currentPage];
            page.classList.remove('flipped');

            setTimeout(() => {
                page.style.zIndex = pages.length - currentPage;
                updateZIndex();
            }, 600);
        }
    }

    // Exponer las funciones al objeto window
    window.nextPage = nextPage;
    window.prevPage = prevPage;

    // Configura los z-index iniciales
    updateZIndex();
});
