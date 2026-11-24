(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Menüyü aç' : 'Menüyü kapat');
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); document.body.classList.remove('menu-open');
    }));
    document.addEventListener('keydown', event => {
      if(event.key === 'Escape'){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');document.body.classList.remove('menu-open');}
    });
  }
  const year = document.querySelector('#year');
  if(year) year.textContent = new Date().getFullYear();
  const bar = document.querySelector('.progress-bar');
  let scheduled = false;
  const progress = () => {
    const height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if(bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / height))})`;
    document.querySelector('.site-header')?.classList.toggle('scrolled',window.scrollY > 20);
    scheduled = false;
  };
  window.addEventListener('scroll', () => {if(!scheduled){requestAnimationFrame(progress);scheduled=true;}},{passive:true});
  progress();
  const items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
    },{threshold:.08,rootMargin:'0px 0px 30px 0px'});
    items.forEach(el => observer.observe(el));
  } else items.forEach(el => el.classList.add('visible'));
})();