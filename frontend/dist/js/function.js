function createCard(data) {
  if (data.is_recommend === true) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const location = document.createElement('div');
    location.classList.add('card__location', 'location');
    const locationIcon = document.createElement('i');
    locationIcon.classList.add('fa-solid', 'fa-location-dot');
    location.appendChild(locationIcon);
    const locationText = document.createTextNode(`${data.city}, ${data.country}`);
    location.appendChild(locationText);
    card.appendChild(location);
  
    const description = document.createElement('p');
    description.classList.add('card__description');
    const descriptionText = document.createTextNode(data.description);
    description.appendChild(descriptionText);
    card.appendChild(description);
  
    const picture = document.createElement('div');
    picture.classList.add('card__img');
    const image = document.createElement('img');
    image.setAttribute('src', `data:image/jpeg;base64,${data.picture}`);
    image.setAttribute('alt', `${data.title}`);
    picture.appendChild(image);
    card.appendChild(picture);
  
    const list = document.createElement('ul');
    list.classList.add('card__list', 'list__info');
    const events = document.createElement('li');
    const eventsText = document.createTextNode(`${data.events_count} Мероприятий`);
    events.appendChild(eventsText);
    list.appendChild(events);
    const locations = document.createElement('li');
    const locationsIcon = document.createElement('i');
    locationsIcon.classList.add('fa-solid', 'fa-map-location-dot');
    locations.appendChild(locationsIcon);
    const locationsText = document.createTextNode(`${data.location_count} Мест`);
    locations.appendChild(locationsText);
    list.appendChild(locations);
    const tourTime = document.createElement('li');
    const tourTimeIcon = document.createElement('i');
    tourTimeIcon.classList.add('fa-solid', 'fa-calendar');
    tourTime.appendChild(tourTimeIcon);
    const tourTimeText = document.createTextNode(`${data.tour_time} неделя`);
    tourTime.appendChild(tourTimeText);
    list.appendChild(tourTime);
    card.appendChild(list);
  
    const footer = document.createElement('div');
    footer.classList.add('card__footer');
    const price = document.createElement('span');
    price.classList.add('card__price');
    const priceText = document.createTextNode(`${data.price} / За место`);
    price.appendChild(priceText);
    footer.appendChild(price);
    const searchBtn = document.createElement('a');
    searchBtn.classList.add('search__btn');
    searchBtn.setAttribute('href', '');
    const searchBtnText = document.createTextNode('Наличие');
    searchBtn.appendChild(searchBtnText);
    footer.appendChild(searchBtn);
    card.appendChild(footer);
  
    return card;
  }
  return 0;
  }
  
  //  function createImage(data) {

  //         const picture = document.createElement('div');
  //         picture.classList.add('card__img');
  //         const image = document.createElement('img');
  //         image.setAttribute('src', `data:image/jpeg;base64,${data.picture}`);
  //         image.setAttribute('alt', `${data.name}`);
  //         picture.appendChild(image);
          
  //         return picture;
  //       }

  
async function createImage() {
  const responseData = await axios.get('http://localhost:8000/api/get_all_images/');
  const postsData = responseData.data;
  let currentPage = 1;
  let rows = 6;
  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".gallery__container");
    postsEl.innerHTML = "";
    page--;
    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);
    const postContainer = document.querySelector(".gallery__container");
    for (let i = 0; i < paginatedData.length; i++){
      const picture = document.createElement('div');
    picture.classList.add('gallery__img');
    const image = document.createElement('img');
    image.setAttribute('src', `data:image/jpeg;base64,${paginatedData[i].picture}`);
    image.setAttribute('alt', `${paginatedData[i].name}`);
    picture.appendChild(image);

    // Create gallery-info
    const galleryInfo = document.createElement('div');
    galleryInfo.classList.add('gallery-info');
    
    // Create gallery-info__title 
    const galleryTitle = document.createElement('div');
    galleryTitle.classList.add('gallery-info__name');
    galleryTitle.textContent = paginatedData[i].name;
    galleryInfo.appendChild(galleryTitle);
    
    // Create gallery-info__author
    const galleryAuthor = document.createElement('div');
    galleryAuthor.classList.add('gallery-info__author');
    galleryAuthor.textContent = paginatedData[i].author;
    galleryInfo.appendChild(galleryAuthor);

    // Append the gallery-info block to the picture and galleryInfo
    picture.appendChild(galleryInfo);
    postContainer.appendChild(picture);
    }
     
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    paginationEl.innerHTML = "";
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    if (currentPage > pagesCount) currentPage = pagesCount;
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");
    let startPage = currentPage - 2;
    if (startPage < 1) startPage = 1;
    let endPage = startPage + 4;
    if (endPage > pagesCount) {
      endPage = pagesCount;
      startPage = endPage - 4;
      if (startPage < 1) startPage = 1;
    }
    const firstLiEl = displayPaginationBtn(1);
    firstLiEl.classList.add("pagination__btn--static");
    ulEl.appendChild(firstLiEl);
    if (currentPage === pagesCount) firstLiEl.classList.add("pagination__btn--active");
    for (let i = startPage; i <= endPage; i++) {
      const liEl = displayPaginationBtn(i);
      ulEl.appendChild(liEl);
      if (currentPage === i) liEl.classList.add("pagination__btn--active");
    }
    if (endPage < pagesCount - 1) {
      const lastLiEl = displayPaginationBtn(pagesCount);
      lastLiEl.classList.add("pagination__btn--static");
      ulEl.appendChild(lastLiEl);
      if (currentPage === pagesCount) lastLiEl.classList.add("pagination__btn--active");
    }
    if (currentPage < pagesCount) {
      const nextLiEl = displayPaginationBtn(currentPage + 1, "След.");
      ulEl.appendChild(nextLiEl);
    }
    paginationEl.appendChild(ulEl);
  }
  function displayPaginationBtn(page, label) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = label || page;
    if (currentPage == page) liEl.classList.add("pagination__item--active");
    liEl.addEventListener("click", (() => {
      currentPage = page;
      displayList(postsData, rows, currentPage);
      let currentItemLi = document.querySelector("li.pagination__item--active");
      currentItemLi.classList.remove("pagination__item--active");
      liEl.classList.add("pagination__item--active");
      displayPagination(postsData, rows);
    }));
    return liEl;
  }
  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

createImage()


