import cardList from '../templates/film-list.hbs';
import { hideLoader, showLoader } from './loader';
import { movieAdapterModal } from './helpers/index';
import getRefs from './get-refs';
const { btnWatched, btnQueue } = getRefs();
import dbUi from './api/db';

function getWatched() {
  // let arrayOfStrings = JSON.parse(localStorage.getItem('watched'));

  // if (arrayOfStrings === null || arrayOfStrings.length === 0) {
  //   hideLoader();
  //   watchedEmptyHandler();
  //   return;
  // }

  // renderFromLocalStorage(arrayOfStrings);
  dbUi.getAllWatchedData().then(data => {
    renderData(data);
  });

  btnWatched.classList.add('btn-active-page');
  btnQueue.classList.remove('btn-active-page');
}

function getQueue() {
  showLoader();

  dbUi.getAllQueueData().then(data => {
    renderData(data);
  });

  hideLoader();
  btnQueue.classList.add('btn-active-page');
  btnWatched.classList.remove('btn-active-page');
}

function emptyLibraryHandler() {
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the library</span> yet :( You should add something first</span>`;
  containerFilmRef.innerHTML = initLibraryMarkup;
  btnWatched.classList.add('btn-active-page');
  btnQueue.classList.remove('btn-active-page');
}

function queueEmptyHandler() {
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the QUEUE</span>, yet :( You should add something first</span>`;
  containerFilmRef.innerHTML = initLibraryMarkup;
  btnQueue.classList.add('btn-active-page');
  btnWatched.classList.remove('btn-active-page');
}

// function renderFromLocalStorage(arrayOfStrings) {
//   const movieDataList = arrayOfStrings.map(item => {
//     let data = movieAdapterModal(JSON.parse(item));
//     return data;
//   });

//   const containerFilmRef = document.querySelector('[data-cont="container"]');
//   containerFilmRef.innerHTML = cardList(movieDataList);
// }

function renderData(data) {
  if (data == null) {
    console.log('no data');
    emptyLibraryHandler();
    return;
  }
  console.log(data);
  const movieDataList = data.map(item => {
    // let data = movieAdapterModal(JSON.parse(item));
    // console.log(item);
    return movieAdapterModal(item);
  });
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  containerFilmRef.innerHTML = cardList(movieDataList);
}

btnWatched.addEventListener('click', getWatched);
btnQueue.addEventListener('click', getQueue);
