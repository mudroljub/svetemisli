const shSpecific = text => text
  .replace(/lj/g, 'љ')
  .replace(/Lj/g, 'Љ')
  .replace(/LJ/g, 'Љ')
  .replace(/nj/g, 'њ')
  .replace(/Nj/g, 'Њ')
  .replace(/NJ/g, 'Њ')
  .replace(/dž/g, 'џ')
  .replace(/Dž/g, 'Џ')
  .replace(/DŽ/g, 'Џ')

const msSpecific = text => text
  .replace(/lj/g, 'ль')
  .replace(/Lj/g, 'Ль')
  .replace(/LJ/g, 'Ль')
  .replace(/nj/g, 'нь')
  .replace(/Nj/g, 'Нь')
  .replace(/NJ/g, 'Нь')

const toCyrillic = text => text
  .replace(/a/g, 'а')
  .replace(/b/g, 'б')
  .replace(/c/g, 'ц')
  .replace(/č/g, 'ч')
  .replace(/ć/g, 'ћ')
  .replace(/d/g, 'д')
  .replace(/đ/g, 'ђ')
  .replace(/e/g, 'е')
  .replace(/ě/g, 'ѣ')
  .replace(/f/g, 'ф')
  .replace(/g/g, 'г')
  .replace(/h/g, 'х')
  .replace(/i/g, 'и')
  .replace(/y/g, 'ы')
  .replace(/j/g, 'ј')
  .replace(/k/g, 'к')
  .replace(/l/g, 'л')
  .replace(/m/g, 'м')
  .replace(/n/g, 'н')
  .replace(/o/g, 'о')
  .replace(/p/g, 'п')
  .replace(/r/g, 'р')
  .replace(/s/g, 'с')
  .replace(/ś/g, 'сь')
  .replace(/š/g, 'ш')
  .replace(/t/g, 'т')
  .replace(/u/g, 'у')
  .replace(/v/g, 'в')
  .replace(/z/g, 'з')
  .replace(/ź/g, 'зь')
  .replace(/ž/g, 'ж')

  .replace(/A/g, 'А')
  .replace(/B/g, 'Б')
  .replace(/C/g, 'Ц')
  .replace(/Č/g, 'Ч')
  .replace(/Ć/g, 'Ћ')
  .replace(/D/g, 'Д')
  .replace(/Đ/g, 'Ђ')
  .replace(/E/g, 'Е')
  .replace(/Ě/g, 'Ѣ')
  .replace(/F/g, 'Ф')
  .replace(/G/g, 'Г')
  .replace(/H/g, 'Х')
  .replace(/I/g, 'И')
  .replace(/Y/g, 'Ы')
  .replace(/J/g, 'Ј')
  .replace(/K/g, 'К')
  .replace(/L/g, 'Л')
  .replace(/M/g, 'М')
  .replace(/N/g, 'Н')
  .replace(/O/g, 'О')
  .replace(/P/g, 'П')
  .replace(/R/g, 'Р')
  .replace(/S/g, 'С')
  .replace(/Ś/g, 'Сь')
  .replace(/Š/g, 'Ш')
  .replace(/T/g, 'Т')
  .replace(/U/g, 'У')
  .replace(/V/g, 'В')
  .replace(/Z/g, 'З')
  .replace(/Ź/g, 'Зь')
  .replace(/Ž/g, 'Ж')

const ocsTable = {
  A: 'A',
  a: 'a',
  Б: 'B',
  б: 'b',
  В: 'V',
  в: 'v',
  Г: 'G',
  г: 'g',
  Д: 'D',
  д: 'd',
  Е: 'E', // je
  е: 'e',
  Є: 'E',
  є: 'e',
  Ж: 'Ž',
  ж: 'ž',
  Ꙃ: 'Dz',
  ꙃ: 'dz',
  Ѕ: 'Dz',
  ѕ: 'dz',
  Ꙁ: 'Z',
  ꙁ: 'z',
  З: 'Z',
  з: 'z',
  И: 'I',
  и: 'i',
  І: 'I',
  і: 'ji',
  Ї: 'Ji',
  ї: 'i',
  К: 'K',
  к: 'k',
  Л: 'L', // LJ
  л: 'l', // lj
  М: 'M',
  м: 'm',
  Н: 'N', // NJ
  н: 'n',
  О: 'O',
  о: 'o',
  П: 'P',
  п: 'p',
  Р: 'R',
  р: 'r',
  С: 'S',
  с: 's',
  Т: 'T',
  т: 't',
  Ѹ: 'U',
  ѹ: 'u', // оу
  Ꙋ: 'U',
  ꙋ: 'u',
  Ф: 'F',
  ф: 'f',
  Х: 'H',
  х: 'h',
  Ѡ: 'O',
  ѡ: 'o',
  Ѿ: 'Ot',
  ѿ: 'ot',
  Щ: 'Št',
  щ: 'št',
  Ц: 'C',
  ц: 'c',
  Ч: 'Č',
  ч: 'č',
  Ш: 'Š',
  ш: 'š',
  Ꙑ: 'Y',
  ꙑ: 'y',
  Ѣ: 'Ě',
  ѣ: 'ě',
  Ю: 'Ju',
  ю: 'ju',
  Ꙗ: 'Ja',
  ꙗ: 'ja',
  Ѥ: 'Je',
  ѥ: 'je',
  Ѧ: 'Ę',
  ѧ: 'ę',
  Ѩ: 'Ję',
  ѩ: 'ję',
  Ѫ: 'Ǫ',
  ѫ: 'ǫ',
  Ѭ: 'Jǫ',
  ѭ: 'jǫ',
  Ѱ: 'Ps',
  ѱ: 'ps',
  Ѳ: 'Th',
  ѳ: 'th',
  Ꙉ: 'Ǵ',
  ꙉ: 'ǵ', // đ
  // Ѵ: I, Y, V
  // ѵ: i, y, v
}
const toLatinic = text => [...text].map(x => ocsTable[x] || x).join('')

export default function transliterate(text = '', script, lang) {
  if (script === 'lat' && lang === 'ocs') return toLatinic(text)
  return script === 'lat'
    ? text
    : toCyrillic(lang === 'sr' ? shSpecific(text) : msSpecific(text))
}
