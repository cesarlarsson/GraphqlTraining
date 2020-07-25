import React,{Component} from 'react';
import {Query } from 'react-apollo';

import query from './query'
import AddUser from './AddUser'

const User  = () =>{
	return (<div>
		<AddUser/>
		<Query query={query}>
		{({data,loading})=>{
			if(loading) return <p>Loading</p>
			return (
					<div>
						<ul>
							{data.users.map(({id,name,Car})=>{

								const list = <li key={id}>
									{name}<ul>
										{(Car && Car.length !==0) ? Car.map(({make,model, color})=>{
											return <li key={`${id}-${make}`}>{make} {model} {color}</li>;
										}):<li>No car</li>}
									</ul>
								</li>
								return list;
							})}
						</ul>
					</div>
			)




			
		}}
	</Query>
	</div>);

}

export default User;