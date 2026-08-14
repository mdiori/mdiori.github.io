const svg = document.getElementById("japan-map");
const NS = "http://www.w3.org/2000/svg";

function project(lng, lat) {
  return [(lng - 127) * 38, (46.5 - lat) * 48];
}

function pointsToPath(coords) {
  return (
    coords
      .map((c, i) => {
        const [x, y] = project(c[0], c[1]);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

function el(name, attrs = {}, parent = svg) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  parent.appendChild(node);
  return node;
}

function setupSvg() {
  const defs = el("defs");
  defs.innerHTML = `
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-gold" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="2.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  `;

  const islandLayer = el("g", { id: "islands" });
  const islandNodes = {};
  for (const [name, coords] of Object.entries(ISLANDS)) {
    islandNodes[name] = el("path", {
      class: "island",
      id: `island-${name}`,
      d: pointsToPath(coords),
    }, islandLayer);
  }

  const routeCoords = STOPS.map((s) => project(s.coords[0], s.coords[1]));
  const routeD = routeCoords
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");

  el("path", { class: "route", d: routeD });
  const routeDraw = el("path", { class: "route-draw", d: routeD, id: "route-draw" });

  const length = routeDraw.getTotalLength();
  routeDraw.style.strokeDasharray = `${length}`;
  routeDraw.style.strokeDashoffset = `${length}`;

  const pins = {};
  STOPS.forEach((stop) => {
    const [x, y] = project(stop.coords[0], stop.coords[1]);
    const glow = el("circle", {
      class: "pin-glow",
      id: `glow-${stop.id}`,
      cx: x,
      cy: y,
      r: 46,
    });
    const ring = el("circle", {
      class: "pin-ring",
      id: `ring-${stop.id}`,
      cx: x,
      cy: y,
      r: 8,
    });
    const pin = el("circle", {
      class: "pin",
      id: `pin-${stop.id}`,
      cx: x,
      cy: y,
      r: 5,
    });
    const label = el("text", {
      class: "pin-label",
      id: `label-${stop.id}`,
      x: x + 10,
      y: y - 10,
    });
    label.textContent = stop.jp;
    pins[stop.id] = { glow, ring, pin, label };
  });

  return { routeDraw, length, pins, islandNodes };
}

const LIT = {
  osaka: ["honshu"],
  kobe: ["honshu"],
  himeji: ["honshu", "shikoku"],
  okayama: ["honshu", "shikoku"],
  kumamoto: ["kyushu"],
  kyoto: ["honshu"],
  "kyoto-2": ["honshu"],
  nara: ["honshu"],
  takayama: ["honshu"],
  alpine: ["honshu"],
  nagano: ["honshu"],
  tokyo: ["honshu"],
  fuji: ["honshu"],
};

const FULL_VIEW = { x: 40, y: 10, w: 720, h: 760 };
let viewAnim = 0;

function animateViewBox(to) {
  const box = svg.viewBox.baseVal;
  const from = { x: box.x, y: box.y, w: box.width, h: box.height };
  const t0 = performance.now();
  cancelAnimationFrame(viewAnim);
  function tick(now) {
    const t = Math.min(1, (now - t0) / 900);
    const e = 1 - (1 - t) ** 3;
    const x = from.x + (to.x - from.x) * e;
    const y = from.y + (to.y - from.y) * e;
    const w = from.w + (to.w - from.w) * e;
    const h = from.h + (to.h - from.h) * e;
    svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
    if (t < 1) viewAnim = requestAnimationFrame(tick);
  }
  viewAnim = requestAnimationFrame(tick);
}

function viewFor(id) {
  if (!id) return FULL_VIEW;
  const stop = STOPS.find((s) => s.id === id);
  if (!stop) return FULL_VIEW;
  const [cx, cy] = project(stop.coords[0], stop.coords[1]);
  const zoom = 1.85;
  const w = FULL_VIEW.w / zoom;
  const h = FULL_VIEW.h / zoom;
  return { x: cx - w * 0.46, y: cy - h * 0.5, w, h };
}

function setActive(id, map) {
  const index = STOPS.findIndex((s) => s.id === id);
  const progress = index < 0 ? 0 : index / (STOPS.length - 1);
  map.routeDraw.style.strokeDashoffset = String(map.length * (1 - progress));
  animateViewBox(viewFor(id));

  const on = LIT[id] || [];
  Object.entries(map.islandNodes).forEach(([name, node]) => {
    node.classList.toggle("is-lit", on.includes(name));
  });

  STOPS.forEach((stop, i) => {
    const p = map.pins[stop.id];
    const seen = index >= 0 && i <= index;
    const now = stop.id === id;
    p.pin.classList.toggle("is-seen", seen);
    p.pin.classList.toggle("is-now", now);
    p.glow.classList.toggle("is-on", now);
    p.ring.classList.toggle("is-on", now);
    p.label.classList.toggle("is-on", now);
  });

  document.querySelectorAll(".nav-dots button").forEach((btn, i) => {
    btn.classList.toggle("is-now", STOPS[i].id === id);
    btn.classList.toggle("is-seen", index >= 0 && i <= index);
  });
}

function renderStops() {
  const root = document.getElementById("stops");
  root.innerHTML = STOPS.map(
    (stop) => `
    <section class="stop" id="${stop.id}" data-stop="${stop.id}">
      <article class="card">
        <p class="kicker">${stop.region}</p>
        <div class="meta">
          <span>${stop.dayLabel}</span>
          <span>${stop.days}</span>
        </div>
        <h2>${stop.city}<span class="jp">${stop.jp}</span></h2>
        <p>${stop.description}</p>
        <ul class="places">
          ${stop.places.map((p) => `<li>${p}</li>`).join("")}
        </ul>
        <div class="photos">
          ${stop.photos
            .map(
              (ph) => `
            <figure>
              <img src="${ph.src}" alt="${ph.alt}" loading="lazy">
              <figcaption>${ph.caption}</figcaption>
            </figure>`
            )
            .join("")}
        </div>
      </article>
    </section>`
  ).join("");
}

function renderNav() {
  const nav = document.getElementById("nav-dots");
  nav.innerHTML = STOPS.map(
    (stop) =>
      `<button type="button" data-go="${stop.id}" aria-label="${stop.city}"></button>`
  ).join("");
  nav.addEventListener("click", (e) => {
    const id = e.target.dataset.go;
    if (id) document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  });
}

function watchScroll(map) {
  const sections = [
    document.querySelector(".hero"),
    ...document.querySelectorAll(".stop"),
    document.querySelector(".finale"),
  ];

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.dataset.stop || "";
      if (visible.target.classList.contains("hero")) setActive("", map);
      else if (visible.target.classList.contains("finale")) setActive("fuji", map);
      else setActive(id, map);
    },
    { threshold: [0.35, 0.55, 0.75] }
  );

  sections.forEach((s) => io.observe(s));
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function tickCountdown() {
  const target = new Date(TRIP_START).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const started = Date.now() >= target;
  document.getElementById("cd-days").textContent = started ? "0" : String(days);
  document.getElementById("cd-hours").textContent = pad(hours);
  document.getElementById("cd-mins").textContent = pad(mins);
  document.getElementById("cd-secs").textContent = pad(secs);
}

renderStops();
renderNav();
const map = setupSvg();
setActive("", map);
watchScroll(map);
tickCountdown();
setInterval(tickCountdown, 1000);
