/* БЛОК 9: 09-pidval. Усі тексти, фото, посилання й кольори - в об'єкті CONFIG на початку файлу. */
(function(){
var S = window.SITE || {}; S.phone = S.phone || {}; S.photos = S.photos || {}; S.telegram = S.telegram || {};
/* ============================================================
   CONFIG - тексти і посилання підвалу
   ============================================================ */
var CONFIG = {
  logo: { first: 'Dr. ', second: 'Prokopchuk' },   /* ЗМІНИТИ - логотип */
  tagline: 'Сімейна медицина та психіатрія для вас і ваших близьких.',   /* ЗМІНИТИ - короткий опис */
  navTitle: 'Розділи',   /* ЗМІНИТИ - заголовок меню */
  nav: [   /* ЗМІНИТИ - посилання (id - якір секції) */
    { t: 'Про лікаря', id: 'drp-about' },
    { t: 'Психічне здоров’я', id: 'drp-mental' },
    { t: 'Ціни', id: 'drp-prices' },
    { t: 'Тести', id: 'drp-tests' },
    { t: 'Запис', id: 'drp-book' }
  ],
  contTitle: 'Контакти',   /* ЗМІНИТИ - заголовок контактів */
  phone: S.phone,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  address: S.address,   /* ЗМІНИТИ - береться з файлу kontakty.js */
  email: S.email,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  telegram: S.telegram.user ? 'https://t.me/' + S.telegram.user : S.telegram.link,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  viber: S.viber,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  legal: [   /* ЗМІНИТИ - юридичні рядки внизу */
    '© 2026 Приватна медична практика Dr. Prokopchuk. Усі права захищені.',
    'Інформація на сайті має ознайомчий характер і не замінює консультацію лікаря. Тести є скринінгом, а не діагнозом.'
  ]
};
/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, d = window.drp || {}, h, i;
if (!d.i) { return; }
h = '<div class="drp-ft-t"><div><a class="drp-ft-lg" href="#drp-top" data-go="drp-top">' + C.logo.first + '<b>' + C.logo.second + '</b></a><p>' + C.tagline + '</p></div>' +
  '<div><h4>' + C.navTitle + '</h4><ul>';
for (i = 0; i < C.nav.length; i++) { h += '<li><a href="#' + C.nav[i].id + '" data-go="' + C.nav[i].id + '">' + C.nav[i].t + '</a></li>'; }
h += '</ul></div><div><h4>' + C.contTitle + '</h4><ul><li><a href="tel:' + C.phone.tel + '">' + C.phone.show + '</a></li><li><a href="#drp-book" data-go="drp-book">' + C.address + '</a></li><li><a href="mailto:' + C.email + '">' + C.email + '</a></li><li><a href="' + C.telegram + '" target="_blank" rel="noopener">Telegram</a></li><li><a href="' + C.viber + '">Viber</a></li></ul></div></div><div class="drp-ft-b">';
for (i = 0; i < C.legal.length; i++) { h += '<span>' + C.legal[i] + '</span>'; }
document.getElementById('drp-b9').innerHTML = h + '</div>';
})();
