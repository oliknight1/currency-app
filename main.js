const baseUrl = "https://api.exchangeratesapi.io/latest?base=CAD";
const topSelector = document.getElementById("top-select");
const bottomSelector = document.getElementById("bottom-select");
const converted = document.querySelector("#converted");
const input = document.querySelector("#input");
const dropdown = document.querySelector("#dropdown");

window.addEventListener("load", () => {
	fetchCurrencyList();
	topSelector.addEventListener("change", convert);
	bottomSelector.addEventListener("change", convert);
	input.addEventListener("keyup", convert);
});

function fetchCurrencyList() {
	return fetchJson(baseUrl + topSelector.value).then(data => {
		/* Loop through all the currency names and the conversion value associated with it
		and creates a option element to store it in.

		The text of the option element is the currency name and the value is the conversion rate
		*/
		for (const currency in data.rates) {
			const optionItem = document.createElement("option");
			const optionItem2 = document.createElement("option");
			optionItem.text = currency;
			optionItem.value = data.rates[currency];
			optionItem2.text = currency;
			optionItem2.value = data.rates[currency];
			topSelector.appendChild(optionItem);
			bottomSelector.appendChild(optionItem2);
		}

		convert();
	});
}

function convert() {
	// This is where the currency inputted is converted
	const bottomSelectValue = bottomSelector.value;
	const topSelectValue = topSelector.value;

	converted.value = parseFloat(
		(topSelectValue * input.value) / bottomSelectValue
	).toFixed(2);

	// Check that the input is a number
	if (!converted.value || isNaN(converted.value)) {
		converted.value = "Please Enter A Number";
	}
}

// This grabs the data from the api using the url specified when fetchJson is called
function fetchJson(url) {
	return fetch(url).then(response => {
		return response.json();
	});
}
