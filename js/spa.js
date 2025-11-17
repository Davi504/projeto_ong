// /js/spa.js
// Router SPA simples com hash e data-link

const routes = {
  "#/index": "html/index.html",
  "#/projetos": "html/projetos.html",
  "#/cadastro": "html/cadastro.html",
};

function loadPage(path) {
  const url = routes[path] || routes["#/index"];
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ao carregar: ${url}`);
      return res.text();
    })
    .then(html => {
      const app = document.getElementById("app");
      app.innerHTML = html;
      highlightActiveLink(path);
      initPageScripts(path);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("app").innerHTML =
        `<section class="error"><h2>Ops!</h2><p>Não foi possível carregar esta página.</p></section>`;
    });
}

function setupLinkInterception() {
  document.addEventListener("click", e => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;
    e.preventDefault();
    const hash = link.getAttribute("href");
    window.location.hash = hash;
    loadPage(hash);
  });
}

function initPageScripts(path) {
  if (path === "#/projetos" && typeof renderProjetos === "function") {
    renderProjetos();
  }
  if (path === "#/cadastro" && typeof setupFormValidation === "function") {
    setupFormValidation();
  }
}

function highlightActiveLink(path) {
  const normalizedPath = path.replace(/\/$/, "");
  document.querySelectorAll("nav a[data-link]").forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href").replace(/\/$/, "");
    if (href === normalizedPath) {
      link.classList.add("active");
    }
  });
}

function initApp() {
  setupLinkInterception();
  const start = window.location.hash || "#/index";
  loadPage(start);
}

document.addEventListener("DOMContentLoaded", initApp);