import React,{useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import query from './query'

const addUser = gql`
	mutation makeUser($name:String!){
		makeUser(name:$name){
			id,
			name,
			Car{
				make
			}
		}

	}
`;

const AddUser = ()=>{
	const [state,setState]= useState({name:''});

	const resetFields = ()=>{
		setState({name:''})
	}
	return (
		<Mutation mutation={addUser} refetchQueries={
			[{
				query:query
			}]
		} awaitRefetchQueries={true}>

			{(makeUser,{loading,error})=>{
				return (
					<form onSubmit={evt =>{
						evt.preventDefault();
						makeUser({
							variables:{
								name: state.name
							}
						})
						resetFields();
					}}>
						<label>
							<span>Name</span>
							<input type="text"
							value={state.name}
							onChange={(eve)=>{
								setState({name:eve.target.value});
							}}
							/>
						</label>
						<div>
						<button>Add user</button>
						</div>
						{loading && <p>Adding user...</p>}
					{error && <p>Error!</p>}
					</form>

				)
			}}
		
		</Mutation>
	);
}

export default AddUser;