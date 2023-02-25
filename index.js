let myTitles = []
let myURL = []
const inputEl = document.getElementById("input-el")
const urlEl = document.getElementById("url-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const TitlesFromLocalStorage = JSON.parse(localStorage.getItem("myTitles"))
const URLFromLocalStorage = JSON.parse(localStorage.getItem("myURL"))
const tabBtn = document.getElementById("tab-btn")

if (TitlesFromLocalStorage) {
    myTitles = TitlesFromLocalStorage
    myURL = URLFromLocalStorage
    render(myTitles, myURL)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        urlEl.value = tabs[0].url
        localStorage.setItem("myTitles", JSON.stringify(myTitles))
        localStorage.setItem("myURL", JSON.stringify(myURL))
        render(myTitles, myURL)
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myTitles = []
    myURL = []
    render(myTitles, myURL)
})

inputBtn.addEventListener("click", function () {
    if (!(inputEl.value === "" || urlEl.value === "")) {
        myTitles.push(inputEl.value)
        myURL.push(urlEl.value)
    }
    inputEl.value = ""
    urlEl.value = ""
    localStorage.setItem("myTitles", JSON.stringify(myTitles))
    localStorage.setItem("myURL", JSON.stringify(myURL))
    render(myTitles, myURL)
})

function render(name, website) {
    let listItems = ""
    for (let i = 0; i < name.length; i++) {
        listItems += `
            <div class = "url" id="${i}">
            <li>
                <a target='_blank' href='${website[i]}'>
                    ${name[i]}
                </a>
            </li>
            </div>
        `
    }
    ulEl.innerHTML = listItems
}

// function deleteUrl(id) {
//     console.log("hello clicked")
//     myURL.splice(id, 1)
//     myTitles.splice(id, 1)
//     localStorage.setItem("myTitles", JSON.stringify(myTitles))
//     localStorage.setItem("myURL", JSON.stringify(myURL))
//     render(myTitles, myURL)
// }
//<button class ="delete-url" id="${i}" onclick="deleteUrl(this.id)">DELETE</button>
