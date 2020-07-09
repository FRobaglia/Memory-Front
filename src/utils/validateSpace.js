const valideSpace = (errorValuesArray) => {
  function errorMessageContain(message) {
    return errorValuesArray.includes(message);
  }
  let count = '';

  switch (true) {
    case errorMessageContain(
      'Veuillez entrer un Prénom' || 'Veuillez entrer un Nom de famille'
    ):
      count = 0;
      break;
    case errorMessageContain('Veuillez sélectionner une image'):
      count = 1;
      break;
    case errorMessageContain(
      'La date de naissance ne peut pas etre avant la date décès' ||
        'Veuillez entrer des dates'
    ):
      count = 2;
      break;
    case errorMessageContain('Veuillez entrer une relation'):
      count = 3;
      break;
    case errorMessageContain('Veuillez sélectionner un certificat de décès'):
      count = 4;
      break;
    default:
      count = 0;
  }
  return count;
};

export default valideSpace;
