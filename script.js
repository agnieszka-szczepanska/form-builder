const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form");
let questionNumb = 0;

const createForm = (event) => {
  // event.preventDefault();
  // event.stopPropagation();
  questionNumb += 1;
  console.log(questionNumb);

  const innerFormContainer = document.createElement("div");
  innerFormContainer.setAttribute("id", `form${questionNumb}`);
  form.appendChild(innerFormContainer);

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
  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("id", `btn${questionNumb}`);
  submitBtn.type = "button";
  submitBtn.classname = "button";
  submitBtn.value = "submit";
  innerFormContainer.appendChild(submitBtn);

  const createInnerForm = (event) => {
    // event.preventDefault();
    // event.stopPropagation();

    const questionInput2 = document.createElement("input");
    questionInput2.setAttribute("placeholder", "check condition");
    innerFormContainer.appendChild(questionInput2);

    console.log(questionInput.value);
    localStorage.setItem(`question${questionNumb}`, questionInput.value);
    createForm(event);
  };

  submitBtn.addEventListener("click", createInnerForm);
};

addBtn.addEventListener("click", createForm);
