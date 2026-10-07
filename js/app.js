'use strict';

const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plural = (n, [one, few, many]) => {
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
};
const LETTERS = ['а', 'б', 'в', 'г'];

const state = { subject: null, grade: null, topics: new Set(), questions: [] };

/* ---------- Сохранение выбора ---------- */
const store = {
  load() { try { return JSON.parse(localStorage.getItem('kontrolnaya') || '{}'); } catch { return {}; } },
  save() {
    try {
      localStorage.setItem('kontrolnaya', JSON.stringify({
        subject: state.subject?.id, grade: state.grade, count: $('#count').value, variants: $('#variants').value,
      }));
    } catch { /* хранилище недоступно — не страшно */ }
  },
};

/* ---------- Тема ---------- */
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => (document.documentElement.dataset.theme || (darkQuery.matches ? 'dark' : 'light')) === 'dark';

function renderThemeBtn() {
  const dark = isDark();
  const label = dark ? 'Светлая тема' : 'Тёмная тема';
  const b = $('#theme');
  b.setAttribute('aria-pressed', String(dark));
  b.setAttribute('aria-label', label);
  b.title = label;
}

function toggleTheme() {
  const theme = isDark() ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('kontrolnaya-theme', theme); } catch { /* хранилище недоступно — тема не запомнится */ }
  renderThemeBtn();
}

/* ---------- Навигация ---------- */
function show(view) {
  for (const id of ['builder', 'quiz', 'printout']) $('#' + id).hidden = id !== view;
  window.scrollTo({ top: 0 });
}

/* ---------- Главная: статистика ---------- */
function renderStats() {
  const s = DB.stats();
  const items = [
    [s.subjects, 'предметов'],
    [s.topics, 'тем по программе'],
    [s.staticCount, 'готовых вопросов'],
    [s.genTopics, 'тем с генератором задач'],
  ];
  $('#stats').innerHTML = items.map(([n, l]) => `<div><dt>${esc(l)}</dt><dd>${n.toLocaleString('ru-RU')}</dd></div>`).join('');
}

/* ---------- Шаг 1: предмет ---------- */
function renderSubjects() {
  $('#subjects').innerHTML = DB.subjects.map(s => {
    const g = Object.keys(s.grades).map(Number);
    const range = g.length > 1 ? `${Math.min(...g)}–${Math.max(...g)} класс` : `${g[0]} класс`;
    return `<button type="button" class="subject" role="listitem" style="--c:${s.color}" data-id="${s.id}" aria-pressed="false">
      <span class="subject__badge" aria-hidden="true">${esc(s.short)}</span>
      <span class="subject__name">${esc(s.name)}<span class="subject__grades">${range}</span></span>
    </button>`;
  }).join('');
}

function selectSubject(id, keepGrade) {
  state.subject = DB.subjects.find(s => s.id === id) || null;
  document.querySelectorAll('.subject').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
  $('#step-grade').classList.toggle('is-locked', !state.subject);
  $('#grade-hint').textContent = state.subject ? '' : 'Сначала выберите предмет';
  renderGrades();
  const grades = Object.keys(state.subject.grades).map(Number);
  selectGrade(grades.includes(keepGrade) ? keepGrade : null);
}

/* ---------- Шаг 2: класс ---------- */
function renderGrades() {
  if (!state.subject) { $('#grades').innerHTML = ''; return; }
  $('#grades').innerHTML = Object.keys(state.subject.grades).map(g =>
    `<button type="button" class="grade" role="radio" aria-checked="false" data-grade="${g}">${g}</button>`).join('');
}

function selectGrade(g) {
  state.grade = g;
  document.querySelectorAll('.grade').forEach(b => b.setAttribute('aria-checked', String(+b.dataset.grade === g)));
  const has = g !== null;
  $('#step-topics').classList.toggle('is-locked', !has);
  $('#topics-hint').textContent = has ? '' : 'Сначала выберите класс';
  $('#toggle-all').hidden = !has;
  state.topics = new Set(has ? currentTopics().map(t => t.id) : []);
  renderTopics();
  updateSummary();
  if (has) {
    const step = $('#step-topics');
    if (step.getBoundingClientRect().top > window.innerHeight * 0.7) step.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ---------- Шаг 3: темы ---------- */
const currentTopics = () => (state.subject && state.grade ? state.subject.grades[state.grade] : []);

function renderTopics() {
  $('#topics').innerHTML = currentTopics().map(t => {
    const n = t.q.length;
    const parts = [];
    if (n) parts.push(`${n} ${plural(n, ['задача', 'задачи', 'задач'])}`);
    if (t.gen.length) parts.push('<b>+ генератор</b>');
    return `<label class="topic">
      <input type="checkbox" value="${t.id}" ${state.topics.has(t.id) ? 'checked' : ''}>
      <span class="topic__name">${esc(t.t)}</span>
      <span class="topic__count">${parts.join(' ')}</span>
    </label>`;
  }).join('');
}

function updateSummary() {
  const topics = currentTopics().filter(t => state.topics.has(t.id));
  const ok = topics.length > 0;
  $('#step-settings').classList.toggle('is-locked', !ok);
  $('#start').disabled = $('#print').disabled = !ok;
  const all = currentTopics().length;
  $('#toggle-all').textContent = state.topics.size === all ? 'Снять все' : 'Выбрать все';
  if (!ok) { $('#summary').textContent = state.grade ? 'Отметьте хотя бы одну тему' : ''; return; }

  const staticN = topics.reduce((s, t) => s + t.q.length, 0);
  const hasGen = topics.some(t => t.gen.length);
  const count = +$('#count').value;
  let text = `Тем: ${topics.length}. В базе: ${staticN} ${plural(staticN, ['готовая задача', 'готовые задачи', 'готовых задач'])}`;
  text += hasGen ? ' и генератор — вариантов почти бесконечно.' : '.';
  if (!hasGen && staticN < count) text += ` В тесте будет ${staticN} ${plural(staticN, ['вопрос', 'вопроса', 'вопросов'])}.`;
  $('#summary').textContent = text;
}

/* ---------- Тест онлайн ---------- */
function selectedTopics() { return currentTopics().filter(t => state.topics.has(t.id)); }

function headerText() {
  const topics = selectedTopics();
  const names = topics.length === currentTopics().length ? 'все темы' : topics.map(t => t.t).join(', ');
  return { title: `${state.subject.name}, ${state.grade} класс`, meta: names };
}

function startQuiz() {
  state.questions = buildTest(selectedTopics(), +$('#count').value);
  const { title, meta } = headerText();
  $('#quiz-title').textContent = title;
  $('#quiz-meta').textContent = `${state.questions.length} ${plural(state.questions.length, ['вопрос', 'вопроса', 'вопросов'])} · ${meta}`;
  $('#questions').innerHTML = state.questions.map((q, i) => `
    <li class="question" data-i="${i}">
      <div class="question__text">${esc(q.q)}</div>
      ${selectedTopics().length > 1 ? `<div class="question__topic">${esc(q.topic.t)}</div>` : ''}
      <div class="options" role="radiogroup">
        ${q.options.map((o, k) => `<label class="option"><input type="radio" name="q${i}" value="${k}"><span>${esc(o)}</span></label>`).join('')}
      </div>
    </li>`).join('');
  $('#quiz-form').classList.remove('checked');
  $('#result').hidden = true;
  $('#check').hidden = false;
  updateProgress();
  show('quiz');
}

function updateProgress() {
  const done = document.querySelectorAll('#questions input:checked').length;
  $('#progress').style.width = `${(done / Math.max(1, state.questions.length)) * 100}%`;
}

function mark(pct) { return pct >= 90 ? 5 : pct >= 70 ? 4 : pct >= 50 ? 3 : 2; }

function checkQuiz(e) {
  e.preventDefault();
  const form = $('#quiz-form');
  if (form.classList.contains('checked')) return;
  let right = 0;
  state.questions.forEach((q, i) => {
    const li = document.querySelector(`.question[data-i="${i}"]`);
    const chosen = li.querySelector('input:checked');
    const correctIdx = q.options.indexOf(q.a);
    const labels = li.querySelectorAll('.option');
    labels[correctIdx].classList.add('is-right');
    li.querySelectorAll('input').forEach(inp => { inp.disabled = true; });
    let verdict;
    if (!chosen) { li.classList.add('is-skipped'); verdict = `<div class="verdict verdict--bad">Нет ответа. Верно: ${esc(q.a)}</div>`; }
    else if (+chosen.value === correctIdx) { right++; li.classList.add('is-answered-right'); verdict = '<div class="verdict verdict--good">Верно</div>'; }
    else { labels[+chosen.value].classList.add('is-wrong'); li.classList.add('is-answered-wrong'); verdict = `<div class="verdict verdict--bad">Неверно. Правильный ответ: ${esc(q.a)}</div>`; }
    li.insertAdjacentHTML('beforeend', verdict);
  });
  form.classList.add('checked');
  const total = state.questions.length;
  const pct = Math.round((right / total) * 100);
  const m = mark(pct);
  const words = { 5: 'Отлично!', 4: 'Хорошо!', 3: 'Удовлетворительно', 2: 'Нужно повторить тему' };
  const res = $('#result');
  res.innerHTML = `<div class="result__mark result__mark--${m}" aria-label="Оценка ${m}">${m}</div>
    <div><div class="result__title">${words[m]}</div>
    <p class="result__text">Правильных ответов: ${right} из ${total} (${pct}%). Ошибки подсвечены красным, верные ответы — зелёным.</p></div>`;
  res.hidden = false;
  $('#check').hidden = true;
  res.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ---------- Печать ---------- */
function renderPrint() {
  const n = +$('#variants').value, count = +$('#count').value;
  const used = new Set();
  const variants = [];
  for (let v = 0; v < n; v++) {
    // стараемся не повторять вопросы между вариантами
    let qs = buildTest(selectedTopics(), count, used);
    if (qs.length < count) qs = buildTest(selectedTopics(), count);
    qs.forEach(q => used.add(q.q));
    variants.push(qs);
  }
  const { title, meta } = headerText();
  const sheets = variants.map((qs, v) => `
    <article class="sheet">
      <h2>${esc(title)}${n > 1 ? ` · Вариант ${v + 1}` : ''}</h2>
      <p class="sheet__meta">${esc(meta)}</p>
      <div class="sheet__fields"><span>Фамилия, имя:</span><span>Класс:</span><span>Дата:</span></div>
      <ol class="sheet__qs">
        ${qs.map(q => `<li class="sheet__q"><p>${esc(q.q)}</p>
          <div class="sheet__opts">${q.options.map((o, k) => `<span>${LETTERS[k]}) ${esc(o)}</span>`).join('')}</div></li>`).join('')}
      </ol>
    </article>`).join('');
  const key = `
    <article class="sheet key">
      <h2>Ключ ответов</h2>
      <p class="sheet__meta">${esc(title)} · ${esc(meta)} · Критерии: «5» — от 90%, «4» — от 70%, «3» — от 50%</p>
      <table>
        <thead><tr><th>№</th>${variants.map((_, v) => `<th>${n > 1 ? `Вариант ${v + 1}` : 'Ответ'}</th>`).join('')}</tr></thead>
        <tbody>${Array.from({ length: Math.max(...variants.map(q => q.length)) }, (_, i) => `<tr><td>${i + 1}</td>${variants.map(qs => {
          const q = qs[i];
          return `<td>${q ? `${LETTERS[q.options.indexOf(q.a)]}) ${esc(q.a)}` : ''}</td>`;
        }).join('')}</tr>`).join('')}</tbody>
      </table>
    </article>`;
  $('#sheets').innerHTML = sheets + key;
  show('printout');
}

/* ---------- События ---------- */
function bind() {
  $('#subjects').addEventListener('click', e => {
    const b = e.target.closest('.subject');
    if (!b) return;
    selectSubject(b.dataset.id, state.grade);
    store.save();
    const step = $('#step-grade');
    if (step.getBoundingClientRect().top > window.innerHeight * 0.7) step.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#grades').addEventListener('click', e => {
    const b = e.target.closest('.grade');
    if (!b) return;
    selectGrade(+b.dataset.grade);
    store.save();
  });
  $('#topics').addEventListener('change', e => {
    if (e.target.checked) state.topics.add(e.target.value); else state.topics.delete(e.target.value);
    updateSummary();
  });
  $('#toggle-all').addEventListener('click', () => {
    const all = currentTopics();
    state.topics = new Set(state.topics.size === all.length ? [] : all.map(t => t.id));
    renderTopics();
    updateSummary();
  });
  $('#count').addEventListener('change', () => { updateSummary(); store.save(); });
  $('#variants').addEventListener('change', () => store.save());
  $('#start').addEventListener('click', startQuiz);
  $('#print').addEventListener('click', renderPrint);
  $('#reprint').addEventListener('click', renderPrint);
  $('#reshuffle').addEventListener('click', startQuiz);
  $('#quiz-form').addEventListener('submit', checkQuiz);
  $('#questions').addEventListener('change', updateProgress);
  $('#theme').addEventListener('click', toggleTheme);
  darkQuery.addEventListener('change', renderThemeBtn);
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-action]');
    if (!a) return;
    e.preventDefault();
    show('builder');
  });
}

/* ---------- Старт ---------- */
renderThemeBtn();
renderStats();
renderSubjects();
bind();
const saved = store.load();
if (saved.subject === 'history') saved.subject = 'russia-history'; // история разделена на два предмета
if (saved.count) $('#count').value = saved.count;
if (saved.variants) $('#variants').value = saved.variants;
if (saved.subject && DB.subjects.some(s => s.id === saved.subject)) selectSubject(saved.subject, saved.grade);
