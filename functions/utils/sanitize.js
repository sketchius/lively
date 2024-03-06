export function removeStartingSubstring(mainString, subString) {
  if (mainString.toLowerCase().startsWith(subString.toLowerCase())) {
    return mainString.slice(subString.length);
  }
  return mainString;
}
