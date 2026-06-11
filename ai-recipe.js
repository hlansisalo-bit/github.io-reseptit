import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";



  import {
  getDatabase,
  ref,
  get,
  remove
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

import {
  getAuth
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyDbDec5jbnVlrH641xD7iy6iz2BVEeF8h8",
  authDomain: "recipes-31359.firebaseapp.com",
  databaseURL: "https://recipes-31359-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipes-31359",


};

let key="";
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

async function loadRecipe() {

  const recipeRef =
    ref(db, "-OupYie-df1X3SaAwi2q");

  const snapshot =
    await get(recipeRef);

  key =
    snapshot.val().Huomio;
//alert(key)
  
}


loadRecipe();


document
  .getElementById("generate-button")
  .addEventListener(
    "click",
    generateRecipe
  );

async function generateRecipe() {

  const description =
    document
      .getElementById(
        "description"
      )
      .value;

  const prompt = `

Luo seuraavasta kuvauksesta resepti.

Kuvaus:
${description}

Palauta VAIN JSON.

JSON sisältää kentät:

{
  "Nimi": "",
  "Ainekset": "",
  "Valmistusohje": "",
  "Huomio": "",
  "Luokka": "",
  "Ominaisuus": ""
}

Ominaisuus voi sisältää yhden tai useamman seuraavista puolipisteellä erotettuna:

Gluteeniton;Kevyt;Laktoositon;Maidoton;Munaton;Sokeriton;Vegaaninen

Luokka voi sisältää yhden tai useamman seuraavista puolipisteellä erotettuna:

Booli;Dippikastike;Drinkki;Grillattavaa;Grillimarinadi;Grilliruoan/lihan lisäke;Hillot ja säilykkeet;Jauheliharuoka;Jäätelö/Jäädyke;Kakku;Kalaruoka;Kanaruoka;Kastike;Kasvisruoka;Keitto;Kiisseli/hyytelö;Kuivakakku;Lammasruoka;Leipä;Leivos;Levite;Lämmin juoma;Lämmin leipä;Makea piiras;Makkararuoka;Marjajälkkäri;Munakas;Naudanliharuoka;Paistos;Pasta;Pikkuleipä;Pororuoka;Possuruoka;Raakaruoka;Risotto/Riisiruoka;Ruoka-aineen käyttöohje;Salaatinkastike;Salaatti (ruokaisa);Salaatti (viherlisäke);Suolainen piiras;Suolapala;Sämpylä;Taco;Tapas;Uuniperunan lisäke;Viinivinkit;Voileipäkakku;Wokki

Palauta vain JSON ilman markdownia.
`;

  try {

document
  .getElementById("loading")
  .style.display =
    "block";

const button =
  document.getElementById(
    "generate-button"
  );

button.disabled = true;

button.textContent =
  "Luodaan...";

    const response =
      await fetch(
        "https://api.openai.com/v1/responses",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "Authorization":
              "Bearer " + key

          },

          body: JSON.stringify({

            model: "gpt-5-mini",

            input: prompt

          })

        }
      );

    const data =
      await response.json();

    const message =

  data.output.find(
    item =>
      item.type === "message"
  );
    const jsonText =
      message.content[0]
          .text;

          const recipe =
  JSON.parse(jsonText);
sessionStorage.setItem(
  "aiRecipe",
  JSON.stringify(recipe)
);

document
  .getElementById("loading")
  .style.display =
    "none";

button.disabled = false;

button.textContent =
  "Luo resepti";

window.location =
  "new.html";
   // alert(recipe.Nimi + "\n" + recipe.Ainekset + "\n" + recipe.Valmistusohje + "\n" + recipe.Huomio + "\n" + recipe.Luokka + "\n" + recipe.Ominaisuus);
console.log(recipe);
  }
  catch(error) {

    console.error(error);

    alert(
      "Virhe OpenAI-kutsussa"
    );

  }

  finally {

  document
    .getElementById("loading")
    .style.display =
      "none";

  button.disabled = false;

button.textContent =
  "Luo resepti";

}

}