const options = { timeZone: 'Europe/Brussels', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const brusselsTime = new Date().toLocaleTimeString('fr-be', options);
console.log("Current time in Brussels:", brusselsTime);

const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const searchDestination = document.getElementById("searchDestination");
const resultDiv = document.getElementById("result");

searchDestination.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        destination(searchDestination.value);
    }
});

btnSearch.addEventListener('click', function() {
    destination(searchDestination.value);
});

btnReset.addEventListener('click', function() {
    searchDestination.value = "";
    resultDiv.innerText = "";
});

function destination(destination) {
    let result = "";
    let infoElement = document.querySelectorAll('.information');

    console.log(destination);
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
          for(let item in data){
            if(item.includes(destination.toLowerCase())){
                 result = data[item];
            }
          }
          if(!result){
            data.countries.forEach(country => {
                if(country.name.toLowerCase().includes(destination)){
                    result = country.cities;
                }
            });
          }
          displayResult(result);
          return result;
        })
}

function displayResult(result){
    resultDiv.innerHTML = '';
    result.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('search-result');
        div.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <button class="btnVisit">Visit</button>
        `;
        resultDiv.appendChild(div);
    });
}