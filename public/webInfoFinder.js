/* MedStay Web Info Finder — TinyFish Search API is called only by the server. */
let webInfoLanguage = localStorage.getItem('medstay_webinfo_language') === 'hi' ? 'hi' : 'en';
let webInfoLastQuery = '';
const webInfoCopy = {
  en: {
    title: 'Web Info Finder', subtitle: 'Search the wider web from one place.',
    description: 'Ask about health services, medical terms, government schemes, travel, education, technology, or almost any topic. Results include source links so you can check the original information.',
    label: 'What would you like to find?', placeholder: 'e.g. Ayushman Bharat eligibility in Uttar Pradesh', search: 'Search the web', searching: 'Searching live web sources…',
    examples: 'Try a search', results: 'Search results', noResults: 'No results found. Try different keywords.',
    source: 'Open source ↗', searched: 'Searched', disclaimer: 'Important: Search results may be incomplete or outdated. For health, legal, financial, or emergency decisions, confirm details with qualified professionals and official sources. Web Info Finder does not diagnose medical conditions.',
    error: 'Search could not be completed.', language: 'हिन्दी'
  },
  hi: {
    title: 'वेब जानकारी खोजक', subtitle: 'एक ही जगह से पूरे वेब पर जानकारी खोजें।',
    description: 'स्वास्थ्य सेवाओं, चिकित्सा शब्दों, सरकारी योजनाओं, यात्रा, शिक्षा, तकनीक या लगभग किसी भी विषय के बारे में पूछें। मूल जानकारी जाँचने के लिए स्रोत लिंक भी मिलेंगे।',
    label: 'आप क्या जानना चाहते हैं?', placeholder: 'जैसे उत्तर प्रदेश में आयुष्मान भारत की पात्रता', search: 'वेब पर खोजें', searching: 'वेब पर खोज जारी है…',
    examples: 'इनमें से खोजें', results: 'खोज परिणाम', noResults: 'कोई परिणाम नहीं मिला। दूसरे शब्दों से कोशिश करें।',
    source: 'मूल स्रोत खोलें ↗', searched: 'खोज समय', disclaimer: 'महत्वपूर्ण: खोज परिणाम अधूरे या पुराने हो सकते हैं। स्वास्थ्य, कानूनी, वित्तीय या आपातकालीन निर्णयों के लिए योग्य विशेषज्ञ और आधिकारिक स्रोत से पुष्टि करें। यह सुविधा बीमारी का निदान नहीं करती।',
    error: 'खोज पूरी नहीं हो सकी।', language: 'English'
  }
};
function webInfoT(key) { return webInfoCopy[webInfoLanguage][key] || key; }
function webInfoEsc(value) { return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function webInfoToggleLanguage() {
  webInfoLanguage = webInfoLanguage === 'en' ? 'hi' : 'en';
  localStorage.setItem('medstay_webinfo_language', webInfoLanguage);
  renderWebInfoFinder(webInfoLastQuery);
}
function showWebInfo() {
  currentView = 'webinfo';
  $('homeView').style.display = 'none';
  if ($('hospitalHero')) $('hospitalHero').style.display = 'none';
  ['dashboardView','lifelineView','radarView','JanvaniView'].forEach(id => { if ($(id)) $(id).classList.remove('show'); });
  $('webInfoView').classList.add('show');
  renderNav();
  renderWebInfoFinder(webInfoLastQuery);
}
function renderWebInfoFinder(query = '') {
  const root = $('webInfoView');
  if (!root) return;
  root.innerHTML = `<div class="wif-wrap">
    <div class="wif-top"><div><span class="wif-eyebrow">MEDSTAY · LIVE WEB SEARCH</span><h1>${webInfoT('title')}</h1><p>${webInfoT('description')}</p></div><button class="btn amber" onclick="webInfoToggleLanguage()">${webInfoT('language')}</button></div>
    <form class="wif-search" id="wifForm"><label for="wifQuery">${webInfoT('label')}</label><textarea id="wifQuery" maxlength="300" required minlength="2" placeholder="${webInfoT('placeholder')}">${webInfoEsc(query)}</textarea><div class="wif-searchfoot"><span>↗ ${webInfoT('subtitle')}</span><button class="btn primary" id="wifSubmit" type="submit">⌕ ${webInfoT('search')}</button></div></form>
    <div class="wif-examples"><b>${webInfoT('examples')}</b><div class="wif-chips">${(webInfoLanguage==='hi' ? ['आयुष्मान भारत की पात्रता','भारत में सरकारी अस्पताल की सेवाएँ','डेंगू के आधिकारिक स्वास्थ्य दिशानिर्देश','भारत में साइबर सुरक्षा की मूल बातें'] : ['Ayushman Bharat eligibility','Government hospital services in India','Official health guidance for dengue','Cybersecurity basics in India']).map(v=>`<button type="button" class="wif-chip" onclick="webInfoUseExample('${webInfoEsc(v)}')">${webInfoEsc(v)}</button>`).join('')}</div></div>
    <div id="wifStatus" aria-live="polite"></div><div id="wifResults"></div>
    <p class="wif-disclaimer">ⓘ ${webInfoT('disclaimer')}</p>
  </div>`;
  $('wifForm').addEventListener('submit', webInfoSearchSubmit);
}
function webInfoUseExample(value) { $('wifQuery').value = value; $('wifQuery').focus(); }
async function webInfoSearchSubmit(event) {
  event.preventDefault();
  const query = $('wifQuery').value.trim();
  if (query.length < 2) return;
  webInfoLastQuery = query;
  const button = $('wifSubmit'); button.disabled = true; button.textContent = '… ' + webInfoT('searching');
  $('wifStatus').innerHTML = `<div class="wif-loading"><span class="wif-spinner"></span>${webInfoT('searching')}</div>`;
  $('wifResults').innerHTML = '';
  try {
    const response = await fetch('/api/web-info/search', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({query,language:webInfoLanguage})});
    const data = await response.json().catch(()=>({}));
    if (!response.ok) throw new Error(data.error || webInfoT('error'));
    $('wifStatus').innerHTML = `<div class="wif-resulthead"><h2>${webInfoT('results')} (${data.results.length})</h2><span>${webInfoT('searched')}: ${new Date(data.searchedAt).toLocaleString(webInfoLanguage==='hi'?'hi-IN':'en-IN')}</span></div>`;
    if (!data.results.length) { $('wifResults').innerHTML = `<div class="empty">${webInfoT('noResults')}</div>`; return; }
    $('wifResults').innerHTML = `<div class="wif-results">${data.results.map((r,i)=>`<article class="wif-result"><div class="wif-resultmeta"><span>${String(i+1).padStart(2,'0')}</span><span>${webInfoEsc(r.siteName || new URL(r.url).hostname)}</span></div><h3><a href="${webInfoEsc(r.url)}" target="_blank" rel="noopener noreferrer">${webInfoEsc(r.title)}</a></h3><p>${webInfoEsc(r.snippet || (webInfoLanguage==='hi'?'इस स्रोत को खोलकर अधिक जानकारी देखें।':'Open this source to read more.'))}</p><a class="wif-source" href="${webInfoEsc(r.url)}" target="_blank" rel="noopener noreferrer">${webInfoT('source')}</a></article>`).join('')}</div>`;
  } catch (error) {
    $('wifStatus').innerHTML = `<div class="wif-error"><b>${webInfoT('error')}</b><p>${webInfoEsc(error.message)}</p></div>`;
  } finally {
    button.disabled = false; button.textContent = '⌕ ' + webInfoT('search');
  }
}
