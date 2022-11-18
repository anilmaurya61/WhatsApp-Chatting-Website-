// node server handle socket io connections
const io = require("socket.io")(8000,{
cors: {
  origin: '*',
}
});
var count=0;
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017",function(err, db)
  {
    //Connecting To Mongo DB Database Before Starting Node Server
   useNewUrlParser = true,
   useUnifiedTopology = true,
   auto_reconnect = true
  });
  const Schema = require('mongoose').Schema;
  const userSchema= new Schema({
      name:String,
      time:String
  });

const user=new mongoose.model("user",userSchema);

const users={};//create list for users
var names={};
// var count;
var date=new Date();
//console.log(date);
var hour;
var min;
var sec;
var msec;
io.on('connection', socket =>        //listen all connections from all users //when connection comes run arrrow function
{
  socket.on('new-user-joined', naame =>
  { //listen incoming connections from particular user
    //console.log('New User', name);//show user joined with name on terminal
    //count++;
    count++;
    if(count==1)
    {
      var date=new Date();
      //console.log(date);
      hour=date.getHours();
      min=date.getMinutes();
      sec=date.getSeconds();
      msec=date.getMilliseconds();
    }
    //console.log(naame)
    users[socket.id]=naame;             //when user joined event come, it will set name under the user 
    console.log(users[socket.id]);
    names=users;
    // for(let x in users)
    // {
    //   console.log(users[x]);
    // }
    // const newUser= new user({
    //   name : naame,
    //   time: new Date()
    // });
    // newUser.save(function(err)
    // {
    //   if(err)
    //   {
    //       console.log(err);
    //   }
    // });
    // user.find().count({},function(err,me){
    //   console.warn(me);
    //   count=me;
    // })
    // user.find({time:{$gte:date}},function(err,lusers){
    //   if(err)
    //   {
    //     console.warn(err);
    //   }
    //   console.warn(lusers);
    //   names=lusers;
    // })
    socket.emit('timer',{msec:msec,sec:sec,min:min,hour:hour});
    socket.broadcast.emit('timers',{msec:msec,sec:sec,min:min,hour:hour});

    
    
    //console.log(count);
    socket.emit('noofuser',count);
    socket.broadcast.emit('currentnoofusers',count);
    socket.emit('current-user-joined', names);
    socket.broadcast.emit('user-joined', naame);  //broadcast event to everyone user-joined except new user that user is joined
  });
    

  socket.on('user image', function (msg) 
  {
    console.log(msg);
    socket.broadcast.emit('user image',{message:msg,name:users[socket.id]});
  });
    

  socket.on('user video', function (msg) 
  {
    //console.log(msg);
    socket.broadcast.emit('user video',{message:msg,name:users[socket.id]});
  });
  socket.on('user audio', function (msg) 
  {
    //console.log(msg);
    socket.broadcast.emit('user audio',{src:msg.src,name:users[socket.id],nameofsong:msg.nameofsong});
  });
  socket.on('icon change',function(msg)
  {
    socket.broadcast.emit('icon change',{namess:msg.namess,image:msg.image});
  })
  socket.on('icon remove',function(msg)
  {
    socket.broadcast.emit('icon remove',msg);
  })








  socket.on('send', message =>
  {
    //console.log("hi");
    socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    //when send event is triggered, it will broadcast receive event where msg=msg and name= name on socket id
  });

  socket.on('disconnect', message =>
  {
    //console.log(message);
    
    socket.broadcast.emit('go', {name:users[socket.id]})
    // console.log(name);
    
    socket.broadcast.emit('deletealluser',{name:users[socket.id]});
    //console.log(users[socket.id]);
    delete users[socket.id];
    count--;
    socket.broadcast.emit("currentusers",count);
    // var names=users;
    //console.log(names);
    //socket.broadcast.emit('show currentusers',names);
  });
  //console.log(date);
  //console.log(date);
});

