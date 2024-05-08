// Elements for nav
const burgerBtn = document.getElementById("burger-btn");
const header = document.querySelector("header");
const menuItems = document.querySelectorAll("#nav-primary > li");

// Elements for dark mode
const modeSwitcher = document.querySelector(".switch > input[type='checkbox']");
const modeTxt = document.querySelector(
  ".dark-mode-switcher-box__description > span"
);
const modeIcon = document.querySelector(
  ".dark-mode-switcher-box__description .fa-solid"
);
const heroImg = document.getElementById("hero");

// Elements for backToTop Button
const backTopBtn = document.querySelector(".back-top-btn");

// Elements for FORM checking
const orderForm = document.getElementById("order-form");
const passwordInputs = document.querySelectorAll(
  "#order-form input[name='password']"
);
const passwordIcon = document.getElementById("password__icon");
const passwordAlert = document.getElementById("password__alerts");

// ----

// Mobile nav ==
// --> Menu function toggle burger btn
const toggleClass = (element, classTarget) => {
  element.classList.toggle(classTarget);
};

// --> Menu function remove class
const removeClass = (element, classTarget) => {
  element.classList.remove(classTarget);
};

// --> Events for mobileMenu manipulations ==>
burgerBtn.addEventListener("click", () => toggleClass(header, "active"));

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => removeClass(header, "active"));
});

window.addEventListener("click", (e) => {
  !header.contains(e.target) ? removeClass(header, "active") : "";
});

// ----

// Dark mode ==
// --> functions
const lightModeBox = (description, icon) => {
  description.textContent = "Světlý režim";
  icon.classList.replace("fa-moon", "fa-lightbulb");
};
const darkModeBox = (description, icon) => {
  description.textContent = "Tmavý režim";
  icon.classList.replace("fa-lightbulb", "fa-moon");
};

const heroImgLight = () => {
  heroImg.classList.remove("hero-img-dark");
  heroImg.classList.add("hero-img");
};
const heroImgDark = () => {
  heroImg.classList.remove("hero-img");
  heroImg.classList.add("hero-img-dark");
};

const switcherDarkmodeLightmode = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("mode-theme", "dark");
    darkModeBox(modeTxt, modeIcon);
    heroImgDark();
  } else {
    document.documentElement.removeAttribute("mode-theme");
    lightModeBox(modeTxt, modeIcon);
    heroImgLight();
  }
};

// --> Event for darkMode ==>
modeSwitcher.addEventListener("change", switcherDarkmodeLightmode);

// ----

// Fixed header ==
// --> functions
const fixedHeader = () => {
  const showFixedPx = 200;
  const vWPx = 980;
  window.scrollY >= showFixedPx && window.innerWidth >= vWPx
    ? header.classList.add("fixed")
    : header.classList.remove("fixed");
};

// -->Event for fixed Header ==>
window.addEventListener("scroll", fixedHeader);

// ----

// Scroll BTN ==
// --> function to top
const toTop = () => {
  const showOnBtnPx = 300;
  window.scrollY >= showOnBtnPx
    ? backTopBtn.classList.add("called")
    : backTopBtn.classList.remove("called");
};

// Events for backToTopBtn ==>
window.addEventListener("scroll", toTop);

backTopBtn.addEventListener("click", () => {
  document.body.scrollIntoView({});
});

// ----

// Form checking==
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// --> Password icon and visibility
passwordIcon.addEventListener("click", () => {
  // Toggle the icon -->
  passwordInputs.forEach((passInput) => {
    passInput.getAttribute("type") === "password"
      ? passwordIcon.classList.replace("fa-eye", "fa-eye-slash")
      : passwordIcon.classList.replace("fa-eye-slash", "fa-eye");
  });

  // Toggle the password visibility -->
  passwordInputs.forEach((passInput) => {
    passInput.setAttribute(
      "type",
      passInput.getAttribute("type") === "password" ? "text" : "password"
    );
  });
});

//--> Password match function
const passwordValidation = () => {
  const password = passwordInputs[0].value;
  const confirmPassword = passwordInputs[1].value;

  if (password !== confirmPassword) {
    passwordAlert.textContent = "Hesla se neshodují";
    passwordAlert.classList.remove("valid");
    passwordAlert.classList.add("invalid");
  } else {
    passwordAlert.textContent = "Hesla se shodují";
    passwordAlert.classList.remove("invalid");
    passwordAlert.classList.add("valid");
  }

  if (password === "" && confirmPassword === "") {
    passwordAlert.textContent = "";
    passwordAlert.classList.remove(...passwordAlert.classList);
  }
};

// Password match event==>
passwordInputs.forEach((passInput) => {
  passInput.addEventListener("input", passwordValidation);
});
