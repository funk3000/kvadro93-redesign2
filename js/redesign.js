(function(){
  var P='/kvadro93-redesign2';
  // телефон-пилюля в шапке
  var w=document.querySelector('.site-header__wrapper'), burger=document.querySelector('.site-header__burger');
  if(w && !document.querySelector('.rd-phone') && !document.querySelector('.site-header__contacts a')){
    var a=document.createElement('a'); a.className='rd-phone'; a.href='tel:+79892930093'; a.textContent='+7 989 293-00-93';
    if(burger) w.insertBefore(a,burger); else w.appendChild(a);
  }
  // нижнее меню (мобильная версия)
  var ic={
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    tours:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    book:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
  };
  var bar=document.createElement('nav'); bar.className='rd-tabbar';
  var path=location.pathname.replace(P,'')||'/';
  var items=[['home',P+'/','Главная',path==='/'],['tours',P+'/routes/','Экскурсии',path.indexOf('/routes')===0],
    ['book','#booking','Бронь',false],['call','tel:+79892930093','Позвонить',false],['menu','#','Меню',false]];
  items.forEach(function(it){
    var a=document.createElement('a'); a.href=it[1];
    if(it[0]==='book'){a.className='rd-tab--book'; a.innerHTML='<span class="rd-ic">'+ic.book+'</span><b>'+it[2]+'</b>';}
    else {a.innerHTML=ic[it[0]]+'<span>'+it[2]+'</span>'; if(it[3]) a.className='is-active';}
    if(it[0]==='book') a.addEventListener('click',function(e){
      var b=document.querySelector('.booking, #booking, form[class*="booking"]');
      if(b){e.preventDefault(); b.scrollIntoView({behavior:'smooth'});} else {a.href=P+'/routes/';}
    });
    if(it[0]==='menu') a.addEventListener('click',function(e){e.preventDefault(); var bb=document.querySelector('.site-header__burger, .site-header__burger button'); if(bb) bb.click();});
    bar.appendChild(a);
  });
  document.body.appendChild(bar);
})();
// слайдер: пересчёт ширины после загрузки/ресайза, чтобы не застревал между слайдами
(function(){
  function fix(){var el=document.querySelector('.main-slider');var s=el&&el.swiper;if(s){s.update();s.slideToLoop(s.realIndex,0,false);}}
  window.addEventListener('load',function(){setTimeout(fix,300)});
  var t;window.addEventListener('resize',function(){clearTimeout(t);t=setTimeout(fix,200)});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)fix()});
})();
// r8: шапка прозрачная на баннере, тёмно-зелёная после прокрутки
(function(){
  var b=document.body, h=document.querySelector('.site-header');
  var hero=document.querySelector('.main-slider, .splash');
  if(!h||!hero) return;
  var top=hero.getBoundingClientRect().top+window.scrollY;
  if(top>140) return; // баннер не в самом верху — оставляем сплошную шапку
  b.classList.add('rd-overlay');
  function upd(){ b.classList.toggle('rd-scrolled', window.scrollY>40); }
  upd(); window.addEventListener('scroll',upd,{passive:true});
  var bg=document.querySelector('#burger, .site-header__burger');
  if(bg) bg.addEventListener('click',function(){ setTimeout(function(){ b.classList.toggle('rd-menu-open', !!document.querySelector('.site-header--open, .menu--open, .site-header__menu--open, body.menu-open, html.menu-open')); },50); });
})();
// r10: подпись над баннером главной (как на видео)
(function(){
  var s=document.querySelector('.main-slider'), h=document.querySelector('.h1-nvisible');
  if(!s||!h||s.querySelector('.rd-caption')) return;
  var c=document.createElement('div'); c.className='rd-caption'; c.textContent=h.textContent.trim(); s.appendChild(c);
})();
// r11: мобильная шапка прячется при прокрутке вниз и появляется при прокрутке вверх
(function(){
  var last=window.scrollY, b=document.body;
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(window.innerWidth>900||document.querySelector('.site-aside.active,.site-aside.is-open')){last=y;return;}
    if(y>120&&y>last+6) b.classList.add('rd-hide-hdr'); else if(y<last-6||y<120) b.classList.remove('rd-hide-hdr');
    last=y;
  },{passive:true});
})();
// r15: на превью (github.io) капча Google не работает из-за домена ключа — скрываем, на kvadro93.ru она остаётся
if(/github\.io$/.test(location.hostname)){var st=document.createElement('style');st.textContent='.g-recaptcha{display:none!important}';document.head.appendChild(st);}
// r18: «Читать далее / Свернуть» для длинных текстов на всех страницах
(function(){
function zip(host,skipFirst){
  if(!host||host.querySelector('.zip-text,.rd-zip'))return;
  var kids=[].slice.call(host.children).filter(function(el){
    return !(el.id==='booking'||el.querySelector&&el.querySelector('#booking,form,iframe')||/^(H1|OL|SCRIPT|STYLE)$/.test(el.tagName)&&skipFirst&&!el.dataset.rdKeep||el.classList.contains('breadcrumb')||el.matches&&el.matches('.card,.page__grid,.pages-slider__grid,.swiper,.rd-chips,.rd-how')||el.querySelector&&el.querySelector('.card,.page__grid,.pages-slider__grid,.swiper'));
  });
  // первый заголовок текста оставляем видимым
  if(!kids.length)return;
  var w=document.createElement('div');w.className='rd-zip';
  kids[0].parentNode.insertBefore(w,kids[0]);
  kids.forEach(function(k){w.appendChild(k)});
  if(w.scrollHeight<620){while(w.firstChild)host.insertBefore(w.firstChild,w);w.remove();return;}
  w.classList.add('rd-zip--closed');
  var b=document.createElement('button');b.type='button';b.className='rd-zip__btn';b.textContent='Читать далее';
  w.parentNode.insertBefore(b,w.nextSibling);
  b.addEventListener('click',function(){var c=w.classList.toggle('rd-zip--closed');b.textContent=c?'Читать далее':'Свернуть';if(c)w.scrollIntoView({behavior:'smooth',block:'start'});});
}
function run(){
  document.querySelectorAll('.page__main').forEach(function(h){zip(h,false)});
  document.querySelectorAll('.page.page--default').forEach(function(h){if(!h.querySelector('.page__main'))zip(h,true)});
}
if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
})();
