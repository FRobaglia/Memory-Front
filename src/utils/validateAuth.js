const validateAuth = (values) => {
  // Email must have "@"" and "."
  const emailTest = /\S+@\S+\.\S+/;
  // Password security test
  const passwordTest = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  const errors = {};
  // Email Errors
  if (!values.email) {
    errors.email = 'Veuillez entrer un email';
  } else if (!emailTest.test(values.email)) {
    errors.email = 'Invalide email adresse';
  }
  // Password Errors
  if (!values.passwordInitial) {
    errors.passwordInitial = 'Veuillez entrer un mot de passe';
  } else if (!passwordTest.test(values.passwordInitial)) {
    errors.passwordInitial =
      'Le mot de passe doit contenir au moins 6 lettre, une minuscule, une majuscule et un nombre';
  }
  // Check password = confirmPassword
  if (!values.passwordFinal) {
    errors.passwordFinal = 'Veuillez confirmer le mot de passe';
  } else if (values.passwordInitial !== values.passwordFinal) {
    errors.passwordFinal =
      'Les mots de passe que vous avez entrés ne sont pas identiques';
  }
  return errors;
};

export default validateAuth;
