'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// achievements variables
const achievementsItem = document.querySelectorAll("[data-achievements-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const achievementsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < achievementsItem.length; i++) {

  achievementsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-achievements-avatar]").src;
    modalImg.alt = this.querySelector("[data-achievements-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-achievements-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-achievements-text]").innerHTML;

    achievementsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", achievementsModalFunc);
overlay.addEventListener("click", achievementsModalFunc);



// PROJECT SECTION FILTER LOGIC (scoped to project section only)
const projectSection = document.querySelector(".portfolio[data-page='project']");
if (projectSection) {
  const select = projectSection.querySelector("[data-select]");
  const selectItems = projectSection.querySelectorAll("[data-select-item]");
  const selectValue = projectSection.querySelector("[data-select-value]");
  const filterBtn = projectSection.querySelectorAll("[data-filter-btn]");
  const filterItems = projectSection.querySelectorAll("[data-filter-item]");

  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  // filter function for projects (robust normalization)
  const filterFunc = function (selectedValue) {
    const normalizedSelected = selectedValue.trim().toLowerCase();
    for (let i = 0; i < filterItems.length; i++) {
      const itemCategory = (filterItems[i].dataset.category || '').trim().toLowerCase();
      if (normalizedSelected === "all" || normalizedSelected === itemCategory) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}