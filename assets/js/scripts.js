// ========== IMPORTS ==========
import { animate, stagger } from 'https://esm.sh/motion@11';
import SplitType from 'https://esm.sh/split-type';

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM carregado e scripts.js (module) ativo!");

  // ====== ABOUT (GitHub) ======
  const aboutSection = document.querySelector('#about');
  const formulario   = document.querySelector("#formulario");
  const btnEnviar    = document.getElementById("btnEnviar");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const somenteLetrasRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

  async function getApiGithub() {
    if (!aboutSection) return;
    try {
      const dadosPerfil = await fetch('https://api.github.com/users/LemesdeMorais');
      if (!dadosPerfil.ok) throw new Error(`HTTP ${dadosPerfil.status}`);
      const perfil = await dadosPerfil.json();

      aboutSection.innerHTML = `
        <figure class="about_image">
          <img src="${perfil.avatar_url}" alt="Foto do perfil do GitHub - ${perfil.name ?? 'Usuário'}">
        </figure>

        <article class="about_content">
          <h2>Sobre Mim</h2>
          <p>Sou Rafaela Lemes, uma desenvolvedora Full Stack apaixonada por tecnologia...</p>

          <div class="about_stats">
            <a href="${perfil.html_url}" target="_blank" rel="noopener" class="botao">Ver GitHub</a>
            <div class="stat-item">
              <p class="stat-numer">${perfil.followers}</p>
              <p class="stat-label">Seguidores</p>
            </div>
            <div class="stat-item">
              <p class="stat-numer">${perfil.public_repos}</p>
              <p class="stat-label">Repositórios</p>
            </div>
          </div>
        </article>
      `;
    } catch (error) {
      console.error('Erro ao buscar dados do GitHub:', error);
    }
  }

  function validarEEnviar() {
    const campoNome   = document.querySelector('#nome');
    const txtNome     = document.querySelector('#txtNome');
    const campoEmail  = document.querySelector('#email');
    const txtEmail    = document.querySelector('#txtEmail');
    const campoAssunto = document.querySelector('#assunto');
    const txtAssunto   = document.querySelector('#txtAssunto');

    if (campoNome && txtNome) {
      if (campoNome.value.trim().length < 3 || !somenteLetrasRegex.test(campoNome.value.trim())) {
        txtNome.textContent = 'Nome inválido!';
        txtNome.style.color = 'red';
        campoNome.style.borderColor = 'red';
        campoNome.focus();
        return;
      } else {
        txtNome.textContent = 'Nome válido!';
        txtNome.style.color = 'green';
        campoNome.style.borderColor = 'green';
      }
    }

    if (campoEmail && txtEmail) {
      if (!emailRegex.test(campoEmail.value.trim())) {
        txtEmail.textContent = 'Digite um e-mail válido!';
        txtEmail.style.color = 'red';
        campoEmail.style.borderColor = 'red';
        campoEmail.focus();
        return;
      } else {
        txtEmail.textContent = 'E-mail válido!';
        txtEmail.style.color = 'green';
        campoEmail.style.borderColor = 'green';
      }
    }

    if (campoAssunto && txtAssunto) {
      if (campoAssunto.value.trim().length < 5) {
        txtAssunto.textContent = 'O assunto deve ter no mínimo 5 caracteres!';
        txtAssunto.style.color = 'red';
        campoAssunto.style.borderColor = 'red';
        campoAssunto.focus();
        return;
      } else {
        txtAssunto.textContent = '';
        txtAssunto.style.color = 'green';
        campoAssunto.style.borderColor = 'green';
      }
    }

    if (formulario) formulario.submit();
  }

  if (btnEnviar) {
    btnEnviar.addEventListener('click', (e) => {
      e.preventDefault();
      validarEEnviar();
    });
  }

  getApiGithub();

  // ====== ANIMAÇÃO DO H1 DO HERO (Motion One + SplitType) ======
  const heroTitle = document.querySelector('#hero h1');
  if (heroTitle) {
    const split = new SplitType(heroTitle, { types: 'chars' });
    // garante inline-block para transformar cada char
    split.chars.forEach(el => (el.style.display = 'inline-block'));

    animate(
      split.chars,
      {
        y: ['-2.75rem', 0],
        rotate: ['-1turn', '0turn']
      },
      {
        duration: 1.4,
        easing: 'ease-in-out',
        delay: stagger(0.05),
        repeat: 0,
        repeatDelay: 1
      }
    );
  }
});
