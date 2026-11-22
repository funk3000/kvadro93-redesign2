(function(){
  var P='/kvadro93-redesign2';
  var isHome=(location.pathname.replace(P,'')||'/')==='/';
  // фильтры экскурсий на главной
  var grid=document.querySelector('.pages-slider__grid');
  if(grid && !document.querySelector('.rd-chips')){
    var F=[['Все',null],['Квадро',/квадро/i],['Эндуро и мото',/эндуро|байк|мото/i],['Лошади',/кон/i],['Джиппинг',/джип|вездеход|гигант/i],['Детям',/дет/i],['Подарки и кафе',/сертификат|кафе|магазин|лояльност/i]];
    var bar=document.createElement('div'); bar.className='rd-chips';
    var cards=[].slice.call(grid.querySelectorAll('.card'));
    F.forEach(function(f,i){
      var b=document.createElement('button'); b.type='button'; b.className='rd-chip'+(i?'':' is-on'); b.textContent=f[0];
      b.onclick=function(){
        [].forEach.call(bar.children,function(x){x.classList.remove('is-on')}); b.classList.add('is-on');
        cards.forEach(function(c){var img=c.querySelector('img'),t=(img&&img.alt||'')+' '+c.textContent;
          c.classList.toggle('rd-hide',!!f[1]&&!f[1].test(t));});
        grid.classList.toggle('rd-filtered',!!f[1]);
      };
      bar.appendChild(b);
    });
    grid.parentNode.insertBefore(bar,grid);
  }
  // «Как проходит заезд» — на главной перед бронированием
  if(isHome && !document.querySelector('.rd-how')){
    var s=function(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'};
    var steps=[
      [s('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'),'Инструктаж','Инструктор покажет управление и проверит, что вам комфортно.'],
      [s('<path d="M5 13a7 7 0 0 1 14 0v3H5z"/><path d="M3 16h18M9 6V4h6v2"/>'),'Экипировка','Выдаём полный комплект экипировки и защиты.'],
      [s('<path d="M3 20l6-12 4 7 3-4 5 9z"/><circle cx="17" cy="5" r="2"/>'),'Маршрут','Горы, реки и виды на море. Темп подбираем под группу.'],
      [s('<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/>'),'Фото на память','Остановки у видовых точек, чтобы сделать красивые фото.']];
    var sec=document.createElement('section'); sec.className='rd-how';
    sec.innerHTML='<div class="rd-how__in"><h2>Как проходит заезд</h2><div class="rd-how__steps">'+
      steps.map(function(x){return '<div class="rd-how__step">'+x[0]+'<b>'+x[1]+'</b><p>'+x[2]+'</p></div>'}).join('')+'</div></div>';
    var bk=document.querySelector('.booking')||document.getElementById('booking');
    var sl=document.querySelector('.pages-slider');
    if(sl&&sl.parentNode) sl.parentNode.insertBefore(sec,sl.nextSibling); else if(bk&&bk.parentNode) bk.parentNode.insertBefore(sec,bk);
  }
})();
