import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useForm, toFormData, toURLSearchParams } from '../../utils/forms';
import UploadInput from '../../components/utilsTemplates/UploadInput/UploadInput';
import SessionService from '../../services/SessionService';

function UserModifyPage() {
  const { user, setUser } = useContext(UserContext);
  const [values, handleChange] = useForm();
  const [passwordValues, handlePasswordChange] = useForm();

  async function handleSubmit(e) {
    e.preventDefault();

    // Le endpoint API pour modifier l'image est différent, on le fait donc d'abord si l'user à modifié l'image puis on supprime values.userImage pour ne pas l'envoyer quand on changera les autres
    if (values.userImage) {
      const imageValue = { userImage: values.userImage };
      const data = toFormData(imageValue);
      await SessionService.editUserImage(data);
      delete values.userImage;
    }

    const data = toURLSearchParams(values); // on utilise toURLSearchParams car toFormData() ne marche pas coté API
    const newUserData = await SessionService.editUser(data);
    setUser(newUserData);
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    const data = toURLSearchParams(passwordValues);
    SessionService.editPassword(data);
  }

  return (
    <div>
      <h2>{user.firstName}</h2>
      <h2>{user.roles}</h2>
      <form method="post" onSubmit={handleSubmit}>
        Mon image de profil actuelle :
        <img width="150" height="150" src={user.image.url} alt="" />
        <UploadInput
          labelText="Changer mon image de profil"
          specificFieldName="userImage"
          handleChange={handleChange}
        />
        <label htmlFor="firstName">
          Prénom
          <input
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={values.firstName || user.firstName}
          />
        </label>
        <label htmlFor="lastName">
          Nom de famille
          <input
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={values.lastName || user.lastName}
          />
        </label>
        <input type="submit" value="Sauvegarder les modifications" />
      </form>

      <form method="post" onSubmit={handlePasswordSubmit}>
        <label htmlFor="passwordOldest">
          Mot de passe actuel
          <input
            type="password"
            name="passwordOldest"
            id="passwordOldest"
            onChange={handlePasswordChange}
            value={values.passwordOldest || user.passwordOldest}
          />
        </label>
        <label htmlFor="passwordInitial">
          Nouveau mot de passe
          <input
            type="password"
            name="passwordInitial"
            id="passwordInitial"
            onChange={handlePasswordChange}
            value={values.passwordInitial || user.passwordInitial}
          />
        </label>
        <label htmlFor="passwordFinal">
          Confirmation du nouveau mot de passe
          <input
            type="password"
            name="passwordFinal"
            id="passwordFinal"
            onChange={handlePasswordChange}
            value={values.passwordFinal || user.passwordFinal}
          />
        </label>
        <input type="submit" value="Changer le mot de passe" />
      </form>
    </div>
  );
}

export default UserModifyPage;
