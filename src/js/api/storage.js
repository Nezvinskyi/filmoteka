export function addToWatched(movie) {
  const btnAddToWatchedRef = document.querySelector('.btn-js-addtowatched');
  btnAddToWatchedRef.addEventListener('click', clickBtn);
  function clickBtn(event) {
    if (localStorage.getItem('watchLater') === null) {
      localStorage.setItem('watchLater', '[]');
    }
    saveToWatched(movie);
  }
}

export function addToQueue(movie) {
  const btnAddToQueueRef = document.querySelector('.btn-js-addtoqueue');
  btnAddToQueueRef.addEventListener('click', clickBtn);
  function clickBtn(event) {
    if (localStorage.getItem('queue') === null) {
      localStorage.setItem('queue', '[]');
    }
    saveToQueue(movie);
  }
}

function saveToWatched(movie) {
  let storage = JSON.parse(localStorage.getItem('watchLater'));
  const { title, genres, voteAverage, imgSrc } = movie;

  const string = JSON.stringify({ title, genres, voteAverage, imgSrc });

  const index = storage.indexOf(string);
  if (index > -1) {
    storage.splice(index, 1);
  } else {
    storage.push(string);
  }
  const stringFromObj = JSON.stringify(storage);
  let endStorage = JSON.parse(stringFromObj);
  localStorage.setItem('watchLater', stringFromObj);
  return endStorage;
}

function saveToQueue(movie) {
  let storage = JSON.parse(localStorage.getItem('queue'));
  const { title, genres, voteAverage, imgSrc } = movie;

  const string = JSON.stringify({ title, genres, voteAverage, imgSrc });

  const index = storage.indexOf(string);
  if (index > -1) {
    storage.splice(index, 1);
  } else {
    storage.push(string);
  }
  const stringFromObj = JSON.stringify(storage);
  let endStorage = JSON.parse(stringFromObj);
  localStorage.setItem('queue', stringFromObj);
  return endStorage;
}
