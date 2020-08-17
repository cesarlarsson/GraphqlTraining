import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {withRouter} from 'react-router-dom';

const LogoutPage = ({history})=>{
	const logout = async (client)=>{
		localStorage.removeItem('token');
		await client.resetStore();
		//history.push('/login');
	}
	return(
		<ApolloConsumer>
{client=>{
	return (	<button onClick={()=>{
		logout(client)
	}}>Logout</button>)
}}

		</ApolloConsumer>

	)

}


export default withRouter(LogoutPage);