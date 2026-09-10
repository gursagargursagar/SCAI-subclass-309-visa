(function(){
  'use strict';
  let scrolled=false;
  window.setTimeout(function(){
    if(scrolled) return;
    const card=document.querySelector('.report-cta');
    if(!card) return;
    scrolled=true;
    card.scrollIntoView({behavior:'smooth',block:'center'});
  },40000);
})();
