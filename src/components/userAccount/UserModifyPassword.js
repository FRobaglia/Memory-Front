import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import SessionService from '../../services/SessionService';
import { useForm, toFormData, toURLSearchParams } from '../../utils/forms';

function UserModifyPassword() {
  const { user, setUser } = useContext(UserContext);
  const [values, handleChange] = useForm();
  const [passwordValues, handlePasswordChange] = useForm();

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    const data = toURLSearchParams(passwordValues);
    SessionService.editPassword(data);
  }

  return (
    <section className="section section--invitation members">
      <div className="section__content">
        <h2>Modifier votre mot de passe</h2>
        <div className="userModify__group__Headline">
          <h3 className="userModify__group__Headline__text">
            Changement de mot de passe
          </h3>
        </div>
        <form
          method="post"
          onSubmit={handlePasswordSubmit}
          className="userModify__form--password"
        >
          <div className="input">
            <label htmlFor="passwordOldest" className="input__label">
              Mot de passe actuel
            </label>
            <input
              className="input__field"
              type="password"
              name="passwordOldest"
              id="passwordOldest"
              onChange={handlePasswordChange}
              value={values.passwordOldest || user.passwordOldest}
            />
          </div>
          <div className="input">
            <label htmlFor="passwordInitial" className="input__label">
              Nouveau mot de passe
            </label>
            <input
              className="input__field"
              type="password"
              name="passwordInitial"
              id="passwordInitial"
              onChange={handlePasswordChange}
              value={values.passwordInitial || user.passwordInitial}
            />
          </div>
          <div className="input">
            <label htmlFor="passwordFinal" className="input__label">
              Confirmation du nouveau mot de passe
            </label>
            <input
              className="input__field"
              type="password"
              name="passwordFinal"
              id="passwordFinal"
              onChange={handlePasswordChange}
              value={values.passwordFinal || user.passwordFinal}
            />
          </div>
          <input
            type="submit"
            value="Changer le mot de passe"
            className="button button--strong userModify__button--save"
          />
        </form>
      </div>
    </section>
  );
}

export default UserModifyPassword;
