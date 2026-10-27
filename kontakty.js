/* ============================================================
   КОНТАКТИ САЙТУ - змінюйте ТІЛЬКИ цей файл.
   Усе нижче автоматично підставляється в шапку, форму запису, QR-коди,
   підвал і дані для Google. Міняйте текст між лапками.
   Лапки, коми й дужки не видаляйте.
   ФОТО тут вказувати не потрібно: просто завантажте файли в папку foto
   (див. foto/README.txt).
   ============================================================ */
window.SITE = {
  siteName: 'Dr. Prokopchuk',   /* ЗМІНИТИ - назва для Google */
  phone: {
    show: '068 040 76 20',   /* ЗМІНИТИ - як телефон виглядає на сайті */
    tel: '+380680407620'   /* ЗМІНИТИ - для дзвінка: плюс, код країни, номер, без пробілів */
  },
  email: 'yuliya.leshuk@i.ua',   /* ЗМІНИТИ - ваша електронна пошта */
  telegram: {
    user: '',   /* ЗМІНИТИ - ваш нік у Telegram БЕЗ @ (наприклад doctor_lilia). Тоді текст заявки підставляється в чат сам */
    link: 'https://t.me/+380680407620'   /* ЗМІНИТИ - запасне посилання, якщо ніку немає (змініть номер у кінці) */
  },
  viber: 'viber://chat?number=%2B380680407620',   /* ЗМІНИТИ - посилання Viber (після %2B стоїть номер без плюса) */
  address: 'м. Вінниця, вул. Набережна, 8',   /* ЗМІНИТИ - адреса прийому */
  photos: {   /* ЗМІНИТИ - фото: вставте пряме посилання на зображення між лапками. Якщо залишити '', фото береться з папки foto (foto-1.jpg ...) */
    hero: 'https://i.ibb.co/m5MNzmBr/01-hero-foto-likarya-900x1125.jpg',   /* ЗМІНИТИ - велике фото лікаря на першому екрані */
    small: 'https://i.ibb.co/pB0hyk2H/04-galereya-1-prijom-pacienta-1000x1000.jpg',   /* ЗМІНИТИ - маленьке фото на першому екрані (прийом пацієнта) */
    about: 'https://i.ibb.co/fGKSk8PF/06-galereya-3-likar-1000x700.jpg',   /* ЗМІНИТИ - фото в секції Про лікаря */
    experience: 'https://i.ibb.co/fGKSk8PF/06-galereya-3-likar-1000x700.jpg'   /* ЗМІНИТИ - фото в секції Досвід */
  },
  photoAlt: 'Лікар Валерія Прокопчук'   /* ЗМІНИТИ - підпис до фото (для пошуку й незрячих користувачів) */
};

/* Дані про лікаря для Google: беруться з налаштувань вище, змінювати не потрібно */
(function () {
  var S = window.SITE;
  try {
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Physician', name: S.siteName, telephone: S.phone.tel, medicalSpecialty: ['Family medicine', 'Psychiatry'], address: { '@type': 'PostalAddress', streetAddress: 'вул. Набережна, 8', addressLocality: 'Вінниця', addressCountry: 'UA' } });
    document.head.appendChild(el);
  } catch (e) {}
})();
