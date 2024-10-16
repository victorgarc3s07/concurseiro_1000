//------------------------------------------
const API_URL = 'http://localhost:5000/api'

//-----Função de logar usuário 
async function login(email, senha) {
    try {
        console.log('Dados enviados:', {email, senha});

        const response = await fetch(`${API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({email, senha})
            }
        );

        const result = await response.json();

        console.log('Resposta enviada: ', result);
        return result;
    }
    catch(error) {
        console.error("ERRO! api/auth/login", error);

        return {success: false}
    }
};

//------Função para registrar usuario---------
async function registrar(nome_usuario, email, senha, preferencias) {
    try {
        console.log('Dados enviados:', {nome_usuario,email,senha,preferencias});
        //
        const response = await fetch(`${API_URL}/auth/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({nome_usuario, email, senha, preferencias})
        });
        
        if(!response.ok) {
            throw new Error('Falha na requisição. Códigode status: '+ response.status);
    
        }
        //
        const result = await response.text();

        console.log('Resposta do servidor ao registro: ', result);

        //
        return{success:true, message:result}
    }
    //
    catch(error) {
        console.error('ERRO AO REGISTRAR:', error.message);

    return{success:false, message: error.message};
    }
}

//-------Função de visualizar disciplinas--------

async function VisualizarDisciplinas() {
    const response = await fetch(`${API_URL}/router`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    ) 
    return response.json();
}

//-----função para adicionar disciplina
async function AddDisciplina(disciplina) {
    try {
        const response = await fetch(`${API_URL}/router`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(disciplina)
            })
    return response.ok ? {success:true} : {success:false};
    }
    catch(error) {
        console.error("ERRO. Disciplina não adicionada", error.message);

    return {success: false};
    }
}



