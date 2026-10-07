'use strict';

/* ================= Утилиты случайности ================= */
const R = {
  int: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
  pick: arr => arr[Math.floor(Math.random() * arr.length)],
  chance: p => Math.random() < p,
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  sample: (arr, n) => R.shuffle(arr).slice(0, n),
  /** n различных «правдоподобных» неверных чисел рядом с правильным */
  near(correct, n = 3, spread, allowNegative = false) {
    spread = spread || Math.max(3, Math.round(Math.abs(correct) * 0.2));
    const out = new Set();
    let guard = 0;
    while (out.size < n && guard++ < 300) {
      const d = R.int(-spread, spread);
      const v = correct + d;
      if (d === 0 || (!allowNegative && v < 0) || (correct > 0 && v === 0)) continue;
      out.add(v);
    }
    let k = 1;
    while (out.size < n) out.add(correct + spread + k++);
    return [...out];
  },
  /** Неверные варианты из списка, исключая правильный */
  others(list, correct, n = 3) {
    const uniq = [...new Set(list)].filter(x => x !== correct);
    return R.sample(uniq, n);
  },
  /** Согласование с числом: R.pl(5, ['яблоко', 'яблока', 'яблок']) → «5 яблок» */
  pl(n, [one, few, many]) {
    const a = Math.abs(n) % 100, b = a % 10;
    const w = a > 10 && a < 20 ? many : b === 1 ? one : b > 1 && b < 5 ? few : many;
    return `${n} ${w}`;
  },
  gcd: (a, b) => (b ? R.gcd(b, a % b) : Math.abs(a)),
  lcm: (a, b) => (a / R.gcd(a, b)) * b,
  /** Красиво форматирует число: десятичная запятая, без хвостов */
  num(x) {
    if (typeof x !== 'number') return String(x);
    const r = Math.round(x * 1e6) / 1e6;
    return String(r).replace('.', ',').replace('-', '−');
  },
  frac(n, d) {
    const g = R.gcd(n, d);
    n /= g; d /= g;
    if (d < 0) { n = -n; d = -d; }
    return d === 1 ? R.num(n) : `${R.num(n)}/${d}`;
  },
};

/* ================= База данных ================= */
const DB = {
  subjects: [],
  gens: {},

  /** Регистрация предмета */
  subject(s) {
    for (const [grade, topics] of Object.entries(s.grades)) {
      topics.forEach((t, i) => {
        t.id = `${s.id}-${grade}-${i}`;
        t.grade = +grade;
        t.subject = s;
        t.q = (t.q || []).map(parseStatic).filter(Boolean);
        t.gen = t.gen || [];
      });
    }
    this.subjects.push(s);
  },

  /** Регистрация генератора задач */
  gen(id, fn) { this.gens[id] = fn; },

  runGen(spec) {
    const [id, params] = Array.isArray(spec) ? spec : [spec, {}];
    const fn = this.gens[id];
    if (!fn) { console.warn('Нет генератора', id); return null; }
    try {
      return normalize(fn(params || {}));
    } catch (e) {
      console.error('Ошибка генератора', id, e);
      return null;
    }
  },

  stats() {
    let staticCount = 0, topics = 0, genTopics = 0;
    for (const s of this.subjects)
      for (const list of Object.values(s.grades))
        for (const t of list) {
          topics++;
          staticCount += t.q.length;
          if (t.gen.length) genTopics++;
        }
    return { staticCount, topics, genTopics, subjects: this.subjects.length };
  },
};

/** «Вопрос | верный | неверный | неверный» → объект */
function parseStatic(item) {
  if (typeof item === 'object') return normalize(item);
  const parts = item.split('|').map(s => s.trim()).filter(s => s.length);
  if (parts.length < 3) { console.warn('Плохой вопрос:', item); return null; }
  const [q, a, ...w] = parts;
  return { q, a, w };
}

function normalize(item) {
  if (!item) return null;
  const fmt = v => (typeof v === 'number' ? R.num(v) : String(v));
  const a = fmt(item.a);
  const w = [...new Set(item.w.map(fmt))].filter(x => x !== a).slice(0, 3);
  if (!w.length) return null;
  return { q: item.q, a, w, hint: item.hint };
}

/* ================= Сборка теста ================= */
/**
 * Собирает n вопросов из выбранных тем: равномерно по темам,
 * без повторов, готовые задачи вперемешку со сгенерированными.
 */
function buildTest(topics, n, exclude = new Set()) {
  const pools = R.shuffle(topics).map(t => ({
    topic: t,
    statics: R.shuffle(t.q.filter(x => !exclude.has(x.q))),
    hasGen: t.gen.length > 0,
  }));
  const seen = new Set(exclude);
  const result = [];

  const take = pool => {
    // чередуем: готовая задача или сгенерированная
    const preferGen = pool.hasGen && (!pool.statics.length || R.chance(0.6));
    if (!preferGen && pool.statics.length) {
      const item = pool.statics.pop();
      seen.add(item.q);
      return item;
    }
    if (pool.hasGen) {
      for (let tries = 0; tries < 40; tries++) {
        const item = DB.runGen(R.pick(pool.topic.gen));
        if (item && !seen.has(item.q)) { seen.add(item.q); return item; }
      }
    }
    if (pool.statics.length) {
      const item = pool.statics.pop();
      seen.add(item.q);
      return item;
    }
    return null;
  };

  let active = pools.slice();
  while (result.length < n && active.length) {
    for (const pool of active) {
      if (result.length >= n) break;
      const item = take(pool);
      if (item) result.push({ ...item, topic: pool.topic });
      else pool.dead = true;
    }
    active = active.filter(p => !p.dead);
  }

  return R.shuffle(result).map(item => ({
    ...item,
    options: R.shuffle([item.a, ...item.w]),
  }));
}
