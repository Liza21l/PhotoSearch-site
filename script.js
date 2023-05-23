const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector ('.search-btn')
const GalleryEl = document.querySelector('.Gallery')
const btnLoadMore = document.querySelector('.loadMore')
const recommendations = document.querySelector('.recommendations')
const btnLink = document.querySelector('.btnLink')
const TextAdd = document.querySelector('.TextAdd')
const apiKey = '23527313-0ef622db472107c47721e8ec2'
const url = 'https://pixabay.com/api'

const renderImgCards = (imgStore) => { 
    imgStore.forEach(imgCard => {
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
                <p class="TextAdd">Додати до обраного</p>         
                <button class="addBtn" card-id="${imgCard.id}">Add</button>
            </ul>
        </div>
        `
    });
    const btnsAdd = document.querySelectorAll('.addBtn')
    btnsAdd.forEach((btn) => {
        btn.addEventListener('click',() => {
            let cardId = parseInt(btn.getAttribute('card-id'))
            let imgCard = imgStore.filter((cardItem) => {
                if (cardItem.id == cardId) {
                    return cardItem
                }
            })
            let favoriteStore = localStorage.getItem('favorite')
            if (!favoriteStore) {
                localStorage.setItem('favorite', JSON.stringify([]))
            } else {
                favoriteStore = JSON.parse(favoriteStore)
            }
            favoriteStore = [
                ...favoriteStore,
                {...imgCard[0]}
            ]
            localStorage.setItem('favorite',JSON.stringify(favoriteStore))
            btn.style.display = 'none'
            console.log(cardId)
        })
    })
}
btnLink.addEventListener('click', () => {
    window.location.href = "./favorite.html"
})
searchBtn.addEventListener('click', () => { 
    const searchText = searchInput.value
    console.log(searchText)
    if (searchText.length > 0){
        localStorage.setItem('search', searchText)
        localStorage.setItem('page', 1)
        btnLoadMore.style.display = 'block'
        recommendations.style.display = 'none'
        let fullUrl = `${url}/?key=${apiKey}&orientation=horizontal&per_page=20`
        axios.get(`${fullUrl}&page=1&q=${searchText}`)
            .then((res)=> {
                renderImgCards(res.data.hits)
            })
    } else { 
        alert('Please enter some text')
    }
    searchInput.value = ''   
})

btnLoadMore.addEventListener('click', () => {
    let searchText = localStorage.getItem('search')
    let page = parseInt(localStorage.getItem('page'))
    page += 1
    localStorage.setItem('page', page)
    let fullUrl = `${url}/?key=${apiKey}&orientation=horizontal&per_page=20`
    axios.get(`${fullUrl}&page=${page}&q=${searchText}`)
        .then((res)=> {
            renderImgCards(res.data.hits)
        })
})