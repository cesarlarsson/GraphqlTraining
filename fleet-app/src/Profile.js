import React from 'react';
import activeSession from './ActiveSession';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';

import { client } from '.';

const uploadPhoto = gql`
mutation uploadImage($filename: String!){
	uploadImage(filename: $filename)
}
`

const ProfilePage = ({session})=>{
	console.log("---")
	console.log(session);
	const [selectedFile,setSelectedFile]= React.useState();
	const [photoUrl,setPhotoUrl] = React.useState((session && session.me && session.me.photo)?session.me.photo:null);
	const [temporaryProfileHolder,setTemporaryProfileHolder]= React.useState(null);
	const [query,setQuery]= React.useState()
	//let query ;
	/*let query = gql`{
		user(id: 3){
			photo(options:"200,true,true,face")
		}
	}`;*/
	React.useEffect(()=>{
		console.log('asdasda')
	if(session && session.me){
		setQuery( gql`{
			user(id: ${session.me.id}){
				photo(options:"200,true,true,face")
			}
		}`);
		//console.log( query);
	}

	},[session])


	const handleSelectedFile = (eve)=>{
		setSelectedFile(eve.target.files[0])
	}

	const handleUpload = ()=>{
		const data = new FormData();
		data.append('file',
		selectedFile,selectedFile.name);

		fetch('http://localhost:3000/upload',{
			method: 'POST',
			mode:'cors',
			body:data
		})
		.then(response =>response.json())
		.then( async filename => {
			await client.mutate({
				variables:{
					filename
				},
				mutation: uploadPhoto
			});
			const {data}= await client.query(
				{
					query: query,
					fetchPolicy: 'no-cache'
				}
			);
			console.log(data);
			setTemporaryProfileHolder(data.user.photo);
			console.log(filename)
		})
		.catch( error=> console.error(error))
	}


	return (
		<div>
			{(session && session.me && query)?
				(
					<div>
				<Query query={query}>
				{({loading,error,data})=>{
					if (loading) return <p>Loading</p>
					if (temporaryProfileHolder!==null){
						return <img src={temporaryProfileHolder} alt="1"/>
					}else if( data.user.photo){
						return <img src={data.user.photo} alt="2"/>
					} else {
						return <img src="https://res.cloudinary.com/smartrabbit/image/upload/v1597709955/eunswfhzjnqadplfod6l.jpg" alt=""/>
					}
				}}

				</Query>
				<h2>Hello again, {session.me.name}!</h2>

				<p>
					Upload a profile photo:
					<input type="file" onChange={handleSelectedFile} />
					<button onClick={handleUpload}>Upload</button>
				</p>
				<p>List of cars</p>
				<ul>
					{
					session.me.Car.length>0?
					session.me.Car.map(({id,make,model},index)=>{
						return (
							<li key={index}> {make} {model}</li>
						)
					}):<li>NO CARS</li>}
				</ul>
					</div>
					
					
					):null
			}
			

		</div>
	)
}

export default activeSession(ProfilePage);