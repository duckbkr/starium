document.addEventListener("DOMContentLoaded", function() {
    // Sayfa geçişi için gerekli değişkenler
    const pages = document.querySelectorAll('.news-page');
    const nextButton = document.getElementById('nextPage');
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    let currentPage = 0;

    function showNextPage() {
        pages[currentPage].style.display = 'none';
        currentPage = (currentPage + 1) % pages.length;
        pages[currentPage].style.display = 'block';
    }

    nextButton.addEventListener('click', showNextPage);

    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        pages.forEach(page => page.classList.add('dark-mode'));
        nextButton.classList.add('dark-mode');
        toggleDarkModeButton.classList.add('dark-mode');
    }

    toggleDarkModeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        pages.forEach(page => page.classList.toggle('dark-mode'));
        nextButton.classList.toggle('dark-mode');
        toggleDarkModeButton.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.removeItem('dark-mode');
        }
    });

    // Sürükleyip bırak işlevselliği
    const draggables = document.querySelectorAll('.news-page');
    let offsetX, offsetY, draggedElement;

    draggables.forEach(draggable => {
        draggable.addEventListener('mousedown', function(e) {
            draggedElement = e.target;
            offsetX = e.clientX - draggedElement.getBoundingClientRect().left;
            offsetY = e.clientY - draggedElement.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });

    function onMouseMove(e) {
        if (draggedElement) {
            draggedElement.style.position = 'absolute';
            draggedElement.style.left = `${e.clientX - offsetX}px`;
            draggedElement.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        draggedElement = null;
    }
});
