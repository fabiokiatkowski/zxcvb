import React from 'react';

class FormAddMaquina extends React.Component {
    constructor() {
        super();
        this.renderSetor = this.renderSetor.bind(this);
    }

    createMaquina(e) {
        e.preventDefault();
        const maquina = {
            codigo: this.codigoInput.value,
            nome: this.nomeInput.value,
            setor: this.setorInput.value
        }

        this.props.addMaquina(maquina);
        this.formMaquina.reset();
    }

    renderSetor(key) {
        const setor = this.props.setores[key];

        return (
            <option key={key} value={key}>{setor.codigo} - {setor.nome}</option>
        );
    }

    render() {
        return (
            <form ref={(form) => this.formMaquina = form} className="edit" onSubmit={(e) => this.createMaquina(e)}>
                <input ref={(input) => this.codigoInput = input} type="text" name="codigo" className="small" placeholder="Código da Maquina"/>
                <input ref={(input) => this.nomeInput = input} type="text" name="nome" className="large" placeholder="Nome da Maquina"/>
                <select ref={(input) => this.setorInput = input } className="medium" name="setor" >
                    {Object.keys(this.props.setores).map(this.renderSetor)}
                </select>
                <button>Salvar</button>
            </form>
        );
    }
}

export default FormAddMaquina;