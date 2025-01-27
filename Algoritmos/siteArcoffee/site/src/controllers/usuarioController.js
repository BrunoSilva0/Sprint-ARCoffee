var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } 
    // else if (senha < 6) {
    //     res.status(400).send("Sua senha precisar ter no min 6 digitos!");
    // } else if (email.indexOf('@') == -1 ||
    // email.indexOf('.') == -1) {
    //     res.status(400).send("Seu email está inválido!");
    // } 
    else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoUsuario) => {
                                if (resultadoUsuario.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoUsuario
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cnpj = req.body.cnpjServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    else if (nome.length < 1) {
        res.status(400).send("Seu campo nome está vazio!");
    }
    else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
    else if(email.indexOf('@') == -1 || email.indexOf('.') == -1)  {
        res.status(400).send("Seu email está inválido!");
    }
    else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }
    else if (senha < 6) {
        res.status(400).send("Sua senha precisar ter no min 6 digitos!");
    }
    else if (cnpj == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    else if (nome.length < 1) {
        res.status(400).send("Seu campo nome está vazio!");
    }
    else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
    else if(email.indexOf('@') == -1 || email.indexOf('.') == -1)  {
        res.status(400).send("Seu email está inválido!");
    }
    else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }
    else if (senha < 6) {
        res.status(400).send("Sua senha precisar ter no min 6 digitos!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarFuncionario(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarFuncionario
}