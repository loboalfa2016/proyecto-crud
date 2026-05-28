import { navigateTo } from "../router/router";

export const dashboardPage = (app) => {
  app.innerHTML = `
    <div>
      <h1>Dashboard</h1>

      <button id="adminBtn">
        Admin
      </button>
    </div>
  `;

  document
    .querySelector("#adminBtn")
    .addEventListener("click", () => {
      navigateTo("/admin");
    });
};