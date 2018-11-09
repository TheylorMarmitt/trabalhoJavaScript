var listaTarefas = [];

function salvar(){
    var tarefa = {};

    tarefa.titulo = document.getElementById("titulo").value;
    tarefa.prioridade = document.getElementById("prioridade").value;
    tarefa.finalizado = getRadioValor("finalizado");
    tarefa.categoria = document.getElementById("categoria").value;

    let id = document.getElementById("id").value;

    if(id == undefined || id == ''){
        tarefa.id = new Date().getTime();
        listaTarefas.push(tarefa);
    }else{
        let idNumber = parseInt(id);
        let tarefaExistente = findTarefaById(idNumber);

        if(tarefaExistente){
            tarefaExistente.titulo = tarefa.titulo;
            tarefaExistente.prioridade = tarefa.prioridade;
            tarefaExistente.finalizado = tarefa.finalizado;
            tarefaExistente.categoria = tarefa.categoria;
        }
    }

    gravaNoLocalStorage();
    renderiza();
    zerarInputs();

    return false;
}

function renderiza(){
    const tbody = document.getElementById("corpo-tabela");
    tbody.innerHTML = '';

    for(let i = 0; i <listaTarefas.length; i++){

        const tarefa = listaTarefas[i];
        let tr = document.createElement('tr');

        let tdTitulo = document.createElement('td');
        let tdPrioridade = document.createElement('td');
        let tdFinalizado = document.createElement('td');
        let tdCategoria = document.createElement('td');

        let tdOpcoes = document.createElement('td');
        let tdExcluir = document.createElement('td');

        tdTitulo.innerHTML = tarefa.titulo;
        tdPrioridade.innerHTML = tarefa.prioridade;
        tdFinalizado.innerHTML = tarefa.finalizado;
        tdCategoria.innerHTML = tarefa.categoria;

        tdOpcoes = document.createElement('button');
        let lbl = document.createTextNode("editar");
        tdOpcoes.appendChild(lbl);

        tdExcluir = document.createElement('button');
        let lblExcluir = document.createTextNode("excluir");
        tdExcluir.appendChild(lblExcluir);


        tdOpcoes.onclick = function(){
            editar(tarefa.id);
        }

        tdExcluir.onclick = function(){
            excluir(tarefa.id);
        }

        tr.appendChild(tdTitulo);
        tr.appendChild(tdPrioridade);
        tr.appendChild(tdFinalizado);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdOpcoes);
        tr.appendChild(tdExcluir);

        tbody.appendChild(tr);

    }
}


function excluir(id){
    listaTarefas = listaTarefas.
        filter(function(value){
            return value.id != id;
        });
    gravaNoLocalStorage();
    renderiza();
}

function editar(id){
    let tarefa = findTarefaById(id);

    if(tarefa){
        document.getElementById("titulo").value = tarefa.titulo;
        document.getElementById("prioridade").value = tarefa.prioridade;
        ////
        setRadioValor(tarefa.finalizado);
        ////
        document.getElementById("categoria").value = tarefa.categoria;
        document.getElementById("id").value = tarefa.id;
    }else{
        alert("Não foi possivel encontrar a tarefa");
    }
}

function findTarefaById(id){
    let tarefas = listaTarefas.filter(function(value){
        return value.id == id;
    });

    if(tarefas.length == 0){
        return undefined;
    }else{
        return tarefas[0];
    }

}

function zerarInputs(){
    document.getElementById("titulo").value = '';
    document.getElementById("prioridade").value ='';
    document.getElementById("finalizado").value = '';
    document.getElementById("categoria").value = '';
    document.getElementById("id").value = '';
}

function gravaNoLocalStorage(){

    const listaEmJSON = JSON.stringify(listaTarefas);

    localStorage.setItem("lista", listaEmJSON);

}

function buscaDoLocalStorage(){
    const listaStorage = localStorage.getItem("lista");

    listaTarefas = JSON.parse(listaStorage) || [];
}

(function(){
    buscaDoLocalStorage();
    renderiza();
})();0


 function getRadioValor(id){
  var rads = document.getElementsByName(id);

  for(var i = 0; i < rads.length; i++){
   if(rads[i].checked){
    return rads[i].value;
   }

  }

  return null;
 }


// rever (não está funcionando)
function setRadioValor(finalizado){
    if(finalizado.value == "sim"){
        document.getElementsByName("finalizado").checked = true;
    }else{
        document.getElementsByName("finalizado").checked = false;
    }
    if(finalizado.value == "nao"){
        document.getElementsByName("finalizado").checked = true;
    }else{
        document.getElementsByName("finalizado").checked = false;
    }
}