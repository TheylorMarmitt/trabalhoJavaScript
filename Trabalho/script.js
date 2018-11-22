

(function(){
    var listaTarefas = [];

function salvar(){
    var tarefa = {};

    tarefa.titulo = $("#titulo").val();
    tarefa.prioridade = $("#prioridade").val();
    tarefa.finalizado = getRadioValor();
    tarefa.categoria = $("#categoria").val();
    let id = $("#id").val();

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
    return radio = $("[name=finalizado]:checked").val();
};

function setRadioValor(valor){
    var radios = $("[name=finalizado]");
    if(valor == "sim"){
        radios[0].checked = true;
        radios[1].checked = false;
    }
    if(valor == "nao"){
        radios[0].checked = false;
        radios[1].checked = true;

    }
}

function renderiza(){
    const tbody = $("#corpo-tabela");
    tbody.html('');

    for(let i = 0; i <listaTarefas.length; i++){

        const tarefa = listaTarefas[i];
        let tr = $('<tr>');

        let tdTitulo = $('<td>').text(tarefa.titulo);
        let tdPrioridade = $('<td>').text(tarefa.prioridade);
        let tdFinalizado = $('<td>').text(tarefa.finalizado);
        let tdCategoria = $('<td>').text(tarefa.categoria);

        let tdOpcoes = $('<td>');        
        let tdExcluir = $('<td>');


        tdOpcoes = $('<button>').text('Editar');
        tdExcluir = $('<button>').text('Excluir');


        tdOpcoes.click(function(){
            editar(tarefa.id);
        });

        tdExcluir.click(function(){
            excluir(tarefa.id);
        });

        tr.append(tdTitulo)
        .append(tdPrioridade)
        .append(tdFinalizado)
        .append(tdCategoria)
        .append(tdOpcoes)
        .append(tdExcluir);

        tbody.append(tr);

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
        $("#titulo").val(tarefa.titulo);
        $("#prioridade").val(tarefa.prioridade);
        setRadioValor(tarefa.finalizado);
        $("#categoria").val(tarefa.categoria);
        $("#id").val(tarefa.id);
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
   $("#formulario input").val('');
}

function gravaNoLocalStorage(){

    const listaEmJSON = JSON.stringify(listaTarefas);

    localStorage.setItem("lista", listaEmJSON);

}

function buscaDoLocalStorage(){
    const listaStorage = localStorage.getItem("lista");

    listaTarefas = JSON.parse(listaStorage) || [];
}

    buscaDoLocalStorage();
    renderiza();

    $("#formulario").on("submit", function(evt){
        salvar();
        evt.stopPropagation();
        evt.preventDefault();
    });


    $('input, select, button').each(function(index, element){
        element.oninvalid = function(){
            const msg = $(this).data('custom-message');
            if(msg){
                this.setCustomValidity("");
                if (!this.validity.valid) {
                    this.setCustomValidity(msg);
                }
            }
        }
    });
    
})();
