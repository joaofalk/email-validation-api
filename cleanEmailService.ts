interface ReturnInterface {
  raw_email: string;
  cleansed_email: string;
  domain: string;
  validation_timestamp: string;
  domain_valid_indicator: string;
  username_valid_indicator: string;
}

const cleanComments = (email: string) => {
  const cleanCommentRegex = /(\(.*\))|(\<.*\>)/g;
  // This regex uses .* to match any characters between () or <>
  // .* is equivalent to all characters
  return email.replace(cleanCommentRegex, "");
};

const cleanPlusSign = (email: string) => {
  const cleanPlusSignRegex = /(\+)(.*)(?=@)/g;
  // This regex uses .* to match any character between the + and the @, without including the latter thanks to the ?= operator
  // ?= excludes the following character from the matched group
  // .* is equivalent to all characters
  return email.replace(cleanPlusSignRegex, "");
};

const cleanDotBeforeAt = (email: string) => {
  return (
    email.slice(0, email.indexOf("@")).replace(".", "") +
    email.slice(email.indexOf("@"))
  );
};

const cleanWhiteSpace = (email: string) => {
  return email.replace(" ", "");
};

const isDomainValid = (domain: string) => {
  const validCharactersRegex = /[^\w.-]/g;
  // The above regex matches all characters not in the group;
  // \w is equivalent to the following: [a-zA-Z0-9_]
  const onlyValidCharacters = domain.match(validCharactersRegex);

  const lastPortion = domain.split(".")[domain.split(".").length - 1];

  return !onlyValidCharacters?.length && lastPortion.length >= 2 ? true : false;
};

const isUsernameValid = (username: string) => {
  const validCharactersRegex = /[^\w.-]|([_.-][^\w{1}])/g;
  const onlyValidCharacters = username.match(validCharactersRegex);

  return !onlyValidCharacters?.length ? true : false;
};

const getDatestring = () => {
  const now = new Date();

  const year = String(now.getFullYear()).padStart(4, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

export const cleanEmail = (email: string) => {
  const emailWithoutComments = cleanComments(email);
  const emailWithoutPlus = cleanPlusSign(emailWithoutComments);
  const emailWithoutDotsBeforeAt = cleanDotBeforeAt(emailWithoutPlus);
  const emailWithoutWhitespace = cleanWhiteSpace(emailWithoutDotsBeforeAt);

  const [username, domain] = emailWithoutWhitespace.split("@");

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
