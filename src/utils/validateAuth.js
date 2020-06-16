const validateAuth = (values) => {
  // Email must have "@"" and "."
  const emailTest = /\S+@\S+\.\S+/;
  // Password 
  const passwordTest = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  let errors = {};
  // Email Errors
  if (!values.email) {
    errors.email = "Veuillez entrer un email";
  } else if (!emailTest.test(values.email)) {
    errors.email = "Invalide email adresse";
  }
  // Password Errors
  if (!values.passwords.initial) {
    errors.password = "Veuillez entrer un mot de passe";
  } else if (!passwordTest.test(values.passwords.initial)) {
    errors.password = "Le mot de passe doit contenir au moins 6 lettre, une minuscule, une majuscule et un nombre";
  }
  return errors;
}

export default validateAuth;