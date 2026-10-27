/* БЛОК 10: інтерактивна карта тіла. Тексти - в об'єкті CONFIG на початку файлу. Решта (малюнки, анімація) не змінюється. */
(function(){
/* ============================================================
   CONFIG - тексти інтерактивної карти тіла.
   Усе, що можна змінювати, лежить тут, біля кожного параметра коментар /* ЗМІНИТИ *\/
   ============================================================ */
var CONFIG = {
  title: 'Знайдіть, де вас турбує',   /* ЗМІНИТИ - заголовок */
  text: 'Натисніть на точку на тілі, щоб дізнатися, що може бути причиною дискомфорту та як ми можемо допомогти. Це довідка, а не діагноз.',   /* ЗМІНИТИ - текст під заголовком */
  service: 'Консультація сімейного лікаря',   /* ЗМІНИТИ - послуга, яка підставиться у форму запису після кнопки на картці */
  labels: {   /* ЗМІНИТИ - підписи */
    front: 'Спереду', back: 'Ззаду', hint: 'Клацніть на точку, щоб дізнатися більше',
    listTitle: 'Системи організму', causes: 'Можливі причини дискомфорту:', symptoms: 'Симптоми можуть включати:', help: 'Як ми можемо допомогти:',
    urgent: 'Коли не чекати', book: 'Записатися на прийом', back2: 'До тіла', inside: 'вид зсередини',
    disclaimer: 'Це довідкова інформація, а не діагноз. Причину турбот визначає лікар після розмови й огляду.'
  },
  systems: [   /* ЗМІНИТИ - групи у списку зліва: назва, підпис, список "Як ми можемо допомогти" для цієї групи */
    { id: 'head', name: 'Голова та шия', sub: 'Біль, запаморочення, горло', icon: 'head', first: 'head', help: ['розмова й детальний огляд', 'вимірювання тиску й оцінка неврологічних ознак', 'за потреби направлення на обстеження', 'план лікування і профілактики'] },
    { id: 'resp', name: 'Дихальна система', sub: 'Легені, бронхи, кашель', icon: 'lungs', first: 'lungs', help: ['огляд та прослуховування легень', 'за потреби - аналізи й додаткові обстеження', 'індивідуальний план лікування', 'профілактика ускладнень'] },
    { id: 'cardio', name: 'Серцево-судинна система', sub: 'Серце, тиск, судини', icon: 'heart', first: 'heart', help: ['вимірювання тиску й пульсу', 'ЕКГ і оцінка ризиків', 'направлення до кардіолога за потреби', 'план контролю тиску і способу життя'] },
    { id: 'gi', name: 'Травна система', sub: 'Шлунок, кишківник, печінка', icon: 'stomach', first: 'stomach', help: ['огляд і пальпація живота', 'направлення на УЗД й аналізи', 'рекомендації щодо харчування', 'підбір і контроль лікування'] },
    { id: 'uro', name: 'Сечостатева система', sub: 'Нирки, сечовий міхур', icon: 'kidney', first: 'bladder', help: ['огляд і збір історії скарг', 'аналізи сечі та крові', 'направлення на УЗД чи до профільного лікаря', 'план лікування й профілактики'] },
    { id: 'msk', name: 'Опорно-рухова система', sub: 'Суглоби, спина, м’язи', icon: 'bone', first: 'knee', help: ['огляд і оцінка рухів', 'направлення на рентген, УЗД чи МРТ за потреби', 'план лікування й вправ', 'рекомендації щодо навантажень'] },
    { id: 'endo', name: 'Ендокринна система', sub: 'Щитоподібна залоза, гормони', icon: 'thyroid', first: 'thyroid', help: ['огляд і пальпація залози', 'направлення на гормони й УЗД', 'розшифрування аналізів', 'ведення й контроль лікування'] },
    { id: 'other', name: 'Інші зони', sub: 'Лімфовузли, імунітет', icon: 'plus', first: 'lymph', help: ['огляд і пальпація лімфовузлів', 'аналізи крові', 'направлення на УЗД за потреби', 'план спостереження'] }
  ],
  regions: {   /* ЗМІНИТИ - тексти кожної точки: name (назва на картці), label (короткий підпис біля тіла), causes, symptoms, urgent (необов'язково), help (необов'язково, інакше береться зі списку групи) */
    head: { name: 'Голова', label: 'Голова', causes: 'Напруга м’язів шиї й плечей, нестача сну, стрес, перепади тиску, мігрень, інфекції та інші причини.', symptoms: ['головний біль', 'запаморочення', 'шум у вухах', 'погіршення сну', 'підвищена тривожність'], urgent: 'Раптовий найсильніший біль голови, порушення мови, слабкість чи перекошене обличчя: негайно телефонуйте 112.' },
    throat: { name: 'Горло та шия', label: 'Горло', causes: 'Вірусні й бактеріальні інфекції, алергія, сухе повітря, рефлюкс, перенапруга голосу.', symptoms: ['біль і першіння в горлі', 'осиплість голосу', 'болісне ковтання', 'збільшені лімфовузли', 'кашель'], urgent: 'Труднощі з диханням чи ковтанням, швидке набрякання шиї: телефонуйте 112.' },
    thyroid: { name: 'Щитоподібна залоза', label: 'Щитоподібна', causes: 'Зниження або підвищення функції залози, нестача йоду, аутоімунні процеси, вузли.', symptoms: ['втома й сонливість', 'зміни ваги без причини', 'випадіння волосся', 'тремор і серцебиття', 'відчуття грудки в горлі'] },
    shoulder: { name: 'Плечі', label: 'Плечі', causes: 'Перенавантаження, малорухливий спосіб життя, травми, запалення сухожиль і суглобів, проблеми шийного відділу.', symptoms: ['біль у плечі', 'обмеження рухів', 'хрускіт у суглобі', 'оніміння руки', 'біль уночі'] },
    lymph: { name: 'Лімфатичні вузли', label: 'Лімфовузли', causes: 'Реакція на інфекції й запалення, імунні порушення; рідше інші причини, які потребують огляду.', symptoms: ['збільшені чи болючі вузли', 'підвищена температура', 'нічна пітливість', 'слабкість', 'часті інфекції'] },
    lungs: { name: 'Легені', label: 'Легені', causes: 'Запалення дихальних шляхів, бронхіт, пневмонія, алергічні реакції, постковідний синдром та інші захворювання.', symptoms: ['кашель', 'задишка', 'біль у грудях', 'відчуття нестачі повітря', 'підвищення температури'], urgent: 'Сильна задишка в спокої, синюватість губ чи кашель із кров’ю: телефонуйте 112.' },
    heart: { name: 'Серце', label: 'Серце', causes: 'Підвищений тиск, порушення ритму, навантаження, стрес, атеросклероз, ішемічна хвороба та інші стани.', symptoms: ['тиск чи біль у грудях', 'серцебиття й перебої', 'задишка при навантаженні', 'набряки ніг', 'слабкість і запаморочення'], urgent: 'Сильний тиснучий біль у грудях, що віддає в руку чи щелепу, або задишка в спокої: негайно телефонуйте 112.' },
    liver: { name: 'Печінка та жовчний міхур', label: 'Печінка', causes: 'Жирова хвороба печінки, гепатити, порушення харчування, застій жовчі, прийом ліків.', symptoms: ['важкість чи біль справа під ребрами', 'гіркота в роті', 'нудота після жирної їжі', 'жовтяничність шкіри чи очей', 'втома'] },
    stomach: { name: 'Шлунок', label: 'Шлунок', causes: 'Гастрит, рефлюкс, виразка, інфекція H. pylori, нерегулярне харчування, стрес.', symptoms: ['печія й відрижка', 'біль «під ложечкою»', 'нудота й важкість', 'швидке насичення', 'кислий присмак'], urgent: 'Блювання з кров’ю чи чорний стілець: телефонуйте 112.' },
    intestine: { name: 'Кишківник', label: 'Кишківник', causes: 'Дисбаланс мікрофлори, синдром подразненого кишківника, харчова непереносимість, інфекції, запалення.', symptoms: ['здуття й гази', 'закрепи чи діарея', 'спазми внизу живота', 'слиз чи кров у калі', 'втрата ваги без причини'] },
    bladder: { name: 'Сечовий міхур', label: 'Сечовий міхур', causes: 'Інфекції сечових шляхів, цистит, камені, порушення тонусу, у жінок гінекологічні причини.', symptoms: ['часте чи болюче сечовипускання', 'печіння', 'тягнучий біль унизу живота', 'кров у сечі', 'нічні позиви'], urgent: 'Гострий біль унизу живота з температурою чи слабкістю: терміново до лікаря або 112.' },
    thigh: { name: 'Стегно', label: 'Стегно', causes: 'Розтягнення м’язів, перевантаження, проблеми кульшового суглоба чи попереку, судинні причини.', symptoms: ['біль у м’язах стегна', 'скутість', 'біль, що віддає в коліно', 'слабкість у нозі', 'судоми'] },
    knee: { name: 'Коліно', label: 'Коліно', causes: 'Перевантаження, артроз, травми зв’язок і меніска, надмірна вага, запалення суглоба.', symptoms: ['біль під час ходьби й на сходах', 'хрускіт', 'набряк суглоба', 'скутість зранку', 'відчуття нестабільності'] },
    shin: { name: 'Гомілка', label: 'Гомілка', causes: 'Перевантаження, періостит, судинні проблеми, плоскостопість, травми.', symptoms: ['біль при ходьбі й бігу', 'набряки до вечора', 'важкість у ногах', 'судоми', 'видимі вени'] },
    foot: { name: 'Стопа', label: 'Стопа', causes: 'Плоскостопість, незручне взуття, пошкодження зв’язок, подагра, діабетичні зміни.', symptoms: ['біль у стопі й пальцях', 'набряки', 'дискомфорт при ходьбі', 'мозолі й вростання нігтя', 'оніміння'] },
    neckb: { name: 'Шия', label: 'Шия', causes: 'Тривала напруга за комп’ютером, остеохондроз, неправильна поза, травми.', symptoms: ['біль і скутість', 'головний біль від напруги', 'оніміння рук', 'хрускіт при поворотах', 'запаморочення'], urgent: 'Біль після травми шиї або слабкість у руках чи ногах: терміново до лікаря, при втраті чутливості телефонуйте 112.' },
    shoulderb: { name: 'Плече', label: 'Плече', causes: 'Перевантаження, напруга м’язів, проблеми лопатки й шийного відділу, запалення сухожиль.', symptoms: ['біль у плечі', 'скутість і обмеження рухів', 'біль при підніманні руки', 'оніміння руки', 'біль уночі'] },
    upperb: { name: 'Спина', label: 'Спина', causes: 'Сутулість, м’язова напруга, проблеми грудного відділу хребта, міжреброва невралгія.', symptoms: ['біль між лопатками', 'скутість', 'біль при вдиху', 'печіння в м’язах', 'швидка втома спини'], urgent: 'Різкий біль у спині із задишкою чи болем у грудях: телефонуйте 112.' },
    elbow: { name: 'Лікоть', label: 'Лікоть', causes: 'Тендиніт («тенісний лікоть»), перевантаження, травми, артрит, защемлення нерва.', symptoms: ['біль у ліктьовому суглобі', 'слабкий хват', 'біль при згинанні', 'набряк', 'оніміння мізинця'] },
    lowb: { name: 'Поперек', label: 'Поперек', causes: 'М’язове перенапруження, грижі дисків, малорухливість, остеохондроз, защемлення нерва.', symptoms: ['тягнучий чи гострий біль', 'скутість зранку', 'біль віддає в ногу', 'слабкість у ногах', 'біль при нахилах'], urgent: 'Біль із порушенням контролю сечовипускання чи оніміння в проміжині: негайно до лікаря або 112.' },
    kidney: { name: 'Нирки', label: 'Нирки', causes: 'Інфекції (пієлонефрит), камені, запалення, підвищений тиск, діабет.', symptoms: ['тупий біль у боці', 'набряки обличчя й ніг', 'зміни сечі', 'підвищений тиск', 'підвищена температура'], urgent: 'Сильний біль у боці з температурою чи кров’ю в сечі: терміново до лікаря або 112.' },
    glute: { name: 'Сідниця', label: 'Сідниця', causes: 'Защемлення сідничного нерва, м’язове перенавантаження, проблеми таза й попереку.', symptoms: ['біль у сідниці', 'біль віддає в ногу', 'біль при сидінні', '«простріл» по задній поверхні стегна', 'оніміння'] },
    thighb: { name: 'Стегно (ззаду)', label: 'Стегно', causes: 'Розтягнення м’язів задньої поверхні, защемлення нерва, перенавантаження.', symptoms: ['біль по задній поверхні стегна', 'скутість', 'тягнучий біль', 'слабкість у нозі', 'оніміння'] },
    calf: { name: 'Ікра', label: 'Ікра', causes: 'Судоми, нестача мікроелементів, варикоз, перенавантаження; різкий біль в одній литці потребує швидкої оцінки.', symptoms: ['нічні судоми', 'важкість і набряки', 'видимі вени', 'біль при ходьбі', 'біль чи почервоніння в одній литці'], urgent: 'Різкий біль в одній литці з набряком і почервонінням: телефонуйте 112.', sys: 'cardio' },
    heel: { name: 'П’ята', label: 'П’ята', causes: 'Підошовний фасціїт, п’яткова шпора, ахіллова тендинопатія, неякісне взуття.', symptoms: ['біль зранку при перших кроках', 'біль у п’яті при навантаженні', 'біль в ахілловому сухожиллі', 'скутість', 'набряк'] }
  }
};

/* ---- Малюнки органів зсередини (SVG). Тут нічого міняти не потрібно ---- */
var BM_SC_DEFS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
  '<radialGradient id="bmBgS" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="#5A1A22"/><stop offset=".55" stop-color="#2A0C12"/><stop offset="1" stop-color="#0C0507"/></radialGradient>' +
  '<radialGradient id="bmLung" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#F6C4BE"/><stop offset=".5" stop-color="#DE8890"/><stop offset="1" stop-color="#A24556"/></radialGradient>' +
  '<radialGradient id="bmHeart" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#F0827E"/><stop offset=".5" stop-color="#C23A48"/><stop offset="1" stop-color="#6E1423"/></radialGradient>' +
  '<radialGradient id="bmLiver" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#C46A58"/><stop offset=".55" stop-color="#8A3430"/><stop offset="1" stop-color="#4A1618"/></radialGradient>' +
  '<radialGradient id="bmStom" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#F7B4A8"/><stop offset=".55" stop-color="#DD7E7A"/><stop offset="1" stop-color="#A44652"/></radialGradient>' +
  '<radialGradient id="bmKid" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#C85048"/><stop offset=".55" stop-color="#8A262B"/><stop offset="1" stop-color="#4A0F16"/></radialGradient>' +
  '<radialGradient id="bmBrain" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#F8CFC8"/><stop offset=".55" stop-color="#E49AA0"/><stop offset="1" stop-color="#B5606F"/></radialGradient>' +
  '<radialGradient id="bmGland" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#D98070"/><stop offset=".6" stop-color="#A24848"/><stop offset="1" stop-color="#6A2430"/></radialGradient>' +
  '<radialGradient id="bmBlad" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#F0C8C0"/><stop offset="1" stop-color="#B27C84"/></radialGradient>' +
  '<radialGradient id="bmLym" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#E8EBA8"/><stop offset=".6" stop-color="#B8BE6A"/><stop offset="1" stop-color="#7C8440"/></radialGradient>' +
  '<linearGradient id="bmBone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF8E8"/><stop offset=".5" stop-color="#EBDDBC"/><stop offset="1" stop-color="#BDA87C"/></linearGradient>' +
  '<linearGradient id="bmMus" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E0716C"/><stop offset=".55" stop-color="#AE3A40"/><stop offset="1" stop-color="#6E1E28"/></linearGradient>' +
  '<filter id="bmTex" filterUnits="userSpaceOnUse" x="-20" y="-20" width="520" height="520" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="8" result="ba"/>' +
  '<feDiffuseLighting in="ba" surfaceScale="8" diffuseConstant="1.3" lighting-color="#fff" result="dv"><feDistantLight azimuth="235" elevation="52"/></feDiffuseLighting>' +
  '<feSpecularLighting in="ba" surfaceScale="8" specularConstant=".9" specularExponent="26" lighting-color="#ffeae4" result="sv"><feDistantLight azimuth="235" elevation="52"/></feSpecularLighting>' +
  '<feTurbulence type="fractalNoise" baseFrequency=".075" numOctaves="4" seed="7" result="n"/><feDiffuseLighting in="n" surfaceScale="1.5" diffuseConstant="1.08" lighting-color="#fff" result="dt"><feDistantLight azimuth="235" elevation="60"/></feDiffuseLighting>' +
  '<feBlend in="SourceGraphic" in2="dv" mode="multiply" result="a1"/><feBlend in="a1" in2="dt" mode="multiply" result="a2"/><feComposite in="sv" in2="SourceAlpha" operator="in" result="s2"/>' +
  '<feComposite in="a2" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".6" k4="0" result="a3"/><feComposite in="a3" in2="SourceAlpha" operator="in" result="fin"/>' +
  '<feGaussianBlur in="SourceAlpha" stdDeviation="9" result="sh1"/><feOffset in="sh1" dx="7" dy="12" result="sh2"/><feFlood flood-color="#000" flood-opacity=".55"/><feComposite in2="sh2" operator="in" result="shd"/><feMerge><feMergeNode in="shd"/><feMergeNode in="fin"/></feMerge></filter>' +
  '<filter id="bmSb2" filterUnits="userSpaceOnUse" x="-40" y="-40" width="560" height="560"><feGaussianBlur stdDeviation="2.2"/></filter>' +
  '<filter id="bmGy" filterUnits="userSpaceOnUse" x="0" y="0" width="480" height="480"><feTurbulence type="fractalNoise" baseFrequency=".034 .05" numOctaves="3" seed="5" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 .45  0 0 0 0 .14  0 0 0 0 .22  1 0 0 0 0" result="ln"/><feComponentTransfer in="ln" result="ln2"><feFuncA type="table" tableValues="0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0"/></feComponentTransfer><feComposite in="ln2" in2="SourceAlpha" operator="in" result="lc"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="lc"/></feMerge></filter>' +
  '<filter id="bmSb" filterUnits="userSpaceOnUse" x="-40" y="-40" width="560" height="560"><feGaussianBlur stdDeviation="9"/></filter>' +
  '</defs></svg>';
function scG(h, inner) { return '<g data-h="' + h + '">' + inner + '</g>'; }
function scTube(d, w, c, o) { return '<g filter="url(#bmTex)"><path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (o ? ' opacity="' + o + '"' : '') + '/><path d="' + d + '" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="' + (w * .28).toFixed(1) + '" stroke-linecap="round" stroke-linejoin="round" transform="translate(' + (-w * .14).toFixed(1) + ' ' + (-w * .14).toFixed(1) + ')"/></g>'; }
function scHi(cx, cy, rx, ry, rot, o) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="#fff" opacity="' + (o || .3) + '" filter="url(#bmSb)" transform="rotate(' + (rot || 0) + ' ' + cx + ' ' + cy + ')"/>'; }
function scTree(x, y, a, l, dp, w, c) { if (dp <= 0 || w < .7) { return ''; } var x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l; return '<path d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + ' L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" stroke="' + c + '" stroke-width="' + w.toFixed(1) + '" stroke-linecap="round" fill="none"/>' + scTree(x2, y2, a - .55, l * .8, dp - 1, w * .7, c) + scTree(x2, y2, a + .5, l * .8, dp - 1, w * .7, c); }
function scFib(x, y, w, h, n, c, o) { var s = '', i, xx; for (i = 0; i < n; i++) { xx = x + (i + .5) * w / n; s += '<path d="M' + xx.toFixed(1) + ' ' + y + ' C' + (xx + 7).toFixed(1) + ' ' + (y + h * .33) + ' ' + (xx - 7).toFixed(1) + ' ' + (y + h * .66) + ' ' + xx.toFixed(1) + ' ' + (y + h) + '" fill="none" stroke="' + c + '" stroke-width="2" opacity="' + (o || .35) + '"/>'; } return s; }
function scBone(d) { return '<path d="' + d + '" fill="url(#bmBone)" stroke="#8C7A56" stroke-width="1.5" stroke-opacity=".5" filter="url(#bmTex)"/>'; }
function scMus(d, fx, fy, fw, fh, n) { return '<path d="' + d + '" fill="url(#bmMus)" filter="url(#bmTex)"/>' + (fw ? '<g clip-path="none">' + scFib(fx, fy, fw, fh, n || 10, '#3a0a10', .4) + '</g>' : ''); }

function scBg() {
  var r = '<g opacity=".9">', i, x, y;
  for (i = 0; i < 7; i++) { x = (i * 83 + 40) % 480; y = (i * 131 + 30) % 480; r += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (60 + (i % 3) * 30) + '" ry="' + (40 + (i % 4) * 22) + '" fill="#7A2230" opacity="' + (.16 + (i % 3) * .05) + '" filter="url(#bmSb)"/>'; }
  r += '</g><g fill="none" stroke="#B5535A" stroke-linecap="round" opacity=".2" filter="url(#bmSb2)">';
  for (i = 0; i < 16; i++) { x = (i * 61) % 520 - 20; y = (i * 97) % 520 - 20; r += '<path d="M' + x + ' ' + y + ' C' + (x + 80) + ' ' + (y + 30) + ' ' + (x + 40) + ' ' + (y + 120) + ' ' + (x + 150) + ' ' + (y + 170) + '" stroke-width="' + (2 + (i % 4) * 2.5) + '"/>'; }
  return r + '</g>';
}
var BM_SC = {
  lungs: function () {
    var LL = 'M226 120 C176 104 104 146 92 238 C84 314 118 388 178 380 C212 376 224 346 224 304Z', RL = 'M254 120 C304 104 376 146 388 238 C396 314 362 388 302 380 C268 376 256 346 256 304Z';
    return '<g class="bm-br">' + scG('lungs', '<path d="' + LL + '" fill="url(#bmLung)" filter="url(#bmTex)"/><path d="' + RL + '" fill="url(#bmLung)" filter="url(#bmTex)"/>' +
      '<path d="M112 250 C160 240 192 262 218 304 M368 250 C320 240 288 262 262 304 M286 202 C316 198 346 202 378 216" fill="none" stroke="#8A3042" stroke-opacity=".45" stroke-width="3"/>' + '<g opacity=".5">' + scTree(150, 150, 1.9, 40, 6, 2.2, '#C8505F') + scTree(120, 220, 1.2, 36, 6, 2, '#6F88D2') + scTree(330, 150, 1.25, 40, 6, 2.2, '#C8505F') + scTree(362, 220, 1.95, 36, 6, 2, '#6F88D2') + '</g>' +
      scHi(150, 190, 26, 62, -14, .32) + scHi(330, 190, 26, 62, 14, .26)) + '</g>' +
      '<rect x="231" y="40" width="18" height="116" rx="9" fill="#EBD9CF"/>' + '<path d="M231 56 h18 M231 70 h18 M231 84 h18 M231 98 h18 M231 112 h18 M231 126 h18 M231 140 h18" stroke="#A98C80" stroke-width="2.4"/>' +
      scTube('M240 156 C228 176 208 190 184 210', 13, '#F2DDD2') + scTube('M240 156 C252 176 272 190 296 210', 13, '#F2DDD2') +
      '<g opacity=".8">' + scTree(184, 210, 2.35, 50, 5, 8, '#F4DED4') + scTree(184, 210, 1.7, 52, 5, 7, '#F4DED4') + scTree(296, 210, .8, 50, 5, 8, '#F4DED4') + scTree(296, 210, 1.45, 52, 5, 7, '#F4DED4') + '</g>';
  },
  heart: function () {
    return '<g>' + scTube('M205 190 C190 136 188 96 204 52', 36, '#4668C0') + scTube('M236 184 C238 130 204 112 160 124', 24, '#6E88D2') +
      scTube('M266 188 C268 116 340 86 356 150 L356 230', 40, '#C23B44') + '</g>' +
      '<g class="bm-beat">' + scG('heart', '<path d="M240 408 C148 336 126 232 168 190 C200 160 232 178 240 208 C248 178 282 160 314 192 C354 234 332 336 240 408Z" fill="url(#bmHeart)" filter="url(#bmTex)"/>' +
      '<path d="M250 196 C262 250 268 310 256 372 M226 210 C206 250 200 300 214 346" fill="none" stroke="#F4A09A" stroke-width="5" stroke-linecap="round" opacity=".7"/>' + '<g opacity=".85">' + scTree(236, 214, 2.3, 46, 5, 4.2, '#8E1B2C') + scTree(262, 220, .85, 46, 5, 4.2, '#8E1B2C') + scTree(250, 250, 1.6, 40, 5, 3.4, '#8E1B2C') + '</g><path d="M200 246 C230 262 270 262 300 244" fill="none" stroke="#F2D27A" stroke-width="9" stroke-linecap="round" opacity=".55"/>' +
      '<path d="M236 214 C214 230 196 252 190 288 M262 220 C288 236 304 262 304 296" fill="none" stroke="#7A1424" stroke-width="3.4" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M214 232 C222 262 220 296 212 320" fill="none" stroke="#E87C76" stroke-width="2.4" opacity=".8"/>' + scHi(204, 248, 26, 52, 18, .38)) + '</g>';
  },
  brain: function () {
    return '<path d="M246 318 C250 352 252 384 258 424 L284 424 C286 378 284 346 282 314Z" fill="#E9B7AE" filter="url(#bmTex)"/>' +
      scG('brain', '<g filter="url(#bmTex)"><path d="M120 250 C100 150 170 70 260 76 C350 82 402 150 394 230 C388 292 342 312 300 302 C282 332 240 332 220 308 C170 314 130 304 120 250Z" fill="url(#bmBrain)" filter="url(#bmGy)"/>' +
      '<path d="M262 322 C300 302 352 310 368 338 C372 368 322 386 282 374 C256 362 248 338 262 322Z" fill="#D88C94" filter="url(#bmGy)"/></g>' + scHi(210, 130, 60, 26, -10, .34));
  },
  throat: function () {
    var r = '', i;
    for (i = 0; i < 9; i++) { r += '<path d="M218 ' + (190 + i * 28) + ' h44" stroke="#CDB8AC" stroke-width="12" stroke-linecap="round"/>'; }
    return scTube('M146 20 C142 200 146 360 154 470', 26, '#C0353F') + scTube('M120 20 C114 200 118 360 126 470', 20, '#4F6EC4') + scTube('M334 20 C338 200 334 360 326 470', 26, '#C0353F') + scTube('M360 20 C366 200 362 360 354 470', 20, '#4F6EC4') +
      '<rect x="222" y="150" width="36" height="330" rx="14" fill="#E4D2C6"/>' + r +
      scG('larynx', '<path d="M196 50 L284 50 L276 130 L240 160 L204 130Z" fill="url(#bmBone)" stroke="#8C7A56" stroke-opacity=".5" stroke-width="2" filter="url(#bmTex)"/><path d="M240 60 V150" stroke="#8C7A56" stroke-opacity=".5" stroke-width="2"/>') +
      scG('thyroid', '<path d="M222 204 C186 192 152 224 160 280 C166 316 204 312 224 276Z" fill="url(#bmGland)" filter="url(#bmTex)"/><path d="M258 204 C294 192 328 224 320 280 C314 316 276 312 256 276Z" fill="url(#bmGland)" filter="url(#bmTex)"/><rect x="220" y="236" width="40" height="22" rx="8" fill="url(#bmGland)" filter="url(#bmTex)"/>' + scHi(190, 244, 14, 30, 14, .35) + scHi(290, 244, 14, 30, -14, .3));
  },
  abdomen: function () {
    return scG('intestine', '<path d="M96 330 V440 H384 V330 C384 316 372 312 360 316 H120 C104 316 96 320 96 330" fill="none" stroke="#B45E58" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>' +
      scTube('M170 346 C140 346 140 378 170 378 H330 C360 378 360 410 330 410 H150 C122 410 122 440 152 440 H330', 26, '#E7A090')) +
      scG('liver', '<path d="M60 190 C84 134 204 112 290 150 C312 196 288 256 226 292 C150 322 84 304 60 250Z" fill="url(#bmLiver)" filter="url(#bmTex)"/><path d="M150 140 C170 190 190 230 226 292" fill="none" stroke="#2C0C0E" stroke-opacity=".45" stroke-width="3"/>' + scHi(130, 190, 34, 18, -20, .32) +
      '<ellipse cx="216" cy="306" rx="14" ry="28" fill="#6E9A5A" transform="rotate(20 216 306)" filter="url(#bmTex)"/>') +
      scG('stomach', '<path d="M296 40 C298 80 300 112 304 136" fill="none" stroke="#E4A39A" stroke-width="16" stroke-linecap="round"/><path d="M302 124 C384 100 440 168 418 242 C402 294 342 304 322 262 C314 242 332 232 342 214 C354 190 324 176 298 188Z" fill="url(#bmStom)" filter="url(#bmTex)"/>' + scHi(380, 160, 30, 20, -30, .36)) +
      scTube('M236 304 C284 290 344 302 384 320', 20, '#E9BC8E', .9);
  },
  urinary: function () {
    return scTube('M250 36 V330', 20, '#C23B44') + scTube('M222 36 V330', 22, '#4F6EC4') +
      scG('kidney', '<ellipse cx="158" cy="200" rx="48" ry="86" fill="url(#bmKid)" filter="url(#bmTex)" transform="rotate(-8 158 200)"/><ellipse cx="322" cy="200" rx="48" ry="86" fill="url(#bmKid)" filter="url(#bmTex)" transform="rotate(8 322 200)"/>' +
      '<ellipse cx="190" cy="208" rx="13" ry="30" fill="#2A080C"/><ellipse cx="290" cy="208" rx="13" ry="30" fill="#2A080C"/>' + scHi(140, 160, 16, 44, -8, .34) + scHi(302, 160, 14, 44, 8, .28) +
      '<path d="M146 96 C160 76 186 78 196 102 C176 110 156 108 146 96Z M334 96 C320 76 294 78 284 102 C304 110 324 108 334 96Z" fill="#E7C36C" filter="url(#bmTex)"/>') +
      scTube('M196 236 C204 296 220 336 234 374', 7, '#EBD08A') + scTube('M284 236 C276 296 260 336 246 374', 7, '#EBD08A') +
      scG('bladder', '<path d="M196 372 C196 348 284 348 284 372 C296 424 274 456 240 456 C206 456 184 424 196 372Z" fill="url(#bmBlad)" filter="url(#bmTex)"/>' + scHi(222, 400, 14, 22, 0, .4));
  },
  shoulder: function () {
    return scBone('M60 152 C150 128 250 128 336 162 C340 176 330 184 318 182 C240 160 150 160 66 180 C54 176 52 160 60 152Z') +
      scBone('M300 168 C384 142 436 206 424 302 C404 364 332 334 300 282 C282 232 290 196 300 168Z') +
      '<path d="M180 190 C250 150 366 190 352 304 C304 334 242 332 204 384 C170 332 148 252 180 190Z" fill="url(#bmMus)" opacity=".62" filter="url(#bmTex)"/>' + scFib(180, 190, 160, 190, 11, '#3a0a10', .35) +
      scG('joint', '<circle cx="262" cy="250" r="58" fill="url(#bmBone)" filter="url(#bmTex)" stroke="#8C7A56" stroke-opacity=".5"/><circle cx="262" cy="250" r="66" fill="none" stroke="#9EC6E8" stroke-opacity=".6" stroke-width="5"/>' + scHi(244, 230, 20, 14, -20, .5)) +
      scTube('M262 296 L214 480', 54, '#EBDDBC');
  },
  spine: function () {
    var r = '', i, y, hl = ['c', 'c', 'c', 'c', 't', 't', 't', 't', 't', 'l', 'l', 'l', 'l'];
    for (i = 0; i < 13; i++) {
      y = 14 + i * 35;
      r += '<g data-h="' + hl[i] + '"><ellipse cx="240" cy="' + (y + 12) + '" rx="' + (i < 4 ? 26 : i < 9 ? 32 : 42) + '" ry="14" fill="url(#bmBone)" filter="url(#bmTex)" stroke="#8C7A56" stroke-opacity=".5"/>' +
        '<ellipse cx="' + (192 - (i < 4 ? 0 : 8)) + '" cy="' + (y + 10) + '" rx="16" ry="6" fill="url(#bmBone)"/><ellipse cx="' + (288 + (i < 4 ? 0 : 8)) + '" cy="' + (y + 10) + '" rx="16" ry="6" fill="url(#bmBone)"/></g>' +
        (i < 12 ? '<ellipse cx="240" cy="' + (y + 29) + '" rx="' + (i < 4 ? 24 : i < 9 ? 29 : 38) + '" ry="5" fill="#9DB8D8" opacity=".9"/>' : '') +
        '<path d="M214 ' + (y + 14) + ' C184 ' + (y + 6) + ' 150 ' + (y + 22) + ' 120 ' + (y + 34) + ' M266 ' + (y + 14) + ' C296 ' + (y + 6) + ' 330 ' + (y + 22) + ' 360 ' + (y + 34) + '" fill="none" stroke="#EBD08A" stroke-width="2" opacity=".8"/>';
    }
    return '<path d="M120 0 C90 160 90 320 120 480 H150 C130 320 130 160 150 0Z M360 0 C390 160 390 320 360 480 H330 C350 320 350 160 330 0Z" fill="url(#bmMus)" opacity=".5" filter="url(#bmTex)"/>' + r;
  },
  elbow: function () {
    return '<path d="M120 0 C100 120 110 240 150 300 H330 C350 240 360 120 340 0Z" fill="url(#bmMus)" opacity=".4" filter="url(#bmTex)"/>' +
      scTube('M240 -10 L240 190', 78, '#EBDDBC') + '<circle cx="210" cy="206" r="42" fill="url(#bmBone)" filter="url(#bmTex)"/><circle cx="276" cy="206" r="38" fill="url(#bmBone)" filter="url(#bmTex)"/>' +
      scG('joint', '<path d="M176 236 C220 262 270 262 316 236" fill="none" stroke="#9EC6E8" stroke-width="12" stroke-linecap="round" opacity=".8"/>' + scHi(224, 200, 16, 12, 0, .5)) +
      scTube('M276 258 C292 340 316 410 346 490', 44, '#EBDDBC') + scTube('M204 262 C190 340 176 410 160 490', 36, '#EBDDBC') +
      '<path d="M226 90 C236 150 236 220 240 262" fill="none" stroke="#F1E6B8" stroke-width="7" stroke-linecap="round" opacity=".9"/>';
  },
  hip: function () {
    return '<path d="M60 70 C110 30 200 44 230 120 C242 172 222 224 190 252 C150 272 90 222 66 150Z M420 70 C370 30 280 44 250 120 C238 172 258 224 290 252 C330 272 390 222 414 150Z" fill="url(#bmBone)" filter="url(#bmTex)" stroke="#8C7A56" stroke-opacity=".5"/>' +
      '<path d="M206 110 L274 110 L252 290 L228 290Z" fill="url(#bmBone)" filter="url(#bmTex)" stroke="#8C7A56" stroke-opacity=".5"/>' +
      scG('glute', '<path d="M60 250 C60 190 180 180 220 270 C230 330 190 390 130 380 C80 372 60 310 60 250Z" fill="url(#bmMus)" opacity=".6" filter="url(#bmTex)"/>' + scFib(70, 200, 150, 170, 9, '#3a0a10', .35)) +
      scG('femur', '<circle cx="320" cy="300" r="40" fill="url(#bmBone)" filter="url(#bmTex)"/>' + scTube('M312 330 C300 390 290 440 280 500', 54, '#EBDDBC') + scHi(308, 288, 14, 12, 0, .55) + '<circle cx="320" cy="300" r="48" fill="none" stroke="#9EC6E8" stroke-opacity=".6" stroke-width="5"/>') +
      scG('nerve', scTube('M246 240 C220 320 200 400 190 500', 10, '#F2D86E'));
  },
  knee: function () {
    return '<path d="M130 0 C110 120 140 220 170 270 H310 C340 220 370 120 350 0Z" fill="url(#bmMus)" opacity=".28" filter="url(#bmTex)"/>' +
      scTube('M240 -10 L240 150', 128, '#EBDDBC') + '<circle cx="196" cy="182" r="56" fill="url(#bmBone)" filter="url(#bmTex)"/><circle cx="284" cy="182" r="56" fill="url(#bmBone)" filter="url(#bmTex)"/>' +
      '<path d="M146 232 C190 252 290 252 334 232 L334 244 C290 266 190 266 146 244Z" fill="#9EC6E8" opacity=".75"/>' +
      scBone('M140 262 H340 L318 490 H162Z') +
      scG('knee', '<path d="M152 252 C176 286 226 284 242 258 M238 258 C256 284 306 286 330 252" fill="none" stroke="#DCE8F2" stroke-width="16" stroke-linecap="round"/>' + '<path d="M214 226 L270 292 M266 226 L210 292" stroke="#F4EBCB" stroke-width="9" stroke-linecap="round"/>' + '<circle cx="240" cy="146" r="38" fill="url(#bmBone)" stroke="#8C7A56" stroke-opacity=".5" filter="url(#bmTex)"/>' + scHi(228, 134, 14, 10, 0, .5));
  },
  shin: function () {
    return '<path d="M120 0 C100 160 110 330 150 480 H190 L180 0Z M330 0 C350 160 340 330 310 480 H280 L290 0Z" fill="url(#bmMus)" opacity=".6" filter="url(#bmTex)"/>' + scFib(110, 0, 70, 480, 6, '#3a0a10', .35) + scFib(290, 0, 60, 480, 5, '#3a0a10', .35) +
      scG('tibia', scTube('M226 -10 C230 160 226 320 232 490', 62, '#EBDDBC')) + scG('fibula', scTube('M316 -10 C318 160 314 320 318 490', 26, '#E2D2AE')) +
      scTube('M204 60 C190 160 196 300 188 450', 5, '#4F6EC4', .8);
  },
  calf: function () {
    return scG('muscle', '<path d="M164 30 C120 140 120 300 196 398 L240 446 L284 398 C360 300 360 140 316 30 C284 76 196 76 164 30Z" fill="url(#bmMus)" filter="url(#bmTex)"/><path d="M240 60 C236 180 240 300 240 440" stroke="#2A080C" stroke-opacity=".55" stroke-width="4" fill="none"/>' + scFib(150, 60, 180, 340, 12, '#3a0a10', .4) + scHi(190, 190, 28, 90, 8, .28)) +
      scG('veins', '<g opacity=".92">' + scTube('M300 70 C330 150 300 230 270 300 C260 340 270 380 262 420', 8, '#4F6EC4') + scTube('M180 90 C150 170 180 250 206 320 C216 360 210 396 216 424', 7, '#4F6EC4') + scTube('M316 190 C290 200 276 230 270 250 M170 220 C190 232 202 252 208 270', 5, '#6F88D2') + '</g>') +
      '<path d="M214 400 L222 478 H258 L266 400Z" fill="#F1E6B8" filter="url(#bmTex)"/>';
  },
  foot: function () {
    return scG('achilles', scTube('M120 20 C122 100 126 190 128 260', 32, '#F1E6B8')) +
      scG('heel', '<ellipse cx="128" cy="320" rx="62" ry="52" fill="url(#bmBone)" filter="url(#bmTex)" stroke="#8C7A56" stroke-opacity=".5"/>' + scHi(112, 304, 20, 16, 0, .5)) +
      '<ellipse cx="206" cy="246" rx="48" ry="38" fill="url(#bmBone)" filter="url(#bmTex)" stroke="#8C7A56" stroke-opacity=".5"/><rect x="190" y="298" width="64" height="48" rx="20" fill="url(#bmBone)" filter="url(#bmTex)" stroke="#8C7A56" stroke-opacity=".5"/>' +
      '<g>' + scTube('M262 280 C320 280 380 290 430 310', 15, '#EBDDBC') + scTube('M262 300 C320 308 380 322 424 344', 15, '#EBDDBC') + scTube('M262 322 C316 338 370 356 410 376', 14, '#EBDDBC') + '</g>' +
      scG('fascia', '<path d="M112 372 C200 404 310 396 420 356" fill="none" stroke="#F4EBCB" stroke-width="7" stroke-linecap="round"/>');
  },
  lymph: function () {
    var i, r = '', pts = [[150, 150, 38, 22, -20], [250, 120, 34, 20, 10], [330, 190, 40, 24, 30], [200, 260, 44, 26, -10], [310, 330, 36, 22, 20], [120, 350, 34, 20, -30], [230, 400, 38, 22, 5]];
    for (i = 0; i < pts.length; i++) { r += '<ellipse cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" rx="' + pts[i][2] + '" ry="' + pts[i][3] + '" fill="url(#bmLym)" filter="url(#bmTex)" transform="rotate(' + pts[i][4] + ' ' + pts[i][0] + ' ' + pts[i][1] + ')"/>' + scHi(pts[i][0] - 8, pts[i][1] - 6, 12, 7, pts[i][4], .5); }
    return '<ellipse cx="240" cy="240" rx="230" ry="200" fill="#E6C77A" opacity=".1" filter="url(#bmSb)"/>' +
      scTube('M150 150 C190 130 220 126 250 120 L330 190 L310 330 L230 400 L120 350 L200 260 L150 150', 6, '#E9D58A') + scG('nodes', r);
  }
};

(function () { var k; for (k in BM_SC) { (function (id, f) { BM_SC[id] = function () { return scBg() + f(); }; })(k, BM_SC[k]); } })();

/* ---------- далі нічого міняти не потрібно ---------- */
var C = CONFIG, L = C.labels, d = window.drp || {};
if (!d.i) { return; }
/* геометрія: v - вигляд, p - точки на зображенні тіла (координати з вашої картинки), side/ly - де підпис, sc - сцена всередині, hi - що підсвічувати, sys - група */
var GEO = [
  { id: 'head', v: 'front', p: [[480, 103], [448, 153]], side: 'r', ly: 18, sc: 'brain', hi: 'brain', sys: 'head' },
  { id: 'throat', v: 'front', p: [[479, 189], [506, 183]], side: 'r', ly: 74, sc: 'throat', hi: 'larynx', sys: 'head' },
  { id: 'thyroid', v: 'front', at: 'throat', sc: 'throat', hi: 'thyroid', sys: 'endo' },
  { id: 'shoulder', v: 'front', p: [[401, 225]], side: 'l', ly: 112, sc: 'shoulder', hi: 'joint', sys: 'msk' },
  { id: 'lymph', v: 'front', p: [[425, 283]], side: 'l', ly: 160, sc: 'lymph', hi: 'nodes', sys: 'other' },
  { id: 'lungs', v: 'front', p: [[523, 263], [461, 263]], side: 'r', ly: 130, sc: 'lungs', hi: 'lungs', sys: 'resp' },
  { id: 'heart', v: 'front', p: [[498, 293]], side: 'r', ly: 186, sc: 'heart', hi: 'heart', sys: 'cardio' },
  { id: 'liver', v: 'front', p: [[442, 352], [388, 357]], side: 'l', ly: 232, sc: 'abdomen', hi: 'liver', sys: 'gi' },
  { id: 'stomach', v: 'front', p: [[492, 343]], side: 'r', ly: 240, sc: 'abdomen', hi: 'stomach', sys: 'gi' },
  { id: 'intestine', v: 'front', p: [[522, 393], [465, 402], [448, 398], [408, 395], [521, 437]], side: 'r', ly: 292, sc: 'abdomen', hi: 'intestine', sys: 'gi' },
  { id: 'bladder', v: 'front', p: [[472, 446]], side: 'l', ly: 330, sc: 'urinary', hi: 'bladder', sys: 'uro' },
  { id: 'thigh', v: 'front', p: [[429, 509]], side: 'l', ly: 384, sc: 'hip', hi: 'femur', sys: 'msk' },
  { id: 'knee', v: 'front', p: [[440, 608]], side: 'l', ly: 467, sc: 'knee', hi: 'knee', sys: 'msk' },
  { id: 'shin', v: 'front', p: [[441, 682]], side: 'l', ly: 533, sc: 'shin', hi: 'tibia', sys: 'msk' },
  { id: 'foot', v: 'front', p: [[444, 767]], side: 'l', ly: 608, sc: 'foot', hi: 'fascia', sys: 'msk' },
  { id: 'neckb', v: 'back', p: [[746, 178]], side: 'r', ly: 66, sc: 'spine', hi: 'c', sys: 'head' },
  { id: 'shoulderb', v: 'back', p: [[818, 225]], side: 'r', ly: 122, sc: 'shoulder', hi: 'joint', sys: 'msk' },
  { id: 'upperb', v: 'back', p: [[747, 274]], side: 'r', ly: 178, sc: 'spine', hi: 't', sys: 'msk' },
  { id: 'elbow', v: 'back', p: [[834, 349]], side: 'r', ly: 234, sc: 'elbow', hi: 'joint', sys: 'msk' },
  { id: 'lowb', v: 'back', p: [[749, 369]], side: 'r', ly: 288, sc: 'spine', hi: 'l', sys: 'msk' },
  { id: 'kidney', v: 'back', p: [[807, 404]], side: 'r', ly: 342, sc: 'urinary', hi: 'kidney', sys: 'uro' },
  { id: 'glute', v: 'back', p: [[776, 460], [806, 471]], side: 'r', ly: 396, sc: 'hip', hi: 'glute', sys: 'msk' },
  { id: 'thighb', v: 'back', p: [[784, 554]], side: 'r', ly: 450, sc: 'hip', hi: 'nerve', sys: 'msk' },
  { id: 'calf', v: 'back', p: [[789, 669], [704, 696]], side: 'r', ly: 522, sc: 'calf', hi: 'muscle', sys: 'cardio' },
  { id: 'heel', v: 'back', p: [[785, 769]], side: 'r', ly: 604, sc: 'foot', hi: 'heel', sys: 'msk' }
];
var REG = {}, i, g;
for (i = 0; i < GEO.length; i++) { REG[GEO[i].id] = GEO[i]; REG[GEO[i].id].t = C.regions[GEO[i].id]; if (REG[GEO[i].id].t && REG[GEO[i].id].t.sys) { REG[GEO[i].id].sys = REG[GEO[i].id].t.sys; } }
var SYS = {}; for (i = 0; i < C.systems.length; i++) { SYS[C.systems[i].id] = C.systems[i]; }
var IC = {
  head: '<circle cx="12" cy="8" r="4.5"/><path d="M4 21c0-4.5 3.5-7.5 8-7.5s8 3 8 7.5"/>',
  lungs: '<path d="M12 4v9M12 8c-2 2-3.5 3-5.5 3C4 11 2.5 14 2.5 18c0 2 2 2 4 1 2.5-1.2 5.5-3 5.5-6M12 8c2 2 3.5 3 5.5 3 2.5 0 4 3 4 7 0 2-2 2-4 1-2.5-1.2-5.5-3-5.5-6"/>',
  heart: '<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
  stomach: '<path d="M9 3v5c0 3.5 7 2.5 7 7 0 3-2 5.5-5.5 5.5S5 18 5 14.5"/><path d="M13 3v3"/>',
  kidney: '<path d="M8 4c-3 0-4.5 4-4.5 8s2 7 4.5 7 2.5-3 1.2-5.5S9.5 8 8 4zM16 4c3 0 4.5 4 4.5 8s-2 7-4.5 7-2.5-3-1.2-5.5S14.5 8 16 4z"/>',
  bone: '<path d="M7 7a2.5 2.5 0 1 0-3.2 3.3L14 20.5a2.5 2.5 0 1 0 3.2-3.3L7 7zM17 3.5a2.5 2.5 0 1 1 3.2 3.3L10 17"/>',
  thyroid: '<path d="M12 5v13M12 9C9 6 4.5 8 4.5 12.5S9 19 12 16M12 9c3-3 7.5-1 7.5 3.5S15 19 12 16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>'
};
function ico(n, s) { return '<svg viewBox="0 0 24 24" width="' + (s || 26) + '" height="' + (s || 26) + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[n] || IC.plus) + '</svg>'; }
var BOX = { front: [358, 78, 220, 737, 'assets/img/tilo-spereda.webp'], back: [630, 68, 238, 744, 'assets/img/tilo-zzadu.webp'] };   /* x0, y0, ширина, висота вирізки та файл */
function xy(v, X, Y) { var b = BOX[v], s = 650 / b[3]; return [120 - b[2] * s / 2 + (X - b[0]) * s, (Y - b[1]) * s]; }
function figure(v) {
  var b = BOX[v], s = 650 / b[3], w = b[2] * s, h = '<svg class="bm-sv" viewBox="-150 -14 540 664" aria-label="' + (v === 'front' ? L.front : L.back) + '"><image href="' + b[4] + '" x="' + (120 - w / 2).toFixed(1) + '" y="0" width="' + w.toFixed(1) + '" height="650" preserveAspectRatio="none"/>', lb = '', k, j, e, q, ax, ex;
  for (k = 0; k < GEO.length; k++) {
    e = GEO[k]; if (e.v !== v || !e.p) { continue; }
    q = xy(v, e.p[0][0], e.p[0][1]); ax = e.side === 'l' ? -12 : 252; ex = e.side === 'l' ? ax + 16 : ax - 16;
    h += '<path class="bm-ld" d="M' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + ' L' + ex + ' ' + e.ly + ' L' + ax + ' ' + e.ly + '"/>';
    lb += '<button type="button" class="bm-lb ' + e.side + '" data-r="' + e.id + '" style="left:' + ((ax + 150) / 5.4).toFixed(2) + '%;top:' + ((e.ly + 14) / 6.64).toFixed(2) + '%">' + e.t.label + '</button>';
  }
  for (k = 0; k < GEO.length; k++) {
    e = GEO[k]; if (e.v !== v || !e.p) { continue; }
    for (j = 0; j < e.p.length; j++) { q = xy(v, e.p[j][0], e.p[j][1]); h += '<g class="bm-h" data-r="' + e.id + '" transform="translate(' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + ')" tabindex="' + (j ? -1 : 0) + '" role="button" aria-label="' + e.t.name + '"><circle class="pl" r="11"/><circle r="22" fill="transparent"/><title>' + e.t.name + '</title></g>'; }
  }
  return '<div class="bm-fig' + (v === 'front' ? ' on' : '') + '" data-v="' + v + '">' + h + '</svg>' + lb + '</div>';
}
var root = document.getElementById('drp-b10');
root.innerHTML = BM_SC_DEFS +
  '<div class="bm-top drp-rv"><h2 class="drp-h2">' + C.title + '</h2><p class="drp-lead">' + C.text + '</p></div>' +
  '<div class="bm-main"><div class="bm-stage drp-gl drp-rv" id="bm-stage"><div class="bm-tg"><button type="button" class="on" data-v="front">' + L.front + '</button><button type="button" data-v="back">' + L.back + '</button></div>' +
  '<div class="bm-cam" id="bm-cam">' + figure('front') + figure('back') + '</div><div class="bm-tis"></div><div class="bm-sce" id="bm-sce"><svg class="bm-ssv" id="bm-ssv" viewBox="0 0 480 480"></svg><div class="bm-pts" id="bm-pts"></div><div class="bm-vd" id="bm-vd"></div></div>' +
  '<div class="bm-cap" id="bm-cap"><span id="bm-capt"></span><button type="button" class="bm-out" id="bm-out">' + d.i('arrow', 18) + ' ' + L.back2 + '</button></div><div class="bm-hn">' + d.i('pin', 20) + '<span>' + L.hint + '</span></div></div>' +
  '<aside class="bm-side drp-rv" style="--d:2" id="bm-side" aria-live="polite"></aside></div>';
var stage = document.getElementById('bm-stage'), cam = document.getElementById('bm-cam'), sce = document.getElementById('bm-sce'), ssv = document.getElementById('bm-ssv'), side = document.getElementById('bm-side'), capt = document.getElementById('bm-capt');
var pts = document.getElementById('bm-pts'), ph = '', n;
for (n = 0; n < 16; n++) { ph += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 100).toFixed(1) + '%;width:' + (3 + Math.random() * 7).toFixed(1) + 'px;height:' + (3 + Math.random() * 7).toFixed(1) + 'px;animation-duration:' + (6 + Math.random() * 8).toFixed(1) + 's;animation-delay:-' + (Math.random() * 8).toFixed(1) + 's"></i>'; }
pts.innerHTML = ph;
var vd = document.getElementById('bm-vd'), active = null, busy = false, timers = [], reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function later(fn, ms) { timers.push(setTimeout(fn, reduce ? 0 : ms)); }
function clearT() { while (timers.length) { clearTimeout(timers.pop()); } }
function drawList() {
  var h = '<div class="bm-list drp-gl"><h3>' + L.listTitle + '</h3>', k, s;
  for (k = 0; k < C.systems.length; k++) { s = C.systems[k]; h += '<button type="button" data-s="' + s.id + '"><span class="ic">' + ico(s.icon, 26) + '</span><span class="tx"><b>' + s.name + '</b><small>' + s.sub + '</small></span>' + d.i('arrow', 18) + '</button>'; }
  side.innerHTML = h + '</div>';
}
function drawCard(id) {
  var r = REG[id], t = r.t, s = SYS[r.sys], help = t.help || s.help, h, k;
  h = '<div class="bm-card drp-gl"><button type="button" class="bm-x" id="bm-x" aria-label="' + L.back2 + '">&times;</button><div class="bm-ch"><span class="ic">' + ico(s.icon, 34) + '</span><div><h3>' + t.name + '</h3><small>' + s.name + '</small></div></div>' +
    '<p class="cs"><b>' + L.causes + '</b> ' + t.causes + '</p><h4>' + L.symptoms + '</h4><ul class="sy">';
  for (k = 0; k < t.symptoms.length; k++) { h += '<li>' + t.symptoms[k] + '</li>'; }
  h += '</ul><h4>' + L.help + '</h4><ul class="hp">';
  for (k = 0; k < help.length; k++) { h += '<li>' + d.i('check', 18) + '<span>' + help[k] + '</span></li>'; }
  h += '</ul>';
  if (t.urgent) { h += '<div class="ug">' + d.i('alert', 22) + '<span><b>' + L.urgent + ':</b> ' + t.urgent + '</span></div>'; }
  h += '<a class="drp-btn drp-k" href="#drp-book" data-pick="' + C.service + '">' + d.i('cal', 20) + L.book + '</a><p class="ds">' + L.disclaimer + '</p></div>';
  side.innerHTML = h;
}
function setFig(v) {
  var f = cam.querySelectorAll('.bm-fig'), b = stage.querySelectorAll('.bm-tg button'), k;
  for (k = 0; k < f.length; k++) { f[k].classList.toggle('on', f[k].getAttribute('data-v') === v); }
  for (k = 0; k < b.length; k++) { b[k].classList.toggle('on', b[k].getAttribute('data-v') === v); }
}
function playVideo(sc) {
  stopVideo();
  var v = document.createElement('video'), tried = 0, urls = ['video/' + sc + '.mp4', 'video/' + sc + '.webm'];
  v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'auto'; v.className = 'bm-vid';
  v.addEventListener('canplay', function () { v.classList.add('on'); if (v.play) { var pr = v.play(); if (pr && pr.catch) { pr.catch(function () {}); } } });
  v.addEventListener('error', function () { tried++; if (tried < urls.length) { v.src = urls[tried]; } else { v.remove(); } });
  v.src = urls[0]; vd.appendChild(v);
}
function stopVideo() { var v = vd.querySelector('video'); if (v) { v.pause(); v.removeAttribute('src'); v.load(); v.remove(); } vd.innerHTML = ''; }
function dive(id) {
  if (busy || active || !REG[id]) { return; }
  var r = REG[id], dot, rb, sb, X, Y, k, gs;
  busy = true; active = id; setFig(r.v);
  dot = stage.querySelector('.bm-fig.on .bm-h[data-r="' + (r.at || id) + '"]'); rb = dot.getBoundingClientRect(); sb = stage.getBoundingClientRect();
  X = rb.left + rb.width / 2 - sb.left; Y = rb.top + rb.height / 2 - sb.top;
  cam.style.transformOrigin = X + 'px ' + Y + 'px';
  stage.classList.add('diving'); drawCard(id);
  cam.style.transform = 'translate(' + (sb.width / 2 - X) + 'px,' + (sb.height / 2 - Y) + 'px) scale(' + (sb.width < 520 ? 5 : 4.2) + ')';
  ssv.innerHTML = BM_SC[r.sc](); gs = ssv.querySelectorAll('[data-h]');
  for (k = 0; k < gs.length; k++) { gs[k].classList.toggle('on', gs[k].getAttribute('data-h') === r.hi); }
  capt.textContent = r.t.name + ' · ' + L.inside;
  playVideo(r.sc);
  later(function () { stage.classList.add('tis'); }, 760);
  later(function () { stage.classList.add('bm-in'); }, 1150);
  later(function () { stage.classList.remove('tis'); busy = false; if (window.innerWidth < 900 && side.scrollIntoView) { side.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } }, 2100);
}
function leave() {
  if (!active) { return; }
  clearT(); busy = true; stage.classList.remove('bm-in'); stage.classList.remove('tis'); later(stopVideo, 900);
  cam.style.transform = '';
  later(function () { stage.classList.remove('diving'); active = null; busy = false; drawList(); }, 1050);
}
stage.addEventListener('click', function (e) {
  var h = e.target.closest ? e.target.closest('.bm-h, .bm-lb') : null; if (h) { dive(h.getAttribute('data-r')); return; }
  var b = e.target.closest ? e.target.closest('.bm-tg button') : null; if (b && !active) { setFig(b.getAttribute('data-v')); return; }
  if (e.target.closest && e.target.closest('#bm-out')) { leave(); }
});
stage.addEventListener('keydown', function (e) { var h = e.target.closest ? e.target.closest('.bm-h') : null; if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); dive(h.getAttribute('data-r')); } });
stage.addEventListener('mouseover', function (e) { var h = e.target.closest ? e.target.closest('.bm-h, .bm-lb') : null; if (!h || active) { return; } var r = h.getAttribute('data-r'), a = stage.querySelectorAll('[data-r="' + r + '"]'), k; for (k = 0; k < a.length; k++) { a[k].classList.add('hl'); } });
stage.addEventListener('mouseout', function () { var a = stage.querySelectorAll('.hl'), k; for (k = 0; k < a.length; k++) { a[k].classList.remove('hl'); } });
side.addEventListener('click', function (e) {
  var b = e.target.closest ? e.target.closest('button') : null; if (!b) { return; }
  if (b.id === 'bm-x') { leave(); return; }
  if (b.getAttribute('data-s')) { dive(SYS[b.getAttribute('data-s')].first); }
});
sce.addEventListener('mousemove', function (e) { var r = sce.getBoundingClientRect(); ssv.style.translate = (((e.clientX - r.left) / r.width - .5) * -16).toFixed(1) + 'px ' + (((e.clientY - r.top) / r.height - .5) * -12).toFixed(1) + 'px'; });
drawList(); d.reveal();

})();
