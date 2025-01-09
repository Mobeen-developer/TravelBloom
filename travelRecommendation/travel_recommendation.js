const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container form", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".feature__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".package__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
  },
});
async function getData() {
    const url = "travelRecommendation/travel_recommendation_api.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute: '2-digit' };
const indiaTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in India:", indiaTime);

document.getElementById("reset-btn").addEventListener("click", function () {
    document.getElementById("search").value = "";
    document.getElementById("results").innerHTML = "";
});
// Sample JSON data (replace with a fetch call if using an external JSON file)
const data = {
    countries: [
      {
        id: 1,
        name: "Australia",
        cities: [
          { name: "Sydney, Australia", imageUrl: "image_for_sydney.jpg", description: "A vibrant city..." },
          { name: "Melbourne, Australia", imageUrl: "image_for_melbourne.jpg", description: "A cultural hub..." },
        ],
      },
      {
        id: 2,
        name: "Japan",
        cities: [
          { name: "Tokyo, Japan", imageUrl: "image_for_tokyo.jpg", description: "A bustling metropolis..." },
          { name: "Kyoto, Japan", imageUrl: "image_for_Japan.jpg", description: "Known for its historic temples..." },
        ],
      },
    ],
    temples: [
      { id: 1, name: "Angkor Wat, Cambodia", imageUrl: "image_for_angkor-wat.jpg", description: "A UNESCO site..." },
      { id: 2, name: "Taj Mahal, India", imageUrl: "image_for_taj-mahal.jpg", description: "An iconic symbol of love..." },
    ],
    beaches: [
      { id: 1, name: "Bora Bora, French Polynesia", imageUrl: "image_for_bora-bora.jpg", description: "An island known for..." },
      { id: 2, name: "Copacabana Beach, Brazil", imageUrl: "image_for_copacabana.jpg", description: "A famous beach..." },
    ],
  };
  
  // Function to normalize and search
  function searchKeyword(keyword) {
    const normalizedKeyword = keyword.toLowerCase();
    const results = [];
  
    // Search in beaches
    data.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(normalizedKeyword)) {
        results.push(beach);
      }
    });
  
    // Search in temples
    data.temples.forEach(temple => {
      if (temple.name.toLowerCase().includes(normalizedKeyword)) {
        results.push(temple);
      }
    });
  
    // Search in countries and cities
    data.countries.forEach(country => {
      if (country.name.toLowerCase().includes(normalizedKeyword)) {
        results.push(country);
      }
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(normalizedKeyword)) {
          results.push(city);
        }
      });
    });
  
    return results;
  }
  
  // Event listener for search
  document.getElementById("search-button").addEventListener("click", () => {
    const searchField = document.getElementById("search-field");
    const query = searchField.value.trim();
  
    if (!query) {
      alert("Please enter a keyword to search.");
      return;
    }
  
    const results = searchKeyword(query);
    displayResults(results);
  });
  
  // Function to display results
  function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results
  
    if (results.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }
  
    results.forEach(item => {
      const card = document.createElement("div");
      card.className = "result-card";
  
      const image = document.createElement("img");
      image.src = `./${item.imageUrl}`;
      image.alt = item.name;
  
      const title = document.createElement("h3");
      title.textContent = item.name;
  
      const description = document.createElement("p");
      description.textContent = item.description;
  
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);
      resultsDiv.appendChild(card);
    });
  }
  
