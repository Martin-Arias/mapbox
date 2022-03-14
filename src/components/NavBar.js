import React, { useContext } from 'react'
import { UserContext } from "./UserContext";

export const NavBar = () => {
	const [authenticated, setAuthenticated ] = useContext(UserContext);
	const handleLogout = () => {
		localStorage.setItem('token',null)
		setAuthenticated({
			token:"null"
		})
	};
	return (
		<>
			<nav className='navigation'>
				<ul style={{margin:'10px',display:'flex',justifyContent:'space-between'}}>
					<li >
						Location App
					</li>
					<li onClick={handleLogout}>
						Cerrar Sesión
					</li>
				</ul>
			</nav>
		</>
	)
}
