import '../components/search-bar.js';
import '../components/club-list.js';
import DataSource from '../data/data-source.js';

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const clubListElement = document.querySelector('club-list');

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchClub(searchElement.value);;
      renderResult(result);
    } catch(message) {
      fallbackResult(message);
    }
  };

  const renderResult = results => {
    clubListElement.clubs = results;
  };

  const fallbackResult = message => {
    clubListElement.renderError(message);
  };

  searchElement.addEventListener('click', onButtonSearchClicked);
};

export default main;
