var photos=[
  'asset/img/photo1.jpg',
  'asset/img/photo2.jpg',
  'asset/img/photo3.jpg',
  'asset/img/photo4.jpg',
  'asset/img/photo5.jpg'
];

// Countdown
var deadline=new Date('2026-05-25T18:00:00');
function updateCountdown(){
  var diff=deadline-new Date();
  if(diff<=0){['days','hours','minutes','seconds'].forEach(function(id){document.getElementById(id).textContent='0';});return;}
  document.getElementById('days').textContent=Math.floor(diff/86400000);
  document.getElementById('hours').textContent=Math.floor((diff%86400000)/3600000);
  document.getElementById('minutes').textContent=Math.floor((diff%3600000)/60000);
  document.getElementById('seconds').textContent=Math.floor((diff%60000)/1000);
}
setInterval(updateCountdown,1000);
updateCountdown();

// Particles
(function(){
  var pc=document.getElementById('particles');
  for(var i=0;i<28;i++){
    var p=document.createElement('div');p.className='particle';
    p.style.left=Math.random()*100+'%';
    p.style.animationDuration=(8+Math.random()*12)+'s';
    p.style.animationDelay=(Math.random()*10)+'s';
    var s=(2+Math.random()*4)+'px';p.style.width=p.style.height=s;
    pc.appendChild(p);
  }
})();

// Galereya
var cur=0;
var dotsEl=document.getElementById('dots');
var imgEl=document.getElementById('gallery-img');
imgEl.src=photos[0];
photos.forEach(function(_,i){
  var d=document.createElement('button');
  d.className='dot'+(i===0?' active':'');
  d.setAttribute('aria-label','Rasm '+(i+1));
  d.onclick=function(){setPhoto(i);};
  dotsEl.appendChild(d);
});
function setPhoto(idx){
  cur=idx;imgEl.style.opacity='0';
  setTimeout(function(){imgEl.src=photos[idx];imgEl.style.opacity='1';},250);
  document.querySelectorAll('.dot').forEach(function(d,i){d.classList.toggle('active',i===idx);});
}
setInterval(function(){setPhoto((cur+1)%photos.length);},5000);

// Musiqa — foydalanuvchi birinchi tegishida boshlanadi
var audio=new Audio('asset/audio/experience.mp3');
audio.loop=true;
var playing=false;
var started=false;

function startOnInteraction(){
  if(started) return;
  started=true;
  audio.play().then(function(){
    playing=true;
    document.getElementById('music-btn').innerHTML='&#9208;&#65039;';
  }).catch(function(){});
  document.removeEventListener('click', startOnInteraction);
  document.removeEventListener('touchstart', startOnInteraction);
  document.removeEventListener('scroll', startOnInteraction);
}

document.addEventListener('click', startOnInteraction);
document.addEventListener('touchstart', startOnInteraction);
document.addEventListener('scroll', startOnInteraction);

function toggleMusic(){
  if(playing){
    audio.pause();
    document.getElementById('music-btn').innerHTML='&#127925;';
    playing=false;
  } else {
    audio.play().catch(function(){});
    document.getElementById('music-btn').innerHTML='&#9208;&#65039;';
    playing=true;
  }
}

// RSVP
var wishes=[];
function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function handleRSVP(e){
  e.preventDefault();
  var name=document.getElementById('r-name').value.trim();
  var wish=document.getElementById('r-wish').value.trim();
  if(!name)return;
  wishes.unshift({name:name,wish:wish});
  renderWishes();showToast();e.target.reset();
}
function renderWishes(){
  var grid=document.getElementById('wishes-grid');
  var em=document.getElementById('empty-msg');if(em)em.remove();
  grid.innerHTML='';
  wishes.forEach(function(w){
    var card=document.createElement('div');card.className='wish-card';
    card.innerHTML='<div class="wish-name">&#127800; '+escHtml(w.name)+'</div>'+(w.wish?'<div class="wish-text">'+escHtml(w.wish)+'</div>':'');
    grid.appendChild(card);
  });
}
function showToast(){
  var t=document.getElementById('toast');t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},3000);
}