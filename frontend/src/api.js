const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let mode = 'remote' // 'remote' or 'local'

function localKey(k) {
  return `expense-tracker:${k}`
}

function readLocal(k) {
  try {
    const raw = localStorage.getItem(localKey(k))
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return [e]
  }
}

function writeLocal(k, data) {
  localStorage.setItem(localKey(k), JSON.stringify(data))
}

async function probeApi() {
  try {
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/budgets/`, { method: 'GET' })
    if (!res.ok) throw new Error('not-ok')
    mode = 'remote'
  } catch (e) {
    mode = 'local'
  }
}

// Run probe at module load (best-effort)
probeApi()

async function request(path, options = {}) {
  if (mode === 'local') throw new Error('remote-unavailable')

  const url = `${API_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  const headers = options.headers || {};

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, { ...options, headers, credentials: 'include' });
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, data };
    return data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      if (!res.ok) throw { status: res.status, data: text };
      return text;
    }
    throw err;
  }
}

// Budgets
export async function getBudgets() {
  if (mode === 'local') return readLocal('budgets')
  try {
    return await request('/api/budgets/')
  } catch (e) {
    // fallback to local
    mode = 'local'
    return readLocal('budgets')
  }
}

export async function createBudget(payload) {
  if (mode === 'local') {
    const items = readLocal('budgets')
    const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
    const item = { id: nextId, ...payload }
    items.unshift(item)
    writeLocal('budgets', items)
    return item
  }
  try {
    return await request('/api/budgets/', { method: 'POST', body: JSON.stringify(payload) })
  } catch (e) {
    mode = 'local'
    return createBudget(payload)
  }
}

// Expenses
export async function getExpenses() {
  if (mode === 'local') return readLocal('expenses')
  try {
    return await request('/api/expenses/')
  } catch (e) {
    mode = 'local'
    return readLocal('expenses')
  }
}

export async function createExpense(payload) {
  if (mode === 'local') {
    const items = readLocal('expenses')
    const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
    const item = { id: nextId, ...payload }
    items.unshift(item)
    writeLocal('expenses', items)
    return item
  }
  try {
    return await request('/api/expenses/', { method: 'POST', body: JSON.stringify(payload) })
  } catch (e) {
    mode = 'local'
    return createExpense(payload)
  }
}

export function isRemote() { return mode === 'remote' }

export default { getBudgets, createBudget, getExpenses, createExpense, isRemote }
