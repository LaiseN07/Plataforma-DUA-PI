/* SELEÇÃO DOS ELEMENTOS */
   

const btnContraste = document.getElementById("btn-contraste");
const btnAumentar = document.getElementById("btn-aumentar");
const btnDiminuir = document.getElementById("btn-diminuir");

const body = document.body;


   /* TAMANHO DA FONTE */

let tamanhoFonte = 16;


/* AUMENTAR TAMANHO DA FONTE */

if (btnAumentar) {

    btnAumentar.addEventListener("click", () => {

        if (tamanhoFonte < 24) {
            tamanhoFonte += 2;
            body.style.fontSize = tamanhoFonte + "px";
        }

    });

}


/* DIMINUIR TAMANHO DA FONTE */

if (btnDiminuir) {

    btnDiminuir.addEventListener("click", () => {

        if (tamanhoFonte > 12) {
            tamanhoFonte -= 2;
            body.style.fontSize = tamanhoFonte + "px";
        }

    });

}



   /* ALTO CONTRASTE */

if (btnContraste) {

    btnContraste.addEventListener("click", () => {

        body.classList.toggle("alto-contraste");

    });

}


   /* LEITURA EM VOZ ALTA
   PORTUGUÊS, MATEMÁTICA E BIOLOGIA */

document.addEventListener("DOMContentLoaded", () => {

    const botoesLeitura = document.querySelectorAll(
        ".audio-player .btn-acessar"
    );

    botoesLeitura.forEach((botao) => {

        botao.addEventListener("click", () => {

            const atividade = botao.closest(".atividade-container");

            if (!atividade) {
                return;
            }


            /*
             * Faz uma cópia da atividade.
             * Assim podemos retirar o que não queremos que seja lido.
             */

            const copia = atividade.cloneNode(true);


            /* Remove o botão de leitura */

            copia.querySelectorAll(".audio-player").forEach((elemento) => {
                elemento.remove();
            });


            /* Remove os botões de gravação */

            copia.querySelectorAll(".recursos-gravacao").forEach((elemento) => {
                elemento.remove();
            });


            /* Remove as caixas de resposta */

            copia.querySelectorAll(".campo-resposta").forEach((elemento) => {
                elemento.remove();
            });


            /* Remove campos de lacunas */

            copia.querySelectorAll(".campo-resposta-lacuna").forEach((elemento) => {
                elemento.remove();
            });


            /* Remove imagens */

            copia.querySelectorAll("img").forEach((elemento) => {
                elemento.remove();
            });


            /* Pega o texto que restou */

            const texto = copia.innerText.trim();


            if (!texto) {
                return;
            }


            /* Cria a fala */

            const fala = new SpeechSynthesisUtterance(texto);

            fala.lang = "pt-BR";
            fala.rate = 0.9;
            fala.pitch = 1;


            /* Para qualquer leitura anterior */

            window.speechSynthesis.cancel();


            /* Começa a leitura */

            window.speechSynthesis.speak(fala);

        });

    });


    
       /* GRAVAR RESPOSTA EM ÁUDIO
       TRANSFORMA A FALA EM TEXTO */

    const botoesGravar = document.querySelectorAll(".btn-gravar");


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    /* Verifica se o navegador possui reconhecimento de voz */

    if (!SpeechRecognition) {

        botoesGravar.forEach((botao) => {

            botao.addEventListener("click", () => {

                alert(
                    "Seu navegador não oferece suporte ao reconhecimento de voz."
                );

            });

        });

    } else {


        /* Cria o funcionamento para cada botão */

        botoesGravar.forEach((botao) => {

            let reconhecimento = null;
            let gravando = false;


            botao.addEventListener("click", () => {

                const atividade =
                    botao.closest(".atividade-container");


                if (!atividade) {
                    return;
                }


                /* Procura a caixa de resposta daquela questão */

                const caixaResposta =
                    atividade.querySelector("textarea");


                if (!caixaResposta) {

                    alert(
                        "Não foi encontrada uma caixa de resposta."
                    );

                    return;
                }


                /* PARAR RECONHECIMENTO */

                if (gravando) {

                    reconhecimento.stop();

                    gravando = false;

                    botao.textContent =
                        "🎙️ Gravar Resposta em Áudio";

                    return;
                }


                /* CRIA O RECONHECIMENTO */

                reconhecimento = new SpeechRecognition();

                reconhecimento.lang = "pt-BR";

                reconhecimento.continuous = true;

                reconhecimento.interimResults = false;


                /* COMEÇOU A ESCUTAR */

                reconhecimento.onstart = () => {

                    gravando = true;

                    botao.textContent =
                        "⏹️ Parar Gravação";

                };


                /* TEXTO RECONHECIDO */

                reconhecimento.onresult = (evento) => {

                    let textoFalado = "";


                    for (
                        let i = evento.resultIndex;
                        i < evento.results.length;
                        i++
                    ) {

                        if (evento.results[i].isFinal) {

                            textoFalado +=
                                evento.results[i][0].transcript;

                        }

                    }


                    /* Coloca o texto na caixa */

                    if (textoFalado.trim() !== "") {

                        if (caixaResposta.value.trim() !== "") {
                            caixaResposta.value += " ";
                        }

                        caixaResposta.value +=
                            textoFalado.trim();

                    }

                };


                /* TERMINOU */

                reconhecimento.onend = () => {

                    gravando = false;

                    botao.textContent =
                        "🎙️ Gravar Resposta em Áudio";

                };


                /* ERRO */

                reconhecimento.onerror = (evento) => {

                    console.log(
                        "Erro no reconhecimento de voz:",
                        evento.error
                    );

                    gravando = false;

                    botao.textContent =
                        "🎙️ Gravar Resposta em Áudio";


                    if (evento.error === "not-allowed") {

                        alert(
                            "Permita o acesso ao microfone para utilizar a resposta por voz."
                        );

                    }

                };


                /* COMEÇA A ESCUTAR */

                reconhecimento.start();

            });

        });

    }

});
/* tela de login */
function autenticarUsuario(event) {
    event.preventDefault(); // Evita o recarregamento padrão da página
    
    const usuario = document.getElementById('usuario').value;

    if (usuario) {
        // Redireciona para a página principal com a seleção de disciplinas
        window.location.href = 'TelaPrincipal.html';
    }
}
function sairDaPlataforma() {
    // Redireciona o usuário de volta para a tela de login
    window.location.href = 'index.html';
}

// 1. Cole suas credenciais obtidas no Passo 2
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// 2. Inicializa o Firebase e o banco Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Controle da seleção de perfil (Aluno / Professor)
let perfilSelecionado = "aluno"; // padrão

const btnsPerfil = document.querySelectorAll(".btn-perfil");
btnsPerfil.forEach(btn => {
  btn.addEventListener("click", () => {
    btnsPerfil.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    perfilSelecionado = btn.getAttribute("data-perfil");
  });
});

// 4. Capturar o envio do formulário e salvar no Firestore
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Impede a página de recarregar

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Gravar no Firestore dentro da coleção "usuarios"
  db.collection("usuarios").add({
    usuario: username,
    senha: password, // Em sistemas reais, senhas devem ser criptografadas via Firebase Auth
    perfil: perfilSelecionado,
    dataAcesso: new Date()
  })
  .then(() => {
    alert("Dados gravados com sucesso no Firebase!");
    window.location.href = "TelaPricipal.html"; // Redireciona para a página interna
  })
  .catch((error) => {
    console.error("Erro ao gravar dados: ", error);
    alert("Ocorreu um erro ao salvar as informações.");
  });
});