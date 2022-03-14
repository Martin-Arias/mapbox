import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from './Map';
import {UserContext} from "./components/UserContext";
import {Login}  from "./components/Login";
import {Register}  from "./components/Register";
import { Layout } from "./components/Layout";

function App() {
	
	const [authenticated, setAuthenticated] = useState({
		token:'',
		latitud:'',
		longitud:''
	});

	useEffect(() => { /* ASIGNA EL TOKEN ALMACENADO EN LOCAL STORAGE, SI ES QUE HAY, SI NO NULL */
		
		setAuthenticated({
			...authenticated,
			token:localStorage.getItem("token"),
			latitud:'',
			longitud:''
		})

		/* HACER REQUEST PARA PEDIR TODOS LOS PUNTOS ACA */
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		const token = localStorage.getItem("token"); 

		if (token !== null) {
			fetch(`https://finalmarcadores.000webhostapp.com/puntos?token=${token}`, requestOptions)
				.then(response => response.json())
				.then(result => {
					setAuthenticated({
						...authenticated,
						token:localStorage.getItem("token"),
						latitud:result[0].latitud,
						longitud:result[0].longitud
					})
				})
				.catch(error => console.log('error', error));
		}
	},[]);
	return (
		<UserContext.Provider value={[authenticated, setAuthenticated]}>
			{
					(authenticated.token !== "null") ?
					<Map/>:
					<BrowserRouter>
					<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="*" element={<Login />} />
				</Routes>
					</BrowserRouter>
					
			}
		</UserContext.Provider>	
	);
}
export default App;

