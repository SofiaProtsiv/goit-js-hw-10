import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountry from './fetchCountries'
import previewCard from '../templates/previewCard.hbs'
import countryList from '../templates/countryList.hbs'
import getRefs from './getRefs';
import '../css/styles.css';


const refs = getRefs();
refs.input.addEventListener("input", debounce(onInput, refs.DEBOUNCE_DELAY));

function onInput (event) {
  event.preventDefault();
  const value = event.target.value.trim();
  if(value.length === 0){
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = '';
  } 

  fetchCountry(value)
    .then((country) => {
      if(country.length > 10) {
        refs.countryList.innerHTML = '';
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      }
      if (2 <= country.length <= 10) {
        renderCountryList(country);
        refs.countryCard.innerHTML = '';
      } 
      if(country.length === 1){
        renderCountryCard(country);
        refs.countryList.innerHTML = '';
      }
    })
    .catch((error) => {
      refs.countryList.innerHTML = '';
      return Notiflix.Notify.failure("Oops, there is no country with that name");
    })
  };
        
function renderCountryList(country) {
  refs.countryList.innerHTML = countryList(country);
}

function renderCountryCard(country) {
    refs.countryCard.innerHTML =  previewCard(country);
}