const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form");

const createForm = (event) => {
  event.preventDefault();
  const questionInput = document.createElement("input");
  questionInput.setAttribute("placeholder", "enter your question");
  form.appendChild(questionInput);

  const selectLabel = document.createElement("label");
  selectLabel.innerHTML = "<label for='selectId'>Choose answer type:<label/>";
  form.appendChild(selectLabel);
  const answerTypeSelect = document.createElement("select");
  form.appendChild(answerTypeSelect);
  answerTypeSelect.setAttribute("id", "selectId");

  const options = ["", "text", "number", "radio"];

  for (let i = 0; i < options.length; i++) {
    const answerType = document.createElement("option");
    answerType.textContent = options[i];

    answerTypeSelect.appendChild(answerType);
    i === 0
      ? answerType.setAttribute("disabled", "true")
      : answerType.setAttribute("value", options[i]);
  }
};

addBtn.addEventListener("click", createForm);
