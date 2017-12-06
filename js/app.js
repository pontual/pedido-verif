function parsePreco(p) {
  if (typeof p == "string") {
    return parseFloat(p.replace(",", ".")).toFixed(4);
  } else {
    return 0;
  }
}

var clientesPapa = Papa.parse(clientesCSV, {
  dynamicTyping: true
});

// var produtosPapa = Papa.parse(produtosCSV, {
//   dynamicTyping: true
// });

var produtosPapa = Papa.parse(produtosCSV);


var clientes = {};

var produtos = {};

clientesPapa.data.forEach(function(cliente) {
  if (cliente.length > 1) {
    clientes[cliente[0].toString()] = {
      nome: cliente[1],
      cnpj: cliente[2],
      prazo: cliente[3],
      desconto: cliente[4],
      vendedor: cliente[5],
      obs: cliente[6],
    };
  }
});

produtosPapa.data.forEach(function(produto) {
  if (produto.length > 1) {
    produtos[produto[0].toString()] = {
      nome: produto[2],
      preco: parsePreco(produto[8]),
      // preco: produto[8],
    }
  }
});

function changeFavicon(src) {
  var link = document.createElement('link'),
  oldLink = document.getElementById('dynamic-favicon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}

changeFavicon("mauriliofavicong.ico");
