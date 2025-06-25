
console.log(document.querySelector('input-nome'));
console.log(document.querySelector('input-email'));
console.log(document.querySelector('input-senha'));
console.log(document.querySelector('input-cpf'));


const nome = document.querySelector('.input-nome').value;
const email = document.querySelector('.input-email').value;
const senha = document.querySelector('.input-senha').value;
const cpf = document.querySelector('.input-cpf').value;


let options = {

    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf
    })
   
};

try{
    const response = await fetch("http://localhost:8080/api/pessoa/{login}", options);
    if (!response.ok) {
        throw new error(`Erro na requisição: ${response.statusText}`)
    }
    const Pessoa = await response.json();

    if(Pessoa.id_Pessoa > 0){
        window.alert('Cadastro realizado com sucesso.');
        window.location.href = 'Login.jsx';
    }else{
        mostrarErro('Login ou email já cadastrados no sistema');
    }

} catch (error) {
    console.error('erro na requisição:', error);
    mostrarErro('Ocorreu um erro ao processar a requisição');
}