import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import { ClientCard, Spin, ClientForm} from './';
/* ICONS */
import search from '../assets/search.svg';
import add from '../assets/add.svg';
import menuRow from '../assets/menu-row.svg';
import menuGrid from '../assets/menu-grid.svg';

class Clients extends Component {

    constructor(props){
        super(props);
        this.timeout = null;
    }

    state = {
        filter:"",
        add:false,
        update:null,
        grid:true
    } 

    changeClientCardStyle(bool){
        this.setState({
            grid: bool
        })
    }

    componentDidMount(){
        if(this.props.user.logged){
            this.props.dispatch(ACTIONS.searchClients());
        }        
    }

    debounceFilter(keyword){

        this.setState( { filter: keyword } );
        
        clearTimeout(this.timeout);
        
        this.timeout = setTimeout(()=>{
            this.filterClients(keyword)
        },800);
        
    }

    addClient(){
        this.setState(
            {
                add: this.state.add ? false : true
            },
            () => {
                if(!this.state.add){
                    this.setState({update:null});
                }
            }
        )      
    }    

    removeClient(_id){
        const {dispatch, clients} = this.props;
        dispatch(ACTIONS.removeClient(clients, _id));
    }

    updateClient(_id){
        this.setState(
            {
                update: this.props.clients.filter(client=>client._id === _id)[0]
            },
            this.addClient
        )  
    }

    filterClients(keyword){  
        this.props.dispatch(ACTIONS.searchClients(keyword));
    }
    
    render() {

        if(!this.props.user.logged){
            return <Redirect to="/login" />
        }
        
        return (
            <div>
                <div className={ `container drop-shadow ${this.state.add && "blur" }` }>
                    <div id="clients-tools">
                        <div id="clients-tools-search">
                            <img src={search} alt="buscar" />
                            <input onChange={(e)=>{ this.debounceFilter(e.target.value) } } value={this.state.filter} type="text" placeholder="Busque por nome, CPF/CNPJ ou e-mail." />
                            {
                                this.state.filter !== "" && <div className="clear-container" onClick={(e)=>{ this.debounceFilter('') } }><div  className="clear" /></div>
                            }
                        </div>
                        <div id="clients-tools-options">
                            <img src={menuRow}  className={ `${!this.state.grid && 'selected' } grid` } onClick={()=>{this.changeClientCardStyle(false)}} name="Linhas" alt="Linhas"/>
                            <img src={menuGrid} className={ `${this.state.grid && 'selected' } grid` } onClick={()=>{this.changeClientCardStyle(true)}} name="Colunas" alt="Colunas"/>
                            {
                                this.props.user.role >= 5 && <img src={add} onClick={()=>{this.addClient()}} name="Adicionar" alt="Adicionar"/>
                            }
                        </div>
                    </div>
                    <div id="clients-container">
                        {
                            ( this.props.status.requested && !this.state.add ) ? 
                                <div className="searching">
                                    <Spin />
                                </div>
                               
                            :
                               (!this.props.clients.length) ? 
                                <b>Nenhum cliente encontrado.</b>
                               :
                                this.props.clients.map(
                                    client => <ClientCard 
                                                    key={`client-${client._id}`} 
                                                    {...client} 
                                                    remove={ (_id) => { this.removeClient(_id) } }
                                                    update={ (_id) => { this.updateClient(_id) } }
                                                    grid={ this.state.grid }/>
                                )
                        }                   
                    </div>                    
                </div>
                {
                    this.state.add && <ClientForm update={ this.state.update } close={ ()=>{ this.addClient() } } />
                }
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps)(Clients)