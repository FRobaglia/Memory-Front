import { useState } from 'react';

export const useForm = () => {
  const [state, setState] = useState({});

  const handleChange = (e) => {
    // Need to persist the event
    e.persist();
    if (e.target.type === 'file') {
      // Dans le cas où l'input est un input d'importation de fichiers et pas du simple texte, on gère un peu différemment
      if (e.target.name === 'images') {
        // nom par défaut du component Upload. Accepte une ou plusieurs images, on les mets dans un tableau
        setState(() => ({
          ...state,
          [e.target.name]: Object.values(e.target.files),
        }));
      } else {
        // Ici c'est un champ spécifique comme la preuve d'acte de décès, pas besoin de le mettre dans un tableau car il n'y en aura jamais plusieurs
        setState(() => ({ ...state, [e.target.name]: e.target.files[0] }));
      }
    } else {
      setState(() => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  return [state, handleChange];
};

export const toFormData = (values) => {
  const data = new FormData();
  Object.keys(values).forEach((value) => {
    const keyName = value;
    const keyValue = values[value];
    if (keyName === 'images') {
      // Comme spécifié dans la documentation de l'API, pour les input file générique 'image', on envoie tous les fichiers avec en clé le nom du fichier.
      keyValue.forEach((file) => {
        data.append(file.name, file);
      });
    } else {
      data.append(keyName, keyValue);
    }
  });
  console.log(...data);
  return data;
};