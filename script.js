const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form");
const generateFormBtn = document.querySelector("#generateFormBtn");
let questionNumb = 0;

const createForm = (event) => {
  event.preventDefault();
  event.stopPropagation();
  questionNumb += 1;

  const innerFormContainer = document.createElement("div");
  innerFormContainer.setAttribute("id", `form${questionNumb}`);
  numbSelector = `#form${event.srcElement.id.slice(3)}`;
  let ancestorDiv = document.querySelector(numbSelector);
  console.log("ancestor", ancestorDiv);

  ancestorDiv
    ? ancestorDiv.append(innerFormContainer)
    : form.append(innerFormContainer);

  ancestorDiv && condition(innerFormContainer, questionNumb);

  const questionInputLabel = document.createElement("label");
  questionInputLabel.setAttribute("for", `question${questionNumb}`);
  questionInputLabel.innerText = "Question:";
  innerFormContainer.appendChild(questionInputLabel);

  const questionInput = document.createElement("input");
  questionInput.setAttribute("id", `question${questionNumb}`);
  questionInput.setAttribute("placeholder", "enter your question");
  innerFormContainer.appendChild(questionInput);

  const selectLabel = document.createElement("label");
  selectLabel.setAttribute("for", `select${questionNumb}`);
  selectLabel.innerText = "Choose answer type:";
  innerFormContainer.appendChild(selectLabel);

  const answerTypeSelect = document.createElement("select");
  innerFormContainer.appendChild(answerTypeSelect);
  answerTypeSelect.setAttribute("id", `select${questionNumb}`);

  const options = ["", "text", "number", "radio"];
  for (let i = 0; i < options.length; i++) {
    const answerType = document.createElement("option");
    answerType.textContent = options[i];
    answerTypeSelect.appendChild(answerType);
    i === 0
      ? answerType.setAttribute("disabled", "true")
      : answerType.setAttribute("value", options[i]);
  }

  const addBtn = document.createElement("input");
  addBtn.setAttribute("id", `btn${questionNumb}`);
  addBtn.type = "button";
  addBtn.classname = "button";
  addBtn.value = "add nested form";
  innerFormContainer.appendChild(addBtn);

  addBtn.addEventListener("click", createForm);

  questionInput.addEventListener("change", (event) => {
    event.preventDefault();
    localStorage.setItem(`question${questionNumb}`, questionInput.value);
  });
  answerTypeSelect.addEventListener("change", (event) => {
    event.preventDefault();
    localStorage.setItem(`answerType${questionNumb}`, answerTypeSelect.value);
  });
};

const condition = (innerFormContainer, questionNumb) => {
  const answerTypeInCondition = localStorage.getItem(
    `answerType${numbSelector.slice(5)}`
  );
  console.log("numbSelector", numbSelector.slice(5));
  console.log("answerTypeInCondition", answerTypeInCondition);
  const selectConditionLabel = document.createElement("label");
  selectConditionLabel.setAttribute(
    "for",
    `selectConditionLabel${questionNumb}`
  );
  selectConditionLabel.innerText = "Condition:";
  innerFormContainer.appendChild(selectConditionLabel);

  const conditionSelect = document.createElement("select");
  innerFormContainer.appendChild(conditionSelect);
  conditionSelect.setAttribute("id", `selectCondition${questionNumb}`);

  let conditionOptions = "";
  if (answerTypeInCondition === "text" || answerTypeInCondition === "radio") {
    conditionOptions = ["", "Equals"];
  } else {
    conditionOptions = ["", "Equals", "Grater than", "Less than"];
  }

  for (let i = 0; i < conditionOptions.length; i++) {
    const conditionAnswer = document.createElement("option");
    conditionSelect.appendChild(conditionAnswer);

    i === 0
      ? conditionAnswer.setAttribute("disabled", "true")
      : (conditionAnswer.textContent = conditionOptions[i]);
  }

  if (answerTypeInCondition === "radio") {
    const conditionRadioAnswers = ["yes", "no"];

    for (let i = 0; i < conditionRadioAnswers.length; i++) {
      const conditionRadioInput = document.createElement("input");
      conditionRadioInput.type = "radio";
      conditionRadioInput.value = `${conditionRadioAnswers[i]}`;
      conditionRadioInput.setAttribute(
        "id",
        `${conditionRadioAnswers[i]}${questionNumb}`
      );
      conditionRadioInput.setAttribute("name", "yesNo");
      innerFormContainer.appendChild(conditionRadioInput);

      const conditionSelectLabel = document.createElement("label");
      conditionSelectLabel.setAttribute(
        "for",
        `${conditionRadioAnswers[i]}${questionNumb}`
      );
      conditionSelectLabel.innerText = `${conditionRadioAnswers[i]}`;
      innerFormContainer.appendChild(conditionSelectLabel);

      conditionRadioInput.addEventListener("change", (event) => {
        event.preventDefault();
        localStorage.setItem(
          `conditionRadioInputValue${questionNumb}`,
          event.target.value
        );
      });
    }
  } else {
    const conditionInput = document.createElement("input");
    conditionInput.type = answerTypeInCondition;
    innerFormContainer.appendChild(conditionInput);
    console.log(conditionInput.value, "conditionInput");

    conditionInput.addEventListener("change", (event) => {
      event.preventDefault();
      localStorage.setItem(
        `conditionInputValue${questionNumb}`,
        event.target.value
      );
    });
  }

  conditionSelect.addEventListener("change", (event) => {
    event.preventDefault();
    localStorage.setItem(
      `conditionSelectType${questionNumb}`,
      conditionSelect.value
    );
  });
};

const generateForm = (event) => {
  event.preventDefault();

  event.currentTarget.style.display = "none";
  addBtn.style.display = "none";

  for (let i = questionNumb; i >= 1; i--) {
    let formToChange = document.querySelector(`#form${i}`);
    console.log("formToChange", formToChange);
    formToChange.innerText = "";

    const questionLabel = document.createElement("label");
    questionLabel.setAttribute("for", `select${i}`);
    const questionLabelValue = localStorage.getItem(`question${i}`);
    questionLabel.innerText = questionLabelValue;
    formToChange.appendChild(questionLabel);

    const answerTypeValue = localStorage.getItem(`answerType${i}`);

    if (answerTypeValue === "radio") {
      const radioAnswers = ["yes", "no"];
      for (let a = 0; a < radioAnswers.length; a++) {
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.value = `${radioAnswers[a]}`;
        radioInput.setAttribute("id", `${radioAnswers[a]}${i}`);
        radioInput.setAttribute("name", "yesNo");
        formToChange.appendChild(radioInput);
        const selectLabel = document.createElement("label");
        selectLabel.setAttribute("for", `${radioAnswers[a]}${i}`);
        selectLabel.innerText = `${radioAnswers[a]}`;
        formToChange.appendChild(selectLabel);
      }
    } else {
      const answerInput = document.createElement("input");
      answerInput.setAttribute("id", `answer${questionNumb}`);
      answerInput.type = answerTypeValue;
      formToChange.appendChild(answerInput);
    }
  }
};

generateFormBtn.addEventListener("click", generateForm);
addBtn.addEventListener("click", createForm);
