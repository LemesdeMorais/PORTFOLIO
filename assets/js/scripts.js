document.addEventListener("DOMContentLoaded", () => {

  const aboutSection = document.querySelector('#about');

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

  getApiGithub();

});
