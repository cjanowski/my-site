/**
 * Render a plain value as TypeScript source, pre-tokenized for highlighting.
 * Used by the "résumé as code" card: the code you see is generated from the
 * same `profile` object the rest of the page renders, so it can't drift.
 */
export type TokenKind = 'kw' | 'name' | 'key' | 'str' | 'num' | 'punct' | 'type' | 'plain'
export type Token = { kind: TokenKind; text: string }
export type Line = Token[]

export type Json = string | number | boolean | readonly Json[] | { readonly [k: string]: Json }

const t = (kind: TokenKind, text: string): Token => ({ kind, text })
const IDENT = /^[A-Za-z_$][\w$]*$/

/** Appends `v` to the last line of `out`, opening new lines for nested structures. */
function emit(v: Json, depth: number, out: Line[]): void {
  const cur = () => out[out.length - 1]
  const pad = '  '.repeat(depth)
  if (typeof v === 'string') return void cur().push(t('str', JSON.stringify(v)))
  if (typeof v !== 'object') return void cur().push(t('num', String(v)))

  if (Array.isArray(v)) {
    const inline = v.every((x) => typeof x !== 'object') && JSON.stringify(v).length < 40
    cur().push(t('punct', '['))
    v.forEach((x, i) => {
      if (inline) {
        emit(x, depth, out)
        if (i < v.length - 1) cur().push(t('punct', ', '))
      } else {
        out.push([t('plain', pad + '  ')])
        emit(x, depth + 1, out)
        cur().push(t('punct', ','))
      }
    })
    if (!inline) out.push([t('plain', pad)])
    return void cur().push(t('punct', ']'))
  }

  cur().push(t('punct', '{'))
  for (const [k, x] of Object.entries(v)) {
    out.push([t('plain', pad + '  '), t('key', IDENT.test(k) ? k : JSON.stringify(k)), t('punct', ': ')])
    emit(x, depth + 1, out)
    cur().push(t('punct', ','))
  }
  out.push([t('plain', pad), t('punct', '}')])
}

/** `const <name> = { ... } satisfies <Type>` as highlighted lines. */
export function toTsLines(name: string, v: Json, satisfies: string): Line[] {
  const out: Line[] = [[t('kw', 'const '), t('name', name), t('punct', ' = ')]]
  emit(v, 0, out)
  out[out.length - 1].push(t('kw', ' satisfies '), t('type', satisfies))
  return out
}
