/* БЛОК 7: 07-testy. Усі тексти, фото, посилання й кольори - в об'єкті CONFIG на початку файлу. */
(function(){
/* ============================================================
   CONFIG - тексти, тести, посилання
   ============================================================ */
var GAD = [['Зовсім ні', 0], ['Кілька днів', 1], ['Більше половини днів', 2], ['Майже щодня', 3]];
var CONFIG = {
  title: 'Перевірте себе за 2 хвилини',   /* ЗМІНИТИ - заголовок */
  text: 'Короткі тести допоможуть зрозуміти, чи варто звернутися до лікаря. Це скринінг, а не діагноз.',   /* ЗМІНИТИ - текст */
  labels: { start: 'Почати тест', step: 'Питання', back: 'Назад', again: 'Пройти ще раз', book: 'Записатись на консультацію', score: 'балів з', disclaimer: 'Результат не є діагнозом. Поставити діагноз може лише лікар після розмови.' },   /* ЗМІНИТИ - підписи */
  bookService: 'Консультація з психічного здоров’я',   /* ЗМІНИТИ - послуга, яка підставиться у форму */
  safety: 'Ви вказали, що були думки заподіяти собі шкоду. Будь ласка, не залишайтесь із цим на самоті: зверніться до лікаря сьогодні, а в разі небезпеки телефонуйте 112 або 7333.',   /* ЗМІНИТИ - текст попередження (з'являється при відповіді на останнє питання EPDS) */
  tests: [   /* ЗМІНИТИ - тести: tab, title, desc, time, source, questions, scale (до скількох балів який рівень) */
    {
      tab: 'Післяпологова депресія (EPDS)',
      title: 'Единбурзька шкала післяпологової депресії',
      desc: 'Оберіть відповідь, яка найточніше описує, як ви почувалися протягом останніх 7 днів, а не лише сьогодні.',
      time: '10 питань · близько 2 хвилин',
      source: 'Джерело: Cox J.L., Holden J.M., Sagovsky R. Edinburgh Postnatal Depression Scale. British Journal of Psychiatry, 1987.',
      safetyLast: true,
      questions: [
        { q: 'Я могла сміятися й бачити в подіях смішну сторону', o: [['Так само, як завжди', 0], ['Трохи менше, ніж раніше', 1], ['Помітно менше, ніж раніше', 2], ['Зовсім ні', 3]] },
        { q: 'Я з радістю чекала на майбутні події', o: [['Так само, як завжди', 0], ['Трохи менше, ніж раніше', 1], ['Помітно менше, ніж раніше', 2], ['Майже ні', 3]] },
        { q: 'Я без потреби звинувачувала себе, коли щось ішло не так', o: [['Так, майже весь час', 3], ['Так, іноді', 2], ['Не дуже часто', 1], ['Ні, ніколи', 0]] },
        { q: 'Я тривожилась чи хвилювалась без поважної причини', o: [['Ні, зовсім ні', 0], ['Майже ніколи', 1], ['Так, іноді', 2], ['Так, дуже часто', 3]] },
        { q: 'Я відчувала страх чи паніку без поважної причини', o: [['Так, доволі часто', 3], ['Так, іноді', 2], ['Ні, не дуже', 1], ['Ні, зовсім ні', 0]] },
        { q: 'Усе навалювалося на мене', o: [['Так, здебільшого я зовсім не справлялась', 3], ['Так, іноді справлялась гірше, ніж зазвичай', 2], ['Ні, здебільшого справлялась досить добре', 1], ['Ні, справлялась як завжди', 0]] },
        { q: 'Мені було так нещасливо, що я погано спала', o: [['Так, майже весь час', 3], ['Так, іноді', 2], ['Не дуже часто', 1], ['Ні, зовсім ні', 0]] },
        { q: 'Мені було сумно й тяжко', o: [['Так, майже весь час', 3], ['Так, досить часто', 2], ['Не дуже часто', 1], ['Ні, зовсім ні', 0]] },
        { q: 'Мені було так нещасливо, що я плакала', o: [['Так, майже весь час', 3], ['Так, досить часто', 2], ['Лише зрідка', 1], ['Ні, ніколи', 0]] },
        { q: 'Мені спадала на думку думка заподіяти собі шкоду', o: [['Так, досить часто', 3], ['Іноді', 2], ['Майже ніколи', 1], ['Ніколи', 0]] }
      ],
      scale: [
        { max: 9, t: 'Ознак депресії небагато', s: 'За цим тестом ознаки виражені слабо. Якщо самопочуття турбує, все одно можна прийти на консультацію.' },
        { max: 12, t: 'Є ознаки, на які варто звернути увагу', s: 'Результат у проміжній зоні. Рекомендую поговорити з лікарем, щоб розібратися, що відбувається.' },
        { max: 30, t: 'Високий ризик депресії', s: 'Результат вищий за поріг скринінгу. Рекомендую не відкладати консультацію: з цим можна й потрібно допомагати.' }
      ]
    },
    {
      tab: 'Тривога (GAD-7)',
      title: 'Шкала генералізованої тривоги GAD-7',
      desc: 'Оцініть, як часто за останні 2 тижні вас турбували такі стани.',
      time: '7 питань · близько 1 хвилини',
      source: 'Джерело: Spitzer R.L., Kroenke K., Williams J.B.W., Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of Internal Medicine, 2006.',
      safetyLast: false,
      questions: [
        { q: 'Відчуття нервозності, тривоги чи напруження', o: GAD },
        { q: 'Неможливість зупинити або контролювати хвилювання', o: GAD },
        { q: 'Надмірне хвилювання через різні речі', o: GAD },
        { q: 'Складність розслабитися', o: GAD },
        { q: 'Така неспокійність, що важко всидіти на місці', o: GAD },
        { q: 'Легке роздратування чи дратівливість', o: GAD },
        { q: 'Страх, ніби може статися щось жахливе', o: GAD }
      ],
      scale: [
        { max: 4, t: 'Тривога мінімальна', s: 'Рівень тривоги низький. Дбайте про сон, відпочинок і рух.' },
        { max: 9, t: 'Легка тривога', s: 'Є помітні прояви. Варто простежити за станом, а якщо вони заважають, обговорити це з лікарем.' },
        { max: 14, t: 'Помірна тривога', s: 'Прояви суттєві. Рекомендую консультацію, щоб підібрати підтримку.' },
        { max: 21, t: 'Виражена тривога', s: 'Рівень високий. Рекомендую звернутися до лікаря найближчим часом.' }
      ]
    }
  ]
};
/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, L = C.labels, d = window.drp || {}, cur = 0, step = -1, ans = [], root = document.getElementById('drp-b7'), cd, i;
if (!d.i) { return; }
var tabs = '<div class="drp-ts-tb">';
for (i = 0; i < C.tests.length; i++) { tabs += '<button type="button" data-t="' + i + '"' + (i === 0 ? ' class="on"' : '') + '>' + C.tests[i].tab + '</button>'; }
root.innerHTML = '<div class="drp-rv"><h2 class="drp-h2">' + C.title + '</h2><p class="drp-lead">' + C.text + '</p></div><div><div class="drp-rv" style="--d:2">' + tabs + '</div><div class="drp-ts-cd drp-gl" id="drp-ts-cd"></div></div>';
cd = document.getElementById('drp-ts-cd');
function draw() {
  var t = C.tests[cur], n = t.questions.length, h, k, q;
  if (step < 0) {
    cd.innerHTML = '<div class="drp-ts-st"><h3>' + t.title + '</h3><p class="ds">' + t.desc + '</p><div class="drp-ts-mt"><span>' + t.time + '</span></div><button type="button" class="drp-btn drp-k" data-start="1">' + L.start + d.i('arrow', 20) + '</button><p class="drp-ts-src">' + t.source + '</p></div>';
    return;
  }
  if (step >= n) { return result(t); }
  q = t.questions[step];
  h = '<div class="drp-ts-st"><div class="drp-ts-hd">' + L.step + ' ' + (step + 1) + ' / ' + n + '</div><div class="drp-ts-pg"><i style="width:' + (step / n * 100) + '%"></i></div><div class="drp-ts-q">' + q.q + '</div><div class="drp-ts-o">';
  for (k = 0; k < q.o.length; k++) { h += '<button type="button" data-k="' + k + '"' + (ans[step] === k ? ' class="on"' : '') + '>' + q.o[k][0] + '</button>'; }
  h += '</div>' + (step > 0 ? '<button type="button" class="drp-ts-bk" data-back="1">' + L.back + '</button>' : '') + '</div>';
  cd.innerHTML = h;
  setTimeout(function () { var pg = cd.querySelector('.drp-ts-pg i'); if (pg) pg.style.width = ((step + 1) / n * 100) + '%'; }, 30);
}
function result(t) {
  var sum = 0, mx = 0, k, lv, h, j, best, flag = false;
  for (k = 0; k < t.questions.length; k++) {
    sum += t.questions[k].o[ans[k]][1];
    best = 0; for (j = 0; j < t.questions[k].o.length; j++) { if (t.questions[k].o[j][1] > best) best = t.questions[k].o[j][1]; } mx += best;
  }
  if (t.safetyLast && t.questions[t.questions.length - 1].o[ans[t.questions.length - 1]][1] > 0) { flag = true; }
  lv = t.scale[t.scale.length - 1]; for (k = 0; k < t.scale.length; k++) { if (sum <= t.scale[k].max) { lv = t.scale[k]; break; } }
  h = '<div class="drp-ts-st"><div class="drp-ts-pg"><i style="width:100%"></i></div><div class="drp-ts-sc"><b>' + sum + '</b><span>' + L.score + ' ' + mx + '</span></div><div class="drp-ts-lv">' + lv.t + '</div><p class="ds" style="margin-top:0">' + lv.s + '</p>';
  if (flag) { h += '<div class="drp-ts-al">' + d.i('alert', 26) + '<span>' + C.safety + '</span></div>'; }
  h += '<div class="drp-btns" style="margin-top:24px"><a class="drp-btn drp-k" href="#drp-book" data-pick="' + C.bookService + '">' + L.book + d.i('arrow', 20) + '</a><button type="button" class="drp-btn drp-ol" data-again="1">' + L.again + '</button></div><p class="drp-ts-ds">' + L.disclaimer + '</p></div>';
  cd.innerHTML = h;
}
root.addEventListener('click', function (e) {
  var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
  if (b.getAttribute('data-t') !== null) {
    cur = +b.getAttribute('data-t'); step = -1; ans = [];
    var all = root.querySelectorAll('.drp-ts-tb button'); for (var z = 0; z < all.length; z++) all[z].classList.remove('on'); b.classList.add('on'); draw(); return;
  }
  if (b.getAttribute('data-start')) { step = 0; ans = []; draw(); return; }
  if (b.getAttribute('data-back')) { step = Math.max(0, step - 1); draw(); return; }
  if (b.getAttribute('data-again')) { step = -1; ans = []; draw(); return; }
  if (b.getAttribute('data-k') !== null) {
    ans[step] = +b.getAttribute('data-k');
    var os = cd.querySelectorAll('.drp-ts-o button'); for (var y = 0; y < os.length; y++) os[y].classList.remove('on'); b.classList.add('on');
    setTimeout(function () { step++; draw(); }, 280);
  }
});
draw(); d.reveal();
})();
