import React from 'react';

class FormAddProduto extends React.Component {
    constructor() {
        super();
        this.renderMaquina = this.renderMaquina.bind(this);
        this.renderMaquinasRelacionas = this.renderMaquinasRelacionas.bind(this);
        this.relacionarMaquina = this.relacionarMaquina.bind(this);
        this.manipulaMudancaEmRelacionadas = this.manipulaMudancaEmRelacionadas.bind(this);
        this.state = {
            maquinas: []
        }
    }

    createProduto(e) {
        e.preventDefault();
        const produto = {
            codigo: this.codigoInput.value,
            nome: this.nomeInput.value,
            maquinasRelacionadas: this.state.maquinas
        }

        this.props.addProduto(produto);
        this.formProduto.reset();
        this.setState({
            maquinas: []
        });
    }

    manipulaMudancaEmRelacionadas(e,key) {
        const maquinas = {...this.state.maquinas};

        const maquinaAlterada = {
            ...maquinas[key],
            [e.target.name]: e.target.value
        }

        maquinas[key] = maquinaAlterada;

        this.setState({
            maquinas
        });
    }

    renderMaquinasRelacionas(key) {
        const maquinaRelacionada = this.state.maquinas[key];
        return (
            <div className="maquinas" key={key}>
                <select onChange={(e) => this.manipulaMudancaEmRelacionadas(e,key) } name="maquina" className="medium" value={maquinaRelacionada.maquina}>
                    {Object.keys(this.props.maquinas).map(this.renderMaquina)}
                </select>

                <input onChange={(e) => this.manipulaMudancaEmRelacionadas(e,key)} type="text" className="small" name="tempoUnitario" value={maquinaRelacionada.tempoUnitario}/>
                <input onChange={(e) => this.manipulaMudancaEmRelacionadas(e,key)} type="text" className="small" name="tempoSetup" value={maquinaRelacionada.tempoSetup}/>
            </div>
        )
    }

    renderMaquina(key) {
        const maquina = this.props.maquinas[key];

        return (
            <option key={key} value={key}>{maquina.codigo} - {maquina.nome}</option>
        );
    }

    relacionarMaquina(e) {
        e.preventDefault();
        const maquinas = {...this.state.maquinas};
        const maquinaRelacionada = {
            maquina: this.maquinaRelacionadaInput.value,
            tempoUnitario: this.tempoUnitarioInput.value,
            tempoSetup: this.tempoSetupInput.value
        }

        const timestamp = Date.now();
        maquinas[`maquina-relacionada-${timestamp}`] = maquinaRelacionada;
        this.setState({
            maquinas
        });

        this.maquinaRelacionadaInput.value = null;
        this.tempoUnitarioInput.value = null;
        this.tempoSetupInput.value = null;
    }


    render() {
        return (
            <form ref={(form) => this.formProduto = form} className="edit" onSubmit={(e) => this.createProduto(e)}>
                <input ref={(input) => this.codigoInput = input} type="text" name="codigo" className="medium" placeholder="Código do Produto"/>
                <input ref={(input) => this.nomeInput = input} type="text" name="nome" className="medium" placeholder="Nome do Produto"/>
                
                {Object.keys(this.state.maquinas).map(this.renderMaquinasRelacionas)}
                <div className="maquinas">
                    <select ref={(input) => this.maquinaRelacionadaInput = input } className="medium" name="maquina" >
                        {Object.keys(this.props.maquinas).map(this.renderMaquina)}
                    </select>
                    <input ref={(input) => this.tempoUnitarioInput = input} type="number" name="tempo-unidade" className="small" placeholder="Tempo/unidade"/>
                    <input ref={(input) => this.tempoSetupInput = input} type="number" name="tempo-setup" className="small" placeholder="Tempo de setup"/>
                    <button onClick={(e) => this.relacionarMaquina(e)}>Relacionar máquina</button>
                </div>

                <button>Salvar</button>
            </form>
        );
    }
}

export default FormAddProduto;