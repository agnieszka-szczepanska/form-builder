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
  innerFormContainer.classList.add("singleForm");
  numbSelector = `#form${event.srcElement.id.slice(3)}`;
  let ancestorDiv = document.querySelector(numbSelector);

  ancestorDiv
    ? ancestorDiv.append(innerFormContainer)
    : form.append(innerFormContainer);

  ancestorDiv && condition(innerFormContainer, questionNumb);

  const questionInputLabel = document.createElement("label");
  questionInputLabel.setAttribute("for", `question${questionNumb}`);
  questionInputLabel.innerText = "Question:";
  questionInputLabel.classList.add("visible");
  innerFormContainer.appendChild(questionInputLabel);

  const questionInput = document.createElement("input");
  questionInput.setAttribute("id", `question${questionNumb}`);
  questionInput.setAttribute("placeholder", "enter your question");
  questionInput.classList.add("visible");
  innerFormContainer.appendChild(questionInput);

  const breakLine = document.createElement("br");
  innerFormContainer.appendChild(breakLine);

  const selectLabel = document.createElement("label");
  selectLabel.setAttribute("for", `select${questionNumb}`);
  selectLabel.innerText = "Choose answer type:";
  selectLabel.classList.add("visible");
  innerFormContainer.appendChild(selectLabel);

  const answerTypeSelect = document.createElement("select");
  answerTypeSelect.classList.add("visible");
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

  const secondBreakLine = document.createElement("br");
  innerFormContainer.appendChild(secondBreakLine);

  const addBtn = document.createElement("input");
  addBtn.setAttribute("id", `btn${questionNumb}`);
  addBtn.type = "button";
  addBtn.classname = "button";
  addBtn.value = "add nested form";
  addBtn.classList.add("visible");
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

  generateFormBtn.classList.remove("hidden");
};

const condition = (innerFormContainer, questionNumb) => {
  const answerTypeInCondition = localStorage.getItem(
    `answerType${numbSelector.slice(5)}`
  );

  const selectConditionLabel = document.createElement("label");
  selectConditionLabel.setAttribute(
    "for",
    `selectConditionLabel${questionNumb}`
  );
  selectConditionLabel.innerText = "Condition:";
  selectConditionLabel.classList.add("visible");
  innerFormContainer.appendChild(selectConditionLabel);

  const conditionSelect = document.createElement("select");
  innerFormContainer.appendChild(conditionSelect);
  conditionSelect.classList.add("visible");
  conditionSelect.setAttribute("id", `selectCondition${questionNumb}`);

  const thirdBreakLine = document.createElement("br");
  innerFormContainer.appendChild(thirdBreakLine);

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
      conditionRadioInput.classList.add("visible");
      innerFormContainer.appendChild(conditionRadioInput);

      const conditionSelectLabel = document.createElement("label");
      conditionSelectLabel.setAttribute(
        "for",
        `${conditionRadioAnswers[i]}${questionNumb}`
      );
      conditionSelectLabel.innerText = `${conditionRadioAnswers[i]}`;
      conditionSelectLabel.classList.add("visible");
      innerFormContainer.appendChild(conditionSelectLabel);

      conditionRadioInput.addEventListener("change", (event) => {
        event.preventDefault();
        localStorage.setItem(
          `conditionValue${questionNumb}`,
          event.target.value
        );
      });
    }
  } else {
    const conditionInput = document.createElement("input");
    conditionInput.type = answerTypeInCondition;
    conditionInput.classList.add("visible");
    innerFormContainer.appendChild(conditionInput);

    conditionInput.addEventListener("change", (event) => {
      event.preventDefault();
      localStorage.setItem(`conditionValue${questionNumb}`, event.target.value);
    });
  }
  const fourthBreakLine = document.createElement("br");
  innerFormContainer.appendChild(fourthBreakLine);

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

  for (let i = 1; i <= questionNumb; i++) {
    let formToChange = document.querySelector(`#form${i}`);
    formToChange.classList.add("borderFormToHide");

    const newFormContainer = document.createElement("div");
    newFormContainer.setAttribute("id", `newForm${i}`);
    formToChange.before(newFormContainer);

    const visibleArr = document.querySelectorAll(".visible");
    visibleArr.forEach((e) => e.classList.add("hidden"));

    const displayFields = () => {
      const questionLabel = document.createElement("label");
      questionLabel.setAttribute("for", `select${i}`);
      const questionLabelValue = localStorage.getItem(`question${i}`);
      questionLabel.innerText = questionLabelValue;
      newFormContainer.appendChild(questionLabel);

      const answerTypeValue = localStorage.getItem(`answerType${i}`);

      if (answerTypeValue === "radio") {
        const radioAnswers = ["yes", "no"];
        for (let a = 0; a < radioAnswers.length; a++) {
          const radioInput = document.createElement("input");
          radioInput.type = "radio";
          radioInput.value = `${radioAnswers[a]}`;
          radioInput.setAttribute("id", `answer${i}`);
          radioInput.setAttribute("name", "yesNo");
          radioInput.classList.add("radioInput");

          newFormContainer.appendChild(radioInput);
          const selectLabel = document.createElement("label");
          selectLabel.setAttribute("for", `answer${i}`);
          selectLabel.innerText = `${radioAnswers[a]}`;
          newFormContainer.appendChild(selectLabel);

          radioInput.addEventListener("change", (event) => {
            event.preventDefault();
            localStorage.setItem(`answer${i}`, event.target.value);
          });
        }
      } else {
        const answerInput = document.createElement("input");
        answerInput.setAttribute("id", `answer${i}`);
        answerInput.type = answerTypeValue;
        newFormContainer.appendChild(answerInput);

        answerInput.addEventListener("change", (event) => {
          event.preventDefault();
          localStorage.setItem(`answer${i}`, event.target.value);
        });
      }
    };
    const conditionTypes = {
      Equals: "===",
      "Grater than": ">",
      "Less than": "<",
    };
    let parentFormNumber = formToChange.parentNode.id.slice(4);

    if (!parentFormNumber) {
      displayFields();
    } else {
      const displayInnerForm = (e) => {
        let parentAnswer = localStorage.getItem(`answer${parentFormNumber}`);
        let currentConditionType = localStorage.getItem(
          `conditionSelectType${i}`
        );
        let defaultAnswer = localStorage.getItem(`conditionValue${i}`);

        if (currentConditionType === "Equals") {
          let condition = `${defaultAnswer}` === `${parentAnswer}`;
          if (condition === true) {
            displayFields();
          }
        } else if (currentConditionType === "Grater than") {
          let condition = `${defaultAnswer}` > `${parentAnswer}`;
          if (condition === true) {
            displayFields();
          }
        } else if (currentConditionType === "Less than") {
          let condition = `${defaultAnswer}` < `${parentAnswer}`;
          if (condition === true) {
            displayFields();
          }
        }
      };

      let answerForm = document.querySelector(`#newForm${parentFormNumber}`);
      answerForm.addEventListener("change", displayInnerForm);
    }
  }
  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.type = "button";
  submitBtn.classname = "button";
  submitBtn.value = "Submit form";
  form.appendChild(submitBtn);

  const submit = () => {
    form.innerText = "Thank you for submitting the form";
  };

  submitBtn.addEventListener("click", submit);
};

generateFormBtn.addEventListener("click", generateForm);
addBtn.addEventListener("click", createForm);
