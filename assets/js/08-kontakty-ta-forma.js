/* БЛОК 8: 08-kontakty-ta-forma. Усі тексти, фото, посилання й кольори - в об'єкті CONFIG на початку файлу. */
(function(){
var S = window.SITE || {}; S.phone = S.phone || {}; S.photos = S.photos || {}; S.telegram = S.telegram || {};
/* ============================================================
   CONFIG - контакти, послуги, графік, посилання
   ============================================================ */
var CONFIG = {
  phone: S.phone,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  email: S.email,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  telegram: S.telegram,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  viber: S.viber,   /* ЗМІНИТИ - береться з файлу assets/js/00-nalashtuvannia.js */
  qr: { dark: '050505', light: 'FFFFFF', tgLabel: 'Telegram', vbLabel: 'Viber' },   /* ЗМІНИТИ - кольори QR (hex без #) і підписи */
  card: { title: 'Запишіться за хвилину', text: 'Наведіть камеру на QR-код і напишіть у зручний месенджер.', note: 'Пишіть у будь-який час, відповім, щойно закінчу прийом.', address: S.address },   /* ЗМІНИТИ - чорна картка з QR */
  title: 'Зробіть перший крок: запишіться сьогодні',   /* ЗМІНИТИ - заголовок секції */
  text: 'Оберіть дату й час, залиште контакт, і ми підтвердимо запис у месенджері.',   /* ЗМІНИТИ - текст */
  hours: { title: 'Години роботи', rows: [['Понеділок – П’ятниця', '08:00 – 19:00'], ['Субота', 'за попереднім записом'], ['Неділя', 'вихідний']] },   /* ЗМІНИТИ - графік */
  closedWeekdays: [0],   /* ЗМІНИТИ - дні, коли запис недоступний (0 - неділя, 6 - субота) */
  daysAhead: 10,   /* ЗМІНИТИ - на скільки днів уперед показувати дати */
  times: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'],   /* ЗМІНИТИ - вільні години */
  services: [   /* ЗМІНИТИ - послуги у списку форми (назви мають збігатися з тими, що в цінах) */
    'Консультація сімейного лікаря',
    'Онлайн-консультація',
    'Виїзд до місця проживання пацієнта',
    'Супровід під час поїздок і змагань',
    'Консультація з грудного вигодовування',
    'Консультація з психічного здоров’я',
    'Безкоштовна розмова 15 хвилин'
  ],
  form: { title: 'Заявка на консультацію', name: 'Ваше ім’я', phone: 'Телефон', service: 'Послуга', date: 'Дата', time: 'Час', comment: 'Коментар (необов’язково)', ph: 'Коротко опишіть питання', send: 'Надіслати в', note: 'Натискаючи кнопку, ви відкриваєте месенджер з готовим текстом заявки. Текст також копіюється в буфер обміну.', copied: 'Текст заявки скопійовано. Вставте його в чат і надішліть.', fill: 'Вкажіть ім’я та телефон, щоб надіслати заявку.', pick: 'Оберіть послугу' }   /* ЗМІНИТИ - підписи форми */
};
/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, F = C.form, d = window.drp || {}, i, h, chosenDate = '', chosenTime = '';
if (!d.i) { return; }
function qr(link) { return 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=0&color=' + C.qr.dark + '&bgcolor=' + C.qr.light + '&data=' + encodeURIComponent(link); }
var tgLink = C.telegram.user ? 'https://t.me/' + C.telegram.user : C.telegram.link;
document.getElementById('drp-b8a').innerHTML =
  '<div><h2>' + C.card.title + '</h2><p>' + C.card.text + '</p></div>' +
  '<div class="drp-qr-c"><a href="' + tgLink + '" target="_blank" rel="noopener"><img src="' + qr(tgLink) + '" alt="QR Telegram" loading="lazy">' + C.qr.tgLabel + '</a><a href="' + C.viber + '"><img src="' + qr(C.viber) + '" alt="QR Viber" loading="lazy">' + C.qr.vbLabel + '</a></div>' +
  '<div class="drp-qr-r"><a class="row drp-gw" href="tel:' + C.phone.tel + '">' + d.i('phone', 22) + C.phone.show + '</a><a class="row drp-gw" href="mailto:' + C.email + '">' + d.i('mail', 22) + C.email + '</a><div class="nt">' + C.card.note + '</div></div>';
var wd = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], mo = ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'], dt = '', now = new Date(), k, dd, off;
for (k = 0; k < C.daysAhead; k++) {
  dd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + k); off = C.closedWeekdays.indexOf(dd.getDay()) > -1;
  dt += '<button type="button" data-date="' + wd[dd.getDay()] + ', ' + dd.getDate() + ' ' + mo[dd.getMonth()] + '"' + (off ? ' disabled' : '') + '>' + wd[dd.getDay()] + '<small>' + dd.getDate() + ' ' + mo[dd.getMonth()] + '</small></button>';
}
var tm = ''; for (i = 0; i < C.times.length; i++) { tm += '<button type="button" data-time="' + C.times[i] + '">' + C.times[i] + '</button>'; }
var sv = '<option value="">' + F.pick + '</option>'; for (i = 0; i < C.services.length; i++) { sv += '<option>' + C.services[i] + '</option>'; }
var hr = ''; for (i = 0; i < C.hours.rows.length; i++) { hr += '<li><span>' + C.hours.rows[i][0] + '</span><b>' + C.hours.rows[i][1] + '</b></li>'; }
document.getElementById('drp-b8b').innerHTML =
  '<div class="drp-rv"><h2 class="drp-h2">' + C.title + '</h2><p class="drp-lead">' + C.text + '</p>' +
  '<div class="drp-bk-ct"><a href="tel:' + C.phone.tel + '"><span class="ic">' + d.i('phone', 22) + '</span><div>' + C.phone.show + '<span>Телефон</span></div></a>' +
  '<a href="' + C.viber + '"><span class="ic">' + d.i('chat', 22) + '</span><div>Viber<span>' + C.phone.show + '</span></div></a>' +
  '<a href="' + tgLink + '" target="_blank" rel="noopener"><span class="ic">' + d.i('send', 22) + '</span><div>Telegram<span>' + C.phone.show + '</span></div></a>' +
  '<a href="mailto:' + C.email + '"><span class="ic">' + d.i('mail', 22) + '</span><div>' + C.email + '<span>Email</span></div></a>' +
  '<a href="#drp-book" data-go="drp-book"><span class="ic">' + d.i('pin', 22) + '</span><div>' + C.card.address + '<span>Адреса</span></div></a></div>' +
  '<div class="drp-bk-hr"><h4>' + C.hours.title + '</h4><ul>' + hr + '</ul></div></div>' +
  '<div class="drp-fm drp-gl drp-rv" style="--d:2" id="drp-fm"><h3>' + F.title + '</h3>' +
  '<div class="fl"><label>' + F.name + '</label><input type="text" id="drp-f-n" autocomplete="name"></div>' +
  '<div class="fl"><label>' + F.phone + '</label><input type="tel" id="drp-f-p" placeholder="+380" autocomplete="tel"></div>' +
  '<div class="fl"><label>' + F.service + '</label><select id="drp-f-s">' + sv + '</select></div>' +
  '<div class="fl"><label>' + F.date + '</label><div class="drp-ch" id="drp-f-d">' + dt + '</div></div>' +
  '<div class="fl"><label>' + F.time + '</label><div class="drp-ch" id="drp-f-t">' + tm + '</div></div>' +
  '<div class="fl"><label>' + F.comment + '</label><textarea id="drp-f-c" placeholder="' + F.ph + '"></textarea></div>' +
  '<div class="drp-btns"><button type="button" class="drp-btn drp-y" data-send="tg">' + F.send + ' Telegram</button><button type="button" class="drp-btn drp-k" data-send="vb">' + F.send + ' Viber</button></div><p class="drp-fm-n">' + F.note + '</p></div>';

var fm = document.getElementById('drp-fm'), sel = document.getElementById('drp-f-s'), toast = document.getElementById('drp-toast'), tt;
function say(t) { toast.textContent = t; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('on'); }, 4200); }
function setService(s) { if (!s) return; var f = false, o; for (o = 0; o < sel.options.length; o++) { if (sel.options[o].value === s) { f = true; } } if (!f) { var op = document.createElement('option'); op.textContent = s; sel.appendChild(op); } sel.value = s; }
if (d.service) { setService(d.service); }
document.addEventListener('drp:service', function (e) { setService(e.detail); });
function chip(box, attr, cls) { box.addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('button') : null; if (!b || b.disabled) return; var all = box.querySelectorAll('button'), z; for (z = 0; z < all.length; z++) all[z].classList.remove('on'); b.classList.add('on'); cls(b.getAttribute(attr)); }); }
chip(document.getElementById('drp-f-d'), 'data-date', function (v) { chosenDate = v; });
chip(document.getElementById('drp-f-t'), 'data-time', function (v) { chosenTime = v; });
var ph = document.getElementById('drp-f-p'); ph.addEventListener('input', function () { ph.value = ph.value.replace(/[^0-9+\s()-]/g, ''); });
function copy(t) { try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t); return; } } catch (er) {} var a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (er2) {} document.body.removeChild(a); }
function openUrl(u) { var a = document.createElement('a'); a.href = u; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); document.body.removeChild(a); }
fm.addEventListener('click', function (e) {
  var b = e.target.closest ? e.target.closest('[data-send]') : null; if (!b) return;
  var n = document.getElementById('drp-f-n'), p = document.getElementById('drp-f-p'), c = document.getElementById('drp-f-c'), ok = true;
  n.classList.remove('er'); p.classList.remove('er');
  if (n.value.replace(/\s/g, '').length < 2) { n.classList.add('er'); ok = false; }
  if (p.value.replace(/\D/g, '').length < 10) { p.classList.add('er'); ok = false; }
  if (!ok) { say(F.fill); return; }
  var msg = F.title + '\n' + F.service + ': ' + (sel.value || '-') + '\n' + F.name + ': ' + n.value + '\n' + F.phone + ': ' + p.value + '\n' + F.date + ': ' + (chosenDate || '-') + '\n' + F.time + ': ' + (chosenTime || '-') + (c.value ? '\n' + F.comment.replace(' (необов’язково)', '') + ': ' + c.value : '');
  copy(msg); say(F.copied);
  if (b.getAttribute('data-send') === 'tg') { openUrl(C.telegram.user ? tgLink + '?text=' + encodeURIComponent(msg) : tgLink); } else { openUrl(C.viber); }
});
d.reveal();
})();
