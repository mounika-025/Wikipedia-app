let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);

    let breakEL = document.createElement("br");
    resultItem.appendChild(breakEL);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItem.appendChild(urlEl);

    let lineBreakEl = document.createElement("br");
    resultItem.appendChild(lineBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItem.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItem);
}



function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppend(result);
    }

}



function searchwiki(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?searh=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(search_results);
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchwiki);