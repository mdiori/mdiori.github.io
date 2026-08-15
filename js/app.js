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

function linePath(coords, close) {
  const d = coords
    .map((c, i) => {
      const [x, y] = project(c[0], c[1]);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return close ? `${d} Z` : d;
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
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
      <path d="M0 0 H6" stroke="#3d3428" stroke-width="0.6"/>
    </pattern>
  `;

  for (const [name, coords] of Object.entries(ISLANDS)) {
    const clip = el("clipPath", { id: `clip-${name}` }, defs);
    el("path", { d: pointsToPath(coords) }, clip);
  }

  const bathy = el("g", { id: "bathy" });
  [
    [200, 280, 420, 360],
    [160, 200, 500, 460],
    [90, 80, 640, 640],
  ].forEach(([x, y, w, h], i) => {
    el("ellipse", {
      class: `bathy bathy-${i}`,
      cx: x + w / 2,
      cy: y + h / 2,
      rx: w / 2,
      ry: h / 2,
    }, bathy);
  });

  const grid = el("g", { id: "graticule" });
  for (let lat = 31; lat <= 45; lat += 1) {
    const a = project(128.2, lat);
    const b = project(146.4, lat);
    el("line", {
      class: lat % 2 === 0 ? "graticule" : "graticule graticule-fine",
      x1: a[0],
      y1: a[1],
      x2: b[0],
      y2: b[1],
    }, grid);
    if (lat % 2 === 0) {
      const tag = el("text", { class: "grid-label", x: a[0] + 8, y: a[1] - 3 }, grid);
      tag.textContent = `${lat}°N`;
    }
  }
  for (let lng = 129; lng <= 145; lng += 1) {
    const a = project(lng, 45.7);
    const b = project(lng, 30.0);
    el("line", {
      class: lng % 2 === 0 ? "graticule" : "graticule graticule-fine",
      x1: a[0],
      y1: a[1],
      x2: b[0],
      y2: b[1],
    }, grid);
    if (lng % 2 === 0) {
      const tag = el("text", { class: "grid-label", x: b[0] + 3, y: b[1] + 12 }, grid);
      tag.textContent = `${lng}°E`;
    }
  }

  const islandLayer = el("g", { id: "islands" });
  const islandNodes = {};
  for (const [name, coords] of Object.entries(ISLANDS)) {
    el("path", {
      class: "island-hatch",
      d: pointsToPath(coords),
    }, islandLayer);
    islandNodes[name] = el("path", {
      class: "island",
      id: `island-${name}`,
      d: pointsToPath(coords),
    }, islandLayer);
  }

  const regionLayer = el("g", { id: "regions" });
  const regionNodes = {};
  const regionLabels = {};
  REGIONS.forEach((region) => {
    const coords = region.poly === "island" ? ISLANDS[region.clip] : region.poly;
    regionNodes[region.id] = el("path", {
      class: `region region-${region.id}`,
      id: `region-${region.id}`,
      d: pointsToPath(coords),
      "clip-path": `url(#clip-${region.clip})`,
    }, regionLayer);
  });

  const borderLayer = el("g", { id: "region-borders" });
  REGION_BORDERS.forEach((coords, i) => {
    el("path", {
      class: "region-border",
      id: `region-border-${i}`,
      d: linePath(coords, false),
    }, borderLayer);
  });

  const prefLayer = el("g", { id: "prefectures" });
  PREFECTURE_LINES.forEach((coords) => {
    el("path", {
      class: "prefecture-line",
      d: linePath(coords, false),
    }, prefLayer);
  });

  const outlineLayer = el("g", { id: "outlines" });
  for (const coords of Object.values(ISLANDS)) {
    el("path", { class: "island-outline", d: pointsToPath(coords) }, outlineLayer);
  }

  const isletNodes = {};
  const isletLayer = el("g", { id: "islets" });
  for (const [name, islet] of Object.entries(ISLETS)) {
    isletNodes[name] = el("path", {
      class: "islet",
      id: `islet-${name}`,
      d: pointsToPath(islet.coords),
    }, isletLayer);
  }

  const lakeLayer = el("g", { id: "lakes" });
  for (const [name, coords] of Object.entries(LAKES)) {
    el("path", { class: "lake", id: `lake-${name}`, d: pointsToPath(coords) }, lakeLayer);
  }
  const biwa = project(136.38, 35.28);
  const biwaLabel = el("text", { class: "sea-label sea-sm", x: biwa[0] + 10, y: biwa[1] }, lakeLayer);
  biwaLabel.textContent = "琵琶湖";

  const riverLayer = el("g", { id: "rivers" });
  for (const [name, coords] of Object.entries(RIVERS)) {
    el("path", { class: "river", id: `river-${name}`, d: linePath(coords, false) }, riverLayer);
  }

  const rangeLayer = el("g", { id: "ranges" });
  for (const [name, coords] of Object.entries(RANGES)) {
    el("path", { class: "range", id: `range-${name}`, d: linePath(coords, false) }, rangeLayer);
  }

  const peakLayer = el("g", { id: "peaks" });
  PEAKS.forEach((peak) => {
    const [x, y] = project(peak.coords[0], peak.coords[1]);
    el("polygon", {
      class: `peak peak-${peak.id}`,
      points: `${x},${y - peak.r} ${x + peak.r * 0.85},${y + peak.r * 0.55} ${x - peak.r * 0.85},${y + peak.r * 0.55}`,
    }, peakLayer);
    if (peak.id === "fuji" || peak.id === "aso") {
      const names = { fuji: "富士山", aso: "阿蘇" };
      const label = el("text", {
        class: "peak-label",
        x: x + peak.r + 2,
        y: y - 1,
      }, peakLayer);
      label.textContent = names[peak.id];
    }
  });

  const linkLayer = el("g", { id: "links" });
  LINKS.forEach((link) => {
    el("path", { class: "link", d: linePath(link.coords, false) }, linkLayer);
  });

  SEA_LABELS.forEach((sea) => {
    const [x, y] = project(sea.coords[0], sea.coords[1]);
    const label = el("text", { class: `sea-label sea-${sea.size || "md"}`, x, y });
    label.textContent = sea.text;
  });

  REGIONS.forEach((region) => {
    const [x, y] = project(region.label[0], region.label[1]);
    const group = el("text", {
      class: "region-label",
      id: `region-label-${region.id}`,
      x,
      y,
    });
    const jp = el("tspan", { x, dy: "0" }, group);
    jp.textContent = region.jp;
    const en = el("tspan", { class: "region-label-en", x, dy: "11" }, group);
    en.textContent = region.en;
    regionLabels[region.id] = group;
  });

  const townLayer = el("g", { id: "towns" });
  TOWNS.forEach((town, i) => {
    const [x, y] = project(town.coords[0], town.coords[1]);
    el("circle", { class: "town", cx: x, cy: y, r: 1.15, id: `town-${i}` }, townLayer);
    const label = el("text", { class: "town-label", x: x + 3.2, y: y - 2.2 }, townLayer);
    label.textContent = town.name;
  });

  const routeCoords = MAP_STOPS.map((s) => project(s.coords[0], s.coords[1]));
  const routeD = routeCoords
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");

  el("path", { class: "route", d: routeD });
  const routeDraw = el("path", { class: "route-draw", d: routeD, id: "route-draw" });

  const length = routeDraw.getTotalLength();
  routeDraw.style.strokeDasharray = `${length}`;
  routeDraw.style.strokeDashoffset = `${length}`;

  const pins = {};
  MAP_STOPS.forEach((stop) => {
    const [x, y] = project(stop.coords[0], stop.coords[1]);
    const glow = el("circle", {
      class: "pin-glow",
      id: `glow-${stop.id}`,
      cx: x,
      cy: y,
      r: 22,
    });
    const ring = el("circle", {
      class: "pin-ring",
      id: `ring-${stop.id}`,
      cx: x,
      cy: y,
      r: 5,
    });
    const pin = el("circle", {
      class: "pin",
      id: `pin-${stop.id}`,
      cx: x,
      cy: y,
      r: 2.8,
    });
    const label = el("text", {
      class: "pin-label",
      id: `label-${stop.id}`,
      x: x + 7,
      y: y - 6,
    });
    label.textContent = stop.jp;
    pins[stop.id] = { glow, ring, pin, label };
  });

  return { routeDraw, length, pins, islandNodes, isletNodes, regionNodes, regionLabels };
}

const MAP_STOPS = STOPS.filter((s) => s.onMap !== false);

function topicsOf(stop) {
  const extras = {
    id: `${stop.id}-indicacoes`,
    title: "Indicações da região",
    kind: "indicacoes",
    items: stop.indicacoes || [],
    notes:
      (stop.indicacoes && stop.indicacoes.length)
        ? ""
        : "Comida, desvios e o que for aparecendo nesta região. Vamos enchendo um a um.",
  };
  return [...(stop.places || []), extras];
}

function findTopic(stopId, topicId) {
  const stop = STOPS.find((s) => s.id === stopId);
  if (!stop) return null;
  return { stop, topic: topicsOf(stop).find((t) => t.id === topicId) };
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function topicFilled(topic) {
  if (!topic) return false;
  if (topic.kind === "indicacoes") return (topic.items || []).length > 0;
  return Boolean(
    topic.hours ||
      topic.price ||
      topic.queues ||
      topic.order ||
      topic.notes ||
      (topic.attractions && topic.attractions.length) ||
      (topic.tips && topic.tips.length)
  );
}

const LIT = {
  osaka: ["kansai"],
  kobe: ["kansai"],
  himeji: ["kansai", "chugoku"],
  okayama: ["chugoku", "shikoku"],
  kumamoto: ["kyushu"],
  kyoto: ["kansai"],
  "kyoto-2": ["kansai"],
  nara: ["kansai"],
  takayama: ["chubu"],
  alpine: ["chubu"],
  nagano: ["chubu"],
  tokyo: ["kanto"],
  fuji: ["chubu", "kanto"],
};

const FULL_VIEW = { x: -30, y: -40, w: 760, h: 880 };
let viewAnim = 0;
let activeId = null;

function sameView(a, b) {
  return (
    Math.abs(a.x - b.x) < 0.5 &&
    Math.abs(a.y - b.y) < 0.5 &&
    Math.abs(a.w - b.w) < 0.5 &&
    Math.abs(a.h - b.h) < 0.5
  );
}

function animateViewBox(to) {
  const box = svg.viewBox.baseVal;
  const from = { x: box.x, y: box.y, w: box.width, h: box.height };
  if (sameView(from, to)) return;
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
  const zoom = 2.15;
  const w = FULL_VIEW.w / zoom;
  const h = FULL_VIEW.h / zoom;
  return { x: cx - w * 0.42, y: cy - h * 0.5, w, h };
}

function setActive(id, map) {
  if (id === activeId) return;
  activeId = id;
  const stop = STOPS.find((s) => s.id === id);
  const cameraId = stop && stop.onMap === false ? "" : id;
  const index = MAP_STOPS.findIndex((s) => s.id === cameraId);
  const progress = index < 0 ? 0 : index / (MAP_STOPS.length - 1);
  map.routeDraw.style.strokeDashoffset = String(map.length * (1 - progress));
  animateViewBox(viewFor(cameraId));

  const on = LIT[cameraId] || [];
  Object.entries(map.regionNodes).forEach(([name, node]) => {
    node.classList.toggle("is-lit", on.includes(name));
  });
  Object.entries(map.regionLabels).forEach(([name, node]) => {
    node.classList.toggle("is-on", on.includes(name));
  });
  Object.entries(map.isletNodes).forEach(([name, node]) => {
    const islet = ISLETS[name];
    node.classList.toggle("is-lit", on.includes(islet.region));
  });
  document.querySelectorAll(".map-key li").forEach((item) => {
    item.classList.toggle("is-on", on.includes(item.dataset.region));
  });

  MAP_STOPS.forEach((item, i) => {
    const p = map.pins[item.id];
    const seen = index >= 0 && i <= index;
    const now = item.id === cameraId && cameraId !== "";
    p.pin.classList.toggle("is-seen", seen);
    p.pin.classList.toggle("is-now", now);
    p.glow.classList.toggle("is-on", now);
    p.ring.classList.toggle("is-on", now);
    p.label.classList.toggle("is-on", now);
  });

  const contentIndex = STOPS.findIndex((s) => s.id === id);
  document.querySelectorAll(".nav-dots button").forEach((btn, i) => {
    btn.classList.toggle("is-now", STOPS[i].id === id);
    btn.classList.toggle("is-seen", contentIndex >= 0 && i <= contentIndex);
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
          ${topicsOf(stop)
            .map((t) => {
              const extra = t.kind === "indicacoes" ? " is-extra" : "";
              const draft = topicFilled(t) ? "" : " is-draft";
              return `<li>
                <button type="button" class="place-btn${extra}${draft}" data-stop="${stop.id}" data-topic="${t.id}">
                  ${esc(t.title)}
                </button>
              </li>`;
            })
            .join("")}
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

function sectionId(section) {
  if (section.classList.contains("retorno")) return "";
  if (section.classList.contains("hero")) return "";
  return section.dataset.stop || "";
}

function watchScroll(map) {
  const sections = [
    document.querySelector(".hero"),
    ...document.querySelectorAll(".stop"),
    document.querySelector(".retorno"),
  ];

  function pick() {
    const focus = window.innerHeight * 0.42;
    let current = sections[0];
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= focus) current = section;
      else break;
    }
    setActive(sectionId(current), map);
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        pick();
        ticking = false;
      });
    },
    { passive: true }
  );
  pick();
}

function fact(label, value) {
  const text = value || "A preencher";
  const empty = value ? "" : " is-empty";
  return `<div class="fact${empty}"><span>${esc(label)}</span><b>${esc(text)}</b></div>`;
}

function listBlock(title, items) {
  if (!items || !items.length) {
    return `<section class="modal-block">
      <h4>${esc(title)}</h4>
      <p class="empty">A preencher — pesquisa entra aqui.</p>
    </section>`;
  }
  return `<section class="modal-block">
    <h4>${esc(title)}</h4>
    <ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
  </section>`;
}

function modalPhoto(stop, topic) {
  if (topic.image) {
    return {
      src: topic.image,
      alt: topic.imageAlt || topic.title,
      caption: topic.imageCaption || topic.title,
    };
  }
  const photo = (stop.photos || [])[0];
  if (!photo) return null;
  return {
    src: photo.src,
    alt: photo.alt || topic.title,
    caption: photo.caption || stop.city,
  };
}

function photoBlock(photo) {
  if (!photo) return "";
  return `<figure class="modal-photo">
    <img src="${esc(photo.src)}" alt="${esc(photo.alt)}" />
    <figcaption>${esc(photo.caption)}</figcaption>
  </figure>`;
}

function renderModal(stop, topic) {
  document.getElementById("modal-kicker").textContent = `${stop.city} · ${stop.region}`;
  document.getElementById("modal-title").textContent = topic.title;
  const body = document.getElementById("modal-body");
  const photo = modalPhoto(stop, topic);

  if (topic.kind === "indicacoes") {
    const items = topic.items || [];
    body.innerHTML =
      photoBlock(photo) +
      (items.length
        ? `<ul class="indicacoes">${items
            .map(
              (item) => `<li>
                <strong>${esc(item.title)}</strong>
                <p>${esc(item.note || "")}</p>
              </li>`
            )
            .join("")}</ul>`
        : `<p class="empty">${esc(topic.notes)}</p>`);
    return;
  }

  body.innerHTML = `
    ${photoBlock(photo)}
    <div class="facts">
      ${fact("Horários", topic.hours)}
      ${fact("Valores", topic.price)}
      ${fact("Filas", topic.queues)}
      ${fact("Ordem / o que ir primeiro", topic.order)}
    </div>
    ${listBlock("Atrações", topic.attractions)}
    ${listBlock("Dicas", topic.tips)}
    <section class="modal-block">
      <h4>Notas</h4>
      <p class="${topic.notes ? "" : "empty"}">${esc(topic.notes || "Ainda vamos pesquisar este ponto, um a um.")}</p>
    </section>
  `;
}

function bindPlaces() {
  const dialog = document.getElementById("place-modal");
  document.getElementById("stops").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-topic]");
    if (!btn) return;
    const found = findTopic(btn.dataset.stop, btn.dataset.topic);
    if (!found || !found.topic) return;
    renderModal(found.stop, found.topic);
    dialog.showModal();
  });
  document.getElementById("modal-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
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

function renderMapKey() {
  const root = document.getElementById("map-key");
  if (!root) return;
  root.innerHTML = REGIONS.map(
    (region) =>
      `<li data-region="${region.id}"><b>${region.jp}</b> ${region.en}</li>`
  ).join("");
}

renderStops();
renderNav();
bindPlaces();
renderMapKey();
const map = setupSvg();
setActive("", map);
watchScroll(map);
tickCountdown();
setInterval(tickCountdown, 1000);
