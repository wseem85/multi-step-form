const pages = Array.from(document.querySelectorAll(".row"));
const nextBtns = Array.from(document.querySelectorAll(".next"));
const backBtns = Array.from(document.querySelectorAll(".back"));

// first page functionality
nextBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const currentBtn = e.currentTarget;
    let currentIndex = nextBtns.indexOf(currentBtn);
    const inputs = Array.from(document.querySelectorAll(".main__input input"));
    const inputvalues = [];
    inputs.forEach((input) => {
      inputvalues.push(input.value);
    });
    const inputMessages = Array.from(
      document.querySelectorAll(".main__input .message")
    );
    if (currentIndex == 0) {
      checkInputs(inputs, inputMessages);
    }
    if (currentIndex !== pages.length - 1) {
      // if (
      //   inputvalues.every(notEmpty) &&
      //   validateEmail(inputs[1]) &&
      //   validateNumber(inputs[2])
      // ) {
      let currentPage = pages[currentIndex];
      let nextIndex = currentIndex + 1;
      let nextPage = pages[nextIndex];
      currentPage.style.transform = "translateX(200%)";
      nextPage.style.transform = "translateX(0)";
    }
    // }
  })
);

backBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const currentBtn = e.currentTarget;

    let currentIndex = backBtns.indexOf(currentBtn);
    if (currentIndex !== 0) {
      let currentPage = pages[currentIndex];
      let nextIndex = currentIndex - 1;
      let nextPage = pages[nextIndex];
      currentPage.style.transform = "translateX(-200%)";
      nextPage.style.transform = "translateX(0)";
    }
  })
);
//
// plans page buttons functionality
const backPlansBtn = document.querySelector("#back-plans");
const nextPlansBtn = document.querySelector("#next-plans");
const plans = document.querySelectorAll(".plane");
let finalPlanChoise = "";
plans.forEach((plan) => {
  plan.addEventListener("click", (e) => {
    plans.forEach((plan) => plan.classList.remove("selected"));
    e.currentTarget.classList.add("selected");
    let planNameElement = e.currentTarget.lastElementChild.firstElementChild;
    let planName = planNameElement.innerText;
    let planPrice = planNameElement.nextElementSibling.innerText;
    finalPlanChoise = [planName, planPrice];
    console.log(finalPlanChoise);
  });
});
// switch planes btn
const plansContainer = document.querySelector(".planes");
const switchBtn = document.querySelector(".switch");
const monthLabel = document.querySelector(".month");
const yearLabel = document.querySelector(".year");
const switchBtnInnerCircle = document.querySelector(".switch span");
const plansNames = document.querySelectorAll(".plane__name");
const plansPrices = document.querySelectorAll(".plane__price");
const plansDeatails = document.querySelectorAll(".plane__deatails");
const planMonthlyPrices = ["$9/mo", "$12/mo", "$15/mo"];
const planYearlyPrices = ["$90/yr", "$120/yr", "$150/yr"];
switchBtn.addEventListener("click", (e) => {
  plans.forEach((plan) => plan.classList.remove("selected"));

  //change color of the label onclick
  if (monthLabel.classList.contains("c-black")) {
    plansContainer.classList.add("yearly");
    plansContainer.classList.remove("monthly");
    //yearly plans case
    //change label color
    monthLabel.classList.remove("c-black");
    yearLabel.classList.add("c-black");
    //change inner circle position
    switchBtnInnerCircle.classList.remove("left-aligned");
    switchBtnInnerCircle.classList.add("right-aligned");
    // change contents of plans prices
    for (let i = 0; i < plansPrices.length; i++) {
      plansPrices[i].innerText = planYearlyPrices[i];
      const newTag = document.createElement("div");
      newTag.innerText = "2 Months Free";
      plansDeatails[i].appendChild(newTag);
    }
    // add 2 months free tag
  } else {
    //monthly plans case
    plansContainer.classList.remove("yearly");
    plansContainer.classList.remove("monthly");
    yearLabel.classList.remove("c-black");
    monthLabel.classList.add("c-black");
    switchBtnInnerCircle.classList.remove("right-aligned");
    switchBtnInnerCircle.classList.add("left-aligned");
    for (let i = 0; i < plansPrices.length; i++) {
      plansPrices[i].innerText = planMonthlyPrices[i];
      let theTag = plansPrices[i].nextElementSibling;
      plansDeatails[i].removeChild(theTag);
    }
  }
});
// remove selection if back button clicked
backPlansBtn.addEventListener("click", () => {
  plans.forEach((plan) => plan.classList.remove("selected"));
  finalPlanChoise = "";
  yearLabel.classList.remove("c-black");
  monthLabel.classList.add("c-black");
  switchBtnInnerCircle.classList.remove("right-aligned");
  switchBtnInnerCircle.classList.add("left-aligned");
  for (let i = 0; i < plansPrices.length; i++) {
    plansPrices[i].innerText = planMonthlyPrices[i];
    let theTag = plansDeatails[i].lastElementChild;
    if (theTag.innerHTML == "2 Months Free") {
      plansDeatails[i].removeChild(theTag);
    }
  }
});
//
// add ons prices control

const addonsPrices = document.querySelectorAll(".prices");
const addonsMonthlyPrices = ["$1/mo", "$2/mo", "$1/mo"];
const addonsYearlyPrices = ["$10/mo", "$20/mo", "$10/mo"];
nextPlansBtn.addEventListener("click", () => {
  if (plansContainer.classList.contains("yearly")) {
    for (let i = 0; i < addonsPrices.length; i++) {
      addonsPrices[i].innerHTML = addonsYearlyPrices[i];
    }
  } else {
    for (let i = 0; i < addonsPrices.length; i++) {
      addonsPrices[i].innerHTML = addonsMonthlyPrices[i];
    }
  }
});

///////
/////// addons page controls and buttons
const backAddonsBtn = document.querySelector("#back-addons");
const nextAddonsBtn = document.querySelector("#next-addons");
const checkBoxes = document.querySelectorAll(".check");
const addonItems = document.querySelectorAll(".add-on");
let finalAddonsChoises = [];

checkBoxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    let addon = e.currentTarget.parentElement.parentElement;
    let addonName =
      e.currentTarget.nextElementSibling.firstElementChild.innerText;
    let addonPrice = addon.lastElementChild.innerText;
    addon.classList.toggle("selected");
    if (addon.classList.contains("selected")) {
      if (!finalAddonsChoises.includes(addonName)) {
        finalAddonsChoises.push(addonName, addonPrice);
        console.log(finalAddonsChoises);
      }
    } else {
      let index = finalAddonsChoises.indexOf(addonName);
      let finalFirstHalf = finalAddonsChoises.slice(0, index);
      let finalSecondHalf = finalAddonsChoises.slice(index + 2);
      finalAddonsChoises = finalFirstHalf.concat(finalSecondHalf);
    }
  });
});
//

const choosenAddonsContainer = document.querySelector(".choosen-addons");
backAddonsBtn.addEventListener("click", () => {
  addonItems.forEach((item) => {
    item.classList.remove("selected");
    checkBoxes.forEach((checkbox) => (checkbox.checked = false));
  });
  finalAddonsChoises = [];
});

//define the next page content
const finalPlanName = document.querySelector(".final-plan-type");
const finalPlanPrice = document.querySelector(".final-plane-price");
const totalDiv = document.querySelector(".total");
const totalTitle = totalDiv.firstElementChild;
const totalPrice = totalDiv.lastElementChild;
nextAddonsBtn.addEventListener("click", () => {
  if (finalPlanChoise == "") {
    if (plansContainer.classList.contains("yearly")) {
      finalPlanChoise = ["Arcade", "$90/mo"];
    } else {
      finalPlanChoise = ["Arcade", "$9/mo"];
    }
  }
  if (plansContainer.classList.contains("yearly")) {
    finalPlanName.innerText = `${finalPlanChoise[0]} (Yearly)`;
    finalPlanPrice.innerText = `${finalPlanChoise[1]}`;
    totalTitle.innerText = "Total(per year)";
  } else {
    finalPlanName.innerText = `${finalPlanChoise[0]} (Monthly)`;
    finalPlanPrice.innerText = `${finalPlanChoise[1]}`;
    totalTitle.innerText = "Total(per month)";
  }
  for (let i = 0; i < finalAddonsChoises.length; i += 2) {
    let addonElement = document.createElement("div");
    addonElement.classList.add("choosen-addon");
    let addonNameDiv = document.createElement("div");
    addonNameDiv.innerText = finalAddonsChoises[i];
    let addonPriceDiv = document.createElement("div");
    addonPriceDiv.innerText = finalAddonsChoises[i + 1];
    addonElement.appendChild(addonNameDiv);
    addonElement.appendChild(addonPriceDiv);
    choosenAddonsContainer.appendChild(addonElement);
  }
  let totalAddonsValue = 0;
  for (let i = 1; i < finalAddonsChoises.length; i += 2) {
    totalAddonsValue += Number(finalAddonsChoises[i].replace(/\D/g, ""));
  }
  let total = totalAddonsValue + Number(finalPlanChoise[1].replace(/\D/g, ""));
  if (plansContainer.classList.contains("yearly")) {
    totalPrice.innerText = ` +$${total}/Yr`;
  } else {
    totalPrice.innerText = ` +$${total}/Mo`;
  }
});
// change button functionality
const changeBtn = document.querySelector(".change-btn");
changeBtn.addEventListener("click", () => {
  let finalPage = document.querySelector("#final");
  let planesPage = document.querySelector("#planes");
  let addonPage = document.querySelector("#addon");
  finalPage.style.transform = "translateX(-200%)";
  addonPage.style.transform = "translateX(-200%)";
  planesPage.style.transform = "translateX(0)";
  choosenAddonsContainer.innerHTML = "";
  plans.forEach((plan) => plan.classList.remove("selected"));
  addonItems.forEach((item) => {
    item.classList.remove("selected");
    checkBoxes.forEach((checkbox) => (checkbox.checked = false));
  });
  finalPlanChoise = [];
  finalAddonsChoises = [];
});
// finishing up page
const backFinishBtn = document.querySelector("#back-finish");
const confirmBtn = document.querySelector("#confirm");
const finalContent = document.querySelector("#final .main");
backFinishBtn.addEventListener("click", () => {
  choosenAddonsContainer.innerHTML = "";
  plans.forEach((plan) => plan.classList.remove("selected"));
  addonItems.forEach((item) => {
    item.classList.remove("selected");
    checkBoxes.forEach((checkbox) => (checkbox.checked = false));
  });
  finalPlanChoise = [];
  finalAddonsChoises = [];
});

confirmBtn.addEventListener("click", () => {
  finalContent.innerHTML = "";
  let newDiv = document.createElement("div");
  newDiv.classList.add("thanks");
  let icon = document.createElement("div");
  icon.innerHTML = `<img src="./assets/images/icon-thank-you.svg" alt="">`;
  icon.classList.add("icon");
  let heading = document.createElement("h1");
  heading.innerText = "Thank You";
  let text = document.createElement("p");
  text.innerHTML = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ipsam illum aut.
   Aut perferendis officia sit recusandae, voluptatem eaque nihil quod molestiae, 
   a deserunt illum quibusdam incidunt cupiditate? Magni, a.
  `;
  newDiv.appendChild(icon);
  newDiv.appendChild(heading);
  newDiv.appendChild(text);
  finalContent.appendChild(newDiv);
});
// ** functions
//function validate email

function validateEmail(email) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let validate = false;
  if (!email.value.match(mailformat)) {
    validate = false;
  } else {
    validate = true;
  }
  return validate;
}
//function validate number

function validateNumber(number) {
  var numberformat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  let validate;
  if (number.value.match(numberformat)) {
    validate = true;
  } else {
    validate = false;
  }
  return validate;
}

// check input values
function checkInputs(inputarr, msgarr) {
  for (let i = 0; i < inputarr.length; i++) {
    if (inputarr[i].value == "") {
      msgarr[i].style.display = "block";
      // inputarr[i].focus();
      inputarr[i].style.backgroundColor = "hsl(231, 11%, 63%)";
    } else if (
      inputarr[i].value !== "" &&
      inputarr[i].getAttribute("type") == "text"
    ) {
      msgarr[i].style.display = "none";
      inputarr[i + 1].focus();
      inputarr[i].style.backgroundColor = "transparent";
    } else if (
      inputarr[i].value !== "" &&
      inputarr[i].getAttribute("type") == "email"
    ) {
      let valid = validateEmail(inputarr[i]);
      if (valid) {
        msgarr[i].style.display = "none";
        inputarr[i + 1].focus();
        inputarr[i].style.backgroundColor = "transparent";
      } else {
        msgarr[i].style.display = "block";
        msgarr[i].textContent = "this is not a valid Email";
        inputarr[i].focus();
        inputarr[i].style.backgroundColor = "hsl(231, 11%, 63%)";
      }
    } else if (
      inputarr[i].value !== "" &&
      inputarr[i].getAttribute("type") == "number"
    ) {
      let valid = validateNumber(inputarr[i]);
      if (valid) {
        msgarr[i].style.display = "none";
        inputarr[i].blur();
        inputarr[i].style.backgroundColor = "transparent";
      } else {
        msgarr[i].style.display = "block";
        msgarr[i].textContent = "phone number must contains 10 digits";
        inputarr[i].focus();
        inputarr[i].style.backgroundColor = "hsl(231, 11%, 63%)";
      }
    }
  }
}

function notEmpty(el) {
  return el !== "";
}
