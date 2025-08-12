export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = avatarSelector ? document.querySelector(avatarSelector) : null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo({ name, about }) {
    if (typeof name === "string") this._nameElement.textContent = name;
    if (typeof about === "string") this._aboutElement.textContent = about;
  }

  setAvatar(url) {
    if (this._avatarElement && typeof url === "string") {
      this._avatarElement.src = url;
      this._avatarElement.alt = "Avatar de usuario";
    }
  }
}
