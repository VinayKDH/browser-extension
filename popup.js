const input = document.getElementById('q');
const btn = document.getElementById('go');

function open(query) {
  chrome.runtime.sendMessage({ type: 'OPEN_TENS_WITH_QUERY', query });
  window.close();
}

btn.addEventListener('click', () => open(input.value.trim()));
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') open(input.value.trim());
});



