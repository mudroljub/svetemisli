export const domain = process.env.REACT_APP_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://svetemysli-api.herokuapp.com'

export const API = {
  create: `${domain}/api/`,
  read: `${domain}/api/`,
  update: `${domain}/api/`,
  delete: `${domain}/api/`,
  randomLang: `${domain}/api/random/lang/`, // + lang
}
