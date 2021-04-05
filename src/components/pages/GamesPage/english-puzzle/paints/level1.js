const paintings1 = [
  {
    id: "5e9f5ee35eb9e72bc21af6f8",
    group: 1,
    page: 0,
    word: "because",
    image: "files/01_0601.jpg",
    audio: "files/01_0601.mp3",
    audioMeaning: "files/01_0601_meaning.mp3",
    audioExample: "files/01_0601_example.mp3",
    textMeaning: "<i>Because</i> introduces a reason for something.",
    textExample: "We need to study <b>because</b> we have a test tomorrow.",
    transcription: "[bikɔ́ːz]",
    textExampleTranslate: "Нам нужно учиться, потому что завтра у нас тест",
    textMeaningTranslate: "Потому что вводит причину чего-то",
    wordTranslate: "потому что",
  },
  {
    id: "5e9f5ee35eb9e72bc21af6fb",
    group: 1,
    page: 0,
    word: "flower",
    image: "files/01_0604.jpg",
    audio: "files/01_0604.mp3",
    audioMeaning: "files/01_0604_meaning.mp3",
    audioExample: "files/01_0604_example.mp3",
    textMeaning: "A <i>flower</i> is the colored part of a plant.",
    textExample: "She gave pink <b>flowers</b> to her grandmother.",
    transcription: "[fáuər]",
    textExampleTranslate: "Она дала розовые цветы своей бабушке",
    textMeaningTranslate: "Цветок - это цветная часть растения",
    wordTranslate: "цветок",
  },
  {
    id: "5e9f5ee35eb9e72bc21af6fa",
    group: 1,
    page: 0,
    word: "expensive",
    image: "files/01_0603.jpg",
    audio: "files/01_0603.mp3",
    audioMeaning: "files/01_0603_meaning.mp3",
    audioExample: "files/01_0603_example.mp3",
    textMeaning: "<i>Expensive</i> things cost a lot of money.",
    textExample: "My friend drives an <b>expensive</b> sports car.",
    transcription: "[ikspénsiv]",
    textExampleTranslate: "Мой друг водит дорогой спортивный автомобиль",
    textMeaningTranslate: "Дорогие вещи стоят больших денег",
    wordTranslate: "дорогой",
  },
  {
    id: "5e9f5ee35eb9e72bc21af6f9",
    group: 1,
    page: 0,
    word: "east",
    image: "files/01_0602.jpg",
    audio: "files/01_0602.mp3",
    audioMeaning: "files/01_0602_meaning.mp3",
    audioExample: "files/01_0602_example.mp3",
    textMeaning: "<i>East</i> is the direction the sun rises from.",
    textExample:
      "My window looks to the <b>east</b>, so I can watch the sunrise every morning.",
    transcription: "[iːst]",
    textExampleTranslate:
      "Мое окно смотрит на восток, поэтому я могу наблюдать восход солнца каждое утро",
    textMeaningTranslate:
      "Восток - это направление, из которого восходит солнце",
    wordTranslate: "восток",
  },
  {
    id: "5e9f5ee35eb9e72bc21af6fc",
    group: 1,
    page: 0,
    word: "garden",
    image: "files/01_0605.jpg",
    audio: "files/01_0605.mp3",
    audioMeaning: "files/01_0605_meaning.mp3",
    audioExample: "files/01_0605_example.mp3",
    textMeaning: "A <i>garden</i> is an area where people grow plants.",
    textExample: "The <b>garden</b> is very bright and colorful in the spring.",
    transcription: "[gάːrdn]",
    textExampleTranslate: "Сад очень яркий и красочный весной",
    textMeaningTranslate: "Сад - это место, где люди выращивают растения",
    wordTranslate: "сад",
  },
  {
    id: "5e9f5ee35eb9e72bc21af6fd",
    group: 1,
    page: 0,
    word: "holiday",
    image: "files/01_0606.jpg",
    audio: "files/01_0606.mp3",
    audioMeaning: "files/01_0606_meaning.mp3",
    audioExample: "files/01_0606_example.mp3",
    textMeaning: "A <i>holiday</i> is a special day of celebration.",
    textExample: "Monday was a <b>holiday</b>, so there was no school or work.",
    transcription: "[hάlədèi]",
    textExampleTranslate:
      "Понедельник был выходным, поэтому не было школы или работы",
    textMeaningTranslate: "Праздник - особый день празднования",
    wordTranslate: "праздничный день",
  },
  {
    id: "5e9f5ee35eb9e72bc21af6fe",
    group: 1,
    page: 0,
    word: "many",
    image: "files/01_0607.jpg",
    audio: "files/01_0607.mp3",
    audioMeaning: "files/01_0607_meaning.mp3",
    audioExample: "files/01_0607_example.mp3",
    textMeaning: "<i>Many</i> shows that there is a large number of something.",
    textExample: "There are <b>many</b> people on the street.",
    transcription: "[méni]",
    textExampleTranslate: "На улице много людей",
    textMeaningTranslate: "Многие показывают, что есть много чего-то",
    wordTranslate: "многие",
  },
  {
    id: "5e9f5ee35eb9e72bc21af700",
    group: 1,
    page: 0,
    word: "mountain",
    image: "files/01_0609.jpg",
    audio: "files/01_0609.mp3",
    audioMeaning: "files/01_0609_meaning.mp3",
    audioExample: "files/01_0609_example.mp3",
    textMeaning: "A <i>mountain</i> is a very high hill.",
    textExample: "Mount Everest is the highest <b>mountain</b> in the world.",
    transcription: "[máuntən]",
    textExampleTranslate: "Гора Эверест - самая высокая гора в мире",
    textMeaningTranslate: "Гора - это очень высокий холм",
    wordTranslate: "гора",
  },
  {
    id: "5e9f5ee35eb9e72bc21af6ff",
    group: 1,
    page: 0,
    word: "million",
    image: "files/01_0608.jpg",
    audio: "files/01_0608.mp3",
    audioMeaning: "files/01_0608_meaning.mp3",
    audioExample: "files/01_0608_example.mp3",
    textMeaning:
      "A <i>million</i> is another way to write the number 1,000,000.",
    textExample: "Almost 19 <b>million</b> people live in Delhi, India.",
    transcription: "[míljən]",
    textExampleTranslate: "Почти 19 миллионов человек живут в Дели, Индия",
    textMeaningTranslate:
      "Миллион - это еще один способ написать число 1 000 000",
    wordTranslate: "миллион",
  },
  {
    id: "5e9f5ee35eb9e72bc21af702",
    group: 1,
    page: 0,
    word: "popular",
    image: "files/01_0611.jpg",
    audio: "files/01_0611.mp3",
    audioMeaning: "files/01_0611_meaning.mp3",
    audioExample: "files/01_0611_example.mp3",
    textMeaning: "A <i>popular</i> thing is liked by many people.",
    textExample: "These people are listening to a <b>popular</b> man speak.",
    transcription: "[pάpjulər]",
    textExampleTranslate: "Эти люди слушают разговор популярного человека",
    textMeaningTranslate: "Популярная вещь нравится многим людям",
    wordTranslate: "популярный",
  },
  {
    id: "5e9f5ee35eb9e72bc21af701",
    group: 1,
    page: 0,
    word: "place",
    image: "files/01_0610.jpg",
    audio: "files/01_0610.mp3",
    audioMeaning: "files/01_0610_meaning.mp3",
    audioExample: "files/01_0610_example.mp3",
    textMeaning: "A <i>place</i> is a space or area.",
    textExample: "A library is a <b>place</b> where people can read books.",
    transcription: "[pleis]",
    textExampleTranslate: "Библиотека - это место, где люди могут читать книги",
    textMeaningTranslate: "Место - это пространство или область",
    wordTranslate: "место",
  },
  {
    id: "5e9f5ee35eb9e72bc21af703",
    group: 1,
    page: 0,
    word: "ski",
    image: "files/01_0612.jpg",
    audio: "files/01_0612.mp3",
    audioMeaning: "files/01_0612_meaning.mp3",
    audioExample: "files/01_0612_example.mp3",
    textMeaning:
      "To <i>ski</i> is to glide on long pieces of wood or metal over snow.",
    textExample: "The man likes to <b>ski</b> and goes every weekend.",
    transcription: "[skiː]",
    textExampleTranslate:
      "Мужчина любит кататься на лыжах и ездит каждые выходные",
    textMeaningTranslate:
      "Кататься на лыжах - значит скользить по длинным кускам дерева или металла по снегу",
    wordTranslate: "лыжи",
  },
  {
    id: "5e9f5ee35eb9e72bc21af704",
    group: 1,
    page: 0,
    word: "tower",
    image: "files/01_0615.jpg",
    audio: "files/01_0615.mp3",
    audioMeaning: "files/01_0615_meaning.mp3",
    audioExample: "files/01_0615_example.mp3",
    textMeaning: "A <i>tower</i> is a tall, narrow building.",
    textExample: "This is a very famous <b>tower</b> in Italy.",
    transcription: "[táuər]",
    textExampleTranslate: "Это очень известная башня в Италии",
    textMeaningTranslate: "Башня - это высокое узкое здание",
    wordTranslate: "башня",
  },
  {
    id: "5e9f5ee35eb9e72bc21af705",
    group: 1,
    page: 0,
    word: "such",
    image: "files/01_0613.jpg",
    audio: "files/01_0613.mp3",
    audioMeaning: "files/01_0613_meaning.mp3",
    audioExample: "files/01_0613_example.mp3",
    textMeaning: "<i>Such</i> means “like this”.",
    textExample: "I have never seen <b>such</b> a beautiful sunset before.",
    transcription: "[sʌtʃ]",
    textExampleTranslate: "Я никогда раньше не видел такой красивый закат",
    textMeaningTranslate: "Такие означает 'как это'",
    wordTranslate: "такой",
  },
  {
    id: "5e9f5ee35eb9e72bc21af706",
    group: 1,
    page: 0,
    word: "total",
    image: "files/01_0614.jpg",
    audio: "files/01_0614.mp3",
    audioMeaning: "files/01_0614_meaning.mp3",
    audioExample: "files/01_0614_example.mp3",
    textMeaning:
      "<i>Total</i> shows that everyone or everything has been counted.",
    textExample: ".The <b>total</b> cost of the items she bought was $52.",
    transcription: "[tóutl]",
    textExampleTranslate:
      "Общая стоимость предметов, которые она купила, составила 52 доллара",
    textMeaningTranslate: "Всего показывает, что все или все было посчитано",
    wordTranslate: "всего",
  },
  {
    id: "5e9f5ee35eb9e72bc21af707",
    group: 1,
    page: 0,
    word: "town",
    image: "files/01_0616.jpg",
    audio: "files/01_0616.mp3",
    audioMeaning: "files/01_0616_meaning.mp3",
    audioExample: "files/01_0616_example.mp3",
    textMeaning:
      "A <i>town</i> is a place where people live and work, and is smaller than a city.",
    textExample:
      "I come from a small <b>town</b>, and everyone there knows each other.",
    transcription: "[taun]",
    textExampleTranslate: "Я из маленького городка, и все там знают друг друга",
    textMeaningTranslate:
      "Город - это место, где люди живут и работают, и он меньше города",
    wordTranslate: "город",
  },
  {
    id: "5e9f5ee35eb9e72bc21af708",
    group: 1,
    page: 0,
    word: "train",
    image: "files/01_0617.jpg",
    audio: "files/01_0617.mp3",
    audioMeaning: "files/01_0617_meaning.mp3",
    audioExample: "files/01_0617_example.mp3",
    textMeaning:
      "A <i>train</i> is a group of railway cars connected together.",
    textExample:
      "The <b>train</b> is very fast, so we can get home in one hour.",
    transcription: "[trein]",
    textExampleTranslate:
      "Поезд очень быстрый, поэтому мы можем добраться домой за один час",
    textMeaningTranslate:
      "Поезд - это группа железнодорожных вагонов, соединенных вместе",
    wordTranslate: "поезд",
  },
  {
    id: "5e9f5ee35eb9e72bc21af709",
    group: 1,
    page: 0,
    word: "walk",
    image: "files/01_0618.jpg",
    audio: "files/01_0618.mp3",
    audioMeaning: "files/01_0618_meaning.mp3",
    audioExample: "files/01_0618_example.mp3",
    textMeaning:
      "To <i>walk</i> is to move forward using legs, but it is slower than running.",
    textExample: "The children <b>walk</b> to school in the morning.",
    transcription: "[wɔːk]",
    textExampleTranslate: "Дети гуляют в школу по утрам",
    textMeaningTranslate:
      "Ходить - значит двигаться вперед, используя ноги, но это медленнее, чем бег",
    wordTranslate: "ходить",
  },
  {
    id: "5e9f5ee35eb9e72bc21af70a",
    group: 1,
    page: 0,
    word: "world",
    image: "files/01_0620.jpg",
    audio: "files/01_0620.mp3",
    audioMeaning: "files/01_0620_meaning.mp3",
    audioExample: "files/01_0620_example.mp3",
    textMeaning:
      "The <i>world</i> is the Earth and all the people and things in it.",
    textExample: "What are the names of the five oceans of the <b>world</b>?",
    transcription: "[wəːrld]",
    textExampleTranslate: "Как называются пять океанов мира?",
    textMeaningTranslate: "Мир - это Земля и все люди и вещи в ней",
    wordTranslate: "мир",
  },
  {
    id: "5e9f5ee35eb9e72bc21af70b",
    group: 1,
    page: 0,
    word: "watch",
    image: "files/01_0619.jpg",
    audio: "files/01_0619.mp3",
    audioMeaning: "files/01_0619_meaning.mp3",
    audioExample: "files/01_0619_example.mp3",
    textMeaning:
      "To <i>watch</i> is to look at someone or something for a period of time.",
    textExample: "My friend came over to <b>watch</b> a movie with me.",
    transcription: "[waʧ]",
    textExampleTranslate: "Мой друг пришел посмотреть фильм со мной",
    textMeaningTranslate:
      "Смотреть - значит смотреть на кого-то или что-то в течение определенного периода времени",
    wordTranslate: "смотреть",
  },
]

export default paintings1
