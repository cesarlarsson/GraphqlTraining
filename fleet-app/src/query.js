import gql from 'graphql-tag';

const query = gql`
query {
	users {
		id,
		name,
		Car{
			id,
			make,
			model,
			color
		}
	}
}`;

export default query;