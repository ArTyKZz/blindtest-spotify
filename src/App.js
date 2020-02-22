/*global swal*/

import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import AlbumCover from "./AlbumCover";

const apiToken = '<<Copiez le token de Spotify ici>>';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [tracks, setTracks] = useState();
  const [songsLoaded, setSongsLoaded] = useState(false);
  useEffect(() => {
    fetch('https://api.spotify.com/v1/playlists/1wCB2uVwBCIbJA9rar5B77/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        setTracks(data.items);
        setSongsLoaded(true);
      });
  }, []);

  if (!songsLoaded) {
    return (
      <div className="App">
        <img src={loading} className="App-logo" alt="logo"/>
      </div>
    );
  }

  const track1 = tracks[0].track;
  const track2 = tracks[1].track;
  const track3 = tracks[2].track;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <AlbumCover track={track1}/>
        <Sound url={track1.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
      <div className="App-buttons">
        <Button>{track1.name}</Button>
        <Button>{track2.name}</Button>
        <Button>{track3.name}</Button>
      </div>
    </div>
  );
};

export default App;
