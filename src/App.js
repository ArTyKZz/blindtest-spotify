/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';
import { useEffect } from 'react';

const apiToken = 'BQDw62GaPoGzLanDoBsId5pBSYwj91amJ4YOdMYJGwyDKP36f1Vcf6zKjlA0NKdht8GIR2B1_ArvZMDmR8q0wE8PaFn72zYCasTs3B3o-2w3INcd7Yc1HvxT4jBgirJZ6AhCwQj8kD3f3-NT5LB__J3vdYIF8rKQ9GM5mnoKfjN-cr6R';

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

const AlbumCover = (props) => {
    const src = props.track.album.images[0].url;
    return (
        <img src={src} style={{ width: 400, height: 400 }} />
    );
}

const App = () => {
  const [tracks, setTrack] = useState([]);
  const [songsLoaded, setSongLoaded] = useState(false);
  const [songPlaying, setSongPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null);
  const [arrayTrack, setArrayTrack] = useState([]);

  const onplay = () => {
    setSongPlaying(true);
  }
  const onpause = () => {
    setSongPlaying(false);
  }
  const shuffleTrack = () => {
      let track1 = tracks[getRandomNumber(tracks.length)].track;
      let track2 = tracks[getRandomNumber(tracks.length)].track;
      while(track1 === track2){
        track2 = tracks[getRandomNumber(tracks.length)].track;
      }
      let track3 = tracks[getRandomNumber(tracks.length)].track;
      while((track1 === track3) || (track2 === track3)){
        track3 = tracks[getRandomNumber(tracks.length)].track;
      }
      setArrayTrack(shuffleArray([track1, track2, track3]));
      setCurrentTrack(track1);
    };
  
  const checkAnswer = (id) => {
    if(id === currentTrack.id){
      swal('Bravo', "T'es vraiment un crackito", 'success').then(() => shuffleTrack());
    } else{
      swal("T'es nul", 'Même Mathis est meilleur que toi', 'error');
    }
  }

  useEffect(() => {fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
    Authorization: 'Bearer ' + apiToken,
    },
  }
  )
    .then(response => response.json())
    .then((data) => {
      setTrack(data.items);
      let track1 = data.items[getRandomNumber(data.items.length)].track;
      let track2 = data.items[getRandomNumber(data.items.length)].track;
      while(track1 === track2){
        track2 = data.items[getRandomNumber(data.items.length)].track;
      }
      let track3 = data.items[getRandomNumber(data.items.length)].track;
      while((track1 === track3) || (track2 === track3)){
        track3 = data.items[getRandomNumber(data.items.length)].track;
      }
      setArrayTrack(shuffleArray([track1, track2, track3]));
      setCurrentTrack(track1);
      setSongLoaded(true);
    });}, []);

    if(songsLoaded){
      const previewUrl = currentTrack.preview_url;
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", arrayTrack);
      return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest de Mickou</h1>
      </header>
      <div className="App-images">
        <AlbumCover track={currentTrack}/>
        {songPlaying && <Sound url={previewUrl} playStatus={Sound.status.PLAYING}/>}
      </div>
      <div className="App-buttonsPlayPause">
        <Button onClick={() => onplay()}>Play</Button>
        <Button onClick={() => onpause()}>Stop</Button>
      </div>
      <div className="App-buttons">
        {arrayTrack.map(track =>
          <Button onClick={() => checkAnswer(track.id)}>{track.name}</Button>
        )}
      </div>
    </div>
  );
    } else{
      return (
    <div className="App">
      <header className="App-header">
        <img src={loading} className="App-logo" alt="logo"/>
        <h1 className="App-title">Chargement des musiques</h1>
      </header>
      <div className="App-images">
      </div>
      <div className="App-buttons">
      </div>
    </div>
  );
    }
  
}

export default App;
