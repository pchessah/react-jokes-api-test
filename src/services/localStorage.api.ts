// To store data
export const setToken = () => {
  const token = scrambleText();
  localStorage.setItem("Token", token);
};

export const getToken = () => {
  // To retrieve data
  const token = localStorage.getItem("Token");
  return token;
};

export const tokenIsValid = () => {
  const token = getToken()
  if(token){
    return unscrambleText(token) === "this is a token";
  } else {
    return false;
  }
};

export const removeToken = () => {
  // To clear a specific item
  localStorage.removeItem("Token");
};

function scrambleText(phrase = "this is a token", key = 5) {
  let scrambledText = "";
  for (let i = 0; i < phrase.length; i++) {
    const charCode = phrase.charCodeAt(i) + key;
    scrambledText += String.fromCharCode(charCode);
  }
  return scrambledText;
}

function unscrambleText(scrambledText: string, key = 5) {
  let originalText = "";
  for (let i = 0; i < scrambledText.length; i++) {
    const charCode = scrambledText.charCodeAt(i) - key;
    originalText += String.fromCharCode(charCode);
  }
  return originalText;
}


