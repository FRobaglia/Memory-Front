import { useState } from 'react';

export const useForm = () => {
  const [state, setState] = useState({ imagesFiles: [] });

  const handleChange = (e) => {
    // Need to persist the event
    e.persist();
    if (e.target.type === 'file') {
      // Dans le cas où l'input est un input d'importation de fichiers et pas du simple texte, on gère un peu différemment
      if (e.target.name === 'images') {
        console.log(e.target.files);
        // nom par défaut du component Upload. Accepte une ou plusieurs images, on les mets dans un tableau
        // setState(() => ({
        //   ...state,
        //   [e.target.name]: Object.values(e.target.files),
        // }));
        setState(() => ({
          ...state,
          imagesFiles: [...state.imagesFiles, ...e.target.files],
        }));
      } else {
        // Ici c'est un champ spécifique comme la preuve d'acte de décès, pas besoin de le mettre dans un tableau car il n'y en aura jamais plusieurs
        setState(() => ({ ...state, [e.target.name]: e.target.files[0] }));
      }
    } else {
      setState(() => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  const delteFiles = (index) => {
    state.imagesFiles.splice(index, 1);
    setState(() => ({
      ...state,
      imagesFiles: [...state.imagesFiles],
    }));
  };

  return [state, handleChange, delteFiles];
};

export const toFormData = (values) => {
  const data = new FormData();
  console.log(values);
  Object.keys(values).forEach((value) => {
    const keyName = value;
    const keyValue = values[value];
    if (keyName === 'imagesFiles') {
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

export const toURLSearchParams = (values) => {
  const data = new URLSearchParams();
  Object.keys(values).forEach((value) => {
    const keyName = value;
    const keyValue = values[value];
    data.append(keyName, keyValue);
  });
  return data;
};
