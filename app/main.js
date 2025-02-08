function isGroup(inputLine) {}

function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  } else if (pattern === '\\d') {
    return /\d/.test(inputLine);
  } else if (pattern === '\\w') {
    return /\w/.test(inputLine);
  } else if (pattern.startsWith('[^') && pattern.endsWith(']')) {
    const negativeGroupPattern = new RegExp(
      '[^' + pattern.slice(2, pattern.length - 1) + ']'
    );
    return negativeGroupPattern.test(inputLine);
  } else if (pattern.startsWith('[') && pattern.endsWith(']')) {
    return pattern.slice(1, pattern.length - 1).includes(inputLine);
  } else {
    throw new Error(`Unhandled pattern ${pattern}`);
  }
}

function main() {
  const pattern = process.argv[3];
  const inputLine = require('fs').readFileSync(0, 'utf-8').trim();

  console.log({ pattern, inputLine });

  if (process.argv[2] !== '-E') {
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }

  if (matchPattern(inputLine, pattern)) {
    console.log('pattern matched');
    process.exit(0);
  } else {
    console.log('no match');
    process.exit(1);
  }
}

main();
