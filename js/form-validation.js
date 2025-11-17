// /js/form-validation.js
// Validação avançada com feedback em tempo real (e-mail, CPF, CEP).
// Inclui estilo de erro via classes e mensagens abaixo dos campos.

function setupFormValidation() {
  const form = document.getElementById("formCadastro");
  if (!form) return;

  const fields = {
    nome: form.querySelector("#nome"),
    email: form.querySelector("#email"),
    cpf: form.querySelector("#cpf"),
    cep: form.querySelector("#cep"),
  };

  // Feedback em tempo real
  Object.values(fields).forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allValid = Object.values(fields).every((input) => validateField(input));
    if (!allValid) return;

    // Exemplo de persistência básica
    const payload = {
      nome: fields.nome?.value.trim(),
      email: fields.email?.value.trim(),
      cpf: sanitizeDigits(fields.cpf?.value),
      cep: sanitizeDigits(fields.cep?.value),
    };
    localStorage.setItem("cadastroUsuario", JSON.stringify(payload));

    showFormSuccess(form, "Cadastro realizado com sucesso!");
    form.reset();
    clearErrors(form);
  });
}

// Valida um campo individual
function validateField(input) {
  if (!input) return true;

  const id = input.id;
  const value = input.value.trim();
  let ok = true;
  let message = "";

  if (id === "nome") {
    ok = value.length >= 3;
    message = ok ? "" : "Informe pelo menos 3 caracteres.";
  }

  if (id === "email") {
    ok = validarEmail(value);
    message = ok ? "" : "E-mail no formato válido (ex.: nome@dominio.com).";
  }

  if (id === "cpf") {
    const cpf = sanitizeDigits(value);
    ok = validarCPF(cpf);
    message = ok ? "" : "CPF inválido. Verifique dígitos e formato.";
    // Formatação visual: 000.000.000-00
    input.value = formatCPF(cpf);
  }

  if (id === "cep") {
    const cep = sanitizeDigits(value);
    ok = validarCEP(cep);
    message = ok ? "" : "CEP deve possuir 8 dígitos numéricos.";
    // Formatação visual: 00000-000
    input.value = formatCEP(cep);
  }

  setFieldState(input, ok, message);
  return ok;
}

// Regras de validação

function validarEmail(email) {
  // Regex enxuta que cobre casos comuns
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

function validarCEP(cep) {
  return /^\d{8}$/.test(cep);
}

// Validação completa de CPF com cálculo de dígitos verificadores
function validarCPF(cpf) {
  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false; // rejeita sequências (111... etc.)

  const calcDV = (base, factor) => {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i], 10) * (factor - i);
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const dv1 = calcDV(cpf.slice(0, 9), 10);
  if (dv1 !== parseInt(cpf[9], 10)) return false;

  const dv2 = calcDV(cpf.slice(0, 10), 11);
  if (dv2 !== parseInt(cpf[10], 10)) return false;

  return true;
}

// Feedback visual

function setFieldState(input, ok, message) {
  const fieldWrapper = input.closest(".field") || input.parentElement;
  if (!fieldWrapper) return;

  let msgEl = fieldWrapper.querySelector(".field-error");
  if (!msgEl) {
    msgEl = document.createElement("div");
    msgEl.className = "field-error";
    fieldWrapper.appendChild(msgEl);
  }

  if (ok) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    msgEl.textContent = "";
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    msgEl.textContent = message;
  }
}

function showFormSuccess(form, text) {
  let box = form.querySelector(".form-success");
  if (!box) {
    box = document.createElement("div");
    box.className = "form-success";
    form.prepend(box);
  }
  box.textContent = text;
  setTimeout(() => {
    box.textContent = "";
  }, 3500);
}

function clearErrors(form) {
  form.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
  form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  form.querySelectorAll(".is-valid").forEach((el) => el.classList.remove("is-valid"));
}

// Utilitários

function sanitizeDigits(str = "") {
  return String(str).replace(/\D/g, "");
}

function formatCPF(cpf) {
  const c = sanitizeDigits(cpf).slice(0, 11);
  const parts = [];
  if (c.length > 0) parts.push(c.slice(0, 3));
  if (c.length > 3) parts.push(c.slice(3, 6));
  if (c.length > 6) parts.push(c.slice(6, 9));
  let formatted = parts.join(".");
  if (c.length > 9) formatted += "-" + c.slice(9, 11);
  return formatted;
}

function formatCEP(cep) {
  const c = sanitizeDigits(cep).slice(0, 8);
  if (c.length <= 5) return c;
  return `${c.slice(0, 5)}-${c.slice(5)}`;
}