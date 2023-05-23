const GalleryEl = document.querySelector('.Gallery')
let Gallery = JSON.parse(localStorage.getItem('favorite'));

Gallery.forEach(imgCard => {
    GalleryEl.innerHTML += `
    <div class="photo-card" card-id="${imgCard.id}">
            <img src="${imgCard.largeImageURL}" class="photo-img" alt="${imgCard.tags}">
            <ul class="photo-static">
                <li class="photo-static-item">
                </li>
                <li class="photo-static-item">
                </li>
                <li class="photo-static-item">
                </li>
                <li class="photo-static-item">
                </li>
            </ul>
        </div>
    `
})