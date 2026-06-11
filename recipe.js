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


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


const params =
  new URLSearchParams(window.location.search);

const id =
  params.get("id");


async function loadRecipe() {

  const recipeRef =
    ref(db, id);

  const snapshot =
    await get(recipeRef);

  const recipe =
    snapshot.val();

    
  const container =
    document.getElementById("recipe-container");

  container.innerHTML = `

  <a href="edit.html?id=${id}"
   class="button">
  Muokkaa
</a>


<a href="index.htm" class="button">
  Kaikki
</a>

    <article class="recipe">

      <h1>${recipe.Nimi}</h1>

      <section>

        <h2>Ainekset</h2>

        <div class="recipe-content">${recipe.Ainekset
            .replaceAll(";", "<br>")}
        </div>

      </section>

      <section>

        <h2>Valmistusohje</h2>

        <div class="recipe-content">${recipe.Valmistusohje.replaceAll(";", "<br>")}
        </div>

      </section>

      <section>

        <h2>Huomio</h2>

        <div class="recipe-content">${recipe.Huomio
            .replaceAll(";", "<br>")}
        </div>

      </section>

      <section>

        <h2>Luokittelu</h2>

        <div>
          ${recipe.Luokka
            .replaceAll(";", "<br>")}
        </div>
        <div>
          ${recipe.Ominaisuus
            .replaceAll(";", "<br>")}
        </div>

      </section>

    </article>

  `;



}


loadRecipe();

