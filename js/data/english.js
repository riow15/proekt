'use strict';
/* ============ Английский язык 2–11 ============ */

const VOC = {
  colors: 'red:красный, blue:синий, green:зелёный, yellow:жёлтый, black:чёрный, white:белый, orange:оранжевый, pink:розовый, brown:коричневый, grey:серый, purple:фиолетовый',
  animals: 'cat:кошка, dog:собака, cow:корова, horse:лошадь, pig:свинья, frog:лягушка, rabbit:кролик, bear:медведь, fox:лиса, wolf:волк, mouse:мышь, bird:птица, fish:рыба, monkey:обезьяна, elephant:слон, lion:лев, tiger:тигр, duck:утка, sheep:овца, hen:курица, snake:змея, crocodile:крокодил, giraffe:жираф, owl:сова',
  family: 'mother:мама, father:папа, sister:сестра, brother:брат, grandmother:бабушка, grandfather:дедушка, aunt:тётя, uncle:дядя, son:сын, daughter:дочь, parents:родители, family:семья, baby:малыш, twins:близнецы',
  numbers: 'one:один, two:два, three:три, four:четыре, five:пять, six:шесть, seven:семь, eight:восемь, nine:девять, ten:десять, eleven:одиннадцать, twelve:двенадцать, thirteen:тринадцать, fifteen:пятнадцать, twenty:двадцать, thirty:тридцать, forty:сорок, a hundred:сто',
  school: 'pen:ручка, pencil:карандаш, book:книга, ruler:линейка, rubber:ластик, desk:парта, schoolbag:портфель, teacher:учитель, pupil:ученик, maths:математика, history:история, science:естествознание, music:музыка, art:рисование (ИЗО), lesson:урок, timetable:расписание, pencil case:пенал, break:перемена, homework:домашнее задание',
  food: 'bread:хлеб, milk:молоко, cheese:сыр, apple:яблоко, banana:банан, egg:яйцо, meat:мясо, soup:суп, juice:сок, tea:чай, water:вода, sugar:сахар, butter:сливочное масло, potato:картофель, carrot:морковь, cake:торт, ice cream:мороженое, sandwich:бутерброд, porridge:каша, sausage:колбаса, orange:апельсин, tomato:помидор',
  time: 'morning:утро, evening:вечер, night:ночь, week:неделя, month:месяц, year:год, hour:час, minute:минута, Monday:понедельник, Tuesday:вторник, Wednesday:среда, Thursday:четверг, Friday:пятница, Saturday:суббота, Sunday:воскресенье, get up:вставать, have breakfast:завтракать, go to bed:ложиться спать, weekend:выходные',
  weather: 'sunny:солнечно, rainy:дождливо, windy:ветрено, cloudy:облачно, snowy:снежно, cold:холодно, hot:жарко, warm:тепло, spring:весна, summer:лето, autumn:осень, winter:зима, season:время года, umbrella:зонт, foggy:туманно, storm:буря',
  house: 'kitchen:кухня, bedroom:спальня, bathroom:ванная, living room:гостиная, hall:прихожая, sofa:диван, armchair:кресло, bed:кровать, wardrobe:платяной шкаф, fridge:холодильник, cooker:плита, carpet:ковёр, mirror:зеркало, window:окно, door:дверь, roof:крыша, garden:сад, stairs:лестница, lamp:лампа, bookcase:книжный шкаф',
  sport: 'football:футбол, swimming:плавание, skating:катание на коньках, skiing:катание на лыжах, chess:шахматы, collect stamps:коллекционировать марки, draw:рисовать, dance:танцевать, play the guitar:играть на гитаре, hobby:хобби, team:команда, win:побеждать, lose:проигрывать, match:матч, coach:тренер, competition:соревнование',
  appearance: 'tall:высокий, short:невысокий, slim:стройный, plump:полный, curly:кудрявый, fair:светлый (о волосах), kind:добрый, clever:умный, lazy:ленивый, brave:храбрый, shy:застенчивый, friendly:дружелюбный, honest:честный, rude:грубый, polite:вежливый, generous:щедрый, selfish:эгоистичный, hard-working:трудолюбивый, cheerful:жизнерадостный',
  travel: 'luggage:багаж, ticket:билет, passport:паспорт, flight:рейс, departure:отправление, arrival:прибытие, platform:платформа, customs:таможня, sightseeing:осмотр достопримечательностей, destination:пункт назначения, journey:поездка, book a room:забронировать номер, delay:задержка, guide:гид, souvenir:сувенир, abroad:за границей',
  ecology: 'pollution:загрязнение, environment:окружающая среда, recycle:перерабатывать, rubbish:мусор, endangered:исчезающий (о виде), species:вид (биол.), climate:климат, global warming:глобальное потепление, deforestation:вырубка лесов, protect:защищать, waste:отходы, renewable:возобновляемый, flood:наводнение, drought:засуха, earthquake:землетрясение',
  tech: 'device:устройство, screen:экран, download:скачивать, invention:изобретение, inventor:изобретатель, software:программное обеспечение, keyboard:клавиатура, battery:аккумулятор, charge:заряжать, research:исследование, gadget:гаджет, search engine:поисковая система, password:пароль, update:обновление, network:сеть',
  career: 'career:карьера, employer:работодатель, employee:сотрудник, salary:зарплата, interview:собеседование, experience:опыт, degree:учёная степень, apply for:подавать заявление на, skills:навыки, graduate:выпускник, lawyer:юрист, engineer:инженер, surgeon:хирург, qualification:квалификация, vacancy:вакансия, responsibility:ответственность',
};
const vocab = key => VOC[key].split(',').map(s => s.trim().split(':'));

DB.gen('vocab', ({ key }) => {
  const list = vocab(key);
  const [en, ru] = R.pick(list);
  if (R.chance(0.5)) return { q: `Переведите слово: ${en}`, a: ru, w: R.others(list.map(x => x[1]), ru) };
  return { q: `Как по-английски «${ru}»?`, a: en, w: R.others(list.map(x => x[0]), en) };
});

const IRREG = ('be:was/were:been:быть, begin:began:begun:начинать, break:broke:broken:ломать, bring:brought:brought:приносить, build:built:built:строить, buy:bought:bought:покупать, catch:caught:caught:ловить, choose:chose:chosen:выбирать, come:came:come:приходить, cut:cut:cut:резать, do:did:done:делать, draw:drew:drawn:рисовать, drink:drank:drunk:пить, drive:drove:driven:водить (машину), eat:ate:eaten:есть, fall:fell:fallen:падать, feel:felt:felt:чувствовать, find:found:found:находить, fly:flew:flown:летать, forget:forgot:forgotten:забывать, get:got:got:получать, give:gave:given:давать, go:went:gone:идти, grow:grew:grown:расти, have:had:had:иметь, hear:heard:heard:слышать, keep:kept:kept:хранить, know:knew:known:знать, leave:left:left:покидать, lose:lost:lost:терять, make:made:made:делать (изготавливать), meet:met:met:встречать, pay:paid:paid:платить, put:put:put:класть, read:read:read:читать, ride:rode:ridden:ездить верхом, ring:rang:rung:звонить, run:ran:run:бегать, say:said:said:сказать, see:saw:seen:видеть, sell:sold:sold:продавать, send:sent:sent:посылать, sing:sang:sung:петь, sit:sat:sat:сидеть, sleep:slept:slept:спать, speak:spoke:spoken:говорить, spend:spent:spent:тратить, stand:stood:stood:стоять, swim:swam:swum:плавать, take:took:taken:брать, teach:taught:taught:обучать, tell:told:told:рассказывать, think:thought:thought:думать, throw:threw:thrown:бросать, understand:understood:understood:понимать, wear:wore:worn:носить (одежду), win:won:won:побеждать, write:wrote:written:писать')
  .split(',').map(s => s.trim().split(':'));

DB.gen('irregular', ({ forms = [1, 2] }) => {
  const [v1, v2, v3, ru] = R.pick(IRREG);
  const f = R.pick(forms);
  const fake = [`${v1}ed`, `${v1.replace(/e$/, '')}ed`];
  if (f === 1) return { q: `Вторая форма (Past Simple) глагола «${v1}»:`, a: v2, w: [...R.others(IRREG.map(x => x[1]), v2, 2), ...fake] };
  if (f === 2) return { q: `Третья форма (Past Participle) глагола «${v1}»:`, a: v3, w: [...R.others(IRREG.map(x => x[2]), v3, 2), ...fake] };
  return { q: `Как переводится глагол «${v1} – ${v2} – ${v3}»?`, a: ru, w: R.others(IRREG.map(x => x[3]), ru) };
});

const ADJ = ['big:bigger:the biggest', 'good:better:the best', 'bad:worse:the worst', 'happy:happier:the happiest', 'beautiful:more beautiful:the most beautiful', 'tall:taller:the tallest', 'hot:hotter:the hottest', 'interesting:more interesting:the most interesting', 'long:longer:the longest', 'small:smaller:the smallest', 'fast:faster:the fastest', 'easy:easier:the easiest', 'expensive:more expensive:the most expensive', 'little:less:the least', 'cold:colder:the coldest', 'large:larger:the largest', 'funny:funnier:the funniest', 'difficult:more difficult:the most difficult', 'many:more:the most', 'thin:thinner:the thinnest'].map(s => s.split(':'));

DB.gen('compare', () => {
  const [a, c, s] = R.pick(ADJ);
  const wrongC = [`more ${a}`, `${a}er`, `${a}ier`, s, c.startsWith('more') ? `${a}er` : `more ${c}`];
  const wrongS = [`the most ${a}`, `the ${a}est`, c, `most ${a}`];
  if (R.chance(0.5)) return { q: `Сравнительная степень прилагательного «${a}»:`, a: c, w: R.sample(wrongC.filter(x => x !== c), 3) };
  return { q: `Превосходная степень прилагательного «${a}»:`, a: s, w: R.sample(wrongS.filter(x => x !== s), 3) };
});

const PLURAL = ['child:children', 'man:men', 'woman:women', 'mouse:mice', 'tooth:teeth', 'foot:feet', 'box:boxes', 'baby:babies', 'knife:knives', 'sheep:sheep','boy:boys', 'tomato:tomatoes', 'bus:buses', 'city:cities', 'leaf:leaves', 'goose:geese', 'dress:dresses', 'toy:toys', 'wolf:wolves', 'watch:watches', 'lady:ladies', 'day:days', 'photo:photos'].map(s => s.split(':'));

DB.gen('plural', () => {
  const [s, p] = R.pick(PLURAL);
  const w = [`${s}s`, `${s}es`, `${s.replace(/y$/, '')}ies`, `${s}ren`, `${s.replace(/fe?$/, '')}ves`];
  return { q: `Множественное число слова «${s}»:`, a: p, w: R.sample([...new Set(w)].filter(x => x !== p), 3) };
});

const v = key => [['vocab', { key }]];

DB.subject({
  id: 'english', name: 'Английский язык', short: 'En', color: '#1B7F3B',
  grades: {
    2: [
      { t: 'Алфавит. Цвета', gen: v('colors'), q: [
        'Сколько букв в английском алфавите? | 26 | 33 | 24 | 28',
        'Какая буква идёт после «G»? | H | F | J | I',
        'Какая буква последняя в алфавите? | Z | Y | X | W',
        'Какая из букв гласная? | E | B | K | T',
      ] },
      { t: 'Животные', gen: v('animals'), q: [
        'Как сказать «У меня есть собака»? | I have got a dog. | I has got a dog. | I am a dog. | I got have a dog.',
        'Какой неопределённый артикль нужен: ___ elephant | an | a | the | —',
      ] },
      { t: 'Моя семья', gen: v('family'), q: [
        'Как сказать «Это моя мама»? | This is my mum. | This my mum. | It my mum is. | This are my mum.',
        'Как ответить на вопрос «What is your name?» | My name is Ann. | I am fine. | I am ten. | Yes, it is.',
        'Как ответить на вопрос «How old are you?» | I am eight. | I am fine. | My name is Tom. | It is red.',
      ] },
      { t: 'Числа', gen: v('numbers'), q: [
        'Сколько будет «two plus three»? | five | six | four | seven',
        'Сколько будет «ten minus four»? | six | four | seven | five',
      ] },
      { t: 'Глагол to be', q: [
        'I ___ a pupil. | am | is | are | be',
        'She ___ my sister. | is | am | are | be',
        'They ___ friends. | are | is | am | be',
        'It ___ a cat. | is | are | am | be',
        'We ___ happy. | are | is | am | be',
        'You ___ tall. | are | is | am | be',
        'He ___ a doctor. | is | am | are | be',
        'I ___ not hungry. | am | is | are | be',
        '___ she your friend? | Is | Am | Are | Do',
        'Как сказать «Мы не дома»? | We aren’t at home. | We isn’t at home. | We am not at home. | We not at home.',
      ] },
    ],
    3: [
      { t: 'Школа и школьные принадлежности', gen: v('school'), q: [
        'What is it? — ___ is a pen. | It | He | She | They',
        'Как сказать «Открой книгу»? | Open your book. | Close your book. | Read your book. | Take your book.',
      ] },
      { t: 'Еда', gen: v('food'), q: [
        'I like ___ apples. | — (без артикля) | a | an | the',
        'Как вежливо попросить? | Can I have some juice, please? | Give me juice! | Juice me! | I juice want.',
        'Какое слово неисчисляемое? | milk | apple | egg | banana',
      ] },
      { t: 'Present Simple', q: [
        'He ___ football every day. | plays | play | playing | is play',
        'I ___ like milk. | don’t | doesn’t | am not | isn’t',
        'She ___ like fish. | doesn’t | don’t | isn’t | not',
        '___ you like pizza? | Do | Does | Are | Is',
        '___ your brother swim? | Does | Do | Is | Are',
        'My mum ___ in a hospital. | works | work | working | is work',
        'Какое слово-маркер Present Simple? | usually | now | yesterday | tomorrow',
        'They ___ in Moscow. | live | lives | living | is live',
        'Какое окончание добавляется к глаголу с he/she/it в Present Simple? | -s/-es | -ing | -ed | без окончания',
        'She ___ TV in the evening. | watches | watch | watching | is watch',
        'We ___ go to school on Sunday. | don’t | doesn’t | aren’t | isn’t',
      ] },
      { t: 'Множественное число существительных', gen: ['plural'], q: [
        'Как сказать «две кошки»? | two cats | two cat | two cates | two catses',
      ] },
      { t: 'Have got / Has got', q: [
        'I ___ a new bike. | have got | has got | am got | have',
        'She ___ long hair. | has got | have got | is got | got have',
        '___ he got a sister? | Has | Have | Is | Does',
        'They ___ got a car. | haven’t | hasn’t | aren’t | don’t',
        'My cat ___ green eyes. | has got | have got | has | is got',
        'We ___ a big garden. | have got | has got | is got | are got',
        '___ you got a pet? | Have | Has | Do | Are',
      ] },
    ],
    4: [
      { t: 'Распорядок дня. Время', gen: v('time'), q: [
        'Как сказать «Сейчас 7 часов»? | It’s seven o’clock. | It seven hours. | Is seven clock. | It’s seven hour.',
        'Как сказать «половина третьего»? | half past two | half past three | half to three | two thirty past',
        'Какой предлог нужен: ___ Monday | on | in | at | —',
        'Какой предлог нужен: ___ 5 o’clock | at | in | on | by',
      ] },
      { t: 'Present Continuous', q: [
        'Look! The boy ___ . | is running | runs | run | are running',
        'We ___ TV now. | are watching | is watching | watch | watches',
        'I ___ a book at the moment. | am reading | is reading | read | reading',
        'What ___ she doing? | is | are | does | do',
        'Какое слово-маркер Present Continuous? | now | often | yesterday | every day',
        'Как правильно образовать -ing от «swim»? | swimming | swiming | swimmming | swimeing',
        'They ___ in the park now. | are playing | is playing | play | plays',
        'She ___ a letter at the moment. | is writing | writes | are writing | write',
        'Как правильно образовать -ing от «make»? | making | makeing | makking | maked',
        'Are you sleeping? — No, I ___ . | am not | is not | are not | don’t',
      ] },
      { t: 'Past Simple: правильные глаголы', q: [
        'Yesterday I ___ my grandma. | visited | visit | visits | am visiting',
        'She ___ to music last night. | listened | listen | listens | listening',
        'Did you ___ football yesterday? | play | played | plays | playing',
        'They ___ watch TV yesterday. | didn’t | don’t | doesn’t | wasn’t',
        'Прошедшая форма глагола «stop»: | stopped | stoped | stopt | stopping',
        'Прошедшая форма глагола «study»: | studied | studyed | studed | studying',
        'Какое слово-маркер Past Simple? | ago | now | tomorrow | usually',
        'We ___ the room yesterday. | cleaned | clean | cleans | cleaning',
        'Прошедшая форма глагола «play»: | played | plaied | playd | plaid',
        '___ she help you yesterday? | Did | Does | Do | Was',
        'He ___ (not) cook dinner last night. | didn’t | doesn’t | don’t | wasn’t',
      ] },
      { t: 'Погода и времена года', gen: v('weather'), q: [
        'What’s the weather like? — It’s ___ . Take an umbrella! | rainy | sunny | hot | warm',
        'Какой месяц идёт после March? | April | May | February | June',
        'Какой месяц зимний? | January | June | April | October',
      ] },
      { t: 'Предлоги места', q: [
        'The cat is ___ the table (под столом). | under | on | in | behind',
        'The book is ___ the bag (в сумке). | in | on | under | next to',
        'The lamp is ___ the desk (на столе). | on | in | under | between',
        'The chair is ___ the bed (рядом с кроватью). | next to | under | in | on',
        'The ball is ___ the box and the bag (между). | between | behind | under | next',
        'The picture is ___ the wall. | on | in | under | between',
        'The dog is ___ the house (за домом). | behind | in front of | on | into',
        'The bus stop is ___ the school (перед школой). | in front of | behind | under | in',
      ] },
    ],
    5: [
      { t: 'Неправильные глаголы (1–2 формы)', gen: [['irregular', { forms: [1, 3] }]], q: [] },
      { t: 'Дом и квартира', gen: v('house'), q: [
        'There ___ a sofa in the room. | is | are | am | be',
        'There ___ two chairs in the kitchen. | are | is | am | be',
        '___ there a TV in your bedroom? | Is | Are | Do | Does',
      ] },
      { t: 'Степени сравнения прилагательных', gen: ['compare'], q: [
        'My brother is ___ than me. | taller | tallest | more tall | tall',
        'This is ___ book I have ever read. | the most interesting | more interesting | interestinger | most interesting',
      ] },
      { t: 'Модальные глаголы can, must', q: [
        'I ___ swim very well. | can | must to | can to | cans',
        'You ___ wear a uniform at school. | must | can to | musts | must to',
        'Can you ___ English? | speak | to speak | speaks | speaking',
        'Как сказать «Мне нельзя (не разрешено) шуметь»? | I mustn’t make noise. | I can make noise. | I must make noise. | I don’t must make noise.',
        'She ___ play the piano. | can | cans | can to | is can',
        '___ I come in? — Yes, you can. | Can | Must | Am | Do',
        'Как сказать «Я не умею кататься на коньках»? | I can’t skate. | I mustn’t skate. | I don’t can skate. | I not can skate.',
        'You ___ cross the road at a red light. | mustn’t | must | can | have',
        'Какая форма следует после can и must? | инфинитив без to | инфинитив с to | -ing | -ed',
      ] },
    ],
    6: [
      { t: 'Past Simple: неправильные глаголы', gen: [['irregular', { forms: [1, 3] }]], q: [
        'Yesterday we ___ to the park. | went | go | goed | gone',
        'I ___ a letter last week. | wrote | write | writed | written',
        'Where ___ you go last summer? | did | do | were | was',
      ] },
      { t: 'Будущее время: will и to be going to', q: [
        'I think it ___ rain tomorrow. | will | is going | shall to | will to',
        'Look at those clouds! It ___ rain. | is going to | will | goes to | shall',
        'We ___ visit our grandparents next week (уже решили). | are going to | will to | going to | is going to',
        'She ___ be 12 next year. | will | is going | shall to | will to',
        'Какое слово-маркер Future Simple? | tomorrow | yesterday | ago | now',
        'I promise I ___ call you. | will | am going | going | shall to',
        'Как образуется отрицание в Future Simple? | will not (won’t) + глагол | don’t will | not will | will no',
        'What ___ you do tomorrow? | will | do | are | did',
      ] },
      { t: 'Спорт и хобби', gen: v('sport'), q: [
        'I am good ___ football. | at | in | on | for',
        'She is interested ___ music. | in | at | on | of',
        'С какими видами спорта употребляется «go»? | с оканчивающимися на -ing (go swimming) | с командными играми | со всеми | ни с какими',
        'Как сказать «играть в теннис»? | play tennis | play the tennis | go tennis | do the tennis',
      ] },
      { t: 'Исчисляемые и неисчисляемые существительные', q: [
        'How ___ sugar do you need? | much | many | a few | few',
        'How ___ apples are there? | many | much | little | a little',
        'There is ___ milk in the fridge. | some | many | a | few',
        'Is there ___ bread? | any | many | a | few',
        'I have got ___ friends (несколько). | a few | a little | much | little',
        'Какое существительное неисчисляемое? | money | coin | dollar | pocket',
        'There isn’t ___ water in the bottle. | much | many | a few | few',
        'I have ___ money (немного). | a little | a few | many | few',
        'Какое существительное исчисляемое? | apple | water | bread | rice',
      ] },
    ],
    7: [
      { t: 'Present Perfect', gen: [['irregular', { forms: [2] }]], q: [
        'I ___ already ___ my homework. | have … done | has … done | have … did | am … doing',
        'She ___ never ___ to London. | has … been | have … been | has … was | is … been',
        '___ you ever ___ sushi? | Have … eaten | Has … eaten | Did … eaten | Have … ate',
        'Какое слово-маркер Present Perfect? | already | yesterday | last year | tomorrow',
        'They haven’t finished the work ___ . | yet | already | ever | just',
        'I have lived here ___ 2015. | since | for | from | ago',
        'We have known each other ___ five years. | for | since | from | during',
      ] },
      { t: 'Внешность и характер', gen: v('appearance'), q: [
        'What does she look like? — She is ___ . | tall and slim | kind and clever | reading a book | fine, thanks',
        'What is he like? — He is ___ . | friendly and honest | tall | twelve | at school',
      ] },
      { t: 'Past Continuous', q: [
        'I ___ TV when you called. | was watching | watched | were watching | am watching',
        'They ___ football at 5 pm yesterday. | were playing | was playing | played | are playing',
        'What ___ you doing at 8 o’clock last night? | were | was | did | are',
        'While she ___ , the phone rang. | was cooking | cooked | cooks | were cooking',
        'At 7 o’clock yesterday I ___ dinner. | was having | had | were having | have had',
        'We ___ when the teacher came in. | were talking | was talking | talked | talk',
        'Как образуется Past Continuous? | was/were + глагол с -ing | had + V3 | did + глагол | will + be + -ing',
        'She ___ (not) sleeping when I called. | wasn’t | weren’t | didn’t | isn’t',
      ] },
      { t: 'Артикли', q: [
        'I saw ___ elephant at the zoo. | an | a | the | —',
        '___ sun is very bright today. | The | A | An | —',
        'She plays ___ piano very well. | the | a | an | —',
        'He is ___ doctor. | a | an | the | —',
        'We usually have ___ breakfast at 8. | — | a | the | an',
        'Moscow is ___ capital of Russia. | the | a | an | —',
        'They went to ___ Black Sea last summer. | the | a | — | an',
        'I have ___ umbrella. | an | a | the | —',
        'This is ___ best day of my life. | the | a | an | —',
        'She lives in ___ Paris. | — | the | a | an',
        '___ Volga is the longest river in Europe. | The | A | An | —',
      ] },
    ],
    8: [
      { t: 'Past Perfect и согласование времён', q: [
        'When I arrived, the film ___ already ___ . | had … started | has … started | was … started | did … start',
        'She said that she ___ tired. | was | is | will be | are',
        'He told me he ___ the book the day before. | had read | has read | reads | will read',
        'By the time we came, they ___ dinner. | had eaten | have eaten | ate | eat',
        'He said that he ___ to Spain the year before. | had been | has been | was being | is',
        'Как образуется Past Perfect? | had + 3-я форма глагола | have + 3-я форма | was + -ing | did + глагол',
        'She told me that she ___ (can) swim. | could | can | can to | could to',
      ] },
      { t: 'Страдательный залог', q: [
        'The house ___ in 1990. | was built | built | is building | has build',
        'English ___ all over the world. | is spoken | speaks | is speaking | spoke',
        'The letter ___ tomorrow. | will be sent | will send | is sent | sends',
        'The cake ___ by my mum. | was made | made | has make | was make',
        'Как образуется страдательный залог? | to be + 3-я форма глагола | have + 3-я форма | to be + -ing | will + 1-я форма',
        'This book ___ by Tolstoy. | was written | wrote | is writing | has wrote',
        'The windows ___ every week. | are cleaned | clean | is cleaned | cleaning',
        'The bridge ___ now. | is being built | is built | builds | was build',
        'The work ___ already ___ . | has … been done | have … done | was … do | is … doing',
      ] },
      { t: 'Путешествия', gen: v('travel'), q: [
        'I’d like to ___ a room for two nights. | book | make | do | take',
        'Our flight was ___ because of the fog. | delayed | late | stopped | missed',
      ] },
      { t: 'Условные предложения 0 и 1 типа', q: [
        'If you heat ice, it ___ . | melts | will melt | melted | would melt',
        'If it rains, we ___ at home. | will stay | stay | would stay | stayed',
        'If you ___ hard, you will pass the exam. | study | will study | studied | would study',
        'I will call you when I ___ home. | get | will get | got | would get',
        'If I see him, I ___ him the news. | will tell | tell | told | would tell',
        'Unless you hurry, you ___ late. | will be | are | would be | be',
        'If you mix red and white, you ___ pink. | get | will got | got | would get',
      ] },
    ],
    9: [
      { t: 'Косвенная речь', q: [
        '«I am tired», she said. → She said that she ___ tired. | was | is | had | were',
        '«I will help you», he said. → He said that he ___ help me. | would | will | shall | can',
        '«Where do you live?» → He asked me where I ___ . | lived | do live | live | did live',
        '«Close the door!» → She told me ___ the door. | to close | close | closing | closed',
        '«Are you busy?» → He asked ___ I was busy. | if | that | what | do',
        'В косвенной речи «yesterday» заменяется на… | the day before | tomorrow | today | next day',
        '«I can swim», he said. → He said that he ___ swim. | could | can | could to | can to',
        '«Don’t be late!» → She told me ___ late. | not to be | to not | don’t be | not be',
        'В косвенной речи «here» заменяется на… | there | this | then | that day',
        'В косвенной речи «tomorrow» заменяется на… | the next day | yesterday | today | the day before',
      ] },
      { t: 'Условные предложения 2 и 3 типа', q: [
        'If I ___ rich, I would travel around the world. | were | am | will be | had been',
        'If I had known, I ___ you. | would have helped | would help | will help | helped',
        'If she ___ harder, she would have passed. | had studied | studied | studies | would study',
        'I wish I ___ a dog. | had | have | will have | am having',
        'If I ___ you, I would take the job. | were | am | will be | had been',
        'If we had left earlier, we ___ the train. | wouldn’t have missed | wouldn’t miss | didn’t miss | won’t miss',
        'I wish I ___ to the party yesterday. | had gone | went | go | would go',
        'What would you do if you ___ a million dollars? | won | win | had won | will win',
      ] },
      { t: 'Экология', gen: v('ecology'), q: [
        'We should ___ paper and plastic. | recycle | throw | pollute | destroy',
        'Many animals are in danger of ___ . | extinction | protection | pollution | invention',
      ] },
      { t: 'Словообразование', q: [
        'Образуйте существительное от «teach»: | teacher | teaching | teachful | teachness',
        'Образуйте прилагательное от «beauty»: | beautiful | beautyful | beautiness | beautish',
        'Образуйте антоним от «happy»: | unhappy | dishappy | inhappy | imhappy',
        'Образуйте существительное от «kind»: | kindness | kindment | kindity | kindion',
        'Образуйте существительное от «decide»: | decision | decidement | decidance | decidity',
        'Образуйте антоним от «possible»: | impossible | unpossible | dispossible | inpossible',
        'Образуйте наречие от «quick»: | quickly | quickful | quickness | quicker',
      ] },
    ],
    10: [
      { t: 'Фразовые глаголы', q: [
        'Please, ___ your coat. It’s cold. | put on | put off | take off | give up',
        'I want to ___ smoking. | give up | give in | give out | give back',
        'Could you ___ my cat while I’m away? | look after | look for | look up | look at',
        'I’m ___ my keys. Have you seen them? | looking for | looking after | looking up | looking out',
        'The plane ___ at 6 am. | took off | put off | turned off | set off',
        'Let’s ___ the meeting until Friday. | put off | put on | put up | put out',
        'Please ___ the TV. I want to sleep. | turn off | turn on | turn up | turn into',
        'Can you ___ this word in the dictionary? | look up | look after | look for | look at',
        'I ___ my old friend in the street yesterday (случайно встретил). | ran into | ran out | ran away | ran over',
        'We have ___ milk. Let’s buy some. | run out of | run into | run after | run over',
        'The meeting was ___ because of the rain (отменено). | called off | called on | called up | called back',
      ] },
      { t: 'Герундий и инфинитив', q: [
        'I enjoy ___ books. | reading | to read | read | reads',
        'She decided ___ a new car. | to buy | buying | buy | bought',
        'He avoids ___ fast food. | eating | to eat | eat | ate',
        'I want ___ a doctor. | to become | becoming | become | became',
        'Stop ___ ! I’m trying to sleep. | talking | to talk | talk | talked',
        'They agreed ___ us. | to help | helping | help | helped',
        'I’m looking forward to ___ you. | seeing | see | to see | saw',
        'She is good at ___ . | drawing | draw | to draw | drew',
        'He promised ___ on time. | to come | coming | come | came',
        'Would you mind ___ the window? | opening | to open | open | opened',
      ] },
      { t: 'Технологии и наука', gen: v('tech'), q: [
        'Don’t forget to ___ your phone before the trip. | charge | load | fill | pour',
      ] },
      { t: 'Грамматика: все времена', gen: [['irregular', { forms: [1, 2, 3] }]], q: [
        'I ___ here since morning. | have been | am | was | will be',
        'Water ___ at 100 °C. | boils | is boiling | boiled | will boil',
        'This time tomorrow I ___ on the beach. | will be lying | will lie | am lying | lie',
        'By next year she ___ her studies. | will have finished | will finish | finishes | finished',
        'He ___ for two hours when she came. | had been waiting | has been waiting | was waited | waits',
      ] },
    ],
    11: [
      { t: 'ЕГЭ: словообразование', q: [
        'He is a very ___ person (CREATE). | creative | creation | creator | createful',
        'The ___ of the bridge took two years (CONSTRUCT). | construction | constructor | constructive | constructing',
        'It was ___ to cross the river (DANGER). | dangerous | dangerful | endanger | dangerly',
        'She answered ___ (POLITE). | politely | polite | politeness | impolite',
        'She wants to be ___ from her parents (DEPEND). | independent | dependent | dependence | depending',
        'His ___ surprised everyone (SUCCEED). | success | succeed | successful | successfully',
        'The film was ___ boring (TERRIBLE). | terribly | terrible | terror | terrify',
        'It was a very ___ experience (PLEASE). | pleasant | pleased | pleasure | pleasing',
        'The ___ of the city is growing (POPULATE). | population | populate | popular | populating',
        'He was ___ about the results (CARE — без внимания). | careless | careful | caring | cared',
        'Her ___ was obvious (HAPPY). | happiness | happily | unhappy | happier',
      ] },
      { t: 'Модальные глаголы с перфектным инфинитивом', q: [
        'He ___ have forgotten about the meeting — he is always punctual. | can’t | must | should | may',
        'You ___ have told me earlier! (упрёк) | should | must | can | may',
        'She isn’t here. She ___ have missed the bus. | must | can’t | should | needn’t',
        'You ___ have bought milk — we had plenty. | needn’t | mustn’t | can’t | shouldn’t to',
        'The lights are off. They ___ have gone to bed. | must | can’t | needn’t | shouldn’t',
        'You ___ have taken a taxi — it was a short walk. | needn’t | must | can’t | might not to',
        'He ___ have called — I’m not sure. | might | must | can’t | should to',
      ] },
      { t: 'Образование и карьера', gen: v('career'), q: [
        'She is going to ___ for a job at the bank. | apply | ask | request | demand',
        'He ___ from university last year. | graduated | finished off | ended | completed of',
      ] },
      { t: 'ЕГЭ: грамматика в контексте', gen: [['irregular', { forms: [1, 2] }], 'compare'], q: [
        'Neither Tom nor his friends ___ at the party yesterday. | were | was | is | are',
        'I’m used to ___ up early. | getting | get | got | to get',
        'Hardly had he come in ___ the phone rang. | when | than | then | that',
        'The news ___ very good. | is | are | were | have been',
        'I’d rather you ___ smoke here. | didn’t | don’t | won’t | not',
      ] },
    ],
  },
});
