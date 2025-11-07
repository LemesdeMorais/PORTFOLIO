document.addEventListener("DOMContentLoaded", () => {

    const aboutSection = document.querySelector('#about');

    //Selecionar formulário
    const formulario = document.querySelector("#formulario");
    const btnEnviar = document.getElementById("btnEnviar");

    // expressão regular para validar email, a escrita e não se ele existe
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const somenteLetrasRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;


    // Busca dados do github
    async function getApiGithub() {
        try {
            const dadosPerfil = await fetch('https://api.github.com/users/LemesdeMorais');
            const perfil = await dadosPerfil.json();

            const conteudo = `
              <figure class="about_image">
                  <img src="${perfil.avatar_url}" alt="Foto do perfil do GitHub - ${perfil.name}">
              </figure>

              <article class="about_content">
                  <h2>Sobre Mim</h2>
                  <p>Sou Rafaela Lemes, uma desenvolvedora Full Stack apaixonada por tecnologia e inovação...</p>

                  <div class="about_stats">
                      <a href="${perfil.html_url}" target="_blank" class="botao">Ver GitHub</a>
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

            aboutSection.innerHTML = conteudo;

        } catch (error) {
            console.error('Erro ao buscar dados do GitHub:', error);
        }
    }

    // Função de envio e validação do formulário
    function validarEEnviar() {
        // Nome
        const campoNome = document.querySelector('#nome');
        const txtNome = document.querySelector('#txtNome');

        if (campoNome.value.trim().length < 3) {
            txtNome.textContent = 'Nome inválido! Deve ter no mínimo 3 caracteres.';
            txtNome.style.color = 'red';
            campoNome.style.borderColor = 'red';
            campoNome.focus();
            return;
        } else if (!somenteLetrasRegex.test(campoNome.value)) {
            txtNome.textContent = 'Nome inválido! Use apenas letras.';
            txtNome.style.color = 'red';
            campoNome.style.borderColor = 'red';
            campoNome.focus();
            return;
        } else {
            txtNome.textContent = 'Nome válido!';
            txtNome.style.color = 'green';
            campoNome.style.borderColor = 'green';
        }

        // Email
        const campoEmail = document.querySelector('#email');
        const txtEmail = document.querySelector('#txtEmail');

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

        // Assunto
        const campoAssunto = document.querySelector('#assunto');
        const txtAssunto = document.querySelector('#txtAssunto');

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

        // 🔒 Blindagem anti-#hero: envia direto, sem submit automático do navegador
        formulario.submit();
    }

    // Clique do botão: impede qualquer listener global de âncora e chama validação+envio
    btnEnviar.addEventListener('click', (e) => {
        e.stopPropagation(); // bloqueia algum handler pai de capturar o clique
        validarEEnviar();
    }, true);


    // chama a função getAPIGithub
    getApiGithub();

});
