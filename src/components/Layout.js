import React from 'react'
import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/register">Registrarse</Link>
					</li>
					<li>
						<Link to="/login">Iniciar Sesión</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	)
}
