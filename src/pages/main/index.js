import React, {Component} from 'react'
import './styles.css'
import UserForm from '../../components/UserForm'
import api from '../../services/api'
import {Alert} from 'reactstrap'

export default class Main extends Component{
    state = {
        users: [],
        userInfo: {},
        page: 0,
    }

    loadUsers = async(e,page = 0 ) =>{
        e.preventDefault();
        if(e.target.elements.username.value.toLowerCase()==="") {
            console.log("Erro");}
        else
        var user = e.target.elements.username.value.toLowerCase();
        var response = await api.get(`EmpJob?$filter=customString10 eq '${user}'
        `,{auth:{username: "apiadmin",password:"apipassword"}})
        var test = 10;
        if (!isNaN(user) && response.data.d.results.length>0) 
        {
            user = response.data.d.results[0].userId.toLowerCase();
         response = await api.get(`User?$filter=tolower(userId) eq '${user}' or 
         tolower(firstName) like '%${user}%' or tolower(department) like 
         '%${user}%' or toupper(department) like '%${user}%' or tolower
         (lastName) like '%${user}%' or tolower(location) like '%${user}%'
         &$top=10&$skip=${page}`,{auth:{username: "apiadmin",
         password:"apipassword"}})
         var { results} = response.data.d;
        this.setState({users: results, userInfo,page});
        var test = response.data.d.results.length;
        }
        else 
        {
            response = await api.get(`User?$filter=tolower(userId) eq '${user}'
             or tolower(firstName) like '%${user}%' or tolower(department) like 
             '%${user}%' or toupper(department) like '%${user}%' or tolower
             (lastName) like '%${user}%' or tolower(location) like '%${user}%'
             &$top=10&$skip=${page}`,{auth:{username: "apiadmin",
             password:"apipassword"}})
            var { results, ... userInfo} = response.data.d;
            page = response.data.d.results.length;
        this.setState({users: results, userInfo,page});
        }
        
    };

    prevPage = () => {
        const {page,e} = this.state;
        if(page ===0) return;

        const pageNumber = page -10;
        this.loadUsers(e,pageNumber);
    }
    nextPage = () => {
        const { page, userInfo } = this.state;
        if(page === userInfo.pages) return;
        const pageNumber = page +10;
        this.loadUsers(pageNumber); 
    }
    render()
    {
        const { test,page } = this.state;
        return (

<div className = "user-list">
    <UserForm loadUsers={this.loadUsers}/>

     {this.state.users.map(user => (
                <article key ={user.userId}>
                    <strong>{user.defaultFullName} ({user.userId})</strong>
                    <p>Ramal: {user.businessPhone}</p>
                    <p>Site: {user.location}</p>
                    <p>Área: {user.department}</p>
                    <p>Chapa: {user.empId}</p>
                    <a target='_blank' href = {`
                    https://performancemanager4.successfactors.com/xi/ui/pages/e
                    mpfile/liveprofile.xhtml?selected_user=${user.userId}`} >
                        Acessar usuário</a>
                    </article>
            ))} 
            <div className = "actions">
                <button disabled = {page === 0} onClick= {this.prevPage} >
                    Anterior
                </button>
                
                <button disabled = {page !== test} onClick = {this.nextPage}>
                    Próximo
                </button>
            </div>
            </div>

        )
    }
}