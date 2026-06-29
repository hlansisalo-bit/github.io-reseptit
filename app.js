import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get
} from
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyDbDec5jbnVlrH641xD7iy6iz2BVEeF8h8",
  authDomain: "recipes-31359.firebaseapp.com",
  databaseURL: "https://recipes-31359-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipes-31359",

};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth =
  getAuth();

const recipeList =
  document.getElementById("recipe-list");



async function loadRecipes() {

  const recipesRef = ref(db);

  const snapshot = await get(recipesRef);

  const recipesOrig = snapshot.val();
const recipes =
Object.entries(recipesOrig)

    .sort((a, b) => {

      const recipeA =
        (a[1].Nimi || "")
          .toLowerCase();

      const recipeB =
        (b[1].Nimi || "")
          .toLowerCase();

      return recipeA.localeCompare(
        recipeB,
        "fi"
      );

    });

 // for (const id in recipes) {
recipes
  .forEach(([id, recipe]) => {
    //const recipe = recipes[id];

    const card =
      document.createElement("article");
    const searchText = `
      ${recipe.Nimi || ""}
      ${recipe.Luokka || ""}
      ${recipe.Ominaisuus || ""}
      ${recipe.Ainekset || ""}
      ${recipe.Huomio || ""}
      ${recipe.Valmistusohje || ""}
      ${recipe.Suosikki || ""}
      ${recipe.Tyyppi || ""}
      ${recipe.Arvio || ""}
      ${recipe.Valmistuspvt || ""}
      ${(recipe.Valmistuspvt?.length || 0) < 30 ? "" : "tehty paljon" || ""}
    `.toLowerCase();

    card.dataset.search = searchText;
    card.dataset.Ominaisuus = recipe.Ominaisuus;
    card.dataset.Luokka = recipe.Luokka;
    card.className = "recipe-card";

    card.innerHTML = `

      <h2>
        <a href="recipe.html?id=${id}">
          ${recipe.Nimi}
        </a>
      </h2>

      
    `;

    recipeList.appendChild(card);

  })
}



//loadRecipes();

const search = document.getElementById("search");
const ominaisuusFilter = document.getElementById("ominaisuus-filter");
const luokkaFilter = document.getElementById("luokka-filter");

function filterRecipes() {
 //alert("filtering");
 
  const term = search.value.toLowerCase();

  const ominaisuus = ominaisuusFilter.value;
  const luokka = luokkaFilter.value;

  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach(card => {

    const text = card.dataset.search;

    const cardOminaisuus = card.dataset.Ominaisuus;
    const cardLuokka = card.dataset.Luokka;

    const matchesSearch =
      text.includes(term);

    const matchesOminaisuus =
      ominaisuus === "" ||
      cardOminaisuus.includes(ominaisuus);

    const matchesLuokka =
      luokka === "" ||
      cardLuokka.includes(luokka);

    if (matchesSearch && matchesOminaisuus && matchesLuokka) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }

  });

}



search.addEventListener("input", filterRecipes);

ominaisuusFilter.addEventListener("change", filterRecipes);
luokkaFilter.addEventListener("change", filterRecipes);

window.addEventListener("pageshow", async function () {

  recipeList.innerHTML = "";

  await loadRecipes();

 filterRecipes();

});

onAuthStateChanged(
  auth,
  user => {

    const loginButton =
      document.getElementById(
        "login-button"
      );

    const newButton =
      document.getElementById(
        "new-button"
      );

    const aiButton =
      document.getElementById(
        "ai-button"
      );

    const logoutButton =
      document.getElementById(
        "logout-button"
      );

    if (user) {

      loginButton.style.display =
        "none";

      logoutButton.style.display =
        "inline-flex";

      newButton.style.display =
        "inline-flex";

      aiButton.style.display =
        "inline-flex";


    }
    else {

      loginButton.style.display =
        "inline-flex";

      logoutButton.style.display =
        "none";

      newButton.style.display =
        "none";

      aiButton.style.display =
        "none";

    }

  }
);

document
  .getElementById(
    "logout-button"
  )
  .addEventListener(
    "click",
    async () => {

      await signOut(auth);

      window.location =
        "index.htm";

    });

    document
  .getElementById(
    "login-button"
  )
  .addEventListener(
    "click",
    async () => {


      window.location =
        "login.html";

    });
