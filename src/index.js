// import axios from 'axios';
import createMarkup from './markup';
import Notiflix from 'notiflix';
import ApiServer from './api';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  // loadMore: document.querySelector('.load-more'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
console.log(loadMoreBtn);

const apiServer = new ApiServer();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onClickBtn);

async function onSearch(evt) {
  evt.preventDefault();
  apiServer.query = evt.currentTarget.elements.searchQuery.value;

  if (apiServer.query === '') {
    return;
  } else if (apiServer.totalHits >= 500) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }

  loadMoreBtn.show();
  clearGallery();
  apiServer.updatePage();
  apiServer.requestApi().then(requestApiMarkup);
  apiServer.incrementPage();
}

async function onClickBtn() {
  if (apiServer.query === '') {
    return;
  }

  apiServer.requestApi().then(requestApiMarkup);
  apiServer.incrementPage();
}

function requestApiMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
