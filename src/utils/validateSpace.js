import moment from 'moment';

const valideSpace = (values) => {
  let errorValuesArray;

  function errorMessageContain(message) {
    return errorValuesArray.includes(message);
  }

  const errors = {};
  let count = '';

  // firstName Error
  if (!values.firstName) {
    errors.firstName = 'Veuillez entrer un Prénom';
  }
  // lastName error
  if (!values.lastName) {
    errors.lastName = 'Veuillez entrer un Nom de famille';
  }
  // verify spaceImage
  if (!values.spaceImage) {
    errors.spaceImage = 'Veuillez sélectionner une image';
  }
  // verify date
  if (moment(values.dateBirth).isAfter(values.dateDeath)) {
    errors.dates = 'La date de naissance ne peut pas etre après la date décès';
  } else if (!values.dateBirth && !values.dateDeath) {
    errors.dates = 'Veuillez entrer des dates';
  }
  // relationDefunct error
  if (!values.relationDefunctText) {
    errors.relationDefunctText = 'Veuillez entrer une relation';
  }
  // verify Proof
  if (!values.spaceProof) {
    errors.spaceProof = 'Veuillez sélectionner un certificat de décès';
  }

  errorValuesArray = Object.keys(errors);

  switch (true) {
    case errorMessageContain('firstName' || 'lastName'):
      count = 0;
      break;
    case errorMessageContain('spaceImage'):
      count = 1;
      break;
    case errorMessageContain('dates'):
      count = 2;
      break;
    case errorMessageContain('relationDefunctText'):
      count = 3;
      break;
    case errorMessageContain('spaceProof'):
      count = 4;
      break;
    default:
      count = 0;
  }
  return [errors, count];
};

export default valideSpace;
