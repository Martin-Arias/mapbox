import React, { useState,useContext } from "react";
import { UserContext } from "./UserContext";
import { Outlet, Link } from "react-router-dom";
import Icon from'../mapbox-icon.png';
export const Login = () => {

	const [inputs, setInputs] = useState({});
	const [authenticated, setAuthenticated ] = useContext(UserContext);
	const [response, setResponse] = useState({
		error:false,
		msg:''
	});
	
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}
	const handleSubmit =(event) => {
		event.preventDefault();
		
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "text/plain");

		const raw = `{\n\"password\":${inputs.password},\n\"usuario\":\"${inputs.usuario}\"\n}`;

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
		fetch("https://finalmarcadores.000webhostapp.com/auth", requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log(result)
				if (result.status === "ok") {
					setResponse({
						error:false,
						msg:''
					})
					localStorage.setItem('token',result.result.token)
					setAuthenticated({
						...authenticated,
						token:result.result.token,
						latitud:result.result.puntos[0],
						longitud:result.result.puntos[1]

					})
				}else{
					setResponse({
						error:true,
						msg:result.result.error_msg
					})
				}
			})
			.catch(error => console.log('error', error));
	}
	return (
		
		<div className="loginBody">
			<img  src={Icon}/>
			<h1>Bienvenido</h1>
			<form className="loginForm" onSubmit={handleSubmit}>
			<div class="form__group field">
				<input 
				type="input" 
				class="form__field" 
				placeholder="Name" 
				name="usuario"
				id='name'
				value={inputs.usuario || ""}
				onChange={handleChange} 
				/>
				<label for="name" class="form__label">Usuario</label>
			</div>
			<div class="form__group field">
				<input 
				type="password"
				name="password"
				value={inputs.password || ""}
				onChange={handleChange}
				class="form__field"  
				/>
				<label for="name" class="form__label">Contraseña</label>
			</div>
				
				<Link to="/register">Registrarse</Link>
				{response.error&&<label>{response.msg}</label>}
				<input type="submit" className="btnSubmit" value="Iniciar Sesión" />
			</form>
		</div>
		
	);
};