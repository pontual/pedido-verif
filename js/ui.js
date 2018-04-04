var priceCheckCod = document.getElementById("priceCheckCod");
var priceCheckPc = document.getElementById("priceCheckPc");

var priceCheckSix = document.getElementById("six");
var priceCheckSeven = document.getElementById("seven");
var priceCheckEight = document.getElementById("eight");

function clearPrices() {
  priceCheckSix.innerText = "--";
  priceCheckSeven.innerText = "--";
  priceCheckEight.innerText = "--";
  priceCheckName.innerText = "--";
}

function checkPrice() {
  priceCheckCod.value = priceCheckCod.value.toUpperCase();
  var produto = produtos[priceCheckCod.value];
  if (produto) {
    var preco = produto.preco;
    var qtdeParsed = parseInt(priceCheckPc.value);
    if (!isNaN(qtdeParsed)) {
      var timesThree = qtdeParsed * produtos[priceCheckCod.value].preco * 3.0;
      priceCheckSix.innerText = (timesThree * 0.94).toFixed(4);
      priceCheckSeven.innerText = (timesThree * 0.93).toFixed(4);
      priceCheckEight.innerText = (timesThree * 0.92).toFixed(4);

      priceCheckName.innerText = produtos[priceCheckCod.value].nome;
    }
    else {
      clearPrices();
    }
  } else {
    clearPrices();
  }
}

function resetPriceForm() {
  clearPrices();
  priceCheckCod.value = "";
  priceCheckPc.value = "1";
  
  priceCheckCod.focus();
}
  
clearPrices();

var codCli = document.getElementById("codCli");
var cnpj = document.getElementById("cnpj");
var data = document.getElementById("data");
var razaoSoc = document.getElementById("razaoSoc");
var codCliRepeat = document.getElementById("codCliRepeat");
var cond = document.getElementById("cond");
var vendd = document.getElementById("vendd");
var obs = document.getElementById("obs");
var descRepeat = document.getElementById("descRepeat");
var descRepeat2 = document.getElementById("descRepeat2");
var total = document.getElementById("total");

function clearCliData() {
  cnpj.innerText = "";
  data.innerText = "";
  razaoSoc.innerText = "";
  codCliRepeat.innerText = "";
  cond.innerText = "";
  vendd.innerText = "";
  descRepeat.innerText = "";
  descRepeat2.innerText = "";
  obs.innerText = "";
}

function resetCliData() {
  resetTable();
  byCnpj.value = 0;
  byName.value = 0;
  clienteRepeat.innerText = "";
  codCli.value = "";
  codCli.focus();
  clearCliData();
}

var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var q4 = document.getElementById("q4");
var q5 = document.getElementById("q5");
var q6 = document.getElementById("q6");
var q7 = document.getElementById("q7");

var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var c4 = document.getElementById("c4");
var c5 = document.getElementById("c5");
var c6 = document.getElementById("c6");
var c7 = document.getElementById("c7");

var t1 = document.getElementById("t1");
var t2 = document.getElementById("t2");
var t3 = document.getElementById("t3");
var t4 = document.getElementById("t4");
var t5 = document.getElementById("t5");
var t6 = document.getElementById("t6");
var t7 = document.getElementById("t7");

var u1 = document.getElementById("u1");
var u2 = document.getElementById("u2");
var u3 = document.getElementById("u3");
var u4 = document.getElementById("u4");
var u5 = document.getElementById("u5");
var u6 = document.getElementById("u6");
var u7 = document.getElementById("u7");

var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");
var d5 = document.getElementById("d5");
var d6 = document.getElementById("d6");
var d7 = document.getElementById("d7");

var n1 = document.getElementById("n1");
var n2 = document.getElementById("n2");
var n3 = document.getElementById("n3");
var n4 = document.getElementById("n4");
var n5 = document.getElementById("n5");
var n6 = document.getElementById("n6");
var n7 = document.getElementById("n7");

var rows = [];

rows.push({ q: q1, c: c1, t: t1, u: u1, d: d1, n: n1 });
rows.push({ q: q2, c: c2, t: t2, u: u2, d: d2, n: n2 });
rows.push({ q: q3, c: c3, t: t3, u: u3, d: d3, n: n3 });
rows.push({ q: q4, c: c4, t: t4, u: u4, d: d4, n: n4 });
rows.push({ q: q5, c: c5, t: t5, u: u5, d: d5, n: n5 });
rows.push({ q: q6, c: c6, t: t6, u: u6, d: d6, n: n6 });
rows.push({ q: q7, c: c7, t: t7, u: u7, d: d7, n: n7 });

function processPedido() {
  var cliente = clientes[codCli.value];
  if (cliente) {
    var dateNow = new Date();
    cnpj.innerText = cliente.cnpj;
    data.innerText = "Data: " + dateNow.getDate() + "/" + (dateNow.getMonth()+1) + "/" + (dateNow.getYear()-100);
    razaoSoc.innerText = cliente.nome;
    codCliRepeat.innerText = codCli.value;
    cond.innerText = cliente.prazo + " " + " -" + cliente.desconto + "%";
    vendd.innerText = cliente.vendedor;
    obs.innerText = cliente.obs;

    descRepeat.innerText = "-" + cliente.desconto + "%";
    descRepeat2.innerText = "(" + cliente.desconto + "%)";
    var cliPriceFactor = 3.0 * (1 - (cliente.desconto / 100));
    var grandTotal = 0.0;

    rows.forEach(function(row) {
      row.c.value = row.c.value.toUpperCase();
      var rowProduto = produtos[row.c.value];
      var rowQtde = parseInt(row.q.value);
      if (!isNaN(rowQtde) && rowProduto) {
        var rowPreco = rowProduto.preco;
        var descPreco = (cliPriceFactor * rowPreco * rowQtde).toFixed(4);
        row.t.innerText = parseFloat(rowPreco).toFixed(2);
        row.u.innerText = (cliPriceFactor * parseFloat(rowPreco)).toFixed(4);
        row.d.innerText = descPreco;
        row.n.innerText = rowProduto.nome;
        grandTotal += parseFloat(descPreco);
      } else {
        row.t.innerText = "";
        row.u.innerText = "";
        row.d.innerText = "";
        row.n.innerText = "";
      }
    });

    total.innerText = grandTotal.toFixed(4);
  } else {
    clearCliData();
  }
}

var byCnpj = document.getElementById("byCnpj");

function populateCnpj() {
  var clientesArr = [];
  for (var id in clientes) {
    clientesArr.push({ id: id,
                       cnpj: clientes[id].cnpj,
                       nome: clientes[id].nome,
                     });
  }

  clientesArr.sort(function(a, b) { return a.cnpj > b.cnpj ? 1 : -1; });

  clientesArr.forEach(function(cliente) {
    byCnpj.options[byCnpj.options.length] = new Option(cliente.cnpj + " " + cliente.nome + " (" + cliente.id + ")", cliente.id);
  });
}

function fillByCnpj() {
  var selectedCnpj = byCnpj.options[byCnpj.selectedIndex].value;
  codCli.value = selectedCnpj;
  byName.value = selectedCnpj;
  clienteRepeat.innerText = clientes[selectedCnpj].nome + " [" + selectedCnpj + "]";
  resetTable();
  q1.value = "1";
  c1.value = "";
  // c1.focus();
  document.getElementById("autoParse").value = "";
  document.getElementById("autoParseCalc").value = "";
  document.getElementById("autoParse").focus();
  processPedido();
}

populateCnpj();


var byName = document.getElementById("byName");

function populateName() {
  var clientesArr = [];
  for (var id in clientes) {
    clientesArr.push({ id: id,
                       cnpj: clientes[id].cnpj,
                       nome: clientes[id].nome,
                     });
  }

  clientesArr.sort(function(a, b) { return a.nome > b.nome ? 1 : -1; });

  clientesArr.forEach(function(cliente) {
    byName.options[byName.options.length] = new Option(cliente.nome + " " + cliente.cnpj + " (" + cliente.id + ")", cliente.id);
  });
}

function fillByName() {
  var selectedName = byName.options[byName.selectedIndex].value;
  codCli.value = selectedName;
  byCnpj.value = selectedName;
  clienteRepeat.innerText = clientes[selectedName].nome + " [" + selectedName + "]";
  resetTable();
  q1.value = "1";
  c1.value = "";
  // c1.focus();
  document.getElementById("autoParse").value = "";
  document.getElementById("autoParseCalc").value = "";
  document.getElementById("autoParse").focus();
  processPedido();
}

populateName();

function resetTable() {
  document.getElementById("autoParse").value = "Selecione um cliente";
  document.getElementById("autoParseCalc").value = "";
  
  rows.forEach(function(row) {
    row.q.value = "";
    row.c.value = "";
    row.t.innerText = "";
    row.u.innerText = "";
    row.d.innerText = "";
    row.n.innerText = "";
    processPedido();
  });

  total.innerText = "";
  
  q1.focus();
}

function resetAll() {
  resetCliData();
  resetTable();
  
  resetPriceForm();
}

var diaTardeDia = document.getElementById("diaTardeDia");
var diaTardeTarde = document.getElementById("diaTardeTarde");
var cliRetCli = document.getElementById("cliRetCli");
var cliRetEnt = document.getElementById("cliRetEnt");
var emailMsg = document.getElementById("emailMsg");

function updateEmailMsg() {
  var greeting = "";
  var thanks = "Obrigado pelo pedido, ";
  if (diaTardeDia.checked) {
    greeting = "Bom dia ,";
  } else {
    greeting = "Boa tarde ,";
  }

  if (cliRetCli.checked) {
    thanks += "aguardamos a retirada.";
  } else {
    thanks += "entregaremos amanhã.";
  }

  var msg = greeting + "\n\n" + thanks;

  emailMsg.value = msg;
}

function selectMsg() {
  emailMsg.select();
}

updateEmailMsg();

// display lastUpdated

var lastUpdatedSpan = document.getElementById("lastUpdated");
lastUpdatedSpan.innerText = lastUpdated;

function getFirstNWords(s, n) {
  let words = s.split(" ");
  return words.slice(0, n).join(" ");
}

function stripNumbers(s) {
  return s.replace(/[0-9]/g, '');
}

function parseLine(s) {
  // given a line like "10 pcs 143143A", return "143143A - discounted price"
  if (s.trim() == "") {
    return "";
  }
  
  var cliente = clientes[codCli.value];
  if (cliente) {
    var cliPriceFactor = 3.0 * (1 - (cliente.desconto / 100));
    var pat = new RegExp('(\\d{6}[A-Za-z]{0,2})');
    var match = s.match(pat);
    if (match) {
      var codigo = match[0].toUpperCase();
    } // else {
      // return s + " - sem código";
    // }
    
    var produto = produtos[codigo];
    if (!produto) {
      // return codigo + " - codigo não existe";
      return "";
    }
    var preco = produtos[codigo].preco;
    var descPreco4 = (cliPriceFactor * preco).toFixed(4);
    var descPrecoStr = descPreco4.toString();
    // descPrecoStr = descPrecoStr.replace(/0*$/, "").replace(".", ",");
    descPrecoStr = descPrecoStr.replace(".", ",");
    
    // remove trailing zeros
    for (var i = 0; i < 2; i++) {
      if (descPrecoStr.slice(-1) == "0") {
        descPrecoStr = descPrecoStr.slice(0, -1);
      }
    }
    return codigo + " - " +
      getFirstNWords(stripNumbers(produtos[codigo].nome.toLowerCase()), 5) +
      " - R$ " + descPrecoStr + " - ";
  } else {
    return "Selecione cliente - " + s;
  }
}

function parseLineCalc(s) {
  // given a line like "10 pcs 143143A", return "143143A - tabela price (disc %)"
  if (s.trim() == "") {
    return "";
  }
  
  var cliente = clientes[codCli.value];
  if (cliente) {
    var cliDesc = cliente.desconto;
    var pat = new RegExp('(\\d{6}[A-Za-z]{0,2})');
    var match = s.match(pat);
    if (match) {
      var codigo = match[0].toUpperCase();
    } // else {
      // return s + " - sem código";
    // }
    
    var produto = produtos[codigo];
    if (!produto) {
      // return codigo + " - codigo não existe";
      return "";
    }
    var preco = produtos[codigo].preco;
    var preco2 = parseFloat(preco).toFixed(2)
    return codigo + " - " + cliDesc + "% " + preco2;
  } else {
    return "Selecione cliente - " + s;
  }
}

var parseButton = document.getElementById('parse');
var parseText = document.getElementById('autoParse');
var parseTextCalc = document.getElementById('autoParseCalc');

parseButton.onclick = function() {
  var text = parseText.value.trim();
  var lines = text.split('\n');
  var output = "";
  var outputCalc = "";
  for (var i = 0; i < lines.length; i++) {
    var pl = parseLine(lines[i]);
    if (pl != "") {
      output += pl + "\n";
      outputCalc += parseLineCalc(lines[i]) + "\n";
    }
  }
  parseText.value = output.trim() + " ";
  parseTextCalc.value = outputCalc;
};

function getColors(inputCodigo) {
  var result = [];
  var codigos = Object.keys(produtos);
  codigos.sort(function(a, b) { return a > b ? 1 : -1; });
  codigos.forEach(function(codigo) {
    if (codigo.substring(0, 6) == inputCodigo) {
      result.push(codigo);
    }
  });
  return result;
}

var parseColorsButton = document.getElementById('parseColors');

parseColorsButton.onclick = function() {
  var text = parseText.value.trim();
  var lines = text.split('\n');
  var pat = new RegExp('(\\d{6}[A-Za-z]{0,2})');
  var output = "";
  var outputCalc = "";

  lines.forEach(function(line) {
    var match = line.match(pat);
    if (match) {
      var codigo = match[0].toUpperCase();
      var colors = getColors(codigo);
      colors.forEach(function(color) {
        output += parseLine(color) + "\n";
        outputCalc += parseLineCalc(color) + "\n"; 
      });
    } // else {
     //  output += codigo + " - Código não encontrado\n";
     // outputCalc += codigo + " - Código não encontrado\n";
    // }
  });
  parseText.value = output.trim() + " ";
  parseTextCalc.value = outputCalc; 
};

document.getElementById("cutToClipboard").onclick = function() {
  document.getElementById("autoParse").select();
  document.execCommand("copy");
  document.getElementById('resetAllButton').click();
  goToTop();
}

document.getElementById("clearParse").onclick = function() {
  document.getElementById("autoParse").value = "";
  document.getElementById("autoParseCalc").value = "";
  document.getElementById("autoParse").focus();
}

function goToParse() {
  document.getElementById("autoParse").value = "";
  document.getElementById("autoParseCalc").value = "";
  document.getElementById("autoParse").focus();
}

function goToTop() {
  document.getElementById('resetAllButton').click();
  window.scrollTo(0, 0);
}
  
