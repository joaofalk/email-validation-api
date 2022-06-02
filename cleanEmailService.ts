interface ReturnInterface {
  raw_email: string;
  cleansed_email: string;
  domain: string;
  validation_timestamp: string;
  domain_valid_indicator: string;
  username_valid_indicator: string;
}

// This function cleans all comments from the emaiil value
const cleanComments = (email: string) => {
  const cleanCommentRegex = /(\(.*\))|(\<.*\>)/g;
  // This regex uses .* to match any characters between () or <>;
  // .* is equivalent to all characters;
  // The g at the end indicates that it should not stop after the first match

  return email.replace(cleanCommentRegex, "");
  // Than we use a simple replace function from base javascript to replace all values matched in the following regex with an empty string, removing them
};

// This function cleans the + sign and all characters following it until the @ symbol in the email value
const cleanPlusSign = (email: string) => {
  const cleanPlusSignRegex = /(\+)(.*)(?=@)/g;
  // This regex uses .* to match any character between the + and the @, without including the latter thanks to the ?= operator;
  // ?= excludes the character following it from the matched group;
  // .* is equivalent to all characters

  return email.replace(cleanPlusSignRegex, "");
  // Than we use a simple replace function from base javascript to replace all values matched in the regex above with an empty string, removing them
};

// This function cleans all dots before the domain
const cleanDotBeforeAt = (email: string) => {
  return (
    email.slice(0, email.indexOf("@")).replace(/[.]/g, "") +
    email.slice(email.indexOf("@"))
  );
  // Using a slice (from start -> @ not including the @) function to separate the username (before the at) and then a replace remove all dots from it,
  // and combines with the domain later using another slice (from @ -> end)
};

// This function cleans all withespaces from the email value
const cleanWhiteSpace = (email: string) => {
  return email.replace(/ /g, "");
  // Using a simple replace function from base javascript to replace all whitespace characters with an empty string
};

// This function validates the domain
const isDomainValid = (domain: string) => {
  const validCharactersRegex = /[^\w.-]/g;
  // The above regex matches all characters not in the group;
  // \w is equivalent to the following: [a-zA-Z0-9_]

  const onlyValidCharacters = domain.match(validCharactersRegex);
  // And then .match is used to see if there are any instances of the regex above in our domain

  const lastPortion = domain.split(".")[domain.split(".").length - 1];
  // Here we separate the last portion of a domain (ex: gmail.com) splitting at the ".", which would result in an array -> ["gmail","com"]
  // Then we save the last value of the array to the variable

  return !onlyValidCharacters?.length && lastPortion.length >= 2 ? true : false;
  // Checking if onlyValidCharacters has length and negating it since if it hasn't a length value it means that the invalid characters are not present in the domain;
  // Then we check if the last portion of the domain is equal or higher than 2
  // If both are true we have a valid domain it returns true, if any of them is false the domain is invalid and it returns false
};

const isUsernameValid = (username: string) => {
  const validCharactersRegex = /[^\w.-]|([_.-][^\w{1}])/g;
  // In the left side of the | in the above regex it matches all characters not in the group;
  // \w is equivalent to the following: [a-zA-Z0-9_]
  // In the right side we check to see if there are any instances where _ . - are not followed by a letter or number
  const onlyValidCharacters = username.match(validCharactersRegex);

  return !onlyValidCharacters?.length ? true : false;
  // If any of the conditions above are matched it means the username is invalid and it returns false
};

// This function gets the current time and returns a string in a specific format (YYYY/MM/DD HH:mm:ss)
const getDatestring = () => {
  const now = new Date();

  const year = String(now.getFullYear()).padStart(4, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  // We are using padStart to ensure that all values are full 2 digit numbers (ex: forcing 2022/6/1 which would be todays date -> 2022/06/01)
  // To get the month value we add 1 since javascript uses 0 as January

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  // Then we just combine all the variables in a single string using the correct separators
};

// This function is just to group all function calls in a single one
export const cleanEmail = (email: string) => {
  const emailWithoutComments = cleanComments(email);
  const emailWithoutPlus = cleanPlusSign(emailWithoutComments);
  const emailWithoutDotsBeforeAt = cleanDotBeforeAt(emailWithoutPlus);
  const emailWithoutWhitespace = cleanWhiteSpace(emailWithoutDotsBeforeAt);

  const [username, domain] = emailWithoutWhitespace.split("@");
  // Using deconstruction and split to separate username and domain

  const emailReturn: ReturnInterface = {
    raw_email: email,
    cleansed_email: emailWithoutWhitespace,
    domain,
    validation_timestamp: getDatestring(),
    domain_valid_indicator: String(isDomainValid(domain)),
    username_valid_indicator: String(isUsernameValid(username)),
  };

  return emailReturn;
};
