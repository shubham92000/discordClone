export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

const validateMail = (mail) => {
  const mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return mailPattern.test(mail);
};

const validatePassword = (password) => {
  return password.length >= 6 && password.length < 12;
};
