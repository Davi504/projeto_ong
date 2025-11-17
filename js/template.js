// /js/templates.js
// Templates e renderização dinâmica de projetos.
// Inclui exemplo de fonte de dados em "localStorage" com fallback para dados default.

const DEFAULT_PROJETOS = [
  {
    titulo: "Projeto Educação para Todos",
    descricao: "Aulas de reforço escolar e oficinas culturais para crianças em situação de vulnerabilidade.",
    tags: ["educação", "cultura"]
  },
  {
    titulo: "Projeto Alimenta Esperança",
    descricao: "Distribuição de cestas básicas e refeições para famílias em situação de insegurança alimentar.",
    tags: ["solidariedade", "alimentação"]
  }
];

// Obtém projetos do localStorage ou fallback
function getProjetos() {
  try {
    const raw = localStorage.getItem("projetos");
    if (!raw) return DEFAULT_PROJETOS;
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) return DEFAULT_PROJETOS;
    return list;
  } catch {
    return DEFAULT_PROJETOS;
  }
}

// Salva projetos (opcional para expansão futura)
function saveProjetos(lista) {
  localStorage.setItem("projetos", JSON.stringify(lista));
}

// Gera HTML de um card
function projetoCardTemplate(p) {
  const tags = Array.isArray(p.tags)
    ? p.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join(" ")
    : "";
  return `
    <article class="card projeto-card">
      <header>
        <h3 class="card-title">${escapeHTML(p.titulo)}</h3>
      </header>
      <p class="card-desc">${escapeHTML(p.descricao)}</p>
      <footer class="card-tags">${tags}</footer>
    </article>
  `;
}

// Renderiza lista de projetos no container com id="projetos"
function renderProjetos() {
  const container = document.getElementById("projetos");
  if (!container) return;
  const projetos = getProjetos();

  if (projetos.length === 0) {
    container.innerHTML = `<p>Nenhum projeto cadastrado ainda.</p>`;
    return;
  }

  container.innerHTML = projetos.map(projetoCardTemplate).join("");
}

// Utilitário simples para evitar HTML injection
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}