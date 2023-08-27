let navbarMobileOpen = false;

function openNavbar(event) {
  event.preventDefault();

  let navbarMobileEL = document.getElementById("navbar__mobile");

  console.log(navbarMobileEL);

  if (!navbarMobileOpen) {
    navbarMobileEL.style.height = "auto";
    navbarMobileOpen = true;
  } else {
    navbarMobileEL.style.height = 0;
    navbarMobileOpen = false;
  }
}
