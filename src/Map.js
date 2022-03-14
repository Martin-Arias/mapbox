import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { UserContext } from './components/UserContext';
import { NavBar } from './components/NavBar';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpYXM5NW1hcnRpbiIsImEiOiJja3o1azl2ZWwwcmF5MnZwNHVzMWJ5NnZnIn0.TYWo_iBForJCvGpcWSO2eA';

export default function Map() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-68.8157);
	const [lat, setLat] = useState(-32.8923);
	const [zoom, setZoom] = useState(9);
	const [featureLocation, setfeature] = useState([])
	const [marker, setMarker] = useState()
	const user = useContext(UserContext);

	const handleMapClick = (e) => {
		
		// Añado el marcador al mapa
		// create a HTML element for each feature
		const el = document.createElement('div');
		el.className = 'marker';
		// make a marker for each feature and add to the map
		marker?.remove();
		const popup = new mapboxgl.Popup({ offset: 25 }).setText(
			`Latitud:${featureLocation[1]};
			Longitud:${featureLocation[0]}`
		);
		const new_marker = new mapboxgl
		.Marker(el)
		.setLngLat(featureLocation)
		.setPopup(popup)
		.addTo(map.current)
		setMarker(/* ...markers, */new_marker);
		
		/* Guardo el punto en la db */
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "text/plain");

		var raw = `{\n    \"token\":\"${user[0].token}\",\n    \"latitud\":\"${featureLocation[1]}\",\n    \"longitud\":\"${featureLocation[0]}\"\n}`;

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://finalmarcadores.000webhostapp.com/puntos", requestOptions)
		.then(response => response.text())
		.catch(error => console.log('error', error));
		
	}
	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});
		map.current.doubleClickZoom.disable()
	},[]);

	useEffect(() => {
		if (user[0].latitud && user[0].longitud ) {
			const popup = new mapboxgl.Popup({ offset: 25 }).setText(
				`Latitud:${user[0].latitud};
				Longitud:${user[0].longitud}`
			);
			const el = document.createElement('div');
			el.className = 'marker';
			const new_marker = new mapboxgl
			.Marker(el)
			.setLngLat([user[0].longitud,user[0].latitud])
			.setPopup(popup)
			.addTo(map.current)
			setMarker(/* ...markers, */new_marker);
		}
	}, Object.values(user))
	

	useEffect(() => {
		map.current.on('mousemove', (e) => {
			setfeature([e.lngLat.wrap().lng,e.lngLat.wrap().lat])
		})
	},[])

	return (
		<div>
			<NavBar/>
			<div ref={mapContainer} className="map-container" onDoubleClick={handleMapClick} onTouchEnd={handleMapClick}/>
		</div>
	);
}
