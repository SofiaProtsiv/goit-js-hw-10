import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import '../css/styles.css';


const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector(".country-list");
const countryCard = document.querySelector(".country-info");
const input = document.querySelector("#search-box");

input.addEventListener("input", debounce(onInput, 300));

function onInput (event) {
  event.preventDefault();
  const value = event.target.value.trim();

    fetchCountry(value)
    .then((country) => {
      if(country.length > 10) {
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      }
      if (2 <= country.length <= 10) {
        renderCountryList(country);
        countryCard.innerHTML = '';
      } 
      if(country.length === 1){
        renderCountryCard(country);
        countryList.innerHTML = '';
      }
    })
  };


function fetchCountry(countryName) {
    return fetch (`https://restcountries.com/v3.1/name/${countryName}`).then(
          (response) => {
        if (!response.ok) {
          Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        return response.json();
      }
    );
  }
          
function renderCountryList(country) {
  const markup = country
    .map((country) => {
      return `<li>
        <img class="countryFlag" src="${country.flags.png}" alt="${country.name.common}">
        <p class="countryName">${country.name.common}</p>
        </li>`;
      })
    .join("");
  countryList.innerHTML = markup;
}

function renderCountryCard(country) {
  const markup = country
    .map((country) => {
      return `
        <div class="previewCard">
          <img class="countryFlag" src="${country.flags.png}" alt="${country.name.common}">
          <p class="countryName">${country.name.common}</p>
        </div>
        <p class="countryCapital"><b>Capital:</b> ${country.capital}</p>
        <p class="countryPopulation"><b>Population:</b> ${country.population}</p>
        <p class="countryLanguages"><b>Languages:</b> ${Object.values(country.languages)}</p>
        `;
      })
    .join("");
    countryCard.innerHTML = markup;
}