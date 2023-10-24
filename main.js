/* elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')

const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')

const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


let index


let loop = true

// JSON SONG LIST STRUCTURE
const songsList = [
  {
    name: "Snap",
    link: "assest/Snap.mp3",
    artist: "Rosa Linn",
    image: "assest/snaps.jpg"
  },
  {
    name: "Shape of My Heart",
    link: "assest/sting.mp3",
    artist: "Sting",
    image: "assest/stings.jpg"
  },
  {
    name: "Sunflower",
    link: "assest/sunshine.mp3",
    artist: "Christina Perri ",
    image: "assest/sunflowers.jpg"
  },
  {
    name: "Ta Mavra Maito Su",
    link: "assest/statis.mp3",
    artist: "Statis Agnapaloulos",
    image: "assest/mavra.jpg"
  },

]

// TİME FORMATTER
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60)
  minute = minute < 10 ? "0" + minute : minute
  let second = Math.floor(timeInput % 60)
  second = second < 10 ? "0" + second : second
  return `${minute}:${second}`
}

// SOUND ASSIGNMENT
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex]

  audio.src = link
  songName.innerHTML = name
  songArtist.innerHTML = artist
  songImage.src = image

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration)

  }

  playListContainer.classList.add('hide')
  playAudio()
}

const playAudio = () => {
  audio.play()
  pauseButton.classList.remove('hide')
  playButton.classList.add('hide')
}

const pauseAudio = () => {
  audio.pause()
  pauseButton.classList.add('hide')
  playButton.classList.remove('hide')
}

const nextSong = () => {
  if (!loop) {
    if (index == (songsList.length - 1)) {
      index = 0
    } else {
      index += 1
    }
    setSong(index)
    playAudio()
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length)
    console.log(randIndex)
    setSong(randIndex)
    playAudio()
  }
}

const previousSong = () => {
  if (index > 0) {
    pauseAudio()
    index -= 1
  } else {
    index = songsList.length - 1
  }
  setSong(index)
  playAudio()
}

audio.onended = () => {
  nextSong()
}


progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left


  let coordEnd = event.clientX
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth

  currentProgress.style.width = progress * 100 + "%"

  audio.currentTime = progress * audio.duration
  audio.play()
  pauseButton.classList.remove('hide')
  playButton.classList.add('hide')
})

// MİX
shuffleButton.addEventListener('click', () => {
  if (shuffleButton.classList.contains('active')) {
    shuffleButton.classList.remove('active')
    loop = true
    console.log('karistirma kapali')
  } else {
    shuffleButton.classList.add('active')
    loop = false
    console.log("karistirma acik")
  }
})

// REPEAT
repeatButton.addEventListener('click', () => {
  if (repeatButton.classList.contains('active')) {
    repeatButton.classList.remove('active')
    loop = false
    console.log('tekrar kapali')
  } else {
    repeatButton.classList.add('active')
    loop = true
    console.log("tekrar acik")
  }
})


const initializePlayList = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
       <img src="${songsList[i].image}"/>
       </div>
       <div class="playlist-song-details">
        <span id="playlist-song-name">
         ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
        </div>
       </li>`
  }
}

playListButton.addEventListener('click', () => {
  playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click', () => {
  playListContainer.classList.add('hide')
})


playButton.addEventListener('click', playAudio)

pauseButton.addEventListener('click', pauseAudio)

nextButton.addEventListener('click', nextSong)

prevButton.addEventListener('click', previousSong)


setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
  currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);


audio.addEventListener('timeupdate', () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime)
})


window.onload = () => {
  index = 0
  setSong(index)
  pauseAudio()
  initializePlayList()

}