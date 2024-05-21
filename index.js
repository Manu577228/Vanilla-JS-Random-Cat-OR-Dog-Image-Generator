const catButton = document.getElementById("catButton");
const dogButton = document.getElementById("dogButton");
const randomImage = document.getElementById("randomImage");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

catButton.addEventListener("click", fetchRandomCat);
dogButton.addEventListener("click", fetchRandomDog);
themeToggle.addEventListener("click", toggleTheme);

// show a random image on initial load
showRandomImage();

function showRandomImage() {
  // Randomly choose to display either a cat or a dog
  if (Math.random() < 0.5) {
    fetchRandomCat();
  } else {
    fetchRandomDog();
  }
}

function fetchRandomCat() {
  showLoader();
  fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .then((data) => {
      randomImage.src = data[0].url;
      randomImage.alt = "random Cat";
      hideLoader();
    })
    .catch((error) => {
      console.log("error fetching cat image:", error);
      hideLoader();
    });
}

function fetchRandomDog() {
  showLoader();
  fetch("https://random.dog/woof.json")
    .then((response) => response.json())
    .then((data) => {
      // Check if the returned ULR is an image
      if (
        data.url.endsWith(".jpg") ||
        data.url.endsWith(".jpeg") ||
        data.url.endsWith(".png") ||
        data.url.endsWith(".gif")
      ) {
        randomImage.src = data.url;
        randomImage.alt = "Random Dog";
        hideLoader();
      } else {
        fetchRandomDog();
      }
    })
    .catch((error) => {
      console.log("Error fetchin dog image:", error);
    });
}

function showLoader() {
  randomImage.style.display = "none";
  loader.style.display = "block";
}

function hideLoader() {
  randomImage.style.display = "block";
  loader.style.display = "none";
}

function toggleTheme() {
  body.classList.toggle("dark");
}
