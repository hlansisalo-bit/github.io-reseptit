import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
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
  getAuth(app);


document
  .getElementById("login-form")
  .addEventListener("submit",
    async function(e) {

      e.preventDefault();

      const email =
        document
          .getElementById("email")
          .value;

      const password =
        document
          .getElementById("password")
          .value;

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const params =
  new URLSearchParams(
    window.location.search
  );

const redirect =
  params.get("redirect");
  
        window.location =
          redirect || "index.html";

      }
      catch(err) {

        alert(
          "Kirjautuminen epäonnistui"
        );

      }

    });