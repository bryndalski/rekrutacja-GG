'use strict'
class PopUpAlert {
  constructor() {
    this.visibility = false //visibility of popup
    this.fireCount = window.localStorage.getItem('popup') || 0 // number of open  if not exists in local storage put 0
    this.popupDark = document.createElement('div') // creates dark side of popup
    this.popup = document.createElement('div') // popup
    console.log(this.fireCount)
    this.createPopup(this.fireCount, 'Alert!')
  }

  /**
   * creates and styles  element
   */
  createPopup(popupMessage) {
    this.popupDark.classList.add('popup-dark')
    this.popup.classList.add('popup-container')
    //text elements
    this.popupTitleContainerMessage = document.createElement('h2') //popup title
    this.popupMessageContainer = document.createElement('span') //popup message continer
    //constrolls
    this.popupXButton = document.createElement('img')
    this.popupXButton.src = './src/assets/Xbutton.svg'
    this.popupThrash = document.createElement('img')
    this.popupThrash.src = './src/assets/thrash.svg'
    //popup styles
    this.popupTitleContainerMessage.classList.add('popup-container-title')
    this.popupMessageContainer.classList.add('popup-container-message')
    this.popupXButton.classList.add('popup-container-close')
    this.popupThrash.classList.add('popup-container-clear')

    //popup close button
    document.createElement
    //appends
    this.popup.appendChild(this.popupXButton) // remove bytton
    this.popup.appendChild(this.popupTitleContainerMessage)
    this.popup.appendChild(this.popupMessageContainer)
    this.popup.appendChild(this.popupThrash)
  }
  /**
   *
   * Set popup message content
   * @param {string} title Popup title
   * @param {string} message Popup message
   */

  setPopupMessages(title, message) {
    this.popupTitleContainerMessage.innerText = title
    this.popupMessageContainer.innerHTML = message
  }

  /**
   * Listen to popup cloase
   * responsible for removing
   */
  listenOnClose = () => {
    this.popup.remove()
    this.popupDark.remove()
  }

  /**
   * sets number of time as localstorage
   * @param {Number} count number of times button has been clicked
   */
  setButtonCount(count) {
    window.localStorage.setItem('popup', count)
  }
  /**
   * Rests numbers of click on the button
   */
  restCounter = () => {
    this.fireCount = 0
    this.setButtonCount(0)
    this.listenOnClose()
  }

  /**
   * Fires popup alert
   */
  fire = () => {
    this.fireCount++ //increase firecount
    this.setButtonCount(this.fireCount) //set as new
    this.setPopupMessages(
      'Alert!',
      `You have clicked <b>${this.fireCount} ${
        this.fireCount > 1 ? 'times' : 'time'
      }</b> to related button`,
    )
    //add remove listeners
    this.popupXButton.addEventListener('click', this.listenOnClose)
    this.popupDark.addEventListener('click', this.listenOnClose)
    //reset icon
    console.log(this.fireCount)
    if (this.fireCount < 5) {
      this.popupThrash.style.display = 'none'
      this.popupThrash.removeEventListener('click', this.restCounter)
    } else {
      this.popupThrash.addEventListener('click', this.restCounter)
      this.popupThrash.style.display = 'block'
    }
    //add to body
    document.body.appendChild(this.popupDark)
    document.body.appendChild(this.popup)
    //fire popup
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const popup = new PopUpAlert()
  document.querySelector('#popUpButton').addEventListener('click', popup.fire)
})
