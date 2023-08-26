const accesskey = "bjh6hJYaJVF6X0s5QZAXC5gbUtHCQSfjnppYui8atSA";
const formEl = document.querySelector("form");
const input = document.getElementById("search-input");
const searchreslts = document.querySelector(".search-results"); // Correct variable name
const showmore = document.getElementById("show-more");

let inputdata = "";
let page = 1;

async function searchimages() {
  inputdata = input.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;
  const response = await fetch(url);
  const data = await response.json();
  const scrolltop = document.getElementById("scroll-up");

  const results = data.results;
  console.log(results);

  if (page === 1) {
    searchreslts.innerHTML = "";
  }

  scrolltop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  results.map((result) => {
    const imagewrapper = document.createElement("div");
    imagewrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;
    imagelink.style.color = "white"; // Set the text color to white
    imagelink.style.textAlign = "center"; // Align the text in the center

    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imagelink);

    searchreslts.appendChild(imagewrapper); // Append imagewrapper to the container
  });
  page++;
  if (page > 1) {
    showmore.style.display = "block";
    // showmore.style.background-color = rgb(20, 19, 19);
    // showmore.style.color = "red";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchimages();
});
showmore.addEventListener("click", (event) => {
  searchimages();
});
