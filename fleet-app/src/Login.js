import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

const loginUser = gql`
mutation login($username:String!,$password:String!){
	login(username:$username,password:$password){
		token
	}
}`;


const LoginPage = ({history,refetch})=>{
	return (<div>
		<h2>Login</h2>
		<LoginForm history={history} refetch={refetch}></LoginForm>
	</div>)
}

const LoginForm = ({history,refetch})=>{

	const [form,setForm] = React.useState({
		username:'',
		password:'',
		success:false
	})

	const submitForm= (evt,login)=>{
		evt.preventDefault();
		login({
			variables: {
				username:form.username,
				password:form.password
			}
		}).then(async ({data})=>{
			await localStorage.setItem('token',data.login.token)
			console.log(data);
			await refetch();
			history.push('/profile')
		}).catch(error=>{
			console.error(error);
		})

		return true;
	}


	return (
		<Mutation mutation={loginUser}>
			{(login,{loading,error})=>{
				return(
<form 
				onSubmit={ evt => {
					
					submitForm(evt,login);
				}}>
<label>
							<span>username</span>
							<input
							type="text"
							value={form.username}
							onChange={(e)=>{
								setForm({...form,  username:e.target.value});
							}}
							/>
						</label>
						<label>
							<span>password</span>
							<input
							type="password"
							value={form.password}
							onChange={(e)=>{
								setForm({...form,  password:e.target.value});
							}}
							/>
						</label>
						<div>
							<button disabled={form.username===""}>Login</button>
						</div>
				</form>

				)
				
			}}
		</Mutation>
	)
}


export default withRouter(LoginPage);