const replaceSrDoubles = text => text
  .replace(/lj/g, 'љ')
  .replace(/Lj/g, 'Љ')
  .replace(/LJ/g, 'Љ')
  .replace(/nj/g, 'њ')
  .replace(/Nj/g, 'Њ')
  .replace(/NJ/g, 'Њ')
  .replace(/dž/g, 'џ')
  .replace(/Dž/g, 'Џ')
  .replace(/DŽ/g, 'Џ')

const replaceMsDoubles = text => text
  .replace(/lj/g, 'ль')
  .replace(/Lj/g, 'Ль')
  .replace(/LJ/g, 'Ль')
  .replace(/nj/g, 'нь')
  .replace(/Nj/g, 'Нь')
  .replace(/NJ/g, 'Нь')

const replaceOcsDoubles = text => text
  .replace(/оу/g, 'u')
  .replace(/Оу/g, 'u')
  .replace(/ОУ/g, 'u')

const latCyrDict = {
  А: 'А', а: 'а',
  B: 'Б', b: 'б',
  C: 'Ц', c: 'ц',
  Č: 'Ч', č: 'ч',
  Ć: 'Ћ', ć: 'ћ',
  D: 'Д', d: 'д',
  Đ: 'Ђ', đ: 'ђ',
  E: 'Е', e: 'е',
  Ě: 'Ѣ', ě: 'ѣ',
  F: 'Ф', f: 'ф',
  G: 'Г', g: 'г',
  H: 'Х', h: 'х',
  I: 'И', i: 'и',
  Y: 'Ы', y: 'ы',
  J: 'Ј', j: 'ј',
  K: 'К', k: 'к',
  L: 'Л', l: 'л',
  M: 'М', m: 'м',
  N: 'Н', n: 'н',
  O: 'О', o: 'о',
  P: 'П', p: 'п',
  R: 'Р', r: 'р',
  S: 'С', s: 'с',
  Ś: 'Сь', ś: 'сь',
  Š: 'Ш', š: 'ш',
  T: 'Т', t: 'т',
  U: 'У', u: 'у',
  V: 'В', v: 'в',
  Z: 'З', z: 'з',
  Ź: 'Зь', ź: 'зь',
  Ž: 'Ж', ž: 'ж',
}

const cyrLatDict = {
  A: 'A', а: 'a',
  Б: 'B', б: 'b',
  В: 'V', в: 'v',
  Г: 'G', г: 'g',
  Д: 'D', д: 'd',
  Е: 'E', е: 'e', Є: 'E', є: 'e',
  Ж: 'Ž', ж: 'ž',
  Ꙃ: 'Dz', ꙃ: 'dz', Ѕ: 'Dz', ѕ: 'dz',
  Ꙁ: 'Z', ꙁ: 'z', З: 'Z', з: 'z',
  И: 'I', и: 'i', І: 'I', і: 'i',
  Ї: 'J', ї: 'j',
  К: 'K', к: 'k',
  Л: 'L', л: 'l',
  М: 'M', м: 'm',
  Н: 'N', н: 'n',
  О: 'O', о: 'o',
  П: 'P', п: 'p',
  Р: 'R', р: 'r',
  С: 'S', с: 's',
  Т: 'T', т: 't',
  Ѹ: 'U', ѹ: 'u', Ꙋ: 'U', ꙋ: 'u', У: 'U', у: 'u',
  Ф: 'F', ф: 'f',
  Х: 'H', х: 'h',
  Ѡ: 'O', ѡ: 'o',
  Ѿ: 'Ot', ѿ: 'ot',
  Щ: 'Št', щ: 'št',
  Ц: 'C', ц: 'c',
  Ч: 'Č', ч: 'č',
  Ш: 'Š', ш: 'š',
  Ꙑ: 'Y', ꙑ: 'y', Ы: 'Y', ы: 'y',
  Ѣ: 'Ě', ѣ: 'ě',
  Ю: 'Ju', ю: 'ju',
  Ꙗ: 'Ja', ꙗ: 'ja',
  Ѥ: 'Je', ѥ: 'je',
  Ѧ: 'Ę', ѧ: 'ę',
  Ѩ: 'Ję', ѩ: 'ję',
  Ѫ: 'Ǫ', ѫ: 'ǫ',
  Ѭ: 'Jǫ', ѭ: 'jǫ',
  Ѱ: 'Ps', ѱ: 'ps',
  Ѳ: 'Th', ѳ: 'th',
  Ꙉ: 'Ǵ', ꙉ: 'ǵ',
  Ћ: 'Ć', ћ: 'ć',
  Ђ: 'Đ', ђ: 'đ',
  Ј: 'J', ј: 'j',
  Љ: 'Lj', љ: 'lj',
  Њ: 'Nj', њ: 'nj',
  Џ: 'Dž', џ: 'dž',
  // Ѵ: I, Y, V
  // ѵ: i, y, v
}

export const toLatinic = text => [...text].map(x => cyrLatDict[x] || x).join('')

const toCyrillic = text => [...text].map(x => latCyrDict[x] || x).join('')

export default function transliterate(text = '', script, lang) {
  if (script === 'lat' && lang === 'ocs') return toLatinic(replaceOcsDoubles(text))
  return script === 'lat'
    ? toLatinic(text)
    : toCyrillic(lang === 'sr' ? replaceSrDoubles(text) : replaceMsDoubles(text))
}
