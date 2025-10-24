// small interactions + animations for the portfolio

// set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// smooth scroll for See Work
document.getElementById('see-work').addEventListener('click', ()=> {
  document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
});

// typewriter micro-copy
(function(){
  const el = document.querySelector('.typewrite');
  if(!el) return;
  const words = JSON.parse(el.getAttribute('data-words'));
  let idx = 0, i = 0, forward = true;
  function tick(){
    const word = words[idx];
    if(forward){ i++; if(i>word.length){ forward=false; setTimeout(tick,700); return; } }
    else { i--; if(i<0){ forward=true; idx=(idx+1)%words.length; setTimeout(tick,300); return; } }
    el.textContent = word.slice(0,i);
    setTimeout(tick, 60 + Math.random()*50);
  }
  tick();
})();

// GSAP entrances (if loaded)
if(window.gsap){
  gsap.from('.brand', {y:-12, opacity:0, duration:.6, ease:'power2.out'});
  gsap.from('.headline', {y:18, opacity:0, duration:.7, delay:.12, ease:'power3.out'});
  gsap.from('.profile-card', {scale:.98, opacity:0, duration:.8, delay:.18, ease:'elastic.out(1,0.6)'});
  gsap.from('.projects-grid .card', {y:24, opacity:0, stagger:.08, duration:.7, delay:.2, ease:'power3.out'});
  gsap.to('.blob', {y:'+=10', x:'+=8', repeat:-1, yoyo:true, duration:6, ease:'sine.inOut'});
}

// VanillaTilt for project cards
if(window.VanillaTilt){
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 12, speed: 600, glare: true, "max-glare": 0.12
  });
}

// mouse parallax for profile card (subtle)
const pcard = document.getElementById('profileCard');
if(pcard && window.gsap){
  document.addEventListener('mousemove', (e)=>{
    const {innerWidth, innerHeight} = window;
    const x = (e.clientX - innerWidth/2) / innerWidth;
    const y = (e.clientY - innerHeight/2) / innerHeight;
    gsap.to(pcard, {x: x*18, y: y*12, rotateY: x*6, rotateX: -y*6, duration:0.6, ease:'power3.out'});
  });
}

// contact form basic mailto behavior (no backend)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const fd = new FormData(this);
    const name = fd.get('name'), email = fd.get('email'), message = fd.get('message');
    const subject = encodeURIComponent('Project inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = `mailto:dixitshristi7@gmail.com?subject=${subject}&body=${body}`;
  });
}

// case-study quick loader: if link has ?project=... open case-study page data
(function(){
  // nothing here on index; case-study.html reads the query
})();
