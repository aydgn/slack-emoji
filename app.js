const userInput = document.querySelector("[textInput]");
const emojiOutputFields = document.querySelectorAll("[generated]");
const message = document.querySelector("[message]");
const invalidCharacters = /[^a-zA-Z0-9 ?!#@]/g;
const customChars = {
  "?": "question",
  "!": "exclamation",
  "#": "hash",
  "@": "at",
};

const numbers = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const space = "    ";

// Function to convert user input into Slack emoji codes
function generateEmojiCodes(text) {
  // Remove invalid characters from the input
  if (invalidCharacters.test(text)) {
    text = text.replace(invalidCharacters, "");
    userInput.value = text;
  }

  // Initialize emoji code strings for each color
  let whiteEmojiCode = "";
  let yellowEmojiCode = "";

  for (const char of text) {
    if (numbers.hasOwnProperty(char)) {
      // Handle numbers
      whiteEmojiCode += `:${numbers[char]}:`;
      yellowEmojiCode += `:${numbers[char]}:`;
    } else if (char === " ") {
      // Handle spaces
      whiteEmojiCode += space;
      yellowEmojiCode += space;
    } else {
      // Handle letters and special characters
      const emojiKeyword = customChars[char] || char.toLowerCase();
      whiteEmojiCode += `:alphabet-white-${emojiKeyword}:`;
      yellowEmojiCode += `:alphabet-yellow-${emojiKeyword}:`;
    }
  }

  // Update the value of the emoji output fields only once
  emojiOutputFields[0].value = whiteEmojiCode;
  emojiOutputFields[1].value = yellowEmojiCode;
}

userInput.addEventListener("input", e => generateEmojiCodes(e.target.value));

function copyGenerated(input) {
  if (!input.value) return;
  input.select();
  navigator.clipboard.writeText(input.value);
  input.setSelectionRange(0, 0);
  input.setAttribute("aria-invalid", "false");
  message.innerText = "Kopyaladım :D";

  setTimeout(() => {
    input.removeAttribute("aria-invalid");
    message.innerText = ":D";
    userInput.select();
  }, 1500);
}

emojiOutputFields.forEach(input => {
  input.addEventListener("click", () => copyGenerated(input));
});