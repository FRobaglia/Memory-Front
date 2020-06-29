export default class StorageService {
  /**
   * La fonction permet de save une clé dans le local storage de l'application.
   */
  static setStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(err);
    }
  }

  // Pour save un objet
  static setObjectStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * La fonction permet de récupérer une clé dans le local storage de l'application.
   */
  static getStorage(key) {
    try {
      const res = localStorage.getItem(key);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  // Pour récupérer un object
  static getObjectStorage(key) {
    try {
      const res = JSON.parse(localStorage.getItem(key));
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * La fonction permet de supprimer une (ou plusieurs) clé(s) dans le local storage de l'application.
   */
  static deleteStorageItem(...names) {
    try {
      names.forEach((name) => {
        localStorage.removeItem(name);
      });
    } catch (err) {
      console.error(err);
    }
  }
}
