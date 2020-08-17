import React from 'react';
import activeSession from './ActiveSession';

const ProfilePage = ({session})=>{
	return (
		<div>
			{(session && session.me)?
				(
				
				<div><h2>Hello again, !{session.me.name}</h2>

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