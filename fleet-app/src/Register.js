import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const registerUser = gql`
mutation register($name:String!,$username:String!,$password:String!){
	register(name:$name,password:$password, username:$username)
}
`

const RegisterPage = ()=>{
	return (<div>
		<h2>Register</h2>
		<RegisterForm></RegisterForm>
	</div>)
}

const RegisterForm = ()=>{
	const [form,setForm] =React.useState({
		name:'',
		username:'',
		password:'',
		success:false
	})

	return(
		<Mutation mutation={registerUser}>
			{(register,{loading,error})=>{
				return (
					<form onSubmit={
						evt => {
							evt.preventDefault();
							register({
								variables:{
									name:form.name,
									password: form.password,
									username: form.username
								}
							}).then(({data})=>{
								console.log(data);
								setForm({...FormData,
									success:data.register
								});
							}).catch(error => console.error(error));
							setForm({
								name:'',
								username:'',
								password:'',
								success:false
							});
						}
					}>
						<label>
							<span>Name</span>
							<input
							type="text"
							value={form.name}
							onChange={(e)=>{
								setForm({...form,  name:e.target.value});
							}}
							/>
						</label>
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
							type="text"
							value={form.password}
							onChange={(e)=>{
								setForm({...form,  password:e.target.value});
							}}
							/>
						</label>
						<div>
							<button disabled={form.name===""}>Register</button>
						</div>
						{loading && <p>Adding user...</p>}
						{error && <p>Error, did not register user.</p>}
						{form.success && <p>Registration successful</p>}
					</form>
				)

			}}

		</Mutation>
	)
}


export default RegisterPage;