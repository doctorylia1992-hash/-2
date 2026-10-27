/* БЛОК 6: 06-kviz. Усі тексти, фото, посилання й кольори - в об'єкті CONFIG на початку файлу. */
(function(){
/* ============================================================
   CONFIG - тексти, питання, результати
   ============================================================ */
var CONFIG = {
  title: 'Не знаєте, з чого почати?',   /* ЗМІНИТИ - заголовок */
  text: 'Дайте відповідь на 5 запитань і дізнайтеся, яка консультація вам потрібна. Це займе близько хвилини.',   /* ЗМІНИТИ - текст */
  checks: ['Без реєстрації та зайвих даних', 'Можна повернутися на крок назад', 'Це підказка, а не діагноз'],   /* ЗМІНИТИ - короткі переваги */
  bonus: { title: 'Безкоштовна розмова 15 хвилин', text: 'Подарунок за проходження: коротка розмова з лікарем, щоб познайомитись і розібрати ваше питання.', service: 'Безкоштовна розмова 15 хвилин', btn: 'Отримати бонус' },   /* ЗМІНИТИ - бонус */
  labels: { step: 'Питання', back: 'Назад', again: 'Пройти ще раз', book: 'Записатись' },   /* ЗМІНИТИ - підписи кнопок */
  result: {   /* ЗМІНИТИ - результати: title, text, service (що підставиться у форму запису) */
    family: { title: 'Консультація сімейного лікаря', text: 'Розберемо скарги, за потреби призначимо обстеження й складемо чіткий план.', service: 'Консультація сімейного лікаря' },
    mental: { title: 'Консультація з психічного здоров’я', text: 'Спокійна розмова без осуду: розберемо настрій, тривогу, сон і наступні кроки.', service: 'Консультація з психічного здоров’я' },
    breast: { title: 'Консультація з грудного вигодовування', text: 'Допоможу з прикладанням, лактацією і режимом, щоб вам обом було комфортно.', service: 'Консультація з грудного вигодовування' }
  },
  formats: {   /* ЗМІНИТИ - підказка про формат; service замінює послугу, якщо потрібно */
    office: { t: 'Формат: прийом у кабінеті' },
    online: { t: 'Формат: онлайн', service: 'Онлайн-консультація' },
    home: { t: 'Формат: виїзд додому', service: 'Виїзд до місця проживання пацієнта' }
  },
  urgent: 'Якщо вам дуже важко просто зараз або є думки про шкоду собі, не чекайте запису: телефонуйте 112 або на лінію підтримки 7333.',   /* ЗМІНИТИ - попередження при відповіді "Не можу нормально жити" */
  questions: [   /* ЗМІНИТИ - питання. s - бали (family, mental, breast), f - формат, u - термінова відповідь */
    { q: 'З чим ви хочете звернутися?', o: [
      { t: 'Здоров’я дитини', s: { family: 2 } },
      { t: 'Грудне вигодовування', s: { breast: 3 } },
      { t: 'Настрій, тривога, сон чи стрес', s: { mental: 3 } },
      { t: 'Самопочуття або хронічне захворювання', s: { family: 3 } },
      { t: 'Профілактичний огляд', s: { family: 2 } },
      { t: 'Поки не знаю, підберіть мені', s: { family: 1 } } ] },
    { q: 'Кому потрібна консультація?', o: [
      { t: 'Мені', s: {} },
      { t: 'Моїй дитині', s: { family: 1 } },
      { t: 'Мамі з малюком', s: { breast: 1 } },
      { t: 'Близькій людині', s: { family: 1 } } ] },
    { q: 'Як вам зручніше?', o: [
      { t: 'У кабінеті', f: 'office' },
      { t: 'Онлайн', f: 'online' },
      { t: 'Лікар приїде додому', f: 'home' } ] },
    { q: 'Як довго це вас турбує?', o: [
      { t: 'Кілька днів', s: { family: 1 } },
      { t: 'Кілька тижнів', s: { family: 1, mental: 1 } },
      { t: 'Місяці й більше', s: { mental: 1, family: 1 } },
      { t: 'Це профілактика', s: { family: 1 } } ] },
    { q: 'Наскільки це заважає щоденному життю?', o: [
      { t: 'Майже ніяк', s: {} },
      { t: 'Трохи', s: {} },
      { t: 'Суттєво', s: { mental: 1 } },
      { t: 'Я не можу нормально жити', s: { mental: 2 }, u: true } ] }
  ]
};
/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, d = window.drp || {}, root = document.getElementById('drp-b6'), step = 0, ans = [], i;
if (!d.i) { return; }
var left = '<div class="drp-rv"><h2 class="drp-h2">' + C.title + '</h2><p class="drp-lead">' + C.text + '</p><ul class="drp-qz-ck">';
for (i = 0; i < C.checks.length; i++) { left += '<li><span>' + d.i('check', 16) + '</span>' + C.checks[i] + '</li>'; }
left += '</ul><div class="drp-qz-bn drp-gw">' + d.i('star', 26) + '<div><b>' + C.bonus.title + '</b><p>' + C.bonus.text + '</p></div></div></div>';
root.innerHTML = left + '<div class="drp-rv" style="--d:2"><div class="drp-qz-cd drp-gl" id="drp-qz-cd"></div></div>';
var cd = document.getElementById('drp-qz-cd');
function draw() {
  var n = C.questions.length, q, h, k;
  if (step >= n) { return result(); }
  q = C.questions[step];
  h = '<div class="drp-qz-st"><div class="drp-qz-hd"><span>' + C.labels.step + ' ' + (step + 1) + ' / ' + n + '</span></div><div class="drp-qz-pg"><i style="width:' + (step / n * 100) + '%"></i></div><div class="drp-qz-q">' + q.q + '</div><div class="drp-qz-o">';
  for (k = 0; k < q.o.length; k++) { h += '<button type="button" data-k="' + k + '"' + (ans[step] === k ? ' class="on"' : '') + '>' + q.o[k].t + '</button>'; }
  h += '</div>' + (step > 0 ? '<button type="button" class="drp-qz-bk" data-back="1">' + C.labels.back + '</button>' : '') + '</div>';
  cd.innerHTML = h;
  setTimeout(function () { var pg = cd.querySelector('.drp-qz-pg i'); if (pg) pg.style.width = ((step + 1) / n * 100) + '%'; }, 30);
}
function result() {
  var sc = { family: 0, mental: 0, breast: 0 }, fmt = 'office', urgent = false, k, o, key, best = 'family', s, svc, r, f, h;
  for (k = 0; k < C.questions.length; k++) {
    o = C.questions[k].o[ans[k]]; if (!o) continue;
    if (o.s) { for (key in o.s) { sc[key] += o.s[key]; } }
    if (o.f) { fmt = o.f; } if (o.u) { urgent = true; }
  }
  for (key in sc) { if (sc[key] > sc[best]) best = key; }
  r = C.result[best]; f = C.formats[fmt]; svc = r.service;
  if (f.service && best === 'family') { svc = f.service; } else if (fmt === 'home' && f.service) { svc = f.service; }
  h = '<div class="drp-qz-st drp-qz-r"><div class="drp-qz-pg"><i style="width:100%"></i></div><div class="drp-qz-hd"><span>' + C.labels.step + ' ' + C.questions.length + ' / ' + C.questions.length + '</span></div><h3>' + r.title + '</h3><p>' + r.text + '</p><span class="fm">' + f.t + '</span>';
  if (urgent) { h += '<div class="ur">' + d.i('alert', 24) + '<span>' + C.urgent + '</span></div>'; }
  h += '<div class="drp-btns"><a class="drp-btn drp-k" href="#drp-book" data-pick="' + svc + '">' + C.labels.book + d.i('arrow', 20) + '</a><a class="drp-btn drp-y" href="#drp-book" data-pick="' + C.bonus.service + '">' + C.bonus.btn + '</a></div><button type="button" class="drp-qz-bk" data-again="1">' + C.labels.again + '</button></div>';
  cd.innerHTML = h;
}
cd.addEventListener('click', function (e) {
  var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
  if (b.getAttribute('data-back')) { step = Math.max(0, step - 1); draw(); return; }
  if (b.getAttribute('data-again')) { step = 0; ans = []; draw(); return; }
  if (b.getAttribute('data-k') !== null) {
    ans[step] = +b.getAttribute('data-k');
    var all = cd.querySelectorAll('.drp-qz-o button'); for (var z = 0; z < all.length; z++) all[z].classList.remove('on'); b.classList.add('on');
    setTimeout(function () { step++; draw(); }, 280);
  }
});
draw(); d.reveal();
})();
