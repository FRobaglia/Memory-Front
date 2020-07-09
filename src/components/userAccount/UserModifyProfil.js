import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import SessionService from '../../services/SessionService';
import { useForm, toFormData, toURLSearchParams } from '../../utils/forms';
import UploadInput from '../utilsTemplates/UploadInput/UploadInput';

function UserModifyProfil() {
  const { user, setUser } = useContext(UserContext);
  const [values, handleChange] = useForm();
  const [selected, setSelected] = useState(false);

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

  function hideLabel() {
    setSelected(true);
  }

  return (
    <section className="section section--invitation members">
      <div className="section__content">
        {/* <p>Modif Profil</p>
        <h2>{user.firstName}</h2>
        <h2>{user.roles}</h2> */}
        <h2>Informations</h2>
        <form method="post" onSubmit={handleSubmit}>
          Mon image de profil actuelle :
          <img width="150" height="150" src={user.image.url} alt="" />
          {/* <UploadInput
            labelText="Changer mon image de profil"
            specificFieldName="userImage"
            handleChange={handleChange}
          /> */}
          <div className="upload-image-preview">
            <UploadInput
              labelText="Changer mon image de profil"
              specificFieldName="userImage"
              handleChange={(e) => {
                handleChange(e);
                hideLabel();
              }}
              labelImgSelected={selected}
            />
            {values.userImage && (
              <div
                className="image-preview"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(
                    values.userImage
                  )})`,
                }}
              />
            )}
          </div>
          <div className="input">
            <label htmlFor="firstName" className="input__label">
              Prénom
            </label>
            <input
              className="input__field"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={values.firstName || user.firstName}
            />
            <label htmlFor="lastName" className="input__label">
              Nom
            </label>
            <input
              className="input__field"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={values.lastName || user.lastName}
            />
          </div>
          <input
            className="button button--strong button--full button--full--noPadding"
            type="submit"
            value="Sauvegarder les modifications"
          />
        </form>
        <input
          className="button button--full button--full--noPadding"
          type="submit"
          value="Se déconnecter"
        />
      </div>
    </section>
  );
}

export default UserModifyProfil;
