const STORAGE_KEY = "tic-tac-toe-scores";

export function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    if (
      typeof parsed.wins === "number" &&
      typeof parsed.losses === "number" &&
      typeof parsed.draws === "number" &&
      typeof parsed.currentStreak === "number" &&
      typeof parsed.bestStreak === "number"
    ) {
      return parsed;
    }
    return null;
  } catch (e) {
    console.warn("Could not read scores from localStorage:", e);
    return null;
  }
}

export function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (e) {
    console.warn("Could not save scores to localStorage:", e);
  }
}

export function resetScoresStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Could not reset scores in localStorage:", e);
  }
}
