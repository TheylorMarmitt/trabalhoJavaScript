

(function(){
    var listaTarefas = [];

function salvar(){
    var tarefa = {};

    tarefa.titulo = document.getElementById("titulo").value;
    tarefa.prioridade = document.getElementById("prioridade").value;
    tarefa.finalizado = getRadioValor();
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
function getRadioValor(){ 
        var radios = document.getElementsByName("finalizado");
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
    };

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


function setRadioValor(valor){
    var radios = document.getElementsByName("finalizado");
    if(valor == "sim"){
     radios[0].checked = true;
     radios[1].checked = false;
}
if(valor == "nao"){
    radios[0].checked = false;
    radios[1].checked = true;

}
}
    buscaDoLocalStorage();
    renderiza();
    document.getElementById("formulario").addEventListener("submit", function(evt){
        salvar();
        evt.stopPropagation();
        evt.preventDefault();
    });
})();
