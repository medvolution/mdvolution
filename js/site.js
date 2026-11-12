    (function() {
        var video = document.getElementById('bg-video');
        
        if (!video) return;
        
        // Función para intentar reproducir el video
        function startVideo() {
            video.play().then(function() {
            }).catch(function(error) {
                
                // Esperar interacción del usuario
                var playOnInteraction = function() {
                    video.play();
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                };
                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
            });
        }
        
        // Asegurar que el video esté listo antes de intentar reproducir
        if (video.readyState >= 2) {
            startVideo();
        } else {
            video.addEventListener('loadeddata', startVideo);
        }
        
        // Recuperar reproducción si la página se vuelve visible (Android)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && video.paused) {
                startVideo();
            }
        });
    })();

// Open elements that carry a data-href link in a new tab (replaces inline onclick)
(function() {
    var links = document.querySelectorAll('[data-href]');
    links.forEach(function(el) {
        el.setAttribute('role', 'link');
        el.setAttribute('tabindex', '0');
        var open = function() {
            window.open(el.getAttribute('data-href'), '_blank', 'noopener,noreferrer');
        };
        el.addEventListener('click', open);
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });
    });
})();
