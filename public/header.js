document.addEventListener('DOMContentLoaded', () => {

  let menuOpen = false;
  /* MENU HANDLING */
  const burg = document.getElementById('mobile_menu');
  burg.addEventListener('click', (e) => {
      const mobilemenu = document.getElementById('mobile_popup')
      switch(menuOpen){
          case true:
              mobilemenu.style.transform = 'translate(120%,0px)'
              menuOpen = false;
              break;
          case false:
              mobilemenu.style.transform = 'translate(0px,0px)'
              menuOpen = true;
              break;
          default:
              console.log('error occurred opening menu')
      }
  });

  const mobileHeaderLinks = document.getElementById('mobile_popup').getElementsByTagName('A');
  for(var o = 0; o < mobileHeaderLinks.length; o++){
      mobileHeaderLinks[o].addEventListener('click', async(e) => {
          burg.click()
      });
  }
});