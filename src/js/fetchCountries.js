export default function fetchCountry(countryName) {
    return fetch (`https://restcountries.com/v3.1/name/${countryName}`).then(
          (response) => {
        if (!response.ok) {
          Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        return response.json();
      }
    );
  }