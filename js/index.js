// Get elements
// --------------------------------------------------------
const amount = document.querySelector("#amount"),
  from = document.querySelector("#from"),
  to = document.querySelector("#to"),
  exchange = document.querySelector("#exchange"),
  showResult = document.querySelector("p"),
  getResult = document.querySelector("button");

// Get countries and their flags when opening the selection
// --------------------------------------------------------
[from, to].forEach((select, i) => {
  for (const country in countries) {
    const selected =
      (i === 0 && country === "USD") || (i === 1 && country === "EGP")
        ? "selected"
        : "";
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${country}" ${selected}>${country}</option>`
    );
  }

  select.addEventListener("change", () => {
    select.parentElement.querySelector(
      "img"
    ).src = `https://flagcdn.com/16x12/${countries[
      select.value
    ].toLowerCase()}.png`;
  });
});

// Get data from API
// --------------------------------------------------------

async function getData(currency) {
  try {
    let response = await fetch(
      `https://v6.exchangerate-api.com/v6/8f83976f78071e3cc0bca48a/latest/${currency}`
    );
    let { conversion_rates } = await response.json();
    showResult.innerHTML = `${amount.value} ${currency} = ${
      amount.value * conversion_rates[to.value]
    } ${to.value}`;
    color("text-success", "text-danger");
  } catch (error) {
    showResult.innerHTML = "This currency is not found";
    color("text-danger", "text-success");
  }
}

// Add functionalty to the button when clicking
// --------------------------------------------------------

getResult.addEventListener("click", function () {
  if (amount.value != "") {
    getData(from.value);
  } else {
    showResult.innerHTML = "The amount input is required";
    color("text-danger", "text-success");
  }
});

// A function to set the color for the text
// --------------------------------------------------------

function color(color1, color2) {
  showResult.classList.add(color1);
  showResult.classList.remove(color2);
}

// A function to exchange the currencies
// --------------------------------------------------------

exchange.addEventListener("click", () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
  from.parentElement.querySelector(
    "img"
  ).src = `https://flagcdn.com/16x12/${countries[
    from.value
  ].toLowerCase()}.png`;

  to.parentElement.querySelector(
    "img"
  ).src = `https://flagcdn.com/16x12/${countries[to.value].toLowerCase()}.png`;

  getData(from.value);
});

// Calling the function when loading the document at first time
// --------------------------------------------------------

getData("USD");
