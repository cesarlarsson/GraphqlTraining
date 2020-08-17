import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
{
	me{
		id
		name
		username
		Car{
			id
			make
			model
		}
	}
}
`

const activeSession = Component => props => {
	return (
		<Query query={query}>
			{({data,refetch})=>{
				return <Component {...props} session={data} refetch={refetch}></Component>
			}}
		</Query>
	)
}

export default activeSession;