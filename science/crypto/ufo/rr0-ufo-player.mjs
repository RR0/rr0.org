const g = `
<div class="toolbar">
  <button id="play" type="button">Play</button>
  <button id="pause" type="button">Pause</button>
  <input id="seek" type="range" min="0" max="0" value="0" step="1"/>
</div>
<canvas id="canvas" width="640" height="360"></canvas>
`, v = `
:host {
  display: block;
  font-family: sans-serif;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
}
canvas {
  background: #050510;
  border: 1px solid #333;
}
input[type=range] {
  flex: 1;
}
`;
function x(a, t, s) {
  const { bounds: e } = a;
  return t >= e.x && t <= e.x + e.width && s >= e.y && s <= e.y + e.height;
}
class o {
  keyframes = [];
  addKeyframe(t, s) {
    const e = this.findInsertIndex(t);
    this.keyframes[e]?.t === t ? this.keyframes[e] = { t, shapes: s } : this.keyframes.splice(e, 0, { t, shapes: s });
  }
  findInsertIndex(t) {
    let s = 0, e = this.keyframes.length;
    for (; s < e; ) {
      const i = s + e >>> 1;
      this.keyframes[i].t < t ? s = i + 1 : e = i;
    }
    return s;
  }
  getKeyframeAt(t) {
    const s = this.findInsertIndex(t), e = this.keyframes[s];
    return e?.t === t ? e : void 0;
  }
  getShapeAt(t, s) {
    return this.getKeyframeAt(t)?.shapes.find((e) => e.sourceId === s)?.shape;
  }
  /**
   * Finds the most recent shape recorded at-or-before t for that source (hold-last-value),
   * which is what playback needs since not every source has a keyframe at every sampled tick.
   */
  getLatestShapeAt(t, s) {
    let e = this.findInsertIndex(t);
    for (this.keyframes[e]?.t !== t && (e -= 1); e >= 0; e--) {
      const i = this.keyframes[e].shapes.find((n) => n.sourceId === s);
      if (i) return i.shape;
    }
  }
  hitTest(t, s, e) {
    const i = this.getKeyframeAt(t);
    if (i) {
      for (let n = i.shapes.length - 1; n >= 0; n--)
        if (x(i.shapes[n].shape, s, e))
          return i.shapes[n];
    }
  }
  get duration() {
    return this.keyframes.length === 0 ? 0 : this.keyframes[this.keyframes.length - 1].t;
  }
  get sourceIds() {
    const t = /* @__PURE__ */ new Set();
    for (const s of this.keyframes)
      for (const e of s.shapes)
        t.add(e.sourceId);
    return [...t];
  }
  get allKeyframes() {
    return this.keyframes;
  }
  toJSON() {
    return { keyframes: this.keyframes };
  }
  static fromJSON(t) {
    const s = new o();
    for (const e of t.keyframes)
      s.addKeyframe(e.t, e.shapes);
    return s;
  }
}
class c {
  constructor(t, s, e) {
    this.event = t, this.timeline = s, this.witnessId = e;
  }
  static create(t, s, e) {
    return new c({ eventType: "sighting", time: t, place: s }, new o(), e);
  }
}
class d {
  constructor(t, s) {
    this.timeline = t, this.onFrame = s;
  }
  rafId = null;
  state = "stopped";
  currentT = 0;
  lastWallTime = 0;
  play() {
    if (this.state === "playing") return;
    this.state = "playing", this.lastWallTime = performance.now();
    const t = () => {
      if (this.state !== "playing") return;
      const s = performance.now();
      if (this.currentT += s - this.lastWallTime, this.lastWallTime = s, this.currentT >= this.timeline.duration) {
        this.currentT = this.timeline.duration, this.resolveFrame(this.currentT), this.stop();
        return;
      }
      this.resolveFrame(this.currentT), this.rafId = requestAnimationFrame(t);
    };
    this.rafId = requestAnimationFrame(t);
  }
  pause() {
    this.state === "playing" && (this.state = "paused", this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null));
  }
  stop() {
    this.state = "stopped", this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null);
  }
  seek(t) {
    this.currentT = Math.max(0, Math.min(t, this.timeline.duration)), this.resolveFrame(this.currentT);
  }
  get playbackState() {
    return this.state;
  }
  get time() {
    return this.currentT;
  }
  resolveFrame(t) {
    const s = /* @__PURE__ */ new Map();
    for (const e of this.timeline.sourceIds) {
      const i = this.timeline.getLatestShapeAt(t, e);
      i && s.set(e, i);
    }
    this.onFrame(t, s);
  }
}
const l = 6, u = l / 2, k = 20;
class I {
  constructor(t) {
    this.ctx = t;
  }
  clear(t, s) {
    this.ctx.clearRect(0, 0, t, s);
  }
  paintShape(t) {
    this.ctx.save(), this.ctx.globalAlpha = 1 - t.transparency, t.haloScale > 0 && this.paintHalo(t), this.paintBase(t), t.selected && this.paintSelectionHandles(t), this.ctx.restore();
  }
  paintBase(t) {
    if (this.ctx.fillStyle = t.color, this.ctx.beginPath(), t.kind === "oval") {
      const { x: s, y: e, width: i, height: n } = t.bounds, r = i / 2, h = n / 2;
      this.ctx.ellipse(s + r, e + h, r, h, t.angle, 0, 2 * Math.PI);
    } else {
      const { x: s, y: e } = t.bounds;
      this.ctx.save(), this.ctx.translate(s, e), this.ctx.rotate(t.angle), t.points.forEach((i, n) => {
        n === 0 ? this.ctx.moveTo(i.x, i.y) : this.ctx.lineTo(i.x, i.y);
      }), this.ctx.closePath(), this.ctx.restore();
    }
    this.ctx.fill();
  }
  paintHalo(t) {
    this.ctx.save(), this.ctx.shadowColor = t.color, this.ctx.shadowBlur = k * t.haloScale, this.paintBase(t), this.ctx.restore();
  }
  paintSelectionHandles(t) {
    const { x: s, y: e, width: i, height: n } = t.bounds, r = i / 2, h = n / 2;
    this.ctx.strokeStyle = "lightgray", this.ctx.strokeRect(s, e, i, n), this.ctx.fillStyle = "lightgray";
    const f = [
      [s, e],
      [s + r, e],
      [s + i, e],
      [s + i, e + h],
      [s + i, e + n],
      [s + r, e + n],
      [s, e + n],
      [s, e + h]
    ];
    for (const [p, y] of f)
      this.ctx.fillRect(p - u, y - u, l, l);
  }
}
function S(a) {
  return {
    version: 1,
    time: a.event.time,
    place: a.event.place,
    witnessId: a.witnessId,
    timeline: a.timeline.toJSON()
  };
}
function w(a) {
  return new c(
    { eventType: "sighting", time: a.time, place: a.place },
    o.fromJSON(a.timeline),
    a.witnessId
  );
}
class b extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  shadow;
  canvas;
  canvasRenderer;
  playButton;
  pauseButton;
  seekInput;
  currentSighting = c.create();
  player;
  constructor() {
    super(), this.shadow = this.attachShadow({ mode: "open" });
    const t = document.createElement("template");
    t.innerHTML = `<style>${v}</style>${g}`, this.shadow.appendChild(t.content.cloneNode(!0)), this.canvas = this.shadow.getElementById("canvas"), this.canvasRenderer = new I(this.canvas.getContext("2d")), this.playButton = this.shadow.getElementById("play"), this.pauseButton = this.shadow.getElementById("pause"), this.seekInput = this.shadow.getElementById("seek"), this.playButton.addEventListener("click", () => this.player.play()), this.pauseButton.addEventListener("click", () => this.player.pause()), this.seekInput.addEventListener("input", () => this.player.seek(Number(this.seekInput.value))), this.player = new d(this.currentSighting.timeline, (s, e) => this.onFrame(s, e)), this.refresh();
  }
  connectedCallback() {
    const t = this.getAttribute("src");
    t && this.loadFromSrc(t);
  }
  attributeChangedCallback(t, s, e) {
    t === "src" && e && e !== s && this.isConnected && this.loadFromSrc(e);
  }
  /** Fetches a SightingRecordingJson from `url` and loads it — what the `src` attribute uses. */
  async loadFromSrc(t) {
    const s = await fetch(t);
    this.sightingData = await s.json();
  }
  get sightingData() {
    return S(this.currentSighting);
  }
  set sightingData(t) {
    this.currentSighting = w(t), this.player = new d(this.currentSighting.timeline, (s, e) => this.onFrame(s, e)), this.refresh();
  }
  /**
   * The live Sighting/Timeline, exposed so UfoRecorderElement (which composes
   * this element) can add keyframes to it directly as it records.
   */
  get sighting() {
    return this.currentSighting;
  }
  /** Exposed so UfoRecorderElement can paint a live drag preview on the same canvas. */
  get canvasElement() {
    return this.canvas;
  }
  get renderer() {
    return this.canvasRenderer;
  }
  /**
   * Re-reads the timeline's duration into the seek slider and repaints the
   * current frame — call after externally mutating `sighting.timeline`
   * (e.g. UfoRecorderElement adding keyframes while recording).
   */
  refresh() {
    this.seekInput.max = String(this.currentSighting.timeline.duration), this.player.seek(this.player.time);
  }
  onFrame(t, s) {
    this.canvasRenderer.clear(this.canvas.width, this.canvas.height);
    for (const e of s.values())
      this.canvasRenderer.paintShape(e);
    this.seekInput.value = String(t);
  }
}
const m = "rr0-ufo-player";
function E() {
  customElements.get(m) || customElements.define(m, b);
}
E();
