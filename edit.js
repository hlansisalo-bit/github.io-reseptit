import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  update,
  remove
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

  const params =
  new URLSearchParams(
    window.location.search
  );

const id =
  params.get("id");

  const ominaisuudet = [
  "Gluteiiniton",
  "Kevyt",
  "Laktoositon",
  "Maidoton",
  "Munaton",
  "Sokeriton",
  "Vegaaninen"
  
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

function createCheckboxGroup(
  containerId,
  values
) {

  const container =
    document.getElementById(
      containerId
    );

  values.forEach(value => {

    const label =
      document.createElement("label");

    label.innerHTML = `
      <input type="checkbox"
             value="${value}">
      ${value}
    `;

    container.appendChild(label);

  });

}

createCheckboxGroup(
  "OminaisuusGroup",
  ominaisuudet
);

createCheckboxGroup(
  "LuokkaGroup",
  luokat
);

const snapshot =
  await get(
    ref(db, id)
  );

const recipe =
  snapshot.val();

  document.getElementById(
  "Nimi"
).value =
  recipe.Nimi || "";

document.getElementById(
  "Ainekset"
).value =
  recipe.Ainekset.replaceAll(";", "\n") || "";

document.getElementById(
  "Valmistusohje"
).value =
  recipe.Valmistusohje.replaceAll(";", "\n") || "";

document.getElementById(
  "Huomio"
).value =
  recipe.Huomio.replaceAll(";", "\n") || "";

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

  container
    .querySelectorAll(
      "input[type='checkbox']"
    )
    .forEach(cb => {

      cb.checked =
        values.includes(
          cb.value
        );

    });

}

setCheckboxValues(
  "OminaisuusGroup",
  recipe.Ominaisuus
);

setCheckboxValues(
  "LuokkaGroup",
  recipe.Luokka
);

function getCheckboxValues(
  containerId
) {

  const container =
    document.getElementById(
      containerId
    );

  const checked =
    container.querySelectorAll(
      "input:checked"
    );

  return Array.from(checked)
    .map(cb => cb.value)
    .join(";");

}

document
  .getElementById(
    "delete-button"
  )
  .addEventListener(
    "click",
    async () => {

      const ok =
        confirm(
          "Poistetaanko resepti?"
        );

      if (!ok) {
        return;
      }
      try {

        await remove(
          ref(db, id)
        );

        alert(
          "Resepti poistettu"
        );
        window.location =
          "index.htm";
      }
      catch(err) {

        alert(
          "Poisto epäonnistui"
        );

        console.error(err);

      }
    });

document
  .getElementById("recipe-form")
  .addEventListener(
    "submit",
    async function(e) {
      e.preventDefault();

      const updatedRecipe = {

        Nimi:
          document
            .getElementById(
              "Nimi"
            ).value,

        Ainekset:
          document
            .getElementById(
              "Ainekset"
            ).value,

        Valmistusohje:
          document
            .getElementById(
              "Valmistusohje"
            ).value,

        Huomio:
          document
            .getElementById(
              "Huomio"
            ).value,

        Ominaisuus:
          getCheckboxValues(
            "OminaisuusGroup"
          ),

        Luokka:
          getCheckboxValues(
            "LuokkaGroup"
          )

      };


      await update(
        ref(db, id),
        updatedRecipe
      );


      alert(
        "Muutokset tallennettu"
      );


      window.location =
        "recipe.html?id=" + id;

    });