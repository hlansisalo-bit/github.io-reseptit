import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";






const firebaseConfig = {

   apiKey: "AIzaSyDbDec5jbnVlrH641xD7iy6iz2BVEeF8h8",
  authDomain: "recipes-31359.firebaseapp.com",
  databaseURL: "https://recipes-31359-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipes-31359",


};


const app =
  initializeApp(firebaseConfig);

  const auth =
  getAuth();

  onAuthStateChanged(
  auth,
  user => {

    if (!user) {

      const target =
        encodeURIComponent(
          window.location.href
        );

      window.location =
        "login.html?redirect=" +
        target;

    }

});

const db =
  getDatabase(app);

  const ominaisuudet = [
  "Gluteiiniton",
  "Kevyt",
  "Laktoositon",
  "Maidoton",
  "Munaton",
  "Sokeriton",
  "Vegaaninen"
  
];

const tyypit = [
"Alkuruoka",
"Pääruoka",
"Jälkiruoka",
"Lisäkeruoka",
"Iltapalaruoka",
"Bileruoka",
"Juoma",
"Leivonnainen",
"Sydänystävällinen",
"Muu"
  
];

const luokat = [
  "Booli",
  "Dippikastike",
  "Drinkki",
  "Grillattavaa",
  "Grillimarinadi",
  "Grilliruoan/lihan lisäke",
  "Hillot ja säilykkeet",
  "Jauheliharuoka",
  "Jäätelö/Jäädyke",
  "Kakku",
  "Kalaruoka",
  "Kanaruoka",
  "Kastike",
  "Kasvisruoka",
  "Keitto",
  "Kiisseli/hyytelö",
  "Kuivakakku",
  "Lammasruoka",
  "Leipä",
  "Leivos",
  "Levite",
  "Lämmin juoma",
  "Lämmin leipä",
  "Makea piiras",
  "Makkararuoka",
  "Marjajälkkäri",
  "Munakas",
  "Naudanliharuoka",
  "Paistos",
  "Pasta",
  "Pikkuleipä",
  "Pororuoka",
  "Possuruoka",
  "Raakaruoka",
  "Risotto/Riisiruoka",
  "Ruoka-aineen käyttöohje",
  "Salaatinkastike",
  "Salaatti (ruokaisa)",
  "Salaatti (viherlisäke)",
  "Suolainen piiras",
  "Suolapala",
  "Sämpylä",
  "Taco",
  "Tapas",
  "Uuniperunan lisäke",
  "Viinivinkit",
  "Voileipäkakku",
  "Wokki"

];


const ominaisuusContainer =
  document.getElementById("OminaisuusGroup");


ominaisuudet.forEach(ominaisuus => {

  const label =
    document.createElement("label");

  label.innerHTML = `
    <input type="checkbox"
           value="${ominaisuus}">
    ${ominaisuus}
  `;

  ominaisuusContainer.appendChild(label);

});

const tyyppiContainer =
  document.getElementById("TyyppiGroup");


tyypit.forEach(tyyppi => {

  const label =
    document.createElement("label");

  label.innerHTML = `
    <input type="checkbox"
           value="${tyyppi}">
    ${tyyppi}
  `;

  tyyppiContainer.appendChild(label);

});

const luokkaContainer =
  document.getElementById("LuokkaGroup");


luokat.forEach(luokka => {

  const label =
    document.createElement("label");

  label.innerHTML = `
    <input type="checkbox"
           value="${luokka}">
    ${luokka}
  `;

  luokkaContainer.appendChild(label);

});

function setCheckboxValues(
  containerId,
  valueString
) {

  const values =
    (valueString || "")
      .split(";");

  const container =
    document.getElementById(
      containerId
    );

  const checkboxes =
    container.querySelectorAll(
      "input"
    );

  checkboxes.forEach(cb => {

    cb.checked =
      values.includes(cb.value);

  });

}

function fillForm(recipe) {

  document
    .getElementById("Nimi")
    .value =
      recipe.Nimi || "";

  document
    .getElementById("Ainekset")
    .value =
      recipe.Ainekset || "";

  document
    .getElementById("Valmistusohje")
    .value =
      recipe.Valmistusohje || "";

  document
    .getElementById("Huomio")
    .value =
      recipe.Huomio || "";

  setCheckboxValues(
    "OminaisuusGroup",
    recipe.Ominaisuus
  );

  setCheckboxValues(
    "TyyppiGroup",
    recipe.Tyyppi
  );

  setCheckboxValues(
    "LuokkaGroup",
    recipe.Luokka
  );

}

const aiRecipeJson =
  sessionStorage.getItem(
    "aiRecipe"
  );

  if (aiRecipeJson) {

  const recipe =
    JSON.parse(
      aiRecipeJson
    );

  fillForm(recipe);

  sessionStorage.removeItem(
    "aiRecipe"
  );

}

function getCheckboxValues(container) {

  const checked =
    container.querySelectorAll(
      "input:checked"
    );

  return Array.from(checked)
    .map(cb => cb.value)
    .join(";");

}


document
  .getElementById("recipe-form")
  .addEventListener("submit",
    async function (e) {

      e.preventDefault();

      const recipe = {

        Nimi:
          document.getElementById("Nimi").value,

        Ainekset:
          document.getElementById("Ainekset").value,

        Valmistusohje:
          document.getElementById("Valmistusohje").value,

        Huomio:
          document.getElementById("Huomio").value,

        Luokka:
          getCheckboxValues(
            luokkaContainer
          ),

        Tyyppi:
          getCheckboxValues(
            tyyppiContainer
          ),

        Ominaisuus:
          getCheckboxValues(
            ominaisuusContainer
          )

      };


      await push(
        ref(db),
        recipe
      );


      alert("Resepti tallennettu");

window.location.replace(
  "./index.htm"
);
    });