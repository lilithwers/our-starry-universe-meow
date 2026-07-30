// GALAXY BACKGROUND

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;


const lineCanvas = document.getElementById("lines");
const lineCtx = lineCanvas.getContext("2d");

lineCanvas.width = innerWidth;
lineCanvas.height = innerHeight;



const music = document.getElementById("music");
const musicButton = document.getElementById("musicToggle");




// STARS BACKGROUND

let stars = [];


for(let i = 0; i < 500; i++){

stars.push({

x: Math.random() * innerWidth,

y: Math.random() * innerHeight,

size: Math.random() * 2,

opacity: Math.random()

});

}



function galaxy(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



stars.forEach(s=>{


ctx.beginPath();


ctx.arc(
s.x,
s.y,
s.size,
0,
Math.PI*2
);



ctx.fillStyle =
`rgba(255,255,255,${s.opacity})`;

ctx.fill();


});


requestAnimationFrame(galaxy);

}


galaxy();







// SHOOTING STARS


function shootingStar(){


let s = document.createElement("div");


s.className = "shooting";


s.style.left =
Math.random()*innerWidth+"px";


s.style.top =
Math.random()*300+"px";


document.body.appendChild(s);



setTimeout(()=>{

s.remove();

},1000);


}


setInterval(shootingStar,3500);









// MESSAGES


const messages=[


"i love you from the bottom of my heart miro u deserve the world genuinely",

"i fall in love with you every day and every second i am more and more and more in love in loveeee with you and i cant express how much u mean to me ml",

"your smile brightens my worls completely like istg you do smthg to me that i cannot understand",

"you are my favorite person and the one i wanna spend my whole entire life with",

"i would choose you in every timeline and in every universe u are mine and im yours",

"i cant wait for october i smile sm whenever i think abt it and i keep on getting exciteddd",

"im so grateful to have u in my life baby ur the bestttt and ur snoring rn like a baby and u actually might oversleep i woke u up dont actually blame me if u go late again i warned u ",

"i love your eyes smmmmmm theyre my favorite thing to stare at and when i do i get lost in them u magical beingg i love you miro",

"i love everyhting abt u like EVERYTHING AND I CANT WAIT TO LIVE WITH YOU ONE DAY AAAA IM TOO EXCITED FOR IT",

"WORDS CANNOT express how much u mean to meeeee baby u are the loml and my soulmate i would give u the world if i could take my heart its all yours and ill take good care of yours too :3"

];





const positions=[

[20,25],
[35,18],
[55,25],
[75,15],
[85,40],
[65,55],
[45,45],
[25,65],
[55,75],
[80,80]

];





const connections=[

[0,1],
[1,2],
[2,3],
[3,4],
[4,5],
[5,6],
[6,7],
[7,8],
[8,9]

];



let clickedStars = 0;

let alreadyClicked = [];









// CLICK SPARKLES


function createClickSparkles(x,y){


for(let i=0;i<15;i++){


let spark=document.createElement("div");


spark.className="clickSpark";


spark.style.left=x+"px";

spark.style.top=y+"px";



let angle=Math.random()*Math.PI*2;


let distance=30+Math.random()*70;



spark.style.setProperty(
"--x",
Math.cos(angle)*distance+"px"
);



spark.style.setProperty(
"--y",
Math.sin(angle)*distance+"px"
);



document.body.appendChild(spark);



setTimeout(()=>{

spark.remove();

},1000);



}

}









// CREATE STARS (PHONE FIXED)


function createStars(){


let field=document.getElementById("starField");


field.innerHTML="";



positions.forEach((pos,index)=>{


let star=document.createElement("div");


star.className="star";


// NO RANDOM MOVEMENT

star.style.left = pos[0]+"%";

star.style.top = pos[1]+"%";



field.appendChild(star);





function openStar(event){


event.preventDefault();


if(alreadyClicked.includes(index)) return;



alreadyClicked.push(index);


clickedStars++;




createClickSparkles(

event.clientX || innerWidth*pos[0]/100,

event.clientY || innerHeight*pos[1]/100

);



star.classList.add("active");



let card=document.getElementById("messageCard");


document.getElementById("messageText").innerHTML =
messages[index];


card.classList.add("show");



setTimeout(()=>{

card.classList.remove("show");

},3000);





if(clickedStars>=7){


setTimeout(()=>{

showFinalReveal();

},2500);


}


}





star.addEventListener(
"click",
openStar
);



star.addEventListener(
"touchstart",
openStar,
{passive:false}
);



});


}









// CONSTELLATION LINES


function drawLines(){


lineCtx.clearRect(
0,
0,
lineCanvas.width,
lineCanvas.height
);



let stars=document.querySelectorAll(".star");



if(stars.length){


lineCtx.beginPath();



connections.forEach(pair=>{


let a=stars[pair[0]];

let b=stars[pair[1]];



lineCtx.moveTo(

a.offsetLeft + a.offsetWidth/2,

a.offsetTop + a.offsetHeight/2

);



lineCtx.lineTo(

b.offsetLeft + b.offsetWidth/2,

b.offsetTop + b.offsetHeight/2

);



});



lineCtx.strokeStyle =
"rgba(255,180,230,0.55)";


lineCtx.lineWidth=2;


lineCtx.stroke();


}



requestAnimationFrame(drawLines);


}









// PARTICLES


function createParticles(){


let container=document.createElement("div");


container.id="particles";


document.body.appendChild(container);



for(let i=0;i<80;i++){


let p=document.createElement("div");


p.className="particle";



let size=2+Math.random()*5;


p.style.width=size+"px";

p.style.height=size+"px";


p.style.left=Math.random()*100+"%";


p.style.animationDuration =
(5+Math.random()*10)+"s";


p.style.animationDelay =
Math.random()*5+"s";


container.appendChild(p);


}


}









// FINAL REVEAL


function showFinalReveal(){


if(document.getElementById("finalReveal")) return;



let activeStars=document.querySelectorAll(".star.active");



activeStars.forEach((star,index)=>{


setTimeout(()=>{

star.classList.add("fly");

},index*150);


});



setTimeout(()=>{


let reveal=document.createElement("div");


reveal.id="finalReveal";


reveal.innerHTML=

`

<h1>I LOVE YOU ♡</h1>

<p>
you are my favorite person in every universe ✨
</p>

`;



document.body.appendChild(reveal);



},2500);


}









// START BUTTON


document
.getElementById("begin")
.onclick=()=>{


document
.querySelector(".intro")
.style.opacity="0";



if(music){


music.volume=0.5;


music.play()
.then(()=>{

console.log("music started 🎵");

})
.catch(error=>{

console.log("music blocked:",error);

});


}



if(musicButton){

musicButton.style.display="block";

}



createParticles();



setTimeout(()=>{


createStars();


drawLines();


},1000);



};









// MUSIC BUTTON


if(musicButton){


musicButton.onclick=()=>{


if(music.paused){


music.play();


musicButton.innerHTML="⏸";


}

else{


music.pause();


musicButton.innerHTML="🎵";


}


};


}









// RESIZE


window.addEventListener("resize",()=>{


canvas.width=innerWidth;

canvas.height=innerHeight;


lineCanvas.width=innerWidth;

lineCanvas.height=innerHeight;


});
