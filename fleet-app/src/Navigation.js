import React from 'react';
import {Link} from 'react-router-dom';
const  NavigationNoAuth =()=>{
	return (
		<ul>
			<li><Link to="/login">Login</Link></li>
			<li><Link to="/register">Register</Link></li>
		</ul>
	)
}

const  NavigationAuth =()=>{

}

const  Navigation=()=>{
return (<div>
	<NavigationNoAuth></NavigationNoAuth>
</div>)
}
export default Navigation;