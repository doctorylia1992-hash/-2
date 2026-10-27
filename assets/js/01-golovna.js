/* БЛОК 1: 01-golovna. Усі тексти, фото, посилання й кольори - в об'єкті CONFIG на початку файлу. */
(function(){
var S = window.SITE || {}; S.phone = S.phone || {}; S.photos = S.photos || {}; S.telegram = S.telegram || {};
/* ============================================================
   CONFIG - усе, що можна міняти: тексти, фото, посилання, кольори
   ============================================================ */
var CONFIG = {
  colors: {
    black: '#050505',      /* ЗМІНИТИ - основний чорний */
    graphite: '#141414',   /* ЗМІНИТИ - графіт (картки на чорному) */
    yellow: '#FFC700',     /* ЗМІНИТИ - фірмовий жовтий */
    white: '#FFFFFF',      /* ЗМІНИТИ - білий */
    paper: '#F2F2F0',      /* ЗМІНИТИ - світло-сірий фон секцій */
    ink: '#0E0E0E',        /* ЗМІНИТИ - колір тексту на світлому */
    muted: '#5E5E5E'       /* ЗМІНИТИ - приглушений текст */
  },
  logo: { first: 'Dr. ', second: 'Prokopchuk' },   /* ЗМІНИТИ - логотип у шапці */
  phone: S.phone,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  nav: [   /* ЗМІНИТИ - пункти меню (id - це якір секції) */
    { t: 'Про лікаря', id: 'drp-about' },
    { t: 'Психічне здоров’я', id: 'drp-mental' },
    { t: 'Ціни', id: 'drp-prices' },
    { t: 'Тести', id: 'drp-tests' },
    { t: 'Контакти', id: 'drp-book' }
  ],
  headerBtn: 'Записатись',   /* ЗМІНИТИ - текст кнопки в шапці */
  hero: {
    place: 'Приватний лікар · Вінниця',   /* ЗМІНИТИ - рядок над заголовком */
    title1: 'Dr.',   /* ЗМІНИТИ - перший рядок заголовка */
    title2: 'Prokopchuk',   /* ЗМІНИТИ - другий рядок (жовтий) */
    text: 'Вислухаю, поясню й складу чіткий план. Сімейна медицина та психіатрія для вас і ваших близьких, без черг і поспіху.',   /* ЗМІНИТИ - підзаголовок */
    btn1: { t: 'Записатись на прийом', id: 'drp-book' },   /* ЗМІНИТИ - перша кнопка */
    btn2: { t: 'З чого мені почати?', id: 'drp-quiz' },   /* ЗМІНИТИ - друга кнопка */
    photo: S.photos.hero || 'foto-1',   /* ЗМІНИТИ - нічого не міняйте: просто завантажте у папку foto файл foto-1.jpg (велике фото лікаря) */
    photoAlt: S.photoAlt,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
    photo2: S.photos.small || 'foto-2',   /* ЗМІНИТИ - нічого не міняйте: завантажте у папку foto файл foto-2.jpg (маленьке фото прийому) */
    photo2Text: 'Прийом у кабінеті',   /* ЗМІНИТИ - підпис до маленького фото */
    stamp: 'Сімейний лікар · Психіатр · mhGAP ВООЗ · ',   /* ЗМІНИТИ - текст на обертовій печатці (~45 символів) */
    card1: { t: 'Прийом за записом', s: 'Без черг і поспіху' },   /* ЗМІНИТИ - перша плаваюча картка */
    card2: { t: 'Програма mhGAP', s: 'Психічне здоров’я' }   /* ЗМІНИТИ - друга плаваюча картка */
  },
  stats: [   /* ЗМІНИТИ - цифри (n - число, u - що писати після нього) */
    { n: 14, u: '+', t: 'років у медицині' },
    { n: 40, u: ' хв', t: 'на кожен прийом' },
    { n: 1, u: '', t: 'лікар для всієї родини' }
  ],
  cinema: {   /* ЗМІНИТИ - кінематографічні ефекти першого екрана: true - увімкнено, false - вимкнено */
    flare: true,   /* ЗМІНИТИ - анаморфний відблиск (горизонтальний промінь світла) */
    vignette: true   /* ЗМІНИТИ - затемнення по краях кадру */
  },
  magnet: {   /* ЗМІНИТИ - магнітні кнопки (кнопки тягнуться до курсора; на телефоні вимикаються самі) */
    on: true,   /* ЗМІНИТИ - true - увімкнено, false - вимкнено */
    radius: 90,   /* ЗМІНИТИ - з якої відстані (px) кнопка помічає курсор */
    pull: 0.3,   /* ЗМІНИТИ - сила притягання кнопки (0.1 слабко, 0.5 сильно) */
    max: 16,   /* ЗМІНИТИ - максимальний зсув кнопки (px) */
    text: 0.55   /* ЗМІНИТИ - наскільки додатково зміщується текст усередині кнопки (0 - не зміщується) */
  },
  marquee: ['Онлайн і виїзд додому', 'Грудне вигодовування', 'Психічне здоров’я', 'Сімейна медицина', 'Діти й дорослі']   /* ЗМІНИТИ - біжучий рядок */
};

/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, H = document.documentElement, d = window.drp = window.drp || {};
for (var k in C.colors) { H.style.setProperty('--drp-' + k, C.colors[k]); }
var P = {
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  check:'<path d="M5 12l5 5 9-10"/>',
  heart:'<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
  home:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  baby:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c1.5 1.5 4.5 1.5 6 0"/>',
  brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4a3 3 0 0 0-3 0zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  clip:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6"/>',
  users:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6M15 14.5c3 0 6 1.5 6 5"/>',
  pin:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
  send:'<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  pulse:'<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  syringe:'<path d="M18 3l3 3M16 5l3 3M14 7l3 3-9 9-4 1 1-4zM7 14l3 3"/>',
  alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  route:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>'
};
d.i = function (n, s) { s = s || 24; return '<svg class="drp-ic" viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || P.star) + '</svg>'; };
d.photo = function (src, alt, mark) {
  if (src && /[\/.]/.test(src)) { return '<img src="' + src + '" alt="' + (alt || '') + '" loading="lazy">'; }
  return '<div class="drp-ph"' + (src ? ' data-photo="' + src + '" data-alt="' + (alt || '') + '"' : '') + '><b>' + (mark || 'Dr.') + '</b><span>' + (src ? 'Додайте файл foto/' + src + '.jpg' : 'Додайте фото') + '</span></div>';
};
d.loadPhotos = function () {
  var els = document.querySelectorAll('[data-photo]'), ex = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP'], k;
  function load(el) {
    var key = el.getAttribute('data-photo'), n = 0;
    (function next() {
      if (n >= ex.length) { return; }
      var im = new Image(), url = 'foto/' + key + '.' + ex[n++];
      im.onload = function () { var img = document.createElement('img'); img.src = url; img.alt = el.getAttribute('data-alt') || ''; if (el.parentNode) { el.parentNode.replaceChild(img, el); } };
      im.onerror = next; im.src = url;
    })();
  }
  for (k = 0; k < els.length; k++) { load(els[k]); }
};
window.addEventListener('load', d.loadPhotos);
d.go = function (id) { var el = document.getElementById(id); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + (window.pageYOffset || H.scrollTop) - 64, behavior: 'smooth' }); } };
d.pick = function (s) { d.service = s; document.dispatchEvent(new CustomEvent('drp:service', { detail: s })); d.go('drp-book'); };
d.reveal = function () {
  var els = document.querySelectorAll('.drp-rv:not(.in)');
  if (!('IntersectionObserver' in window)) { for (var i = 0; i < els.length; i++) els[i].classList.add('in'); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
  for (var j = 0; j < els.length; j++) io.observe(els[j]);
};

var nav = '', mn = '', i;
for (i = 0; i < C.nav.length; i++) { nav += '<a href="#' + C.nav[i].id + '" data-go="' + C.nav[i].id + '">' + C.nav[i].t + '</a>'; }
var h = '<header class="drp-hd" id="drp-hd"><div class="drp-hd-in">' +
  '<a class="drp-logo" href="#drp-top" data-go="drp-top">' + C.logo.first + '<b>' + C.logo.second + '</b></a>' +
  '<nav class="drp-nav">' + nav + '</nav>' +
  '<a class="drp-hd-ph" href="tel:' + C.phone.tel + '">' + d.i('phone', 20) + C.phone.show + '</a>' +
  '<a class="drp-btn drp-y" href="#drp-book" data-go="drp-book">' + C.headerBtn + '</a>' +
  '<button class="drp-bg" type="button" aria-label="Меню"><i></i><i></i><i></i></button></div>' +
  '<div class="drp-mn">' + nav + '</div></header>';

var hr = C.hero, c1 = hr.card1, c2 = hr.card2;
var cn = C.cinema, cls = (cn.flare ? '' : ' nf') + (cn.vignette ? '' : ' nv');
var fx = '<div class="drp-fl"><i></i><b></b></div><div class="drp-vg"></div><div class="drp-fd"></div>';
h += '<section class="drp-sec drp-black drp-grain drp-hero' + cls + '" id="drp-top"><div class="drp-scr"><i class="drp-ob" style="width:520px;height:520px;right:6%;top:16%"></i>' + fx + '<div class="drp-wrap"><div class="drp-hg"><div>' +
  '<div class="drp-place drp-in" style="--d:0"><i></i>' + hr.place + '</div>' +
  '<h1 class="drp-in" style="--d:1">' + hr.title1 + '<span>' + hr.title2 + '</span></h1>' +
  '<p class="drp-lead drp-in" style="--d:2">' + hr.text + '</p>' +
  '<div class="drp-btns drp-in" style="--d:3"><a class="drp-btn drp-y" href="#' + hr.btn1.id + '" data-go="' + hr.btn1.id + '">' + hr.btn1.t + d.i('arrow', 20) + '</a>' +
  '<a class="drp-btn drp-o" href="#' + hr.btn2.id + '" data-go="' + hr.btn2.id + '">' + hr.btn2.t + '</a></div></div>' +
  '<div class="drp-art drp-in" style="--d:2"><div class="drp-ring"></div><div class="drp-win">' + d.photo(hr.photo, hr.photoAlt, 'DP') + '</div>' +
  '<svg class="drp-stamp" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="46" fill="' + C.colors.yellow + '"/><path d="M100 78v44M78 100h44" stroke="' + C.colors.black + '" stroke-width="9" stroke-linecap="round"/><defs><path id="drpc" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs><text><textPath href="#drpc" textLength="496" lengthAdjust="spacing">' + hr.stamp + '</textPath></text></svg>' +
  '<div class="drp-fc drp-fc1"><div class="ci">' + d.i('cal', 22) + '</div><div><b>' + c1.t + '</b><span>' + c1.s + '</span></div></div>' +
  '<div class="drp-fc drp-fc2"><div class="ci">' + d.i('brain', 22) + '</div><div><b>' + c2.t + '</b><span>' + c2.s + '</span></div></div>' +
  '<div class="drp-fc drp-fc3"><div class="pi">' + d.photo(hr.photo2, '', 'DP') + '</div><div><b>' + hr.photo2Text + '</b></div></div></div></div></div></div>';
h += '<div class="drp-wrap"><div class="drp-stats">';
for (i = 0; i < C.stats.length; i++) { h += '<div class="drp-st drp-in" style="--d:' + (4 + i) + '"><b><em style="font-style:normal" data-n="' + C.stats[i].n + '">0</em><u>' + C.stats[i].u + '</u></b><span>' + C.stats[i].t + '</span></div>'; }
h += '</div></div></section>';
var mq = ''; for (i = 0; i < C.marquee.length; i++) { mq += '<span>' + C.marquee[i] + '</span>'; }
h += '<div class="drp-mq" aria-hidden="true"><div class="drp-mq-t">' + mq + mq + mq + mq + '</div></div>';
document.getElementById('drp-b1').innerHTML = h;

var hd = document.getElementById('drp-hd'), hero = document.getElementById('drp-top');
function onScroll() { hd.classList.toggle('sc', (window.pageYOffset || H.scrollTop) > 30); }
onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
hd.querySelector('.drp-bg').addEventListener('click', function () { hd.classList.toggle('op'); });
document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('[data-go]') : null;
  if (a) { e.preventDefault(); hd.classList.remove('op'); d.go(a.getAttribute('data-go')); }
  var p = e.target.closest ? e.target.closest('[data-pick]') : null;
  if (p) { e.preventDefault(); d.pick(p.getAttribute('data-pick')); }
}, true);
hero.addEventListener('mousemove', function (e) { var r = hero.getBoundingClientRect(); hero.style.setProperty('--px', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3)); hero.style.setProperty('--py', ((e.clientY - r.top) / Math.max(r.height, 1) * 2 - 1).toFixed(3)); hero.style.setProperty('--mx', (e.clientX - r.left) + 'px'); hero.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
var nums = document.querySelectorAll('#drp-b1 [data-n]');
function count(el) { var n = +el.getAttribute('data-n'), s = performance.now(); (function f(t) { var p = Math.min((t - s) / 1400, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(s); }
if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { count(e.target); io.unobserve(e.target); } }); }, { threshold: .6 }); for (i = 0; i < nums.length; i++) io.observe(nums[i]); }
else { for (i = 0; i < nums.length; i++) nums[i].textContent = nums[i].getAttribute('data-n'); }
var M = C.magnet;
if (M.on && window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  var mx = 0, my = 0, mt = false;
  var cl = function (v) { return Math.max(-M.max, Math.min(M.max, v)); };
  var wrapBtn = function (b) { var w = b.querySelector(':scope > .drp-bi'); if (w) return w; w = document.createElement('span'); w.className = 'drp-bi'; while (b.firstChild) { w.appendChild(b.firstChild); } b.appendChild(w); return w; };
  var relBtn = function (b) { var w = b.querySelector(':scope > .drp-bi'); b.classList.remove('mg'); b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); if (w) { w.style.setProperty('--tx', '0px'); w.style.setProperty('--ty', '0px'); } };
  var magFrame = function () {
    mt = false;
    var bs = document.querySelectorAll('.drp-btn'), k, b, r, dx, dy, ex, ey, bx, by, w;
    for (k = 0; k < bs.length; k++) {
      b = bs[k]; if (b.disabled) continue;
      r = b.getBoundingClientRect();
      if (r.bottom < -150 || r.top > window.innerHeight + 150) { if (b.classList.contains('mg')) relBtn(b); continue; }
      dx = mx - (r.left + r.width / 2); dy = my - (r.top + r.height / 2);
      ex = Math.max(Math.abs(dx) - r.width / 2, 0); ey = Math.max(Math.abs(dy) - r.height / 2, 0);
      if (Math.sqrt(ex * ex + ey * ey) < M.radius) {
        w = wrapBtn(b); b.classList.add('mg'); bx = cl(dx * M.pull); by = cl(dy * M.pull);
        b.style.setProperty('--bx', bx.toFixed(1) + 'px'); b.style.setProperty('--by', by.toFixed(1) + 'px');
        w.style.setProperty('--tx', (bx * M.text).toFixed(1) + 'px'); w.style.setProperty('--ty', (by * M.text).toFixed(1) + 'px');
      } else if (b.classList.contains('mg')) { relBtn(b); }
    }
  };
  document.addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; if (!mt) { mt = true; requestAnimationFrame(magFrame); } }, { passive: true });
  document.addEventListener('mouseleave', function () { mx = -9999; my = -9999; magFrame(); });
}
d.reveal(); window.addEventListener('load', d.reveal);
})();
