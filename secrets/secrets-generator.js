const fs = require("fs");

function fakeAwsAccessKey() {
  return "AKIA" + Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 36).toString(36).toUpperCase()
  ).join("");
}

function fakeAwsSecretKey() {
  return Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 62).toString(36)
  ).join("");
}

function fakeGithubToken() {
  return "ghp_" + Array.from({ length: 36 }, () =>
    Math.floor(Math.random() * 62).toString(36)
  ).join("");
}

function fakeSlackToken() {
  return "xoxb-" + Math.floor(Math.random() * 1e12) + "-" + Math.floor(Math.random() * 1e12);
}

function fakeStripeKey() {
  return "sk_test_" + Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 62).toString(36)
  ).join("");
}

let fileContent = "// Auto-generated fake secrets for scanner testing\n\n";

for (let i = 0; i < 6000; i++) {
  const type = i % 5;
  let secret;

  if (type === 0) secret = fakeAwsAccessKey() + ":" + fakeAwsSecretKey();
  else if (type === 1) secret = fakeGithubToken();
  else if (type === 2) secret = fakeSlackToken();
  else if (type === 3) secret = fakeStripeKey();
  else secret = "-----BEGIN PRIVATE KEY-----" + fakeAwsSecretKey() + "-----END PRIVATE KEY-----";

  fileContent += `export const secret_${i} = "${secret}";\n`;
}

fs.writeFileSync("my_secrets.ts", fileContent);
console.log("Generated secrets.ts with 6000 separate consts!");