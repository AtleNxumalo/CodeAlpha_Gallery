const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const caption = lightbox.querySelector('.caption');
let currentIndex = 0;
let filteredItems = Array.from(galleryItems);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from previous button
        document.querySelector('.filter-buttons button.active').classList.remove('active');
        btn.classList.add('active');

        const color = btn.dataset.color;

        // Filter images
        filteredItems = color === 'all' ? Array.from(galleryItems) :
            Array.from(galleryItems).filter(item => item.dataset.color === color);
        galleryItems.forEach(item => item.style.display = filteredItems.includes(item) ? 'block' : 'none');

        // Change page background dynamically
        document.body.classList.remove('red-theme', 'blue-theme', 'green-theme', 'orange-theme');
        if (color !== 'all') {
            document.body.classList.add(`${color}-theme`);
        }
    });
});

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = filteredItems.indexOf(item);
        showLightbox(currentIndex);
    });
});

function showLightbox(index) {
    const item = filteredItems[index];
    lightboxImg.src = item.querySelector('img').src;
    caption.textContent = item.dataset.alt;
    lightbox.style.display = 'flex';
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    showLightbox(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    showLightbox(currentIndex);
});

document.getElementById('closeBtn').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});