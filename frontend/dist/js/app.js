(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }

    // function createImage(data) {

    //       const picture = document.createElement('div');
    //       picture.classList.add('card__img');
    //       const image = document.createElement('img');
    //       image.setAttribute('src', `data:image/jpeg;base64,${data.picture}`);
    //       image.setAttribute('alt', `${data.name}`);
    //       picture.appendChild(image);
    //       card.appendChild(picture);
    
    //       return picture;
    //     }

    // async function getData() {
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=50');
    //     return response.data;
    // }
    // async function createImage() {
    //     const postsData = await getData();
    //     let currentPage = 1;
    //     let rows = 6;
    //     function displayList(arrData, rowPerPage, page) {
    //         const postsEl = document.querySelector(".gallery__container");
    //         postsEl.innerHTML = "";
    //         page--;
    //         const start = rowPerPage * page;
    //         const end = start + rowPerPage;
    //         const paginatedData = arrData.slice(start, end);
    //         const postContainer = document.querySelector(".gallery__container");
    //         for (let i = 0; i < paginatedData.length; i++) postContainer.innerHTML += `\n\t\t  <div class="gallery__image">\n\t\t\t<img src="${paginatedData[i].url}" alt="">\n\t\t  </div>\n\t\t`;
    //     }
    //     function displayPagination(arrData, rowPerPage) {
    //         const paginationEl = document.querySelector(".pagination");
    //         paginationEl.innerHTML = "";
    //         const pagesCount = Math.ceil(arrData.length / rowPerPage);
    //         if (currentPage > pagesCount) currentPage = pagesCount;
    //         const ulEl = document.createElement("ul");
    //         ulEl.classList.add("pagination__list");
    //         let startPage = currentPage - 2;
    //         if (startPage < 1) startPage = 1;
    //         let endPage = startPage + 4;
    //         if (endPage > pagesCount) {
    //             endPage = pagesCount;
    //             startPage = endPage - 4;
    //             if (startPage < 1) startPage = 1;
    //         }
    //         const firstLiEl = displayPaginationBtn(1);
    //         firstLiEl.classList.add("pagination__btn--static");
    //         ulEl.appendChild(firstLiEl);
    //         if (currentPage === pagesCount) firstLiEl.classList.add("pagination__btn--active");
    //         for (let i = startPage; i <= endPage; i++) {
    //             const liEl = displayPaginationBtn(i);
    //             ulEl.appendChild(liEl);
    //             if (currentPage === i) liEl.classList.add("pagination__btn--active");
    //         }
    //         if (endPage < pagesCount - 1) {
    //             const lastLiEl = displayPaginationBtn(pagesCount);
    //             lastLiEl.classList.add("pagination__btn--static");
    //             ulEl.appendChild(lastLiEl);
    //             if (currentPage === pagesCount) lastLiEl.classList.add("pagination__btn--active");
    //         }
    //         if (currentPage < pagesCount) {
    //             const nextLiEl = displayPaginationBtn(currentPage + 1, "След.");
    //             ulEl.appendChild(nextLiEl);
    //         }
    //         paginationEl.appendChild(ulEl);
    //     }
    //     function displayPaginationBtn(page, label) {
    //         const liEl = document.createElement("li");
    //         liEl.classList.add("pagination__item");
    //         liEl.innerText = label || page;
    //         if (currentPage == page) liEl.classList.add("pagination__item--active");
    //         liEl.addEventListener("click", (() => {
    //             currentPage = page;
    //             displayList(postsData, rows, currentPage);
    //             let currentItemLi = document.querySelector("li.pagination__item--active");
    //             currentItemLi.classList.remove("pagination__item--active");
    //             liEl.classList.add("pagination__item--active");
    //             displayPagination(postsData, rows);
    //         }));
    //         return liEl;
    //     }
    //     displayList(postsData, rows, currentPage);
    //     displayPagination(postsData, rows);
    // }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
    if (menuLinks.length > 0) {
        menuLinks.forEach((menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);
        }));
        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollX - document.querySelector("header").offsetHeight;
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }
    window["FLS"] = true;
    isWebp();
    menuInit();
})();