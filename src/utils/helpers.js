import authors from '../data/authors.json'

export function findValue(object, searchKey) {
  let value
  for (const key in object) {
    if (key === searchKey) return object[key]
    if (typeof object[key] === 'object') value = findValue(object[key], searchKey)
  }
  return value
}

export const includes = (text, phrase) => {
  if (!text) return false
  const t = text.toLowerCase(), p = phrase.toLowerCase()
  return t.includes(p) || t.replace(/ě/g, 'e').replace(/y/g, 'i').includes(p)
}

export const isInText = (text, phrase) => phrase ? includes(text, phrase) : true

export const isInSource = (source, phrase) => {
  if (!phrase) return true
  if (phrase === ' ') return !source
  return includes(source, phrase)
}

export function smoothscroll() {
  const y = document.documentElement.scrollTop || document.body.scrollTop
  const top = document.getElementById('header').scrollHeight
  if (y > top) {
    window.requestAnimationFrame(smoothscroll)
    window.scrollTo (top, y - (y / 5))
  }
}

export function compare(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

export const createId = arr => {
  let largest = arr[0]._id
  for(let i = 1; i < arr.length; i++)
    if(largest < arr[i]._id)
      largest = arr[i]._id

  return largest + 1
}

export const getDerived = (quotes, lang) => {
  const allAuthors = new Set()
  let minLength = quotes[0][lang].length
  let maxLength = quotes[0][lang].length
  quotes.forEach(q => {
    allAuthors.add(q.author)
    const {length} = q[lang]
    if (!length) return
    if (length < minLength) minLength = length
    if (length > maxLength) maxLength = length
  })
  return {minLength, maxLength, allAuthors}
}

// get value from nested object
export const get = (obj, lev1, lev2) => ((obj || {})[lev1] || {})[lev2]

export const getName = (name, lang) => get(authors, name, 'common') || get(authors, name, lang) || name

export const getSize = (src = '', size) => src.replace(/\d+px/, `${size}px`)

export const getImg = author => get(authors, author, 'src')

/**
@param authors: array
@return Map(author name: image src)
*/
export function getThumbnails(authors) {
  return fetch(`https://sh.wikipedia.org/w/api.php?action=query&titles=${authors.join('|')}&prop=pageimages&format=json&pithumbsize=50&origin=*`)
    .then(res => res.json())
    .then(res => {
      if (!res.query.pages) return
      const mapa = new Map()
      for (const key in res.query.pages) {
        const obj = res.query.pages[key]
        if (!obj.thumbnail) continue
        mapa.set(obj.title, obj.thumbnail.source)
      }
      return mapa
    })
}
