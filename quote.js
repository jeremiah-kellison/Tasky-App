function getDailyQuote() {
  const apiUrl = "https://api.quotable.io/random?tags=inspirational";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const quote = data.content;
      const author = data.author;
      document.querySelector("p.quote").innerHTML = `"${quote}"`;
      document.querySelector("p.author").innerHTML = `-${author}`;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
    });
}

// Load the daily quote when the page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  getDailyQuote();
});

function getDailyVerse() {
  const apiUrl = "https://beta.ourmanna.com/api/v1/get/?format=json";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const verse = data.verse.details.text;
      document.querySelector(".verse").innerHTML = `"${verse}"`;
      const reference = data.verse.details.reference;
      document.querySelector(".reference").innerHTML = `-${reference}`;
    })
    .catch((error) => {
      console.error("Error fetching Bible verse:", error);
    });
}

// Load the daily verse when the page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  getDailyVerse();
});
