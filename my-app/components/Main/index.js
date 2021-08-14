import React from 'react'

export default () => {
    React.useEffect(() => {
        class Despesa {
            constructor(ano, mes, dia, tipo, descricao, valor) {
                this.ano = ano
                this.mes = mes
                this.dia = Number(dia)
                this.tipo = tipo
                this.descricao = descricao.replace(/(<([^>]+)>)/gi, '')
                this.valor = Number(valor)
        
            }
        
            validarDados() {
                for (let i in this) {
                    if (this[i] == undefined || this[i] == '' || this[i] == null || this.dia > 31 || this.dia < 1) {
                        return false
                    }
                }
                return true
            }
        
        }
        
        class Bd {
        
            constructor() {
                let id = localStorage.getItem('id')
        
                if (id === null) {
                    localStorage.setItem('id', 0)
                }
            }
        
            getProximoId() {
                let proximoId = localStorage.getItem('id')
                return parseInt(proximoId) + 1
            }
        
            gravar(d) {
                let id = this.getProximoId()
        
                localStorage.setItem(id, JSON.stringify(d))
        
                localStorage.setItem('id', id)
            }
        
            recuperarTodosRegistros() {
                let despesas = Array()
        
                let id = localStorage.getItem('id')
        
                for (let i = 1; i <= id; i++) {
                    let despesa = JSON.parse(localStorage.getItem(i))
        
                    if (despesa === null) {
                        continue
                    }
        
                    despesa.id = i
                    despesas.push(despesa)
                }
                return despesas
            }
        
            pesquisar(despesa) {
                let despesasFiltradas = Array()
                despesasFiltradas = this.recuperarTodosRegistros()
                console.log(despesasFiltradas)
        
                //ano
                if (despesa.ano != '') {
                    despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
                }
        
                //mes
                if (despesa.mes != '') {
                    despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
                }
        
                //dia
                if (despesa.dia != '') {
                    despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
                }
        
                //tipo
                if (despesa.tipo != '') {
                    despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
                }
                //descricao
                if (despesa.descricao != '') {
                    despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
                }
        
                return despesasFiltradas
        
        
            }
            remover(id) {
                localStorage.removeItem(id)
            }
        }
        
        let bd = new Bd()
        
        
        function cadastrarDespesa() {
        
            let ano = document.getElementById('ano')
            let mes = document.getElementById('mes')
            let dia = document.getElementById('dia')
            let tipo = document.getElementById('tipo')
            let descricao = document.getElementById('descricao')
            let valor = document.getElementById('valor')
        
            let despesa = new Despesa(
                ano.value,
                mes.value,
                dia.value,
                tipo.value,
                descricao.value,
                valor.value
            )
            if (despesa.validarDados()) {
                bd.gravar(despesa)
        
                document.getElementById('modal_titulo').innerHTML = 'Registro realizado'
                document.getElementById('modal_titulo_div').className = 'modal-header text-success'
                document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
                document.getElementById('modal_btn').innerHTML = 'Voltar'
                document.getElementById('modal_btn').className = 'btn btn-success'
        
                $('#modalRegistraDespesa').modal('show')
        
                //limpeza dos campos
                $('input').val('')
                $('select').val('')
            } else {
                document.getElementById('modal_titulo').innerHTML = 'Erro na na inclusão do registro'
                document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
                document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação! Verifique se todos os campos foram preenchidos corretamente'
                document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
                document.getElementById('modal_btn').className = 'btn btn-danger'
        
                $('#modalRegistraDespesa').modal('show')
            }
        }
        
        function carregaListaDespesas(despesas = Array(), filtro = false) {
            if (despesas.length == 0 && filtro == false) {
                despesas = bd.recuperarTodosRegistros()
            }
        
        
            var listaDespesas = document.getElementById('listaDespesas')
            listaDespesas.innerHTML = ''
        
        
            /*
            <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
            */
        
            despesas.forEach(function (d) {
                //criando a linha (tr)
                let linha = listaDespesas.insertRow()
        
                //inserir valores nas linhas (colunas ou td)
                linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
                switch (d.tipo) {
                    case '1': d.tipo = 'Alimentação'
                        break
                    case '2': d.tipo = 'Educação'
                        break
        
                    case '3': d.tipo = 'Lazer'
                        break
                    case '4': d.tipo = 'Saúde'
                        break
        
                    case '5': d.tipo = 'Transporte'
                        break
        
                }
        
                linha.insertCell(1).innerHTML = d.tipo
                linha.insertCell(2).innerHTML = d.descricao
                linha.insertCell(3).innerHTML = "R$ " + d.valor
        
                //criar botao de excluir
                let btn = document.createElement('button')
                btn.className = 'btn btn-danger'
                btn.innerHTML = '<i class="fa fa-times"  ></i>'
                btn.id = `id_despesa_${d.id}`
                btn.onclick = function () {
                    let id = this.id.replace('id_despesa_', '')
                    //alert(id)
                    bd.remover(id)
                    window.location.reload()
                }
                linha.insertCell(4).append(btn)
                console.log(d)
            })
        }
        
        function clearStorage() {
            localStorage.clear()
            location.reload()
        }
        
        function pesquisarDespesa() {
            let ano = document.getElementById('ano').value
            let mes = document.getElementById('mes').value
            let dia = document.getElementById('dia').value
            let tipo = document.getElementById('tipo').value
            let descricao = document.getElementById('descricao').value
            let valor = document.getElementById('valor').value
        
            let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
            let despesas = bd.pesquisar(despesa)
        
            this.carregaListaDespesas(despesas, true)
        }
    })

    return (
        <div/>
    )
}