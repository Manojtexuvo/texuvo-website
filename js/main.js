/* =========================================================
        TEXUVO WEBSITE VERSION 5.0
========================================================= */

/* Sticky Navigation */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

if(window.scrollY > 80){

navbar.classList.add("sticky");

}else{

navbar.classList.remove("sticky");

}

});


/* =======================================
        Mobile Menu
======================================= */

const menuToggle = document.getElementById("menu-toggle");

const navigation = document.querySelector(".navigation");

menuToggle.addEventListener("click",()=>{

navigation.classList.toggle("active");

menuToggle.classList.toggle("active");

});


/* =======================================
        Smooth Scroll
======================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))

.scrollIntoView({

behavior:"smooth"

});

});

});


/* =======================================
        Back To Top
======================================= */

const backToTop=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.pageYOffset>500){

backToTop.classList.add("show");

}else{

backToTop.classList.remove("show");

}

});

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});


/* =======================================
        Reveal Animation
======================================= */

const reveal=document.querySelectorAll(".section");

window.addEventListener("scroll",()=>{

const trigger=window.innerHeight*0.85;

reveal.forEach(section=>{

const top=section.getBoundingClientRect().top;

if(top<trigger){

section.classList.add("active");

}

});

});


/* =======================================
        Counter Animation
======================================= */

const counters=document.querySelectorAll(".stat-box h2");

let started=false;

window.addEventListener("scroll",()=>{

const stats=document.querySelector(".quick-stats");

if(!stats) return;

const top=stats.offsetTop;

if(window.pageYOffset>top-500 && !started){

started=true;

counters.forEach(counter=>{

const update=()=>{

const target=counter.innerText.replace(/\D/g,'');

if(target==="") return;

const value=+counter.innerText.replace(/\D/g,'');

const increment=Math.ceil(target/80);

if(value<target){

counter.innerText=(value+increment);

setTimeout(update,25);

}else{

counter.innerText=target+"+";

}

};

update();

});

}

});


/* =======================================
        Contact Form
======================================= */

const form=document.getElementById("queryForm");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert(

"Thank you for contacting Texuvo. Our team will get back to you shortly."

);

form.reset();

});

}


/* =======================================
        Footer Year
======================================= */

document.getElementById("year").innerHTML=new Date().getFullYear();


/* =======================================
        Console Branding
======================================= */

console.log(

"%cWelcome to TEXUVO",

"color:green;font-size:24px;font-weight:bold"

);

console.log(

"%cReliable Waste Sourcing for Circular Economy Solutions",

"font-size:14px"

);
