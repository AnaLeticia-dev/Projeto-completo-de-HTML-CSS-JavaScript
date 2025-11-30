let participantes = [
    {
    nome:"Mayk Brito",
    email:"mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "Ana Oliveira",
        email: "ana.oliveira@gmail.com",
        dataInscricao: new Date(2024, 3, 10, 14, 30),
        dataCheckIn: new Date(2024, 3, 12, 9, 15)
    },
    {
        nome: "Lucas Ferreira",
        email: "lucas.ferreira@gmail.com",
        dataInscricao: new Date(2024, 1, 5, 16, 45),
        dataCheckIn: null
    },
    {
        nome: "Mariana Costa",
        email: "mariana.costa@gmail.com",
        dataInscricao: new Date(2024, 5, 22, 11, 10),
        dataCheckIn: new Date(2024, 5, 25, 8, 50)
    },
    {
        nome: "Rafael Martins",
        email: "rafael.martins@gmail.com",
        dataInscricao: new Date(2024, 7, 1, 9, 20),
        dataCheckIn: new Date(2024, 7, 3, 13, 40)
    },
    {
        nome: "Carolina Mendes",
        email: "carolina.mendes@gmail.com",
        dataInscricao: new Date(2024, 0, 15, 8, 55),
        dataCheckIn: null
    },
    {
        nome: "Diego Andrade",
        email: "diego.andrade@gmail.com",
        dataInscricao: new Date(2024, 4, 3, 17, 30),
        dataCheckIn: new Date(2024, 4, 6, 12, 10)
    },
    {
        nome: "Letícia Ramos",
        email: "leticia.ramos@gmail.com",
        dataInscricao: new Date(2024, 8, 27, 15, 45),
        dataCheckIn: new Date(2024, 8, 29, 9, 0)
    },
    {
        nome: "Bruno Silva",
        email: "bruno.silva@gmail.com",
        dataInscricao: new Date(2024, 9, 9, 20, 0),
        dataCheckIn: new Date(2024, 9, 12, 14, 20)
    },
    {
        nome: "Fernanda Almeida",
        email: "fernanda.almeida@gmail.com",
        dataInscricao: new Date(2024, 6, 14, 7, 25),
        dataCheckIn: null
    },
    {
        nome: "Paulo Henrique",
        email: "paulo.henrique@gmail.com",
        dataInscricao: new Date(2024, 10, 5, 18, 10),
        dataCheckIn: new Date(2024, 10, 7, 11, 30)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn==null){
        dataCheckIn=`
        <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)">
        Confirmar check-in
        </button>
        `
    }

    return `
                <tr>
                <td>
                    <strong>${participante.nome}</strong>
                    <br>
                    <small>${participante.email}</small>
                </td>
                <td>${dataInscricao}</td>
                <td>${dataCheckIn}</td>
            </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const participante = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        dataInscricao:new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(
        (p) => p.email == participante.email  
    )

    if(participanteExiste){
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""    
}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
   
    if (confirm(mensagemConfirmacao) == false){
        return
    }
  
    const participante = participantes.find((p) => p.email == event.target.dataset.email)
         
    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}

