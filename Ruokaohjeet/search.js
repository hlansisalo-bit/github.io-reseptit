const search = document.getElementById("search");
const sopivuusFilter = document.getElementById("sopivuus-filter");

function filterRecipes() {

  const term = search.value.toLowerCase();

  const sopivuus = sopivuusFilter.value;

  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach(card => {

    const text = card.textContent.toLowerCase();

    const cardSopivuus = card.dataset.sopivuus;

    const matchesSearch =
      text.includes(term);

    const matchesSopivuus =
      sopivuus === "" ||
      cardSopivuus.includes(sopivuus);

    if (matchesSearch && matchesSopivuus) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }

  });

}

search.addEventListener("input", filterRecipes);

sopivuusFilter.addEventListener("change", filterRecipes);

window.addEventListener("pageshow", function () {
  filterRecipes();
});