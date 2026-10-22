const roomButtons = [...document.querySelectorAll('.room-nav button')];
const roomTitle = document.querySelector('#roomTitle');
const roomText = document.querySelector('#roomText');
const roomIndex = document.querySelector('#roomIndex');
const roomImage = document.querySelector('#roomImage');

roomButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    roomButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    roomTitle.textContent = button.dataset.room;
    roomText.textContent = button.dataset.text;
    roomIndex.textContent = `${String(index + 1).padStart(2, '0')} / 05`;
    roomImage.style.backgroundPosition = `${button.dataset.pos} center`;
    roomImage.animate([
      { opacity: .62, transform: 'scale(1.07)' },
      { opacity: 1, transform: 'scale(1.03)' }
    ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.statement-copy,.wood-sample,.craft-panel,.rooms-head,.room-title,.proof-top,.review-feature,.reviews,.process-title,.process-list,.local>div,.map');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.animate([
      { opacity: 0, transform: 'translateY(34px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' });
    observer.unobserve(entry.target);
  });
}, { threshold: .12 });
revealTargets.forEach(el => observer.observe(el));

const cursor = document.querySelector('.cursor');
if (matchMedia('(pointer:fine)').matches) {
  addEventListener('mousemove', event => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '42px'; cursor.style.height = '42px'; cursor.style.background = '#fff3'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '18px'; cursor.style.height = '18px'; cursor.style.background = 'transparent'; });
  });

  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  hero.addEventListener('mousemove', event => {
    const x = (event.clientX / innerWidth - .5) * 10;
    const y = (event.clientY / innerHeight - .5) * 7;
    heroImage.style.transform = `scale(1.05) translate(${x}px,${y}px)`;
  });
  hero.addEventListener('mouseleave', () => heroImage.style.transform = 'scale(1.03)');
}