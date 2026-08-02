export type AnswerType = 'radio' | 'checkbox'

export interface MatrixEntry {
  question: string
  answertype: string
  knownPhenomenaProbabilities?: Record<string, number>
  /** Typo present in the published dataset for `ObjectShape.Other`. */
  knownPhenomenonProbabilities?: Record<string, number>
}

export type Labels = Record<string, string>

export interface Choice {
  key: string
  full: string
  label: string
  /** Raw `answertype` from the source file, preserved for export. */
  answertype: string
  type: AnswerType
  probs: Record<string, number>
}

/** Editable steps a matrix cell cycles through. */
export const STEPS = [0, 0.1, 0.5, 1] as const

export interface Question {
  key: string
  title: string
  choices: Choice[]
}

export interface Model {
  questions: Question[]
  phenomena: string[]
  labels: Labels
}

export interface Ranked {
  phenomenon: string
  name: string
  zeros: number
  mean: number
}

export const REPO =
  'https://raw.githubusercontent.com/RR0/rr0.org/master/time/1/9/7/7/Poher_Matrice/'

export const LANGS: Labels = { fr: 'français', en: 'English', it: 'italiano' }

export function detectLang(): string {
  const raw = navigator.languages?.[0] ?? navigator.language ?? 'fr'
  const lang = raw.slice(0, 2).toLowerCase()
  return lang in LANGS ? lang : 'fr'
}

export async function loadJSON<T>(url: string, file: File | null): Promise<T> {
  if (file) return JSON.parse(await file.text()) as T
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  return (await res.json()) as T
}

export function buildModel(matrix: MatrixEntry[], labels: Labels): Model {
  const questions: Question[] = []
  const byKey = new Map<string, Question>()
  const phenomena: string[] = []

  for (const entry of matrix) {
    const dot = entry.question.indexOf('.')
    const questionKey = entry.question.slice(0, dot)
    const choiceKey = entry.question.slice(dot + 1)
    const probs = entry.knownPhenomenaProbabilities ?? entry.knownPhenomenonProbabilities ?? {}

    for (const p of Object.keys(probs)) if (!phenomena.includes(p)) phenomena.push(p)

    let question = byKey.get(questionKey)
    if (!question) {
      question = { key: questionKey, title: labels[questionKey] ?? questionKey, choices: [] }
      byKey.set(questionKey, question)
      questions.push(question)
    }
    question.choices.push({
      key: choiceKey,
      full: entry.question,
      label: labels[entry.question] ?? choiceKey,
      answertype: entry.answertype ?? 'checkbox',
      type: entry.answertype?.startsWith('radio') ? 'radio' : 'checkbox',
      probs
    })
  }

  return { questions, phenomena, labels }
}

/** Poher's rule: a criterion whose probability is 0 rules the phenomenon out. */
export function rank(model: Model, selected: Choice[]): { probable: Ranked[]; excluded: Ranked[] } {
  const rows: Ranked[] = model.phenomena.map((phenomenon) => {
    let zeros = 0
    let sum = 0
    let count = 0
    for (const choice of selected) {
      const value = choice.probs[phenomenon]
      if (value === undefined) continue
      count++
      sum += value
      if (value === 0) zeros++
    }
    return {
      phenomenon,
      name: model.labels[phenomenon] ?? phenomenon,
      zeros,
      mean: count ? sum / count : 0
    }
  })

  return {
    probable: rows.filter((r) => r.zeros === 0).sort((a, b) => b.mean - a.mean),
    excluded: rows.filter((r) => r.zeros > 0).sort((a, b) => b.zeros - a.zeros || a.mean - b.mean)
  }
}

/** Flat `choice.full|phenomenon` → value map, used to detect user edits. */
export function snapshot(model: Model): Record<string, number> {
  const out: Record<string, number> = {}
  for (const question of model.questions) {
    for (const choice of question.choices) {
      for (const [phenomenon, value] of Object.entries(choice.probs)) {
        out[`${choice.full}|${phenomenon}`] = value
      }
    }
  }
  return out
}

export function cycleValue(current: number, direction: 1 | -1): number {
  const index = STEPS.indexOf(current as (typeof STEPS)[number])
  const from = index < 0 ? 0 : index
  return STEPS[(from + direction + STEPS.length) % STEPS.length]
}

export function countEdits(model: Model, originals: Record<string, number>): number {
  let edits = 0
  for (const [key, value] of Object.entries(snapshot(model))) {
    if (value !== originals[key]) edits++
  }
  return edits
}

export function restore(model: Model, originals: Record<string, number>): void {
  for (const question of model.questions) {
    for (const choice of question.choices) {
      for (const phenomenon of Object.keys(choice.probs)) {
        const original = originals[`${choice.full}|${phenomenon}`]
        if (original !== undefined) choice.probs[phenomenon] = original
      }
    }
  }
}

export function toMatrixJSON(model: Model): MatrixEntry[] {
  return model.questions.flatMap((question) =>
    question.choices.map((choice) => ({
      question: choice.full,
      answertype: choice.answertype,
      knownPhenomenaProbabilities: choice.probs
    }))
  )
}

export function formatProbability(value: number | undefined): string {
  if (value === undefined) return '—'
  if (value === 0) return '0'
  if (value === 1) return '1'
  return String(value).replace('0.', '0,')
}
