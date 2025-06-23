'use strict';

// Certificate section specific JavaScript

// element toggle function for certificates
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// Certificate section filter functionality
const initializeCertificateFilters = function() {
  // Get certificate section elements
  const certificateSection = document.querySelector('.certificate-posts');
  
  if (!certificateSection) return; // Exit if certificate section doesn't exist
  
  const select = certificateSection.querySelector("[data-select]");
  const selectItems = certificateSection.querySelectorAll("[data-select-item]");
  const selectValue = certificateSection.querySelector("[data-select-value]");
  const filterBtn = certificateSection.querySelectorAll("[data-filter-btn]");
  const filterItems = certificateSection.querySelectorAll("[data-filter-item]");
  
  // Filter function for certificates
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
  
  // Add click event to select dropdown
  if (select) {
    select.addEventListener("click", function () { 
      elementToggleFunc(this); 
    });
  }
  
  // Add event to all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      if (select) {
        elementToggleFunc(select);
      }
      filterFunc(selectedValue);
    });
  }
  
  // Add event to all filter button items for large screen
  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];
    
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }
        filterFunc(selectedValue);
        
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const certificateSection = document.querySelector('.certificate-posts');
  if (!certificateSection) return;
  
  const select = certificateSection.querySelector("[data-select]");
  if (!select) return;
  
  const isClickInsideSelect = select.contains(event.target);
  
  if (!isClickInsideSelect && select.classList.contains('active')) {
    select.classList.remove('active');
  }
});

// Initialize certificate filters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCertificateFilters();
});

// Also initialize if script is loaded after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCertificateFilters);
} else {
  initializeCertificateFilters();
}