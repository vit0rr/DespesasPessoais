class Despesa {
    constructor(ano, mes, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    gravar(despesa)
}

function gravar(d) {
    localStorage.setItem('despesa', JSON.stringify(d))
}