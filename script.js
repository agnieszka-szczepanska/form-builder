const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form");
let questionNumb = 0;

const createForm = (event) => {
  event.preventDefault();
  event.stopPropagation();
  questionNumb += 1;
  console.log(questionNumb);
  console.log("event", event.srcElement.id);

  const innerFormContainer = document.createElement("div");
  innerFormContainer.setAttribute("id", `form${questionNumb}`);
  numbSelector = `#form${event.srcElement.id.slice(3)}`;
  let ancestorDiv = document.querySelector(numbSelector);
  console.log("ancestor", ancestorDiv);

  ancestorDiv
    ? ancestorDiv.after(innerFormContainer)
    : form.before(innerFormContainer);

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

  const submitQuestion = (event) => {
    event.preventDefault();

    console.log(questionInput.value);
    localStorage.setItem(`question${questionNumb}`, questionInput.value);
    localStorage.setItem(`answerType${questionNumb}`, answerTypeSelect.value);

    //stworzyć tablicę i usunąć przypisując wspólny atrybut/classę?
    event.currentTarget.style.display = "none";
    questionInput.style.display = "none";
    selectLabel.style.display = "none";
    answerTypeSelect.style.display = "none";

    const answerLabel = document.createElement("label");
    answerLabel.setAttribute("for", `select${questionNumb}`);
    answerLabel.innerText = `${questionInput.value}`;
    innerFormContainer.appendChild(answerLabel);

    const answerInput = document.createElement("input");
    answerInput.setAttribute("id", `answer${questionNumb}`);
    // answerInput.type = "text";
    answerInput.type = `${answerTypeSelect.value}`;
    // submitBtn.classname = "button";
    // submitBtn.value = "submit";
    innerFormContainer.appendChild(answerInput);

    const addBtn = document.createElement("input");
    addBtn.setAttribute("id", `btn${questionNumb}`);
    addBtn.type = "button";
    addBtn.classname = "button";
    addBtn.value = "add nested form";
    innerFormContainer.appendChild(addBtn);

    // const questionInput2 = document.createElement("input");
    // questionInput2.setAttribute("placeholder", "check condition");
    // innerFormContainer.appendChild(questionInput2);

    addBtn.addEventListener("click", createForm);
  };

  submitBtn.addEventListener("click", submitQuestion);
};

addBtn.addEventListener("click", createForm);
