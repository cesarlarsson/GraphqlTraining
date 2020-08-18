import React from 'react';
import {Link} from 'react-router-dom';
import LogoutPage from './Logout';
const  NavigationNoAuth =()=>{
	return (
		<ul>
			<li><Link to="/login">Login</Link></li>
			<li><Link to="/register">Register</Link></li>
		</ul>
	)
}

const  NavigationAuth =()=>{
	return (
		<ul>
			<li><Link to="/profile">Profile</Link></li>

			<li><LogoutPage></LogoutPage></li>
		</ul>
	)
}

const  Navigation=({session})=>{
return (<div>
	{(session && session.me)?
	<NavigationAuth></NavigationAuth>
	:
	<NavigationNoAuth></NavigationNoAuth>
	}
	
</div>)
}
export default Navigation;