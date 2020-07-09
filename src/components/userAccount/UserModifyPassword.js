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
        <p>Modif password</p>
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
    </section>
  );
}

export default UserModifyPassword;
