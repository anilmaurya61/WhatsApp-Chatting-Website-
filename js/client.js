

const socket = io("http://localhost:8000");

const form = document.getElementById("send-msg");
const msginput = document.getElementById("roundrec1");
const msgdisplay = document.querySelector(".div4");
const nameingroup = document.querySelector(".div5");
const counts = document.getElementById("me");
const div7 = document.querySelector(".div7")
let masterPlay = document.getElementById('folder');

var audio = new Audio('ring.mp3');
//var count=0;
masterPlay.addEventListener('click', () => {
  if (masterPlay.classList.contains("fa-folder")) {
    //alert("hi");
    masterPlay.classList.remove('fa-folder');
    document.getElementById('Folder-content').style.display = "block";
    masterPlay.classList.add('fa-folder-open');
  }
  else {
    masterPlay.classList.remove('fa-folder-open');
    masterPlay.classList.add('fa-folder');
    document.getElementById('Folder-content').style.display = "none";
  }
})

let name = prompt("Enter your name to join");
while (name == '') {
  name = prompt("This field cannot be empty");
}

socket.emit('new-user-joined', name.toUpperCase());


function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('roundrec');
  filter = input.value.toUpperCase();
  ul = document.getElementById("theList");
  li = ul.getElementsByTagName("li");

  //Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}




form.addEventListener("submit", (e) => {
  e.preventDefault();//prevent the page from reloading(default task)
  const message = `${msginput.value}`;//get msg from textbox
  const time = `${hour}:${min}:${sec}:${msec}`;
  if (msginput.value != '') {
    append(`You: ${message}`, time, 'right');//show msg on your screen
    socket.emit('send', message);//emit send event
    msginput.value = ''//empty the textbox
  }
})
const append = (message, time, position) => {
  //prompt("hello");
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `${message}<br><p text align="right" style="margin-top: -5px;">${time}</p>`;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  msgdisplay.append(messageElement);
  if (position == 'left') {
    audio.muted = true;
    audio.play();
    //autoplay.muted="allow";
  }
}


const ul = document.createElement('ul');
ul.setAttribute('id', 'theList');
const nameofpeople = (names) => {
  //prompt("hello");
  var li = document.createElement('li');
  li.setAttribute('id', names);

  var a = document.createElement('a');
  a.innerHTML = "<span class='fa-stack user1 fa-2x'>" +
    "<i class='fas user-circle1 fa-circle fa-stack-2x' id='userCircle1'></i>" +
    "<i class='fas user-icon1 fa-user fa-stack-1x fa-inverse' id='userIcon1'></i>"
    + "</span> <b>" + names + "</b>";
  li.appendChild(a);
  li.classList.add('naming');
  ul.appendChild(li);
  nameingroup.appendChild(ul);
  //ul.remove();
}

socket.on('noofuser', count => {
  counts.innerHTML = '<i class="fas fa-2x fa-user-friends"></i>' +
    '<b class="noof">' + count + '</b>' + '</div>';
})
socket.on('currentnoofusers', count => {
  counts.innerHTML = '<i class="fas fa-2x fa-user-friends"></i>' +
    '<b class="noof">' + count + '</b>' + '</div>';
  //   //appendcounts(count1);
})
socket.on('currentusers', msg => {
  counts.innerHTML = '<i class="fas fa-2x fa-user-friends"></i>' +
    '<b class="noof">' + msg + '</b>' + '</div>';
})

socket.on('current-user-joined', naames => {
  const time = `${hour}:${min}:${sec}:${msec}`;
  append('Welcome, you joined the chat', time, 'right');
  //count++;
  //nameofpeople(`${name}`);
  for (let x in naames) {
    nameofpeople(`<b> ${naames[x]} </b>`);
  }

  //console.log(count);
})
socket.on('user-joined', names => {
  const time = `${hour}:${min}:${sec}:${msec}`;
  append(`<b>${names}</b> joined the chat`, time, 'left');

  nameofpeople(`<b> ${names} </b>`);

})


socket.on('receive', data => {
  const time = `${hour}:${min}:${sec}:${msec}`;
  append(`<b>${data.name}:</b> ${data.message}`, time, 'left');//show msg on their screen
})

socket.on('go', data => {
  const time = `${hour}:${min}:${sec}:${msec}`;
  append(`<b>${data.name}</b> left the chat`, time, 'left');//show msg on their screen
})

socket.on('deletealluser', n => {
  var t = document.getElementById("theList");
  var s = n.name;
  alert(s);
  var item = document.getElementById(`<b> ${s} </b>`);
  //alert(item);
  t.removeChild(item);
});











const appendimage = (message, time, position) => {
  //prompt("hello");
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `${message}<br><p text align="right" style="margin-top: -5px;">${time}</p>`;
  messageElement.classList.add('image');
  messageElement.classList.add(position);
  msgdisplay.append(messageElement);
  if (position == 'left') {
    audio.play();
    audio.autoplay = true;
  }
}







socket.on('user image', images => {
  image(images.message, images.name, "left");
});

$('#Image-file').bind('change', function (e) {
  //alert("ji");
  var data = e.originalEvent.target.files[0];
  var reader = new FileReader();
  var name = e.target.files[0].name

  reader.onloadend = function (evt) {
    image(evt.target.result, "You", "right");
    //alert("ji");
    socket.emit('user image', evt.target.result);
    return;
  };
  reader.readAsDataURL(data);

});
function image(Image, Name, position) {
  const time = `${hour}:${min}:${sec}:${msec}`;
  appendimage((`<b>${Name}:</b> <br><img src="` + Image + '"width=400,height=350/>'), time, position);
}








const appendvideo = (message, time, position) => {
  //prompt("hello");
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `${message}<br><p text align="right" style="margin-top: -5px;">${time}</p>`;
  messageElement.classList.add('video');
  messageElement.classList.add(position);
  msgdisplay.append(messageElement);
  if (position == 'left') {
    audio.play();
  }
}








socket.on('user video', videos => {
  video(videos.message, videos.name, "left");
});

$('#Video-file').bind('change', function (e) {
  //alert("ji");
  var data = e.originalEvent.target.files[0];
  var reader = new FileReader();
  var name = e.target.files[0].name

  reader.onloadend = function (evt) {
    alert(evt.target.result);
    video(evt.target.result, "You", "right");
    //alert("ji");
    socket.emit('user video', evt.target.result);
    return;
  };
  reader.readAsDataURL(data);

});
function video(Video, Name, position) {
  const time = `${hour}:${min}:${sec}:${msec}`;
  appendvideo((`<b>${Name}:</b><br><video width="250 height="240" controls autoplay loop><source src="` + Video + '"type="video/mp4"</video>'), time, position);
}











const appendaudio = (message, time, position) => {
  //prompt("hello");
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `${message}<br><p text align="right" style="margin-top: -5px;">${time}</p>`;
  messageElement.classList.add('audio');
  messageElement.classList.add(position);
  msgdisplay.append(messageElement);
  if (position == 'left') {
    audio.play();
  }
  messageElement.addEventListener('click', () => {
    alert("go to audio page");
    window.open('index.html');
  });
}


socket.on('user audio', audioes => {
  //console.log(audioes);
  audios(audioes.src, audioes.name, audioes.nameofsong, "left");
});
$('#Audio-file').bind('change', function (e) {
  //alert("ji");
  var data = e.originalEvent.target.files[0];
  var reader = new FileReader();
  var nameofsong = e.target.files[0].name
  //alert(name);

  reader.onloadend = function (evt) {
    audios(evt.target.result, "You", nameofsong, "right");
    //alert("ji");
    socket.emit('user audio', { src: evt.target.result, nameofsong: nameofsong });
    return;
  };
  reader.readAsDataURL(data);

});
function audios(src, Name, nameofsong, position) {
  const time = `${hour}:${min}:${sec}:${msec}`;
  appendaudio(`<b>${Name}:</b> Send an audio`, time, position);
  localStorage.setItem("src pass to spotify", src);
  localStorage.setItem("name pass to spotify", nameofsong);
}





let myicon = document.getElementById("user");
myicon.addEventListener('click', () => {
  if (document.getElementById('IconId-content').style.display == "none"
    && document.getElementById('user-circle').classList.contains("fa-circle")) {
    alert("hes");
    document.getElementById('IconId-content').style.display = "block";
    document.getElementById('remove-pic').style.display = "none";
  }
  else if (!(document.getElementById('user-circle').classList.contains("fa-circle"))
    && document.getElementById('IconId-content').style.display == "none") {
    alert("hello");
    document.getElementById('IconId-content').style.display = "block";
    document.getElementById('remove-pic').style.display = "block";
  }
  else {
    alert("his");
    document.getElementById('IconId-content').style.display = "none";
  }
})

let icon = document.getElementById("user-icon");
let circle = document.getElementById("user-circle");

$('#user-pics').bind('change', function (e) {
  //alert("ji");
  var data = e.originalEvent.target.files[0];
  var reader = new FileReader();
  //var name= e.target.files[0].name

  reader.onloadend = function (evt) {
    pic(evt.target.result);
    //alert("ji");
    //socket.emit('user image', evt.target.result);
    return;
  };
  reader.readAsDataURL(data);
});
// <span class='fa-stack user1 fa-2x' >"+
//   "<i class='fas user-circle1 fa-circle fa-stack-2x' id='userCircle1'></i>"+
//   "<i class='fas user-icon1 fa-user fa-stack-1x fa-inverse' id='userIcon1'></i>"
//  +"</span>";
function pic(Image) {
  iconchange(name, Image);
  socket.emit("icon change", { namess: name, image: Image });
  //let me = document.getElementById("theList");
  //let you = me.getElementsByTagName("li");
  //let I=you[0].getElementsByClassName("user1");
  //let my=I.getElementsByTagName("i");
  // let miss=I.getElementById("usericon1");
  //I.innerHTML="he is me";
  //li[i].getElementsByTagName("a")[0]
  //let N=you[0].getElementsByTagName("a")[0];


  // N.innerHTML=`<img src= ${Image} style="border-radius:100%;width:70px;height:65px;margin-bottom:10px;">  <b>${name.toUpperCase()}</b>`;
  //N.classList.add("naming");

  //N.classList.add("naming");

  alert("hi");
  alert("Iam out");
  icon.classList.remove("fa-user");
  //user1.classList.remove("naming");
  // if(user1.classList.contains("naming"));
  //   {alert("haa");}
  // user1[0].document.classList.remove("fa-user");
  //userpic.classList.remove("fa-circle");
  //userpic.classList.add("far");
  //userpic.classList.add("fa-circle");
  let img = Image;
  circle.classList.remove("fa-circle");
  //circle1.classList.remove("fa-circle");
  //circle.style.backgroundColor = "#f3f3f3";
  circle.style.borderRadius = "100%";
  circle.style.backgroundImage = "url(" + img + ")";
  circle.style.backgroundSize = "contain";
  //circle1.style.borderRadius="100%";
  //circle1.style.backgroundImage = "url("+img+")";
  //circle1.style.backgroundSize="contain";
  document.getElementById('IconId-content').style.display = "none";
}


let rmpic = document.getElementById("remove-pic");
rmpic.addEventListener('click', () => {
  iconremove(name);
  socket.emit("icon-remove", name);
  circle.style.backgroundImage = "url()";
  icon.classList.add("fa-user");
  circle.classList.add("fa-circle");
  //circle.style.backgroundColor = "black";
  document.getElementById('IconId-content').style.display = "none";
})



function iconchange(name, Image) {
  let filter = name.toUpperCase();
  let ul = document.getElementById("theList");
  let li = ul.getElementsByTagName("li");

  //  //Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a.innerHTML = `<img src= ${Image} style="border-radius:100%;width:70px;height:65px;margin-bottom:10px;">  <b>${name.toUpperCase()}</b>`;
    };
  }
};

function iconremove(name) {
  let filter = name.toUpperCase();
  let ul = document.getElementById("theList");
  let li = ul.getElementsByTagName("li");

  //  //Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a.innerHTML = "<span class='fa-stack user1 fa-2x'>" +
        "<i class='fas user-circle1 fa-circle fa-stack-2x' id='userCircle1'></i>" +
        "<i class='fas user-icon1 fa-user fa-stack-1x fa-inverse' id='userIcon1'></i>"
        + "</span> <b>" + name.toUpperCase() + "</b>";
    };
  }

}

socket.on("icon change", icon => {
  iconchange(icon.namess, icon.image);
})


socket.on("icon remove", icon => {
  iconremove(icon);
})


















function diftime(a, b, d) {
  var c;
  if (a > b) {
    c = a - b;
  }
  if (a < b) {
    c = (d + a) - b;
  }
  if (a == b) {
    c = 0;
  }
  return c;
}

socket.on('timer', time => {
  var cdate = new Date();

  window.msec = diftime(cdate.getMilliseconds(), time.msec, 1000);
  if (msec < 10) {
    document.getElementById("milliseconds").innerHTML = "0" + msec;
  } else {
    document.getElementById("milliseconds").innerHTML = msec;
  }
  //alert(cdate.getMilliseconds()+"         "+time.msec);



  window.sec = diftime(cdate.getSeconds(), time.sec, 60);
  if (sec < 10) {
    document.getElementById("seconds").innerHTML = "0" + sec;
  } else {
    document.getElementById("seconds").innerHTML = sec;
  }



  window.min = diftime(cdate.getMinutes(), time.min, 60);
  if (min < 10) {
    document.getElementById("minutes").innerHTML = "0" + min;
  }
  else {
    document.getElementById("minutes").innerHTML = min;
  }




  window.hour = diftime(cdate.getHours(), time.hour, 24);
  if (hour < 10) {
    document.getElementById("hours").innerHTML = "0" + hour;
  } else {
    document.getElementById("hours").innerHTML = hour;
  }
  setMSec();
});


socket.on('timers', time => {
  var date = new Date();

  window.msec = diftime(date.getMilliseconds(), time.msec, 1000);
  //alert(cdate.getMilliseconds()+"         "+time.msec);
  window.sec = diftime(date.getSeconds(), time.sec, 60);
  window.min = diftime(date.getMinutes(), time.min, 60);
  window.hour = diftime(date.getHours(), time.hour, 24);
});

function setMSec() {
  if (msec < 10) {
    document.getElementById("milliseconds").innerHTML = "0" + msec;
  } else {
    document.getElementById("milliseconds").innerHTML = msec;
  }
  msec = msec + 1;
  msecVar = setTimeout(setMSec, 100);
  if (msec >= 10) {
    setSec();
    msec = 0;
  }
}

function setSec() {
  if (sec >= 60) {
    setMin();
    sec = 0;
  }
  if (sec < 10) {
    document.getElementById("seconds").innerHTML = "0" + sec;
  } else {
    document.getElementById("seconds").innerHTML = sec;
  }
  sec = sec + 1;
}

function setMin() {
  min = min + 1;
  if (min >= 60) {
    setHour();
    min = 0;
  }
  if (min < 10) {
    document.getElementById("minutes").innerHTML = "0" + min;
  }
  else {
    document.getElementById("minutes").innerHTML = min;
  }

}

function setHour() {
  if (hour < 10) {
    document.getElementById("hours").innerHTML = "0" + hour;
  } else {
    document.getElementById("hours").innerHTML = hour;
  }
  hour = hour + 1;
}





