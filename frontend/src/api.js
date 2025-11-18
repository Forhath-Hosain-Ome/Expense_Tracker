const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

let mode = 'remote'
let token = null

function localKey(k) {
  return `expense-tracker:${k}`
}

function readLocal(k) {
  try {
    const raw = localStorage.getItem(localKey(k))
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function writeLocal(k, data) {
  localStorage.setItem(localKey(k), JSON.stringify(data))
}

async function probeApi() {
  try {
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/budgets/`, { method: 'GET' })
    mode = res.ok ? 'remote' : 'local'
  } catch (e) {
    mode = 'local'
  }
}

probeApi()

async function request(path, options = {}) {
  if (mode === 'local') throw new Error('remote-unavailable')

  const url = `${API_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  const headers = options.headers || {}

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, { ...options, headers, credentials: 'include' })
  const text = await res.text()
  try {
    const data = text ? JSON.parse(text) : null
    if (!res.ok) throw { status: res.status, data }
    return data
  } catch (err) {
    if (err instanceof SyntaxError) {
      if (!res.ok) throw { status: res.status, data: text }
      return text
    }
    throw err
  }
}

export async function login(username, password) {
  try {
    const data = await request('/api/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    token = data.access
    localStorage.setItem(localKey('token'), token)
    return data
  } catch (e) {
    mode = 'local'
    throw e
  }
}

export async function logout() {
  token = null
  localStorage.removeItem(localKey('token'))
}

export function setToken(t) {
  token = t
}

export function getToken() {
  return token || localStorage.getItem(localKey('token'))
}

async function list(endpoint) {
  if (mode === 'local') return readLocal(endpoint)
  try {
    return await request(`/api/${endpoint}/`)
  } catch (e) {
    mode = 'local'
    return readLocal(endpoint)
  }
}

async function create(endpoint, payload) {
  if (mode === 'local') {
    const items = readLocal(endpoint)
    const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
    const item = { id: nextId, ...payload }
    items.unshift(item)
    writeLocal(endpoint, items)
    return item
  }
  try {
    return await request(`/api/${endpoint}/`, { method: 'POST', body: JSON.stringify(payload) })
  } catch (e) {
    mode = 'local'
    return create(endpoint, payload)
  }
}

export async function getIncomes() { return list('incomes') }
export async function createIncome(payload) { return create('incomes', payload) }

export async function getExpenses() { return list('expenses') }
export async function createExpense(payload) { return create('expenses', payload) }

export async function getTransfers() { return list('transfers') }
export async function createTransfer(payload) { return create('transfers', payload) }

export async function getBudgets() { return list('budgets') }
export async function createBudget(payload) { return create('budgets', payload) }

export async function getRecurring() { return list('recurring') }
export async function createRecurring(payload) { return create('recurring', payload) }

export function isRemote() { return mode === 'remote' }

export default {
  login, logout, setToken, getToken,
  getIncomes, createIncome,
  getExpenses, createExpense,
  getTransfers, createTransfer,
  getBudgets, createBudget,
  getRecurring, createRecurring,
  isRemote
}
