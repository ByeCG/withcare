const music = document.querySelector('audio');
const play = document.getElementById('pause');


const naam = document.querySelector('.naam');
const gayak = document.querySelector('.gayak');
const img = document.querySelector('img');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const p_bar = document.querySelector('.p_bar');
const st_time = document.querySelector('#st_time');
const end_time = document.querySelector('#end_time');
const p_div = document.querySelector('.p_div');

const allsongs = [
    {
        song: "song1.mp3",
        pic: "img1.jpg",
        song_naam: "Prothom Kotha",
        song_gayak: "Sayan Sinha",
    },
    {
        song: "satranga.mp3",
        pic: "img2.jpg",
        song_naam: "Satranga",
        song_gayak: "Sayan Sinha",
    },
    {
        song: "tomakeChai.mp3",
        pic: "img3.jpg",
        song_naam: "Tomake Chai",
        song_gayak: "Sayan Sinha",
    },
    {
        song: "jabTaak.mp3",
        pic: "img4.jpeg",
        song_naam: "Jab Taak",
        song_gayak: "Sayan Sinha",
    },


];

let isplaying = false;
const playmusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    play.title="pause";
}
const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    play.title="play";
}

play.addEventListener('click', () => {
    isplaying ? pausemusic() : playmusic();
});



const loadsongs = (allsongs) => {
    naam.textContent = allsongs.song_naam;
    gayak.textContent = allsongs.song_gayak;
    music.src = allsongs.song;
    img.src = allsongs.pic;
};



var i = 0;

const nextsongs = () => {
    i = (i + 1) % allsongs.length;
    loadsongs(allsongs[i]);
    playmusic();
}

const prevsongs = () => {
    i--;
    if (i <= 0) {
        i = 4;
    }
    loadsongs(allsongs[i-1]);
    playmusic();
}

music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement; 

    let time = (currentTime / duration) * 100;
    p_bar.style.width = `${time}%`;
    if (p_bar.style.width == "100%") {
        nextsongs();
        p_bar.style.width = "0%";
    }


    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let end = `${min_duration}:${sec_duration}`;
    if (duration) {
        end_time.textContent = end;
    }

    let min_curtime = Math.floor(currentTime / 60)
    let sec_curtime = Math.floor(currentTime % 60);
    if (sec_curtime < 10) {
        sec_curtime = `0${sec_curtime}`
    }
    let strt = `${min_curtime}:${sec_curtime}`;
    st_time.textContent = strt;

});


p_div.addEventListener('click', (dba) => {
    const { duration } = music;

    let le_chalo = (dba.offsetX / dba.srcElement.clientWidth) * duration;

    music.currentTime = le_chalo;

});



next.addEventListener('click', nextsongs);
prev.addEventListener('click', prevsongs);
