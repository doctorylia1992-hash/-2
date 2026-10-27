/* БЛОК 3: 03-dosvid. Усі тексти, фото, посилання й кольори - в об'єкті CONFIG на початку файлу. */
(function(){
var S = window.SITE || {}; S.phone = S.phone || {}; S.photos = S.photos || {}; S.telegram = S.telegram || {};
/* ============================================================
   CONFIG - тексти, фото, посилання
   ============================================================ */
var CONFIG = {
  title: 'Досвід, на який можна покластися',   /* ЗМІНИТИ - заголовок секції */
  profile: {   /* ЗМІНИТИ - чорна картка профілю */
    small: 'Лікар загальної практики, лікар-психіатр',
    name: 'Прокопчук Валерія Петрівна',
    text: 'Досвід у медицині з 2012 року. Пояснюю простими словами й завжди залишаю чіткий план на подальші кроки.',
    btn: 'Записатись на прийом',
    btnTarget: 'drp-book',
    photo: S.photos.experience || 'foto-4',   /* ЗМІНИТИ - нічого не міняйте: завантажте у папку foto файл foto-4.jpg */
    photoAlt: S.photoAlt   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  },
  bar: { label: 'Літо 2026', text: 'Отримання сертифіката лікаря-психіатра' },   /* ЗМІНИТИ - жовта смуга з новиною; щоб прибрати, залиште label порожнім: '' */
  timeline: [   /* ЗМІНИТИ - етапи (рік зліва, опис справа) - перевірте дані з вашого резюме */
    { y: '2026', t: 'Приватний лікар Dr. Prokopchuk' },
    { y: '2025–2026', t: 'НМУ ім. О.О. Богомольця, спеціалізація «Психіатрія»' },
    { y: '2024–2026', t: 'КНП «ЦПМСД №2» Подільського району міста Києва' },
    { y: '2022–2024', t: 'НМУ ім. О.О. Богомольця, спеціалізація «Загальна практика - сімейна медицина»' },
    { y: '2017–2022', t: 'НМУ ім. О.О. Богомольця, лікувальна справа' },
    { y: '2012–2016', t: 'КНП «ЦПМСД» Деснянського району, медична сестра' }
  ]
};
/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, d = window.drp || {}, p = C.profile, h, i;
if (!d.i) { return; }
h = '<h2 class="drp-h2 drp-rv" style="max-width:16ch;margin-bottom:clamp(32px,4vw,56px)">' + C.title + '</h2>' +
  '<div class="drp-ex-pf drp-gd drp-rv"><div class="drp-ex-tx"><small>' + p.small + '</small><h3>' + p.name + '</h3><p>' + p.text + '</p>' +
  '<a class="drp-btn drp-y" href="#' + p.btnTarget + '" data-go="' + p.btnTarget + '">' + p.btn + d.i('arrow', 20) + '</a></div>' +
  '<div class="drp-ex-ph">' + d.photo(p.photo, p.photoAlt, 'DP') + '</div></div>';
if (C.bar.label) { h += '<div class="drp-ex-bar drp-rv"><i></i><b>' + C.bar.label + '</b><span>' + C.bar.text + '</span></div>'; }
h += '<ol class="drp-tl">';
for (i = 0; i < C.timeline.length; i++) { h += '<li class="drp-rv"><b>' + C.timeline[i].y + '</b><span>' + C.timeline[i].t + '</span></li>'; }
h += '</ol>';
document.getElementById('drp-b3').innerHTML = h;
d.reveal();
})();
