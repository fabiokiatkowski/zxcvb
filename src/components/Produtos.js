import React from 'react';
import logo from '../logo.svg';
import FormAddProduto from './FormAddProduto';

class Produtos extends React.Component {
    constructor(){
        super();
        this.renderProdutos = this.renderProdutos.bind(this);
        this.manipulaAlteracoes = this.manipulaAlteracoes.bind(this);
    }

    manipulaAlteracoes(e,key) {
        const produtos = {...this.props.produtos};
        const updatedProduto = {
            ...produtos[key],
            [e.target.name]: e.target.value
        }

        this.props.updateProduto(key,updatedProduto);
    }

    renderProdutos(key) {
        const produto = this.props.produtos[key];
        return (
            <div className="edit" key={key}>
                <input onChange={(e) => this.manipulaAlteracoes(e,key)} className="medium" type="text" name="codigo" value={produto.codigo}/>
                <input onChange={(e) => this.manipulaAlteracoes(e,key)} className="medium" type="text" name="nome" value={produto.nome}/>
            </div>
        )
    }
    
    render () {
        return (
            <div className="panel">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Produtos</h1>
                </header>
                {Object.keys(this.props.produtos).map(this.renderProdutos)}
                <FormAddProduto 
                        addProduto={this.props.addProduto}
                        maquinas={this.props.maquinas}/>
            </div>
        )
    }
}

export default Produtos;