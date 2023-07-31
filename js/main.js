(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

const scholarshipsPerPage = 27;
const scholarshipContainer = document.getElementById('scholarshipContainer');
const scholarships = scholarshipContainer.querySelectorAll('.card-link');

const totalPages = Math.ceil(scholarships.length / scholarshipsPerPage);

const pagination = document.getElementById('pagination');
for (let i = 1; i <= totalPages; i++) {
  const link = document.createElement('a');
  link.innerText = i;
  link.setAttribute('data-page', i);
  link.href = '#';
  pagination.appendChild(link);
}

showScholarships(1);
pagination.querySelector('a[data-page="1"]').classList.add('active');

pagination.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const page = parseInt(event.target.getAttribute('data-page'));
    showScholarships(page);
    setActivePage(page);
  }
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.trim().toLowerCase();
  const filteredScholarships = filterScholarships(scholarships, searchValue);
  const numResults = filteredScholarships.length;
  showScholarships(1, filteredScholarships);
  renderSearchResults(numResults);
});

function showScholarships(page, scholarshipsToDisplay = scholarships) {
  const startIndex = (page - 1) * scholarshipsPerPage;
  const endIndex = startIndex + scholarshipsPerPage;
  scholarshipsToDisplay.forEach((scholarship, index) => {
    if (index >= startIndex && index < endIndex) {
      scholarship.style.display = 'block';
    } else {
      scholarship.style.display = 'none';
    }
  });
  if (scholarshipsToDisplay.length <= scholarshipsPerPage) {
    pagination.style.display = 'none';
  } else {
    pagination.style.display = 'flex';
  }
  window.scrollTo(0, 0); // Scroll to the top of the page
}

function setActivePage(page) {
  const activeLink = pagination.querySelector('.active');
  if (activeLink) {
    activeLink.classList.remove('active');
  }
  pagination.querySelector(`a[data-page="${page}"]`).classList.add('active');
}

function filterScholarships(scholarships, searchValue) {
  return Array.from(scholarships).filter((scholarship) => {
    const scholarshipText = scholarship.textContent.trim().toLowerCase();
    return scholarshipText.includes(searchValue);
  });
}

function renderSearchResults(numResults) {
  const searchResultsContainer = document.getElementById('searchResultsContainer');
  searchResultsContainer.innerHTML = '';
  if (numResults === 0) {
   searchResultsContainer.innerHTML = '<div class="alert alert-info" role="alert"><strong>No Scholarships Found For your Search.</strong></div>';
	
	
  } else {
    const resultString = numResults === 1 ? 'Scholarship' : 'Scholarships';
   searchResultsContainer.innerHTML = `'<div class="alert alert-info" role="alert"><strong>Found ${numResults} ${resultString}.</strong></div>`;
    const scholarshipContainer = document.getElementById('scholarshipContainer');
    scholarshipContainer.innerHTML = '';
    const scholarshipsToDisplay = filterScholarships(scholarships, searchInput.value.trim().toLowerCase());
    scholarshipsToDisplay.forEach((scholarship) => {
      scholarshipContainer.appendChild(scholarship);
    });
  }
}
// Trigger search function on input change
$("#searchInput").on("input", function() {
  var searchInput = $(this).val().toLowerCase(); // Get input value
  if (searchInput === '') {
    $("#searchResultsContainer").empty(); // Clear search results container if input is empty
  } else {
}
});