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
// 1. Sua configuração real do Firebase (MANTIDA INTACTA)
const firebaseConfig = {
  apiKey: "AIzaSyAhSU2t_nrRF4IZY4NHTApK6JEu0pR0Ax4",
  authDomain: "plataforma-dua-pi.firebaseapp.com",
  projectId: "plataforma-dua-pi",
  storageBucket: "plataforma-dua-pi.firebasestorage.app",
  messagingSenderId: "557324288654",
  appId: "1:557324288654:web:74adbb9b20e952bcb97fdf"
};

// Inicializa o Firebase apenas se ainda não foi inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 2. Controle da seleção de perfil (Aluno / Professor)
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

// 3. Validação e Autocadastro no Firestore
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede a página de recarregar

        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        const username = usernameInput ? usernameInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";

        if (!username || !password) {
            alert("Por favor, preencha o usuário e a senha.");
            return;
        }

        // Busca se o nome de usuário já existe na coleção
        db.collection("usuarios")
            .where("usuario", "==", username)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // USUÁRIO JÁ EXISTE: verificar se a senha está correta
                    let senhaCorreta = false;
                    
                    querySnapshot.forEach((doc) => {
                        if (doc.data().senha === password) {
                            senhaCorreta = true;
                        }
                    });

                    if (senhaCorreta) {
                        alert("Login realizado com sucesso!");
                        window.location.href = "TelaPrincipal.html";
                    } else {
                        alert("Senha incorreta para este usuário!");
                    }
                } else {
                    // USUÁRIO NOVO: cadastrar automaticamente no Firestore
                    db.collection("usuarios").add({
                        usuario: username,
                        senha: password,
                        perfil: perfilSelecionado,
                        dataCadastro: new Date()
                    })
                    .then(() => {
                        alert("Novo usuário cadastrado com sucesso! Bem-vindo(a).");
                        window.location.href = "TelaPrincipal.html";
                    })
                    .catch((error) => {
                        console.error("Erro ao cadastrar novo usuário:", error);
                        alert("Erro ao cadastrar usuário. Tente novamente.");
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao consultar usuário:", error);
                alert("Erro ao conectar ao banco de dados. Tente novamente.");
            });
    });
}

function sairDaPlataforma() {
    window.location.href = "index.html";
}