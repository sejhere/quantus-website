window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if(window.scrollY > window.innerHeight * 0.5) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

(function(){
  const hamburger = document.getElementById('nav-hamburger');
  const menu      = document.getElementById('mobile-menu');
  if(!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
})();

(function(){
  const targets = [
    document.querySelector('.newsletter-headline'),
    document.querySelector('.newsletter-sub'),
    document.querySelector('.newsletter-name-row'),
    document.querySelector('.newsletter-form-row'),
  ].filter(Boolean);
  const obs = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      targets.forEach(el => el.classList.add('nl-in'));
      obs.disconnect();
    }
  }, { threshold: 0.15 });
  const section = document.getElementById('newsletter');
  if(section) obs.observe(section);
})();

(function(){
  const submitBtn   = document.getElementById('nl-submit');
  const firstInput  = document.getElementById('nl-firstname');
  const lastInput   = document.getElementById('nl-lastname');
  const emailInput  = document.getElementById('nl-email');
  const errorMsg    = document.getElementById('nl-error');
  const formWrap    = document.getElementById('newsletter-form-wrap');
  const successWrap = document.getElementById('newsletter-success');
  if(!submitBtn) return;

  function isValidEmail(val){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  submitBtn.addEventListener('click', () => {
    let valid = true;

    [firstInput, lastInput, emailInput].forEach(el => {
      el.classList.remove('error');
    });
    errorMsg.classList.remove('visible');

    if(!firstInput.value.trim()){ firstInput.classList.add('error'); valid = false; }
    if(!lastInput.value.trim()){ lastInput.classList.add('error'); valid = false; }
    if(!emailInput.value.trim() || !isValidEmail(emailInput.value)){
      emailInput.classList.add('error'); valid = false;
    }

    if(!valid){
      errorMsg.classList.add('visible');
      return;
    }

    formWrap.style.transition = 'opacity 0.4s ease';
    formWrap.style.opacity = '0';
    setTimeout(() => {
      formWrap.style.display = 'none';
      successWrap.style.display = 'flex';
      requestAnimationFrame(() => {
        successWrap.classList.add('visible');
      });
    }, 400);
  });
})();

function getWalletLink() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(ua)) {
    return 'https://play.google.com/store/apps/details?id=com.quantus.wallet';
  }
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return 'https://apps.apple.com/us/app/quantus/id6747967405';
  }
  if (/Mac/.test(navigator.platform)) {
    return 'https://apps.apple.com/us/app/quantus/id6747967405';
  }
  return 'https://play.google.com/store/apps/details?id=com.quantus.wallet';
}

window.addEventListener('load', () => {
  const walletLink = getWalletLink();
  document.querySelectorAll('.wallet-cta-link').forEach(el => {
    el.href = walletLink;
  });
});
