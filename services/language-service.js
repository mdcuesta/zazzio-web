const languages = [{
  code: 'en',
  name: 'English',
}, {
  code: 'tl',
  name: 'Tagalog',
}, {
  code: 'cb',
  name: 'Cebuano',
}];

export function getLanguages() {
  return languages;
}

export function getLanguageByCode(code) {
  return languages.find(c => c.code === code);
}
