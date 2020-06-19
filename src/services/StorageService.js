export default class StorageService {
  /**
   * La fonction permet de save une clé dans le local storage de l'application.
   */
  static setStorage(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (err) {
      console.error(err)
    }
  }
  /**
   * La fonction permet de récupérer une clé dans le local storage de l'application.
   */
  static getStorage(key) {
    try {
      const res = localStorage.getItem(key)
      return res
    } catch (err) {
      console.error(err)
    }
  }
  /**
   * La fonction permet de supprimer une (ou plusieurs) clé(s) dans le local storage de l'application.
   */
  static deleteStorageItem(...names) {
    try {
      for (const name of names) {
        localStorage.removeItem(name)
      }
    } catch (err) {
      console.error(err)
    }
  }
}