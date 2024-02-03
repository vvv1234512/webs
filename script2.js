const checkboxes = document.querySelectorAll('input[name="category"]');
const products = document.querySelectorAll('.product');
let currentFilteredProducts = [];
const allCheckbox = document.querySelector('input[value="all"]');
const searchInput = document.getElementById('searchInput');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleCheckboxChange);
});

function handleCheckboxChange(event) {
  if (event.target.value === 'all') {
    checkboxes.forEach(checkbox => {
      if (checkbox !== event.target) {
        checkbox.checked = false;
      }
    });
  } else {
    allCheckbox.checked = false;
  }

  filterProducts();
}

const productsPerPage = 20;
let currentPage = 1;

function filterProducts() {
  const selectedCategories = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked && checkbox.value !== 'all')
    .map(checkbox => checkbox.value);

  const filteredProducts = [];
  products.forEach(product => {
    const productCategory = product.getAttribute('data-category');
    if (selectedCategories.length === 0 || selectedCategories.includes(productCategory)) {
      product.style.display = 'block';
      filteredProducts.push(product);
    } else {
      product.style.display = 'none';
    }
  });

  currentPage = 1; // Reset to first page when category filter changes
  currentFilteredProducts=filteredProducts;
  displayProducts(currentFilteredProducts);
  updatePageNumbers(currentFilteredProducts);
}


// Initially show all products
filterProducts();

searchInput.addEventListener('input', function() {
  const searchText = this.value.trim().toLowerCase();

  const filteredProducts = [];

  products.forEach(product => {
      const h3Text = product.querySelector('h3').textContent.toLowerCase();
      const h4Text = product.querySelector('h4').textContent.toLowerCase();

      if (h3Text.includes(searchText) || h4Text.includes(searchText)) {
        
          product.style.display = 'block';
          filteredProducts.push(product);
      } else {
      
          product.style.display = 'none';
      }
  });

  // Update displayed products and pagination for filtered results
  currentPage = 1; // Reset current page to 1
  currentFilteredProducts=filteredProducts;
  displayProducts(currentFilteredProducts);
  updatePageNumbers(currentFilteredProducts);
});

// Function to display products on the current page
function displayProducts(filteredProducts=currentFilteredProducts) {
  const productList = filteredProducts || document.querySelectorAll('.product');

  productList.forEach((product, index) => {
    
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage - 1;
    
      if (index >= startIndex && index <= endIndex) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
   
   
  });
}
function updatePageNumbers(filteredProducts=currentFilteredProducts) {
  const pageNumbers = document.getElementById('pageNumbers');
  pageNumbers.innerHTML = '';

  const productList = filteredProducts || document.querySelectorAll('.product');
  const totalPages = Math.ceil(productList.length / productsPerPage);
  const maxPageNumbersToShow = 5;

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxPageNumbersToShow) {
    const halfMax = Math.floor(maxPageNumbersToShow / 2);
    startPage = Math.max(currentPage - halfMax, 1);
    endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    if (startPage > 1) {
      addEllipsis(pageNumbers, 'start');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.textContent = i;
    pageNumber.classList.add('page-number');
    if (i === currentPage) {
      pageNumber.classList.add('active');
      pageNumber.style.fontWeight = 'bold';
    }

    attachPageNumberEvent(pageNumber);
    pageNumbers.appendChild(pageNumber);
  }

  if (endPage < totalPages) {
    addEllipsis(pageNumbers, 'end');
  }
}

// Function to add ellipsis to the pagination
function addEllipsis(parentElement, position) {
  const ellipsis = document.createElement('span');
  ellipsis.textContent = '...';
  ellipsis.classList.add('ellipsis');
  if (position === 'start') {
    ellipsis.addEventListener('click', () => {
      currentPage = Math.max(currentPage - 5, 1);
      displayProducts();
      updatePageNumbers();
    });
  } else if (position === 'end') {
    ellipsis.addEventListener('click', () => {
      currentPage = Math.min(currentPage + 5, Math.ceil(products.length / productsPerPage));
      displayProducts();
      updatePageNumbers();
    });
  }
  parentElement.appendChild(ellipsis);
}

// Function to attach click event to page numbers
function attachPageNumberEvent(pageNumberElement) {
  pageNumberElement.addEventListener('click', () => {
    currentPage = parseInt(pageNumberElement.textContent);
    displayProducts();
    updatePageNumbers();
  });

  pageNumberElement.addEventListener('mouseover', () => {
    if (!pageNumberElement.classList.contains('active')) {
      pageNumberElement.style.transform = 'scale(1.2)';
    }
  });

  pageNumberElement.addEventListener('mouseout', () => {
    pageNumberElement.style.transform = '';
  });
}




// Function to handle "Previous" and "Next" button clicks
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(); // This now uses currentFilteredProducts by default
    updatePageNumbers(); // This now uses currentFilteredProducts by default
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(currentFilteredProducts.length / productsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(); // This now uses currentFilteredProducts by default
    updatePageNumbers(); // This now uses currentFilteredProducts by default
  }
});

document.getElementById('sidebarToggle').addEventListener('click', function() {
  var sidebar = document.getElementById('sidebar');
  if (sidebar.style.display === 'block') {
      sidebar.style.display = 'none';
  } else {
      sidebar.style.display = 'block';
  }
});

document.querySelector('.hamburger-menu').addEventListener('click', function() {
  var links = document.querySelectorAll('.menu a');
  for (var i = 0; i < links.length; i++) {
      if (links[i].style.display === 'block') {
          links[i].style.display = 'none';
      } else {
          links[i].style.display = 'block';
      }
  }
});

