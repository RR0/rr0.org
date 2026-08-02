import './style.css'
import {
  LANGS,
  REPO,
  buildModel,
  countEdits,
  cycleValue,
  detectLang,
  formatProbability,
  loadJSON,
  rank,
  restore,
  snapshot,
  toMatrixJSON,
  type Choice,
  type Labels,
  type MatrixEntry,
  type Model
} from './matrix'

const RESULTS_LIMIT = 8

interface State {
  lang: string
  loading: boolean
  error: string
  model: Model | null
  originals: Record<string, number>
  answers: Set<string>
  index: number
  tab: 'explanations' | 'matrix'
  matrixURL: string
  labelsURL: string
  matrixFile: File | null
  labelsFile: File | null
}

const lang = detectLang()

const state: State = {
  lang,
  loading: true,
  error: '',
  model: null,
  originals: {},
  answers: new Set(),
  index: 0,
  tab: 'explanations',
  matrixURL: `${REPO}matrix.json`,
  labelsURL: `${REPO}Matrix_${lang}.json`,
  matrixFile: null,
  labelsFile: null
}

const app = document.querySelector<HTMLDivElement>('#app')!

/* -- helpers ------------------------------------------------------------- */

const esc = (value: string): string =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

const pad = (n: number): string => String(n).padStart(2, '0')

function selectedChoices(): Choice[] {
  if (!state.model) return []
  return state.model.questions.flatMap((q) => q.choices.filter((c) => state.answers.has(c.full)))
}

function answeredQuestionKeys(): Set<string> {
  const keys = new Set<string>()
  for (const full of state.answers) keys.add(full.slice(0, full.indexOf('.')))
  return keys
}

function toggle(question: Model['questions'][number], choice: Choice): void {
  if (choice.type === 'radio') {
    for (const other of question.choices) {
      if (other.type === 'radio') state.answers.delete(other.full)
    }
    state.answers.add(choice.full)
  } else if (state.answers.has(choice.full)) {
    state.answers.delete(choice.full)
  } else {
    state.answers.add(choice.full)
  }
  render()
}

/* -- data ---------------------------------------------------------------- */

async function load(): Promise<void> {
  state.loading = true
  state.error = ''
  render()
  try {
    const [matrix, labels] = await Promise.all([
      loadJSON<MatrixEntry[]>(state.matrixURL, state.matrixFile),
      loadJSON<Labels>(state.labelsURL, state.labelsFile)
    ])
    state.model = buildModel(matrix, labels)
    state.originals = snapshot(state.model)
    state.index = 0
  } catch (error) {
    state.error = error instanceof Error ? error.message : String(error)
  } finally {
    state.loading = false
    render()
  }
}

/* -- views --------------------------------------------------------------- */

function rankList(
  rows: { name: string; badge: string; pct: number }[],
  variant: 'ok' | 'warn'
): string {
  return rows
    .map(
      (row, i) => `
      <div class="rank">
        <div class="rank__row">
          <span class="rank__no">${pad(i + 1)}</span>
          <span class="rank__name">${esc(row.name)}</span>
          <span class="rank__badge">${esc(row.badge)}</span>
        </div>
        <div class="rank__track">
          <span class="rank__fill rank__fill--${variant}" style="width:${row.pct}%"></span>
        </div>
      </div>`
    )
    .join('')
}

function explanationsView(selected: Choice[], model: Model): string {
  if (!selected.length) {
    return `<p class="empty">Cochez au moins une réponse : les explications se recalculent immédiatement.</p>`
  }

  const { probable, excluded } = rank(model, selected)
  const maxZeros = excluded[0]?.zeros ?? 1

  const probableRows = probable.slice(0, RESULTS_LIMIT).map((r) => ({
    name: r.name,
    badge: `${Math.round(r.mean * 100)}%`,
    pct: Math.round(r.mean * 100)
  }))
  const excludedRows = excluded.slice(0, RESULTS_LIMIT).map((r) => ({
    name: r.name,
    badge: `${r.zeros} critère${r.zeros > 1 ? 's' : ''}`,
    pct: Math.round((r.zeros / maxZeros) * 100)
  }))

  return `
    <div class="results__pair">
      <section class="card card--enter">
        <div class="card__title">
          <strong>Explications probables</strong>
          <span>${probable.length} phénomène(s) compatible(s), du plus au moins plausible</span>
        </div>
        <div class="rank-list">
          ${rankList(probableRows, 'ok')}
          ${probable.length ? '' : '<p class="note">Aucun phénomène connu ne reste compatible avec ces critères.</p>'}
        </div>
      </section>
      <section class="card card--enter">
        <div class="card__title">
          <strong>Explications exclues</strong>
          <span>${excluded.length} phénomène(s) écarté(s) par au moins un critère</span>
        </div>
        <div class="rank-list">${rankList(excludedRows, 'warn')}</div>
      </section>
    </div>`
}

function matrixView(selected: Choice[], model: Model): string {
  const current = model.questions[state.index]
  const cols = selected.length ? selected : (current?.choices ?? [])
  const edits = countEdits(model, state.originals)

  const body = model.phenomena
    .map((phenomenon) => {
      const cells = cols
        .map((choice, col) => {
          const value = choice.probs[phenomenon]
          const key = value === 0 ? '0' : value === 1 ? '1' : value === undefined ? 'na' : 'mid'
          if (value === undefined) return `<td data-p="na">—</td>`
          const changed = value !== state.originals[`${choice.full}|${phenomenon}`]
          return `<td data-p="${key}" data-changed="${changed}"><button type="button"
            data-cell="${col}|${esc(phenomenon)}"
            title="${esc(choice.label)} × ${esc(model.labels[phenomenon] ?? phenomenon)} — clic pour changer, clic droit pour reculer">${formatProbability(value)}</button></td>`
        })
        .join('')
      return `<tr><th scope="row">${esc(model.labels[phenomenon] ?? phenomenon)}</th>${cells}</tr>`
    })
    .join('')

  return `
    <section class="card">
      <div class="card__head">
        <div class="card__title">
          <strong>Probabilités par critère retenu · éditable</strong>
          <span>0 = incompatible · 0,1 / 0,5 = peu probable · 1 = compatible.
            ${selected.length ? 'Colonnes : les critères que vous avez cochés.' : 'Colonnes : les réponses de la question en cours.'}</span>
          <span class="card__hint">${
            edits ? `${edits} valeur(s) modifiée(s)` : 'Cliquez une valeur pour la faire varier : 0 → 0,1 → 0,5 → 1'
          }</span>
        </div>
        <div class="card__actions">
          ${edits ? '<button class="btn btn--small" type="button" data-restore>Valeurs d\'origine</button>' : ''}
          <button class="btn btn--small btn--solid" type="button" data-export>Exporter matrix.json</button>
        </div>
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Phénomène</th>
              ${cols.map((c) => `<th scope="col">${esc(c.label)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>`
}

function currentColumns(model: Model): Choice[] {
  const selected = selectedChoices()
  return selected.length ? selected : (model.questions[state.index]?.choices ?? [])
}

function editCell(token: string, direction: 1 | -1): void {
  if (!state.model) return
  const [col, phenomenon] = token.split('|')
  const choice = currentColumns(state.model)[Number(col)]
  const value = choice?.probs[phenomenon]
  if (!choice || value === undefined) return
  choice.probs[phenomenon] = cycleValue(value, direction)
  render()
}

function exportMatrix(model: Model): void {
  const blob = new Blob([JSON.stringify(toMatrixJSON(model), null, 4)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'matrix.json'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function mainView(model: Model): string {
  const selected = selectedChoices()
  const question = model.questions[state.index]
  const answered = answeredQuestionKeys()
  const total = model.questions.length
  const single = question?.choices.some((c) => c.type === 'radio')

  const steps = model.questions
    .map(
      (q, i) => `
      <button class="step" type="button" data-step="${i}" data-done="${answered.has(q.key)}"
        aria-current="${i === state.index}" title="${esc(q.title)}">
        ${pad(i + 1)}${answered.has(q.key) ? ' ✓' : ''}
      </button>`
    )
    .join('')

  const choices = question.choices
    .map(
      (choice, i) => `
      <label class="choice">
        <input type="${choice.type}" name="${esc(question.key)}" data-choice="${i}"
          ${state.answers.has(choice.full) ? 'checked' : ''} />
        <span>${esc(choice.label)}</span>
      </label>`
    )
    .join('')

  return `
    <section class="progress">
      <div class="progress__meta">
        <span>Question ${state.index + 1} / ${total}</span>
        <span>${answered.size} critère(s) renseigné(s) · ${selected.length} réponse(s)</span>
      </div>
      <div class="bar"><span style="width:${Math.round(((state.index + 1) / total) * 100)}%"></span></div>
      <div class="steps">${steps}</div>
    </section>

    <div class="columns">
      <section class="card card--question">
        <div class="card__title">
          <span class="kind">${single ? 'Choix unique' : 'Choix multiple'}</span>
          <h2>${esc(question.title)}</h2>
        </div>
        <div class="choices">${choices}</div>
        <div class="nav">
          <button class="btn btn--nav" type="button" data-nav="prev" ${state.index <= 0 ? 'disabled' : ''}>← Précédent</button>
          <button class="btn btn--nav btn--primary" type="button" data-nav="next" ${state.index >= total - 1 ? 'disabled' : ''}>Suivant →</button>
        </div>
      </section>

      <section class="results">
        <div class="tabs" role="tablist">
          <button class="tab" type="button" role="tab" data-tab="explanations"
            aria-selected="${state.tab === 'explanations'}">Explications</button>
          <button class="tab" type="button" role="tab" data-tab="matrix"
            aria-selected="${state.tab === 'matrix'}">Matrice</button>
        </div>
        ${state.tab === 'explanations' ? explanationsView(selected, model) : matrixView(selected, model)}
      </section>
    </div>`
}

function sheetView(): string {
  return `
    <dialog class="sheet" id="sources">
      <form class="sheet__body" method="dialog" data-sources>
        <div class="sheet__head">
          <div class="card__title">
            <strong>Sources de données</strong>
            <span>Matrice (questions, types de réponse, probabilités) et libellés affichés.
              Langue détectée : ${esc(LANGS[state.lang] ?? state.lang)}</span>
          </div>
          <button class="btn btn--icon" type="button" data-close aria-label="Fermer">✕</button>
        </div>
        <div class="field">
          <label for="matrixURL">URL de la matrice</label>
          <input id="matrixURL" name="matrixURL" type="text" value="${esc(state.matrixURL)}" />
          <input id="matrixFile" name="matrixFile" type="file" accept="application/json" />
        </div>
        <div class="field">
          <label for="labelsURL">URL des libellés</label>
          <input id="labelsURL" name="labelsURL" type="text" value="${esc(state.labelsURL)}" />
          <input id="labelsFile" name="labelsFile" type="file" accept="application/json" />
        </div>
        <button class="btn btn--nav btn--primary" type="submit">Recharger</button>
      </form>
    </dialog>`
}

function render(): void {
  const title = state.model?.labels.Title ?? "Évaluation d'une observation"

  let body: string
  if (state.loading) {
    body = `<div class="loading"><span class="spinner"></span>Chargement de la matrice et des libellés…</div>`
  } else if (state.error) {
    body = `
      <div class="error">
        <strong>Impossible de charger les données</strong>
        <span>${esc(state.error)}</span>
        <button class="btn btn--solid" type="button" data-retry>Réessayer</button>
      </div>`
  } else if (state.model) {
    body = mainView(state.model)
  } else {
    body = ''
  }

  app.innerHTML = `
    <div class="app">
      <div class="shell">
        <header class="head">
          <div class="head__text">
            <span class="eyebrow">Claude Poher · 1977</span>
            <h1>${esc(title)}</h1>
            <p class="lede">Décrivez l'observation critère par critère : la matrice élimine les phénomènes
              connus incompatibles et classe ceux qui restent.
              <a href="http://rr0.org/time/1/9/7/7/Poher_Matrice" target="_blank" rel="noreferrer">Description de la méthode</a></p>
          </div>
          <div class="head__actions">
            <button class="btn" type="button" data-reset>Réinitialiser</button>
            <button class="btn btn--solid" type="button" data-open>Sources de données</button>
          </div>
        </header>
        ${body}
        ${sheetView()}
        <footer>Méthode d'évaluation des explications d'une observation d'ovni en termes de phénomènes
          connus, d'après la matrice de Claude Poher (1977).</footer>
      </div>
    </div>`
}

/* -- events (delegated, so re-rendering never loses bindings) ------------ */

app.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  const hit = (selector: string): HTMLElement | null => target.closest(selector)

  if (hit('[data-reset]')) {
    state.answers.clear()
    state.index = 0
    render()
  } else if (hit('[data-retry]')) {
    void load()
  } else if (hit('[data-open]')) {
    document.querySelector<HTMLDialogElement>('#sources')?.showModal()
  } else if (hit('[data-close]')) {
    document.querySelector<HTMLDialogElement>('#sources')?.close()
  } else if (hit('[data-restore]')) {
    if (state.model) restore(state.model, state.originals)
    render()
  } else if (hit('[data-export]')) {
    if (state.model) exportMatrix(state.model)
  } else if (hit('[data-cell]')) {
    editCell(hit('[data-cell]')!.dataset.cell!, 1)
  } else if (hit('[data-nav]')) {
    const dir = hit('[data-nav]')!.dataset.nav
    const total = state.model?.questions.length ?? 1
    state.index = dir === 'prev' ? Math.max(0, state.index - 1) : Math.min(total - 1, state.index + 1)
    render()
  } else if (hit('[data-step]')) {
    state.index = Number(hit('[data-step]')!.dataset.step)
    render()
  } else if (hit('[data-tab]')) {
    state.tab = hit('[data-tab]')!.dataset.tab as State['tab']
    render()
  }
})

app.addEventListener('contextmenu', (event) => {
  const cell = (event.target as HTMLElement).closest<HTMLElement>('[data-cell]')
  if (!cell) return
  event.preventDefault()
  editCell(cell.dataset.cell!, -1)
})

app.addEventListener('change', (event) => {
  const input = event.target as HTMLInputElement
  const index = input.dataset.choice
  if (index === undefined || !state.model) return
  const question = state.model.questions[state.index]
  toggle(question, question.choices[Number(index)])
})

app.addEventListener('submit', (event) => {
  const form = event.target as HTMLFormElement
  if (!form.matches('[data-sources]')) return
  const data = new FormData(form)
  const file = (name: string): File | null => {
    const value = data.get(name)
    return value instanceof File && value.size > 0 ? value : null
  }
  state.matrixURL = String(data.get('matrixURL') ?? state.matrixURL)
  state.labelsURL = String(data.get('labelsURL') ?? state.labelsURL)
  state.matrixFile = file('matrixFile')
  state.labelsFile = file('labelsFile')
  state.answers.clear()
  void load()
})

void load()
