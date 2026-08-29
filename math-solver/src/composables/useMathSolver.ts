import { computed, nextTick, ref, watch } from 'vue'
import { formatNumber, parseNumber } from '../utils/mathHelpers'
import { formatSolutionText, type HistoryEntry } from './useSolverHistory'

export type SolverMode = 'home' | 'polynomial' | 'pythagorean' | 'logarithm'
export type PolyType = 'Linear' | 'Quadratic'
export type PolyFind = 'a' | 'x' | 'b' | 'y'
export type PythaFind = 'a' | 'b' | 'c'
export type LogaType =
  | 'General Logarithm'
  | 'Logarithm of Product'
  | 'Logarithm of Division'
  | 'Logarithm of Power'
  | 'Logarithm of Square Root'
  | 'Natural Logarithm'
  | 'Base 10 Logarithm'

export type ToastStatus = 'success' | 'fail' | null

export interface SolverField {
  key: string
  label: string
  hint: string
}

export interface SolutionStep {
  label: string
  detail: string
}

export interface SolutionResult {
  title: string
  given: string[]
  steps: SolutionStep[]
  answer: string
  note?: string
}

export function useMathSolver() {
  const mode = ref<SolverMode>('home')
  const functionLabel = ref('Function')
  const listName = ref('')
  const polyType = ref<PolyType>('Linear')
  const polyFind = ref<PolyFind>('a')
  const pythaFind = ref<PythaFind>('a')
  const logaType = ref<LogaType>('General Logarithm')

  const values = ref<Record<string, string>>({})
  const result = ref<SolutionResult | null>(null)
  const showResult = computed(() => result.value !== null)
  const toastStatus = ref<ToastStatus>(null)
  const toastMessage = ref('')
  const copied = ref(false)
  const suppressReset = ref(false)

  const showList = computed(() => mode.value === 'polynomial' || mode.value === 'logarithm')
  const showListPoly = computed(() => mode.value === 'polynomial')
  const showListLoga = computed(() => mode.value === 'logarithm')
  const showSelectName = computed(
    () =>
      (mode.value === 'polynomial' && polyType.value === 'Linear') ||
      mode.value === 'pythagorean',
  )
  const showSelectPoly = computed(() => mode.value === 'polynomial' && polyType.value === 'Linear')
  const showSelectPytha = computed(() => mode.value === 'pythagorean')
  const showSubmit = computed(() => mode.value !== 'home')
  const showDetails = computed(() => mode.value === 'home')

  const activePicture = computed(() => {
    if (mode.value === 'polynomial') {
      if (polyType.value === 'Quadratic') return 'poly-qua'
      return `poly-${polyFind.value}`
    }
    if (mode.value === 'pythagorean') return `pytha-${pythaFind.value}`
    if (mode.value === 'logarithm') {
      const map: Record<LogaType, string> = {
        'General Logarithm': 'loga-gene',
        'Logarithm of Product': 'loga-pro',
        'Logarithm of Division': 'loga-divi',
        'Logarithm of Power': 'loga-power',
        'Logarithm of Square Root': 'loga-squ',
        'Natural Logarithm': 'loga-natural',
        'Base 10 Logarithm': 'loga-base10',
      }
      return map[logaType.value]
    }
    return null
  })

  const fields = computed<SolverField[]>(() => {
    if (mode.value === 'polynomial') {
      if (polyType.value === 'Quadratic') {
        return [
          { key: 'a', label: 'a', hint: 'e.g. 1' },
          { key: 'b', label: 'b', hint: 'e.g. -5' },
          { key: 'c', label: 'c', hint: 'e.g. 6' },
        ]
      }
      const all: PolyFind[] = ['a', 'x', 'b', 'y']
      return all
        .filter((k) => k !== polyFind.value)
        .map((k) => ({ key: k, label: k, hint: 'e.g. 3' }))
    }

    if (mode.value === 'pythagorean') {
      const all: PythaFind[] = ['a', 'b', 'c']
      return all
        .filter((k) => k !== pythaFind.value)
        .map((k) => ({ key: k, label: k, hint: 'e.g. 4' }))
    }

    if (mode.value === 'logarithm') {
      switch (logaType.value) {
        case 'General Logarithm':
          return [
            { key: 'base', label: 'base', hint: 'e.g. 2' },
            { key: 'number', label: 'number', hint: 'e.g. 8' },
          ]
        case 'Logarithm of Product':
        case 'Logarithm of Division':
          return [
            { key: 'm', label: 'm', hint: 'e.g. 4' },
            { key: 'n', label: 'n', hint: 'e.g. 2' },
          ]
        case 'Logarithm of Power':
          return [
            { key: 'number', label: 'number', hint: 'e.g. 5' },
            { key: 'power', label: 'power', hint: 'e.g. 3' },
          ]
        case 'Logarithm of Square Root':
        case 'Natural Logarithm':
        case 'Base 10 Logarithm':
          return [{ key: 'number', label: 'number', hint: 'e.g. 10' }]
      }
    }

    return []
  })

  const formulaPreview = computed(() => {
    if (mode.value === 'polynomial') {
      if (polyType.value === 'Quadratic') {
        return 'a·x² + b·x + c = 0  →  find x'
      }
      const mark = (sym: PolyFind) => (sym === polyFind.value ? '?' : sym)
      return `${mark('y')} = ${mark('a')}·${mark('x')} + ${mark('b')}`
    }
    if (mode.value === 'pythagorean') {
      const mark = (sym: PythaFind) => (sym === pythaFind.value ? '?' : sym)
      return `${mark('a')}² + ${mark('b')}² = ${mark('c')}²`
    }
    if (mode.value === 'logarithm') {
      switch (logaType.value) {
        case 'General Logarithm':
          return 'log<sub>base</sub>(number) = ?'
        case 'Logarithm of Product':
          return 'log<sub>10</sub>(m · n) = ?'
        case 'Logarithm of Division':
          return 'log<sub>10</sub>(m / n) = ?'
        case 'Logarithm of Power':
          return 'log<sub>10</sub>(number<sup>power</sup>) = ?'
        case 'Logarithm of Square Root':
          return 'log<sub>10</sub>(√number) = ?'
        case 'Natural Logarithm':
          return 'ln(number) = ?'
        case 'Base 10 Logarithm':
          return 'log<sub>10</sub>(number) = ?'
      }
    }
    return ''
  })

  const solvingFor = computed(() => {
    if (mode.value === 'polynomial') {
      return polyType.value === 'Quadratic' ? 'x' : polyFind.value
    }
    if (mode.value === 'pythagorean') return pythaFind.value
    if (mode.value === 'logarithm') return 'result'
    return ''
  })

  function resetFields() {
    values.value = {}
    result.value = null
  }

  function setField(key: string, value: string) {
    values.value = { ...values.value, [key]: value }
  }

  function setSolution(solution: SolutionResult) {
    result.value = solution
    alertToast('success', '')
  }

  function alertToast(status: ToastStatus, text: string) {
    toastStatus.value = status
    toastMessage.value =
      status === 'success'
        ? text || '<strong>Success!</strong> Ready.'
        : text
  }

  function clearToast() {
    toastStatus.value = null
  }

  function summaryLabel(): string {
    if (mode.value === 'polynomial') {
      return polyType.value === 'Quadratic'
        ? 'Quadratic · find x'
        : `Linear · find ${polyFind.value}`
    }
    if (mode.value === 'pythagorean') return `Pythagorean · find ${pythaFind.value}`
    if (mode.value === 'logarithm') return logaType.value
    return 'Solve'
  }

  function buildHistoryPayload(): Omit<HistoryEntry, 'id' | 'createdAt'> | null {
    if (mode.value === 'home' || !result.value) return null
    return {
      mode: mode.value,
      summary: summaryLabel(),
      values: { ...values.value },
      polyType: polyType.value,
      polyFind: polyFind.value,
      pythaFind: pythaFind.value,
      logaType: logaType.value,
      result: result.value,
    }
  }

  async function copyAnswer(): Promise<boolean> {
    if (!result.value) return false
    try {
      await navigator.clipboard.writeText(formatSolutionText(result.value))
      copied.value = true
      alertToast('success', '<strong>Copied!</strong> Steps and answer are on the clipboard.')
      setTimeout(() => {
        copied.value = false
      }, 2000)
      return true
    } catch {
      alertToast('fail', '<strong>Copy failed</strong> Clipboard permission denied.')
      return false
    }
  }

  function loadExample() {
    if (mode.value === 'polynomial') {
      if (polyType.value === 'Quadratic') {
        values.value = { a: '1', b: '-5', c: '6' }
      } else if (polyFind.value === 'a') {
        values.value = { x: '2', b: '1', y: '7' }
      } else if (polyFind.value === 'x') {
        values.value = { a: '2', b: '1', y: '7' }
      } else if (polyFind.value === 'b') {
        values.value = { a: '2', x: '3', y: '7' }
      } else {
        values.value = { a: '2', x: '3', b: '1' }
      }
    } else if (mode.value === 'pythagorean') {
      if (pythaFind.value === 'a') values.value = { b: '4', c: '5' }
      else if (pythaFind.value === 'b') values.value = { a: '3', c: '5' }
      else values.value = { a: '3', b: '4' }
    } else if (mode.value === 'logarithm') {
      switch (logaType.value) {
        case 'General Logarithm':
          values.value = { base: '2', number: '8' }
          break
        case 'Logarithm of Product':
        case 'Logarithm of Division':
          values.value = { m: '4', n: '2' }
          break
        case 'Logarithm of Power':
          values.value = { number: '5', power: '2' }
          break
        default:
          values.value = { number: '10' }
      }
    }
    result.value = null
  }

  async function restoreEntry(entry: HistoryEntry) {
    suppressReset.value = true
    mode.value = entry.mode
    functionLabel.value =
      entry.mode === 'polynomial'
        ? 'Polynomial'
        : entry.mode === 'pythagorean'
          ? 'Pythagorean'
          : 'Logarithm'
    listName.value =
      entry.mode === 'polynomial'
        ? 'Equation type'
        : entry.mode === 'logarithm'
          ? 'Log type'
          : ''
    polyType.value = entry.polyType
    polyFind.value = entry.polyFind
    pythaFind.value = entry.pythaFind
    logaType.value = entry.logaType
    await nextTick()
    values.value = { ...entry.values }
    result.value = entry.result
    await nextTick()
    suppressReset.value = false
  }

  function requireNumbers<K extends string>(keys: readonly K[]): Record<K, number> | null {
    const out = {} as Record<K, number>
    for (const key of keys) {
      const n = parseNumber(values.value[key] ?? '')
      if (n === null) {
        alertToast('fail', `<strong>Missing value</strong> Please enter a number for <b>${key}</b>.`)
        return null
      }
      out[key] = n
    }
    return out
  }

  function selectPolynomial() {
    mode.value = 'polynomial'
    functionLabel.value = 'Polynomial'
    listName.value = 'Equation type'
    polyType.value = 'Linear'
    polyFind.value = 'y'
    resetFields()
  }

  function selectPythagorean() {
    mode.value = 'pythagorean'
    functionLabel.value = 'Pythagorean'
    listName.value = ''
    pythaFind.value = 'c'
    resetFields()
  }

  function selectLogarithm() {
    mode.value = 'logarithm'
    functionLabel.value = 'Logarithm'
    listName.value = 'Log type'
    logaType.value = 'General Logarithm'
    resetFields()
  }

  function resetHome() {
    mode.value = 'home'
    functionLabel.value = 'Function'
    listName.value = ''
    resetFields()
  }

  watch([polyType, polyFind, pythaFind, logaType], () => {
    if (mode.value === 'home' || suppressReset.value) return
    values.value = {}
    result.value = null
  })

  function playClick() {
    const audio = document.getElementById('audio') as HTMLAudioElement | null
    audio?.play().catch(() => {})
  }

  function submit(): boolean {
    playClick()
    const before = result.value
    if (mode.value === 'polynomial') solvePolynomial()
    else if (mode.value === 'pythagorean') solvePythagorean()
    else if (mode.value === 'logarithm') solveLogarithm()
    return result.value !== null && result.value !== before
  }

  function solvePolynomial() {
    if (polyType.value === 'Quadratic') {
      const nums = requireNumbers(['a', 'b', 'c'])
      if (!nums) return
      const { a, b, c } = nums
      if (a === 0) {
        alertToast('fail', '<strong>Invalid a</strong> Coefficient a cannot be 0 for a quadratic.')
        return
      }
      const disc = b * b - 4 * a * c
      const given = [`a = ${formatNumber(a)}`, `b = ${formatNumber(b)}`, `c = ${formatNumber(c)}`]

      if (disc < 0) {
        setSolution({
          title: 'Quadratic equation',
          given,
          steps: [
            { label: '1. Write the equation', detail: `${formatNumber(a)}x² + (${formatNumber(b)})x + (${formatNumber(c)}) = 0` },
            { label: '2. Discriminant', detail: `Δ = b² − 4ac = ${formatNumber(b)}² − 4·${formatNumber(a)}·${formatNumber(c)} = ${formatNumber(disc)}` },
            { label: '3. Check Δ', detail: 'Δ < 0 → no real roots' },
          ],
          answer: 'No real x',
          note: 'Complex roots exist, but this solver shows real numbers only.',
        })
        alertToast('success', '<strong>Solved</strong> Discriminant is negative — no real roots.')
        return
      }

      const root1 = (-b + Math.sqrt(disc)) / (2 * a)
      const root2 = (-b - Math.sqrt(disc)) / (2 * a)
      setSolution({
        title: 'Quadratic equation',
        given,
        steps: [
          { label: '1. Write the equation', detail: `${formatNumber(a)}x² + (${formatNumber(b)})x + (${formatNumber(c)}) = 0` },
          { label: '2. Discriminant', detail: `Δ = b² − 4ac = ${formatNumber(disc)}` },
          { label: '3. Quadratic formula', detail: 'x = (−b ± √Δ) / (2a)' },
          {
            label: '4. Substitute',
            detail: `x = (${formatNumber(-b)} ± √${formatNumber(disc)}) / (2·${formatNumber(a)})`,
          },
        ],
        answer: `x₁ = ${formatNumber(root1)} ,  x₂ = ${formatNumber(root2)}`,
      })
      return
    }

    const needed = (['a', 'x', 'b', 'y'] as PolyFind[]).filter((k) => k !== polyFind.value)
    const nums = requireNumbers(needed)
    if (!nums) return

    const given = needed.map((k) => `${k} = ${formatNumber(nums[k])}`)

    switch (polyFind.value) {
      case 'a': {
        if (nums.x === 0) {
          alertToast('fail', '<strong>Invalid x</strong> Cannot divide by x = 0.')
          return
        }
        const resultValue = (nums.y - nums.b) / nums.x
        setSolution({
          title: 'Linear equation · find a',
          given,
          steps: [
            { label: '1. Start from', detail: 'y = a·x + b' },
            { label: '2. Isolate a', detail: 'a = (y − b) / x' },
            {
              label: '3. Substitute',
              detail: `a = (${formatNumber(nums.y)} − ${formatNumber(nums.b)}) / ${formatNumber(nums.x)}`,
            },
            { label: '4. Compute', detail: `a = ${formatNumber(nums.y - nums.b)} / ${formatNumber(nums.x)}` },
          ],
          answer: `a = ${formatNumber(resultValue)}`,
        })
        break
      }
      case 'x': {
        if (nums.a === 0) {
          alertToast('fail', '<strong>Invalid a</strong> Cannot divide by a = 0.')
          return
        }
        const resultValue = (nums.y - nums.b) / nums.a
        setSolution({
          title: 'Linear equation · find x',
          given,
          steps: [
            { label: '1. Start from', detail: 'y = a·x + b' },
            { label: '2. Isolate x', detail: 'x = (y − b) / a' },
            {
              label: '3. Substitute',
              detail: `x = (${formatNumber(nums.y)} − ${formatNumber(nums.b)}) / ${formatNumber(nums.a)}`,
            },
            { label: '4. Compute', detail: `x = ${formatNumber(nums.y - nums.b)} / ${formatNumber(nums.a)}` },
          ],
          answer: `x = ${formatNumber(resultValue)}`,
        })
        break
      }
      case 'b': {
        const resultValue = nums.y - nums.a * nums.x
        setSolution({
          title: 'Linear equation · find b',
          given,
          steps: [
            { label: '1. Start from', detail: 'y = a·x + b' },
            { label: '2. Isolate b', detail: 'b = y − a·x' },
            {
              label: '3. Substitute',
              detail: `b = ${formatNumber(nums.y)} − (${formatNumber(nums.a)} · ${formatNumber(nums.x)})`,
            },
            { label: '4. Compute', detail: `b = ${formatNumber(nums.y)} − ${formatNumber(nums.a * nums.x)}` },
          ],
          answer: `b = ${formatNumber(resultValue)}`,
        })
        break
      }
      case 'y': {
        const product = nums.a * nums.x
        const resultValue = product + nums.b
        setSolution({
          title: 'Linear equation · find y',
          given,
          steps: [
            { label: '1. Start from', detail: 'y = a·x + b' },
            {
              label: '2. Substitute',
              detail: `y = ${formatNumber(nums.a)} · ${formatNumber(nums.x)} + ${formatNumber(nums.b)}`,
            },
            { label: '3. Multiply', detail: `${formatNumber(nums.a)} · ${formatNumber(nums.x)} = ${formatNumber(product)}` },
            { label: '4. Add b', detail: `${formatNumber(product)} + ${formatNumber(nums.b)} = ${formatNumber(resultValue)}` },
          ],
          answer: `y = ${formatNumber(resultValue)}`,
        })
        break
      }
    }
  }

  function solvePythagorean() {
    const needed = (['a', 'b', 'c'] as PythaFind[]).filter((k) => k !== pythaFind.value)
    const nums = requireNumbers(needed)
    if (!nums) return

    for (const key of needed) {
      if (nums[key] <= 0) {
        alertToast('fail', `<strong>Invalid side</strong> Side <b>${key}</b> must be &gt; 0.`)
        return
      }
    }

    const given = needed.map((k) => `${k} = ${formatNumber(nums[k])}`)

    if (pythaFind.value === 'a') {
      const under = nums.c * nums.c - nums.b * nums.b
      if (under <= 0) {
        alertToast('fail', '<strong>Impossible triangle</strong> Need c &gt; b so that a is a positive length.')
        return
      }
      const resultValue = Math.sqrt(under)
      setSolution({
        title: 'Pythagorean · find a',
        given,
        steps: [
          { label: '1. Start from', detail: 'a² + b² = c²' },
          { label: '2. Isolate a²', detail: 'a² = c² − b²' },
          {
            label: '3. Substitute',
            detail: `a² = ${formatNumber(nums.c)}² − ${formatNumber(nums.b)}² = ${formatNumber(under)}`,
          },
          { label: '4. Square root', detail: `a = √${formatNumber(under)}` },
        ],
        answer: `a = ${formatNumber(resultValue)}`,
      })
    } else if (pythaFind.value === 'b') {
      const under = nums.c * nums.c - nums.a * nums.a
      if (under <= 0) {
        alertToast('fail', '<strong>Impossible triangle</strong> Need c &gt; a so that b is a positive length.')
        return
      }
      const resultValue = Math.sqrt(under)
      setSolution({
        title: 'Pythagorean · find b',
        given,
        steps: [
          { label: '1. Start from', detail: 'a² + b² = c²' },
          { label: '2. Isolate b²', detail: 'b² = c² − a²' },
          {
            label: '3. Substitute',
            detail: `b² = ${formatNumber(nums.c)}² − ${formatNumber(nums.a)}² = ${formatNumber(under)}`,
          },
          { label: '4. Square root', detail: `b = √${formatNumber(under)}` },
        ],
        answer: `b = ${formatNumber(resultValue)}`,
      })
    } else {
      const under = nums.a * nums.a + nums.b * nums.b
      const resultValue = Math.sqrt(under)
      setSolution({
        title: 'Pythagorean · find c',
        given,
        steps: [
          { label: '1. Start from', detail: 'a² + b² = c²' },
          { label: '2. Isolate c', detail: 'c = √(a² + b²)' },
          {
            label: '3. Substitute',
            detail: `c = √(${formatNumber(nums.a)}² + ${formatNumber(nums.b)}²) = √${formatNumber(under)}`,
          },
        ],
        answer: `c = ${formatNumber(resultValue)}`,
      })
    }
  }

  function solveLogarithm() {
    if (logaType.value === 'General Logarithm') {
      const nums = requireNumbers(['base', 'number'])
      if (!nums) return
      if (nums.base <= 0 || nums.base === 1 || nums.number <= 0) {
        alertToast('fail', '<strong>Invalid log</strong> Need base &gt; 0, base ≠ 1, and number &gt; 0.')
        return
      }
      const resultValue = Math.log(nums.number) / Math.log(nums.base)
      setSolution({
        title: 'General logarithm',
        given: [`base = ${formatNumber(nums.base)}`, `number = ${formatNumber(nums.number)}`],
        steps: [
          { label: '1. Goal', detail: `Find log<sub>${formatNumber(nums.base)}</sub>(${formatNumber(nums.number)})` },
          { label: '2. Change of base', detail: 'log_b(x) = ln(x) / ln(b)' },
          {
            label: '3. Substitute',
            detail: `= ln(${formatNumber(nums.number)}) / ln(${formatNumber(nums.base)})`,
          },
        ],
        answer: `result = ${formatNumber(resultValue)}`,
        note: 'Meaning: base^result = number',
      })
      return
    }

    if (logaType.value === 'Logarithm of Product') {
      const nums = requireNumbers(['m', 'n'])
      if (!nums) return
      if (nums.m <= 0 || nums.n <= 0) {
        alertToast('fail', '<strong>Invalid log</strong> m and n must be &gt; 0.')
        return
      }
      const product = nums.m * nums.n
      const resultValue = Math.log10(product)
      setSolution({
        title: 'Logarithm of product',
        given: [`m = ${formatNumber(nums.m)}`, `n = ${formatNumber(nums.n)}`],
        steps: [
          { label: '1. Identity', detail: 'log₁₀(m · n) = log₁₀(m) + log₁₀(n)' },
          { label: '2. Multiply inside', detail: `m · n = ${formatNumber(product)}` },
          { label: '3. Evaluate', detail: `log₁₀(${formatNumber(product)})` },
        ],
        answer: `result = ${formatNumber(resultValue)}`,
        note: 'Uses common log (base 10).',
      })
      return
    }

    if (logaType.value === 'Logarithm of Division') {
      const nums = requireNumbers(['m', 'n'])
      if (!nums) return
      if (nums.m <= 0 || nums.n <= 0) {
        alertToast('fail', '<strong>Invalid log</strong> m and n must be &gt; 0.')
        return
      }
      const quotient = nums.m / nums.n
      const resultValue = Math.log10(quotient)
      setSolution({
        title: 'Logarithm of division',
        given: [`m = ${formatNumber(nums.m)}`, `n = ${formatNumber(nums.n)}`],
        steps: [
          { label: '1. Identity', detail: 'log₁₀(m / n) = log₁₀(m) − log₁₀(n)' },
          { label: '2. Divide inside', detail: `m / n = ${formatNumber(quotient)}` },
          { label: '3. Evaluate', detail: `log₁₀(${formatNumber(quotient)})` },
        ],
        answer: `result = ${formatNumber(resultValue)}`,
        note: 'Uses common log (base 10).',
      })
      return
    }

    if (logaType.value === 'Logarithm of Power') {
      const nums = requireNumbers(['number', 'power'])
      if (!nums) return
      if (nums.number <= 0) {
        alertToast('fail', '<strong>Invalid log</strong> number must be &gt; 0.')
        return
      }
      const resultValue = nums.power * Math.log10(nums.number)
      setSolution({
        title: 'Logarithm of power',
        given: [`number = ${formatNumber(nums.number)}`, `power = ${formatNumber(nums.power)}`],
        steps: [
          { label: '1. Identity', detail: 'log₁₀(xⁿ) = n · log₁₀(x)' },
          {
            label: '2. Substitute',
            detail: `${formatNumber(nums.power)} · log₁₀(${formatNumber(nums.number)})`,
          },
        ],
        answer: `result = ${formatNumber(resultValue)}`,
        note: 'Uses common log (base 10).',
      })
      return
    }

    const nums = requireNumbers(['number'])
    if (!nums) return
    if (nums.number <= 0) {
      alertToast('fail', '<strong>Invalid log</strong> number must be &gt; 0.')
      return
    }

    if (logaType.value === 'Logarithm of Square Root') {
      const resultValue = 0.5 * Math.log10(nums.number)
      setSolution({
        title: 'Logarithm of square root',
        given: [`number = ${formatNumber(nums.number)}`],
        steps: [
          { label: '1. Rewrite root', detail: '√x = x^(1/2)' },
          { label: '2. Identity', detail: 'log₁₀(√x) = (1/2) · log₁₀(x)' },
          { label: '3. Substitute', detail: `(1/2) · log₁₀(${formatNumber(nums.number)})` },
        ],
        answer: `result = ${formatNumber(resultValue)}`,
        note: 'Uses common log (base 10).',
      })
      return
    }

    if (logaType.value === 'Natural Logarithm') {
      const resultValue = Math.log(nums.number)
      setSolution({
        title: 'Natural logarithm',
        given: [`number = ${formatNumber(nums.number)}`],
        steps: [
          { label: '1. Definition', detail: 'ln(x) = log_e(x)' },
          { label: '2. Evaluate', detail: `ln(${formatNumber(nums.number)})` },
        ],
        answer: `result = ${formatNumber(resultValue)}`,
        note: 'e ≈ 2.71828',
      })
      return
    }

    const resultValue = Math.log10(nums.number)
    setSolution({
      title: 'Base 10 logarithm',
      given: [`number = ${formatNumber(nums.number)}`],
      steps: [
        { label: '1. Definition', detail: 'log₁₀(x) uses base 10' },
        { label: '2. Evaluate', detail: `log₁₀(${formatNumber(nums.number)})` },
      ],
      answer: `result = ${formatNumber(resultValue)}`,
    })
  }

  return {
    mode,
    functionLabel,
    listName,
    polyType,
    polyFind,
    pythaFind,
    logaType,
    values,
    fields,
    formulaPreview,
    solvingFor,
    result,
    showResult,
    toastStatus,
    toastMessage,
    copied,
    showList,
    showListPoly,
    showListLoga,
    showSelectName,
    showSelectPoly,
    showSelectPytha,
    showSubmit,
    showDetails,
    activePicture,
    setField,
    selectPolynomial,
    selectPythagorean,
    selectLogarithm,
    resetHome,
    submit,
    clearToast,
    loadExample,
    copyAnswer,
    restoreEntry,
    buildHistoryPayload,
  }
}
