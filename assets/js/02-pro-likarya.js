/* БЛОК 2: 02-pro-likarya. Усі тексти, фото, посилання й кольори - в об'єкті CONFIG на початку файлу. */
(function(){
var S = window.SITE || {}; S.phone = S.phone || {}; S.photos = S.photos || {}; S.telegram = S.telegram || {};
/* ============================================================
   CONFIG - тексти, фото, посилання
   ============================================================ */
var CONFIG = {
  title: 'Ви не «пацієнт №15», а людина з історією',   /* ЗМІНИТИ - заголовок */
  text: 'Я приділяю стільки часу, скільки потрібно, щоб знайти причину, а не лише зняти симптом.',   /* ЗМІНИТИ - текст під заголовком */
  items: [   /* ЗМІНИТИ - список напрямів (icon: heart, users, baby, brain, shield, video, home, pulse, clip) */
    { icon: 'heart', t: 'Сімейна медицина' },
    { icon: 'users', t: 'Діти й дорослі' },
    { icon: 'baby', t: 'Грудне вигодовування' },
    { icon: 'brain', t: 'Лікар-психіатр' },
    { icon: 'shield', t: 'Програма ВООЗ mhGAP' },
    { icon: 'video', t: 'Онлайн і виїзд' }
  ],
  photo: S.photos.about || 'foto-3',   /* ЗМІНИТИ - нічого не міняйте: завантажте у папку foto файл foto-3.jpg */
  photoAlt: S.photoAlt,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  card: {   /* ЗМІНИТИ - чорна картка на фото */
    name: 'Прокопчук Валерія Петрівна',
    role: 'Сімейний лікар · психіатр',
    tags: ['Сімейна медицина', 'Психіатрія', 'Грудне вигодовування', 'Психічне здоров’я']
  }
};
/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, d = window.drp || {}, h = '', i;
if (!d.i) { return; }
h += '<div class="drp-rv"><h2 class="drp-h2">' + C.title + '</h2><p class="drp-lead">' + C.text + '</p><ul class="drp-ab-l">';
for (i = 0; i < C.items.length; i++) { h += '<li><span class="ic">' + d.i(C.items[i].icon, 22) + '</span>' + C.items[i].t + '</li>'; }
h += '</ul></div><figure class="drp-ab-c drp-rv" style="--d:2"><div class="drp-ab-ph">' + d.photo(C.photo, C.photoAlt, 'DP') + '</div><figcaption class="drp-ab-cap drp-gd"><h3>' + C.card.name + '</h3><p>' + C.card.role + '</p><ul>';
for (i = 0; i < C.card.tags.length; i++) { h += '<li>' + C.card.tags[i] + '</li>'; }
h += '</ul></figcaption></figure>';
document.getElementById('drp-b2').innerHTML = h;
d.reveal();
})();
