import React, { Component } from 'react';
import '../App.css';
import base from '../base';
import Firebase from 'firebase';
import Setores from './Setores';
import Maquinas from './Maquinas';
import Produtos from './Produtos';

class App extends Component {
  constructor() {
    super();
    this.addSetor = this.addSetor.bind(this);
    this.updateSetor = this.updateSetor.bind(this);
    this.addMaquina = this.addMaquina.bind(this);
    this.updateMaquina = this.updateMaquina.bind(this);
    this.addProduto = this.addProduto.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.autenticar = this.autenticar.bind(this);
    this.state = {
      setores: [],
      maquinas: [],
      produtos: [],
      owners: [],
      githubMail: null
    }
  }

  componentWillMount() {
    this.refSetores = base.syncState('setores',{
      context: this,
      state: 'setores'
    });
    this.refMaquinas = base.syncState('maquinas',{
      context: this,
      state: 'maquinas'
    });
    this.refProdutos = base.syncState('produtos',{
      context: this,
      state: 'produtos'
    });
    this.refOwners = base.syncState('owners',{
      context: this,
      state: 'owners'
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.refSetores);
    base.removeBinding(this.refMaquinas);
    base.removeBinding(this.refProdutos);

  }

  addSetor(setor){
    const setores = {...this.state.setores};
    const timestamp = Date.now();

    setores[`setor-${timestamp}`] = setor;

    this.setState({
      setores
    });
  }

  updateSetor(key, setor){
    const setores = {...this.state.setores};
    setores[key] = setor;
    this.setState({
      setores
    });
  }

  addMaquina(maquina){
    const maquinas = {...this.state.maquinas};
    const timestamp = Date.now();

    maquinas[`maquina-${timestamp}`] = maquina;

    this.setState({
      maquinas
    });
  }

  updateMaquina(key, maquina){
    const maquinas = {...this.state.maquinas};
    maquinas[key] = maquina;
    this.setState({
      maquinas
    });
  }

  addProduto(produto){
    const produtos = {...this.state.produtos};
    const timestamp = Date.now();

    produtos[`produto-${timestamp}`] = produto;

    this.setState({
      produtos
    });
  }

  updateProduto(key, produto) {
    const produtos = {...this.state.produtos};
    produtos[key] = produto;
    this.setState({
      produtos
    });
  }

  renderLogin() {
    return(
      <nav className="login">
        <p>Autentique-se utilizando o Github</p>
        <button onClick={(e) => this.autenticar()}>Autenticar com Github</button>
      </nav>
    )
  }

  autenticar() {
    var provider = new Firebase.auth.GithubAuthProvider();
    Firebase.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;

      this.setState({
        githubMail: user.email
      })

      console.log(token);
      console.log(user.email);
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  
  render() {
    if(!this.state.githubMail || !Object.values(this.state.owners).some(item => item === this.state.githubMail)){
      return (<div>{this.renderLogin()}</div>)
    }

    return (
      <div className="App">
        <Setores 
          setores={this.state.setores}
          updateSetor={this.updateSetor}
          addSetor={this.addSetor}/>
        <Maquinas 
          maquinas={this.state.maquinas}
          addMaquina={this.addMaquina}
          updateMaquina={this.updateMaquina}
          setores={this.state.setores}/>
        <Produtos
          updateProduto={this.updateProduto}
          produtos={this.state.produtos}
          addProduto={this.addProduto}
          maquinas={this.state.maquinas}/>
      </div>
    );
  }
}

export default App;
