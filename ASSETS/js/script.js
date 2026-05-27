

/* PRODUTOS */

const produtos = [

{
    id:1,
    nome:"Camisa Brasil",
    categoria:"brasil",
    preco:400,
    cor:"Azul/Preto",
    tamanho:["P","M","G","GG"],
    estoque:10,
    descricao:"Camisa premium da seleção brasileira.",
    imagem1:"ASSETS/IMAGENS/camisaBr.jpg",
    imagem2:"ASSETS/IMAGENS/modeloBr.png",
    promocao:"BRAZIL!"
},

{
    id:2,
    nome:"Camisa México",
    categoria:"mexico",
    cor:"Verde",
    tamanho:["37","38","39","40"],
    estoque:10,
    descricao:"Chuteira premium da seleção mexicana.",
    preco:370,
    imagem1:"ASSETS/IMAGENS/chuteiraM.png",
    imagem2:"ASSETS/IMAGENS/jogadorM.png",
    promocao:"MÉXICO"
},

{
    id:3,
    nome:"Bola Oficial",
    categoria:"FIFA",
    descricao:"Bola oficial da Copa 2026.",
    cor:"Variada",
    tamanho:["Único"],
    estoque:10,
    preco:380,
    imagem1:"ASSETS/IMAGENS/bola.png",
    imagem2:"ASSETS/IMAGENS/modeloBola.jpg",
    promocao:"FIFA"
},

{
    id:4,
    nome:"Boné Brasil",
    categoria:"brasil",
    preco:350,
    cor:"Verde/Amarelo",
    tamanho:["Variado"],
    estoque:10,
    descricao:"Boné premium da seleção brasileira.",
    imagem1:"ASSETS/IMAGENS/boneCb.jpg",
    imagem2:"ASSETS/IMAGENS/boneCdois.jpg",
    promocao:"BRAZIL!"
},

{
    id:5,
    nome:"Mochila México",
    categoria:"mexico",
    preco:500,
    cor:"Verde",
    tamanho:["Variado"],
    estoque:10,
    descricao:"Mochila premium da seleção mexicana.",
    imagem1:"ASSETS/IMAGENS/mochilaM.jpg",
    imagem2:"ASSETS/IMAGENS/mochilaMmodel.png",
    promocao:"MÉXICO"
},
{
    id:6,
    nome:"Chaveiro FIFA",
    categoria:"FIFA",
    preco:80,
    cor:"variada",
    tamanho:["Variado"],
    estoque:5,
    descricao:"Chaveiro premium da Copa 2026.",
    imagem1:"ASSETS/IMAGENS/chaveiro.jpg",
    imagem2:"ASSETS/IMAGENS/chaveiroM.jpg",
    promocao:"FIFA"
}



];

/* ELEMENTOS */

const catalogo = document.getElementById("catalogo");
const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");
const ordenar = document.getElementById("ordenar");
const contador = document.getElementById("contador");
const itensCarrinho = document.getElementById("itensCarrinho");
const total = document.getElementById("total");
const modal = document.getElementById("modal");

/* CARRINHO */

let carrinho = [];

/* RENDERIZAR */

function renderizar(lista){

    catalogo.innerHTML = "";

    lista.forEach(produto => {

        catalogo.innerHTML += `

        <div class="card">

            <div class="tag">
                ${produto.promocao}
            </div>

            <div class="img-box">

                <img
                    class="img-main"
                    src="${produto.imagem1}"
                    alt="${produto.nome}"
                >

                <img
                    class="img-hover"
                    src="${produto.imagem2}"
                    alt="${produto.nome}"
                >

            </div>

            <div class="info">

                <h2>${produto.nome}</h2>

                <p class="descricao">
                    ${produto.descricao}
                </p>

                <p>
                    <strong>Categoria:</strong>
                    Seleção Oficial 2026
                </p>

                <p>
                    <strong>Estoque:</strong>
                    ${produto.estoque} unidades
                </p>

                <div class="estrelas">
                    ★★★★★
                </div>

                <div class="preco-box">

                    <div class="preco">
                        R$ ${produto.preco.toFixed(2)}
                    </div>

                    <div class="preco-antigo">
                        R$ ${(produto.preco + 20).toFixed(2)}
                    </div>

                </div>

                <button
                    class="btn-comprar"
                    onclick="comprar(${produto.id})"
                >
                    Comprar
                </button>

                <div class="produto-detalhes">

                    <p>
                        <strong>Cor:</strong>
                        ${produto.cor}
                    </p>

                    <p>
                        <strong>Tamanhos:</strong>
                        ${produto.tamanho.join(" | ")}
                    </p>

                </div>

                <div class="botoes">

                    <select id="tamanho-${produto.id}">

                        ${produto.tamanho.map(t => `
                            <option value="${t}">
                                ${t}
                            </option>
                        `).join("")}

                    </select>

                </div>

            </div>

        </div>

        `;
    });
}

/* FILTRAR */

function filtrar(){

    let lista = [...produtos];

    const texto = pesquisa.value.toLowerCase();
    const cat = categoria.value;
    const ordem = ordenar.value;

    lista = lista.filter(produto =>
        produto.nome.toLowerCase().includes(texto)
    );

    if(cat !== "todos"){

        lista = lista.filter(produto =>
            produto.categoria === cat
        );
    }

    if(ordem === "menor"){

        lista.sort((a,b) => a.preco - b.preco);
    }

    if(ordem === "maior"){

        lista.sort((a,b) => b.preco - a.preco);
    }

    renderizar(lista);
}

/* COMPRAR */

function comprar(id){

    const produto = produtos.find(p => p.id === id);

    if(produto.estoque <= 0){

        alert("Produto sem estoque!");
        return;
    }

    const tamanho =
    document.getElementById(`tamanho-${id}`).value;

    const itemExistente = carrinho.find(item =>

        item.id === id &&
        item.tamanhoSelecionado === tamanho

    );

    produto.estoque--;

    if(itemExistente){

        itemExistente.quantidade++;

    } else {

        carrinho.push({

            ...produto,
            tamanhoSelecionado:tamanho,
            quantidade:1

        });
    }

    atualizarCarrinho();
    renderizar(produtos);
}

/* AUMENTAR QUANTIDADE */

function aumentarQuantidade(index){

    const item = carrinho[index];

    const produtoOriginal =
    produtos.find(p => p.id === item.id);

    if(produtoOriginal.estoque <= 0){

        alert("Estoque insuficiente!");
        return;
    }

    item.quantidade++;
    produtoOriginal.estoque--;

    atualizarCarrinho();
    renderizar(produtos);
}

/* DIMINUIR QUANTIDADE */

function diminuirQuantidade(index){

    const item = carrinho[index];

    const produtoOriginal =
    produtos.find(p => p.id === item.id);

    item.quantidade--;
    produtoOriginal.estoque++;

    if(item.quantidade <= 0){

        carrinho.splice(index,1);
    }

    atualizarCarrinho();
    renderizar(produtos);
}

/* REMOVER ITEM */

function removerItem(index){

    const item = carrinho[index];

    const produtoOriginal =
    produtos.find(p => p.id === item.id);

    produtoOriginal.estoque += item.quantidade;

    carrinho.splice(index,1);

    atualizarCarrinho();
    renderizar(produtos);
}

/* ATUALIZAR CARRINHO */

function atualizarCarrinho(){

    itensCarrinho.innerHTML = "";

    let soma = 0;
    let totalItens = 0;

    carrinho.forEach((item, index) => {

        totalItens += item.quantidade;

        soma += item.preco * item.quantidade;

        itensCarrinho.innerHTML += `

        <div class="item-carrinho">

            <div>

                <span>
                    ${item.nome}
                    (${item.tamanhoSelecionado})
                </span>

                <p>
                    R$ ${(item.preco * item.quantidade).toFixed(2)}
                </p>

            </div>

            <div class="quantidade-box">

                <button
                    class="btn-qtd"
                    onclick="diminuirQuantidade(${index})"
                >
                    -
                </button>

                <span class="qtd-num">
                    ${item.quantidade}
                </span>

                <button
                    class="btn-qtd"
                    onclick="aumentarQuantidade(${index})"
                >
                    +
                </button>

                <button
                    class="btn-remover"
                    onclick="removerItem(${index})"
                >
                    🗑️
                </button>

            </div>

        </div>

        `;
    });

    contador.innerText = totalItens;
    total.innerText = soma.toFixed(2);
}

/* MODAL */

function abrirCarrinho(){

    modal.style.display = "flex";
}

function fecharCarrinho(){

    modal.style.display = "none";
}

/* EVENTOS */

pesquisa.addEventListener("input", filtrar);

categoria.addEventListener("change", filtrar);

ordenar.addEventListener("change", filtrar);

/* INICIAR */

renderizar(produtos);

/* PAYPAL */

paypal.Buttons({

    style: {

        color: 'gold',
        shape: 'pill',
        label: 'pay'

    },

    createOrder: function(data, actions){

        return actions.order.create({

            purchase_units: [{

                amount: {

                    value: parseFloat(total.innerText).toFixed(2)

                }

            }]

        });

    },

    onApprove: function(data, actions){

        return actions.order.capture().then(function(details){

            alert(
                "Pagamento aprovado por " +
                details.payer.name.given_name
            );

        });

    }

}).render('#paypal-button-container');

