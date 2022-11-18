console.log("Welcome to Spotify");

//Initialise the variable
let songIndex=0;
var datas = localStorage.getItem("src pass to spotify");
var nameofsong=localStorage.getItem("name pass to spotify");
//localStorage.clear(); //clean the localstorage
var src = datas;
var name=nameofsong;
//var nameofsong=datas.nameofsong;
alert(src);
alert(name);
//alert(nameofsong);
//alert(datas);
let audioElement=new Audio(datas);
//alert(datas.name);



//audioelement.play();
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSong')
let songItems=Array.from(document.getElementsByClassName('songitem'));
let songs=[
  {songName:"Na Jaana - Salam-e-Ishq",filePath:"0.mp3",coverpath:"1.jpg"},
  {songName:"Warriyo - Mortals [NCS Release]",filePath:"1.mp3",coverpath:"2.jpg"},
  {songName:"Cielo - Huma-Huma",filePath:"2.mp3",coverpath:"3.jpg"},
  {songName:"DEAF KEV - Invincible [NCS Release]-320k",filePath:"3.mp3",coverpath:"4.jpg"},
  {songName:"Different Heaven & EH!DE - My Heart [NCS Release]",filePath:"4.mp3",coverpath:"5.jpg"},
  {songName:"Janji-Heroes-Tonight-feat-Johnning-NCS-Release",filePath:"5.mp3",coverpath:"6.jpg"},
  {songName:"Rabba - Salam-e-Ishq",filePath:"6.mp3",coverpath:"7.jpg"},
  {songName:"Sakhiyaan - Salam-e-Ishq",filePath:"7.mp3",coverpath:"8.jpg"},
  {songName:"Bhula Dena - Salam-e-Ishq",filePath:"8.mp3",coverpath:"9.jpg"},
  {songName:"Tumhari Kasam - Salam-e-Ishq",filePath:"9.mp3",coverpath:"10.jpg"},
  {songName:name,filePath:src,coverpath:"1.jpg"}
]
var duration;
function getduration(src,element)
{
  let audio=new Audio(src);
  audio.addEventListener("loadedmetadata", function(_event) {
  duration = audio.duration;
  let min=Math.trunc(duration/60);
  let sec=Math.trunc(duration%60);
  let time=`${min}:${sec}`;
  element.getElementsByClassName("timeOfSong")[0].innerText=time;
  });
}




songItems.forEach((element, i)=>{
  //console.log(element[i]);
  element.getElementsByTagName('img')[0].src=songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
  element.getElementsByClassName("timeOfSong")[0]=getduration(songs[i].filePath,element);
})
//alert(songs[10].filePath);
//handle play pause click
masterPlay.addEventListener('click',()=>{
  if(audioElement.paused||audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    alert(audioElement.src);
      if(audioElement.src==songs[10].filePath)
      {
        songIndex=10;
        songItems[10].style.background="red";
        let index=document.getElementById(`10`);
        index.classList.remove('fa-play-circle');
        index.classList.add('fa-pause-circle');
      }
    else{
    var num = (audioElement.src).replace(/\D/g,'');
    //alert(num);
    var ids=num.charAt(num.length-2);
    //alert(ids);
    //alert(index);
    songItems[ids].style.background="red";
    let index=document.getElementById(`${ids}`);
    index.classList.remove('fa-play-circle');
    index.classList.add('fa-pause-circle');}
  }
  else
  {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    //songItems[ids].style.background="white";
    gif.style.opacity=0;
    makeAllPlays();
  }
})


//Listen to events
audioElement.addEventListener('timeupdate',()=>{
  //console.log('timeupdate');
  progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
  //console.log(progress);
  myProgressBar.value=progress;
})
audioElement.addEventListener('ended',()=>{
  if(songIndex>=10)
  {
    songIndex=0;
  }
  else
  {
    songIndex+=1;
  }
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.src=`${songIndex}.mp3`;
  makeAllPlays();
  let index=document.getElementById(`${songIndex}`);
  index.classList.remove('fa-play-circle');
  index.classList.add('fa-pause-circle');
  audioElement.currentTime=0;
  audioElement.play();
  gif.style.opacity=1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})

myProgressBar.addEventListener('change',()=>{
  console.log("hi");
  audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>{
  
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
    Array.from(document.getElementsByClassName('songitem')).forEach((elements)=>{
    elements.style.background="white";
    //alert("hi");
    })
    
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    if(e.target.classList.contains("fa-play-circle")){
    console.log(e.target);
    makeAllPlays();
    gif.style.opacity=1;
    songIndex=parseInt(e.target.id);
    alert(songIndex);
    masterSongName.innerText=songs[songIndex].songName;
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src=`${songs[songIndex].filePath}`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    songItems[songIndex].style.background="red";
    //document.body.songItems[songIndex]="AddBackgroundColor";
  }
    else
    {
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity=0;
      makeAllPlays(songIndex);
      songItems[songIndex].style.background="white";
    }
  })
})

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex==9)
  {
    songIndex=10;
  }
  else if(songIndex==10){
    songIndex=0;
  }
  else
  {
    songIndex+=1;
  }
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.src=`${songs[songIndex].filePath}`;
  makeAllPlays();
  let index=document.getElementById(`${songIndex}`);
  index.classList.remove('fa-play-circle');
  index.classList.add('fa-pause-circle');
  audioElement.currentTime=0;
  audioElement.play();
  songItems[songIndex].style.background="red";
  gif.style.opacity=1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0)
  {
    songIndex=10;
  }
  else
  {
    songIndex-=1;
  }
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.src=`${songs[songIndex].filePath}`;
  makeAllPlays();
  let index=document.getElementById(`${songIndex}`);
  index.classList.remove('fa-play-circle');
  index.classList.add('fa-pause-circle');
  audioElement.currentTime=0;
  audioElement.play();
  songItems[songIndex].style.background="red";
  gif.style.opacity=1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})