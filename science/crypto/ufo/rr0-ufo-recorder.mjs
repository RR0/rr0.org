const w = `
<div class="appearance record-only">
  <div class="presets" role="group" aria-label="UFO shape">
    <button class="preset" id="preset-oval" type="button" data-preset="oval">Oval</button>
    <button class="preset" id="preset-saucer" type="button" data-preset="saucer">Saucer</button>
    <button class="preset" id="preset-triangle" type="button" data-preset="triangle">Triangle</button>
  </div>
  <label>Color <input id="color" type="color" value="#39ff14"/></label>
  <label>Transparency <input id="transparency" type="range" min="0" max="1" step="0.05" value="0"/></label>
  <label>Halo <input id="haloScale" type="range" min="0" max="3" step="0.1" value="1.5"/></label>
</div>
<div class="toolbar">
  <button id="record" class="record-only" type="button">Record</button>
  <button id="play" type="button">Play</button>
  <button id="pause" type="button">Pause</button>
  <label class="record-only">Sampling rate (ms) <input id="samplingRate" type="number" min="16" step="16" value="100"/></label>
  <input id="seek" type="range" min="0" max="0" value="0" step="1"/>
</div>
<canvas id="canvas" width="640" height="360"></canvas>
`, b = `
:host {
  display: block;
  font-family: sans-serif;
}
.appearance, .toolbar {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
  flex-wrap: wrap;
}
.presets {
  display: flex;
  gap: 0.25em;
}
button.preset {
  cursor: pointer;
}
button.preset[aria-pressed="true"] {
  outline: 2px solid #39f;
  font-weight: bold;
}
canvas {
  background: #050510;
  border: 1px solid #333;
  touch-action: none;
  cursor: crosshair;
}
input[type=range] {
  flex: 1;
}
/* mode="viewer" is a read-only embed for site pages: shape/appearance editing and
   recording controls are hidden, only playback (Play/Pause/seek) remains. */
:host([mode="viewer"]) .record-only {
  display: none;
}
`;
function S(n, t = "#39ff14") {
  return { kind: "oval", bounds: n, color: t, angle: 0, transparency: 0, haloScale: 0, selected: !1 };
}
function f(n, t, e = "#39ff14") {
  return { kind: "polygon", bounds: n, points: t, color: e, angle: 0, transparency: 0, haloScale: 0, selected: !1 };
}
function k(n, t = "#39ff14") {
  const { width: e, height: s } = n, i = [
    { x: 0.5 * e, y: 0 },
    { x: 0.8 * e, y: 0.25 * s },
    { x: e, y: 0.5 * s },
    { x: 0.8 * e, y: 0.75 * s },
    { x: 0.5 * e, y: s },
    { x: 0.2 * e, y: 0.75 * s },
    { x: 0, y: 0.5 * s },
    { x: 0.2 * e, y: 0.25 * s }
  ];
  return f(n, i, t);
}
function E(n, t = "#39ff14") {
  const { width: e, height: s } = n, i = [
    { x: 0, y: 0 },
    { x: e, y: s / 2 },
    { x: 0, y: s }
  ];
  return f(n, i, t);
}
const P = {
  oval: S,
  saucer: k,
  triangle: E
};
function A(n, t) {
  return {
    ...P[t.presetId](n, t.color),
    transparency: t.transparency,
    haloScale: t.haloScale
  };
}
function B(n, t, e) {
  const { bounds: s } = n;
  return t >= s.x && t <= s.x + s.width && e >= s.y && e <= s.y + s.height;
}
function y(n, t, e) {
  const s = n.bounds.width, i = n.bounds.height;
  return {
    ...n,
    bounds: { x: t - s / 2, y: e - i / 2, width: s, height: i }
  };
}
class l {
  keyframes = [];
  addKeyframe(t, e) {
    const s = this.findInsertIndex(t);
    this.keyframes[s]?.t === t ? this.keyframes[s] = { t, shapes: e } : this.keyframes.splice(s, 0, { t, shapes: e });
  }
  findInsertIndex(t) {
    let e = 0, s = this.keyframes.length;
    for (; e < s; ) {
      const i = e + s >>> 1;
      this.keyframes[i].t < t ? e = i + 1 : s = i;
    }
    return e;
  }
  getKeyframeAt(t) {
    const e = this.findInsertIndex(t), s = this.keyframes[e];
    return s?.t === t ? s : void 0;
  }
  getShapeAt(t, e) {
    return this.getKeyframeAt(t)?.shapes.find((s) => s.sourceId === e)?.shape;
  }
  /**
   * Finds the most recent shape recorded at-or-before t for that source (hold-last-value),
   * which is what playback needs since not every source has a keyframe at every sampled tick.
   */
  getLatestShapeAt(t, e) {
    let s = this.findInsertIndex(t);
    for (this.keyframes[s]?.t !== t && (s -= 1); s >= 0; s--) {
      const i = this.keyframes[s].shapes.find((r) => r.sourceId === e);
      if (i) return i.shape;
    }
  }
  hitTest(t, e, s) {
    const i = this.getKeyframeAt(t);
    if (i) {
      for (let r = i.shapes.length - 1; r >= 0; r--)
        if (B(i.shapes[r].shape, e, s))
          return i.shapes[r];
    }
  }
  get duration() {
    return this.keyframes.length === 0 ? 0 : this.keyframes[this.keyframes.length - 1].t;
  }
  get sourceIds() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.keyframes)
      for (const s of e.shapes)
        t.add(s.sourceId);
    return [...t];
  }
  get allKeyframes() {
    return this.keyframes;
  }
  toJSON() {
    return { keyframes: this.keyframes };
  }
  static fromJSON(t) {
    const e = new l();
    for (const s of t.keyframes)
      e.addKeyframe(s.t, s.shapes);
    return e;
  }
}
class c {
  constructor(t, e, s) {
    this.event = t, this.timeline = e, this.witnessId = s;
  }
  static create(t, e, s) {
    return new c({ eventType: "sighting", time: t, place: e }, new l(), s);
  }
}
class T {
  constructor(t, e) {
    this.timeline = t, this.clock = e;
  }
  currentPointer = null;
  shapePrototype = null;
  sourceId = "";
  start(t, e) {
    this.sourceId = t, this.shapePrototype = e, this.currentPointer = null, this.clock.start((s) => this.recordSample(s));
  }
  onPointerMove(t, e) {
    this.currentPointer = { x: t, y: e };
  }
  stop() {
    this.clock.stop();
  }
  recordSample(t) {
    if (!this.currentPointer || !this.shapePrototype) return;
    const e = y(this.shapePrototype, this.currentPointer.x, this.currentPointer.y);
    this.timeline.addKeyframe(t, [{ sourceId: this.sourceId, shape: e }]);
  }
}
class R {
  constructor(t) {
    this.intervalMs = t;
  }
  rafId = null;
  startTime = 0;
  lastTick = 0;
  start(t) {
    this.startTime = performance.now(), this.lastTick = 0;
    const e = () => {
      const s = performance.now() - this.startTime;
      s - this.lastTick >= this.intervalMs && (this.lastTick = s, t(s)), this.rafId = requestAnimationFrame(e);
    };
    this.rafId = requestAnimationFrame(e);
  }
  stop() {
    this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null);
  }
}
class p {
  constructor(t, e) {
    this.timeline = t, this.onFrame = e;
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
      const e = performance.now();
      if (this.currentT += e - this.lastWallTime, this.lastWallTime = e, this.currentT >= this.timeline.duration) {
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
    const e = /* @__PURE__ */ new Map();
    for (const s of this.timeline.sourceIds) {
      const i = this.timeline.getLatestShapeAt(t, s);
      i && e.set(s, i);
    }
    this.onFrame(t, e);
  }
}
const d = 6, u = d / 2, F = 20;
class L {
  constructor(t) {
    this.ctx = t;
  }
  clear(t, e) {
    this.ctx.clearRect(0, 0, t, e);
  }
  paintShape(t) {
    this.ctx.save(), this.ctx.globalAlpha = 1 - t.transparency, t.haloScale > 0 && this.paintHalo(t), this.paintBase(t), t.selected && this.paintSelectionHandles(t), this.ctx.restore();
  }
  paintBase(t) {
    if (this.ctx.fillStyle = t.color, this.ctx.beginPath(), t.kind === "oval") {
      const { x: e, y: s, width: i, height: r } = t.bounds, o = i / 2, h = r / 2;
      this.ctx.ellipse(e + o, s + h, o, h, t.angle, 0, 2 * Math.PI);
    } else {
      const { x: e, y: s } = t.bounds;
      this.ctx.save(), this.ctx.translate(e, s), this.ctx.rotate(t.angle), t.points.forEach((i, r) => {
        r === 0 ? this.ctx.moveTo(i.x, i.y) : this.ctx.lineTo(i.x, i.y);
      }), this.ctx.closePath(), this.ctx.restore();
    }
    this.ctx.fill();
  }
  paintHalo(t) {
    this.ctx.save(), this.ctx.shadowColor = t.color, this.ctx.shadowBlur = F * t.haloScale, this.paintBase(t), this.ctx.restore();
  }
  paintSelectionHandles(t) {
    const { x: e, y: s, width: i, height: r } = t.bounds, o = i / 2, h = r / 2;
    this.ctx.strokeStyle = "lightgray", this.ctx.strokeRect(e, s, i, r), this.ctx.fillStyle = "lightgray";
    const v = [
      [e, s],
      [e + o, s],
      [e + i, s],
      [e + i, s + h],
      [e + i, s + r],
      [e + o, s + r],
      [e, s + r],
      [e, s + h]
    ];
    for (const [I, x] of v)
      this.ctx.fillRect(I - u, x - u, d, d);
  }
}
function C(n) {
  return {
    version: 1,
    time: n.event.time,
    place: n.event.place,
    witnessId: n.witnessId,
    timeline: n.timeline.toJSON()
  };
}
function M(n) {
  return new c(
    { eventType: "sighting", time: n.time, place: n.place },
    l.fromJSON(n.timeline),
    n.witnessId
  );
}
const a = { width: 48, height: 28 }, N = "ufo-1", m = ["oval", "saucer", "triangle"], H = { presetId: "oval", color: "#39ff14", transparency: 0, haloScale: 1.5 };
class O extends HTMLElement {
  static get observedAttributes() {
    return ["mode", "sampling-rate", "src"];
  }
  shadow;
  canvas;
  renderer;
  recordButton;
  playButton;
  pauseButton;
  samplingRateInput;
  seekInput;
  presetButtons;
  colorInput;
  transparencyInput;
  haloScaleInput;
  sighting = c.create();
  recorder;
  player;
  isRecording = !1;
  currentAppearance = { ...H };
  constructor() {
    super(), this.shadow = this.attachShadow({ mode: "open" });
    const t = document.createElement("template");
    t.innerHTML = `<style>${b}</style>${w}`, this.shadow.appendChild(t.content.cloneNode(!0));
  }
  connectedCallback() {
    this.canvas = this.shadow.getElementById("canvas"), this.renderer = new L(this.canvas.getContext("2d")), this.recordButton = this.shadow.getElementById("record"), this.playButton = this.shadow.getElementById("play"), this.pauseButton = this.shadow.getElementById("pause"), this.samplingRateInput = this.shadow.getElementById("samplingRate"), this.seekInput = this.shadow.getElementById("seek"), this.presetButtons = {
      oval: this.shadow.getElementById("preset-oval"),
      saucer: this.shadow.getElementById("preset-saucer"),
      triangle: this.shadow.getElementById("preset-triangle")
    }, this.colorInput = this.shadow.getElementById("color"), this.transparencyInput = this.shadow.getElementById("transparency"), this.haloScaleInput = this.shadow.getElementById("haloScale"), this.canvas.addEventListener("pointerdown", (e) => this.onPointerDown(e)), this.canvas.addEventListener("pointermove", (e) => this.onPointerMove(e)), this.canvas.addEventListener("pointerup", () => this.onPointerUp()), this.recordButton.addEventListener("click", () => this.toggleRecording()), this.playButton.addEventListener("click", () => this.play()), this.pauseButton.addEventListener("click", () => this.player?.pause()), this.seekInput.addEventListener("input", () => this.player?.seek(Number(this.seekInput.value)));
    for (const e of m)
      this.presetButtons[e].addEventListener("click", () => this.setAppearance({ presetId: e }));
    this.colorInput.addEventListener("input", () => this.setAppearance({ color: this.colorInput.value })), this.transparencyInput.addEventListener(
      "input",
      () => this.setAppearance({ transparency: Number(this.transparencyInput.value) })
    ), this.haloScaleInput.addEventListener(
      "input",
      () => this.setAppearance({ haloScale: Number(this.haloScaleInput.value) })
    ), this.player = new p(this.sighting.timeline, (e, s) => this.onFrame(e, s)), this.updatePresetButtons(), this.paintCurrentFrame();
    const t = this.getAttribute("src");
    t && this.loadFromSrc(t);
  }
  attributeChangedCallback(t, e, s) {
    t === "src" && s && s !== e && this.isConnected && this.loadFromSrc(s);
  }
  /** Fetches a SightingRecordingJson from `url` and loads it — what the `src` attribute uses. */
  async loadFromSrc(t) {
    const e = await fetch(t);
    this.sightingData = await e.json();
  }
  get sightingData() {
    return C(this.sighting);
  }
  set sightingData(t) {
    this.sighting = M(t), this.player = new p(this.sighting.timeline, (e, s) => this.onFrame(e, s)), this.seekInput.max = String(this.sighting.timeline.duration), this.paintCurrentFrame();
  }
  /** The UFO's appearance (shape preset, color, transparency, halo) used for the next recording. */
  get appearance() {
    return { ...this.currentAppearance };
  }
  set appearance(t) {
    this.setAppearance(t);
  }
  setAppearance(t) {
    this.currentAppearance = { ...this.currentAppearance, ...t }, this.updatePresetButtons(), this.isRecording || this.renderPreview();
  }
  updatePresetButtons() {
    for (const t of m)
      this.presetButtons[t]?.setAttribute(
        "aria-pressed",
        String(t === this.currentAppearance.presetId)
      );
  }
  get samplingRate() {
    return Number(this.samplingRateInput?.value ?? this.getAttribute("sampling-rate") ?? 100);
  }
  buildPrototype(t = this.defaultBounds()) {
    return A(t, this.currentAppearance);
  }
  defaultBounds() {
    return {
      x: this.canvas.width / 2 - a.width / 2,
      y: this.canvas.height / 2 - a.height / 2,
      width: a.width,
      height: a.height
    };
  }
  renderPreview() {
    this.renderer.clear(this.canvas.width, this.canvas.height), this.renderer.paintShape(this.buildPrototype());
  }
  toggleRecording() {
    this.isRecording ? (this.recorder?.stop(), this.isRecording = !1, this.recordButton.textContent = "Record", this.seekInput.max = String(this.sighting.timeline.duration)) : (this.recorder = new T(this.sighting.timeline, new R(this.samplingRate)), this.recorder.start(N, this.buildPrototype()), this.isRecording = !0, this.recordButton.textContent = "Stop");
  }
  play() {
    this.player?.play();
  }
  onPointerDown(t) {
    this.isRecording && this.onPointerMove(t);
  }
  onPointerMove(t) {
    if (!this.isRecording) return;
    const e = this.canvas.getBoundingClientRect(), s = t.clientX - e.left, i = t.clientY - e.top;
    this.recorder?.onPointerMove(s, i), this.renderer.clear(this.canvas.width, this.canvas.height), this.renderer.paintShape(
      y(this.buildPrototype({ x: 0, y: 0, width: a.width, height: a.height }), s, i)
    );
  }
  onPointerUp() {
  }
  onFrame(t, e) {
    this.renderer.clear(this.canvas.width, this.canvas.height);
    for (const s of e.values())
      this.renderer.paintShape(s);
    this.seekInput.value = String(t);
  }
  paintCurrentFrame() {
    this.seekInput.max = String(this.sighting.timeline.duration), this.sighting.timeline.duration > 0 || this.sighting.timeline.sourceIds.length > 0 ? this.player?.seek(0) : this.renderPreview();
  }
}
const g = "rr0-ufo-recorder";
function _() {
  customElements.get(g) || customElements.define(g, O);
}
_();
