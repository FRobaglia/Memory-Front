const validateAuth = (values) => {
  // Email must have "@"" and "."
  const emailTest = /\S+@\S+\.\S+/;
  // Password security test
  const passwordTest = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z-!?§@à#$%^&=+_:;,()"èé*]{6,}$/;
  const errors = {};

  // Regitser

  // image error
  if (!values.userImage) {
    errors.userImage = 'Veuillez sélectionner une image';
  }
  // firstName Error
  if (!values.firstName) {
    errors.firstName = 'Veuillez entrer un Prénom';
  }
  // lastName error
  if (!values.lastName) {
    errors.lastName = 'Veuillez entrer un Nom de famille';
  }
  // Email Errors
  if (!values.email) {
    errors.email = 'Veuillez entrer une adresse Email';
  } else if (!emailTest.test(values.email)) {
    errors.email = 'Adresse Email invalide';
  }
  // Password Errors
  if (!values.passwordInitial) {
    errors.passwordInitial = 'Veuillez entrer un mot de passe';
  } else if (!passwordTest.test(values.passwordInitial)) {
    errors.passwordInitial =
      'Le mot de passe doit contenir au moins 6 caracteres dont: une minuscule, une majuscule et un nombre';
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
