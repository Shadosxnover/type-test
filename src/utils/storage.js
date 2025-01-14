const STORAGE_KEY = 'typingTestResults';

export function saveTestResult(result) {
  const results = getTestResults();
  results.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function getTestResults() {
  const results = localStorage.getItem(STORAGE_KEY);
  return results ? JSON.parse(results) : [];
}

export function clearTestResults() {
  localStorage.removeItem(STORAGE_KEY);
}

