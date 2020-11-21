import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { GiKnifeFork, GiHomeGarage, GiSofa } from 'react-icons/gi';
import { FaBed, FaBath } from 'react-icons/fa';
import { Map, TileLayer, Popup, Marker, } from 'react-leaflet';
import { Link } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/map-imoveis.css';
import mapIcon from '../utils/mapIcon';

import api from '../api/service';
import { maxHeaderSize } from 'http';

interface Property {
    id_property: number;
    lat: number;
    lon: number;
    title: string;
    url: string;
    property_contract: boolean;
    children: boolean;
    pets: boolean;
    individual: boolean;
    energy: boolean;
    water: boolean;
    monthly_payment: number;
    deposit: number;
    room: number;
    bedroom: number;
    kitchen: number;
    bathroom: number;
    garage: number;
    full_name: string;
    cpf: number;
    email: string;
    telephone: number;
    whatsapp: number;
    facebook: string
    instagram: string
    zipcode: number;
    street: string;
    address_number: number;
    neighborhood: string;
    city: string;
    state: string;
    images_property: string;

}




function MapImoveis() {

    const [propertys, setPropertys] = useState<Property[]>([]);

    useEffect(() => {
        api.get('').then(response => {
            setPropertys(response.data);
        });
    }, []);
    console.log(propertys)
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um imovel mapa</h2>
                    <p>Muitos Imoveis estão esperando a sua visita para alugar</p>
                </header>

                <footer>
                    <strong>
                        São Paulo
                        </strong>
                    <span> São Paulo</span>
                </footer>
            </aside>

            <Map
                center={[-23.7285722, -46.7585595]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}

            >
                {/* mapa do openstreetmap */}
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />     */}
                <TileLayer
                    // mapa do MapBox litgh-v10
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                

                {propertys.map(property => {
                 const images = property.images_property;
                 const listImages = images.split(',');
                          
                    return (
                        <Marker
                            key={property.id_property}
                            icon={mapIcon}
                            position={[property.lat, property.lon]}
                        >
                            

                            <Popup closeButton={true} className="map-popup">
                                <h1>{property.title}</h1>

                                <img className="img" src={`https://youlikedigital.com.br/iluguel/images/${property.url}`} alt="Imagens do imovel" />
                                <h1>{property.street}, {property.address_number}</h1>
                                <div className="comodos-icons">
                                    <p>  <GiSofa className="icons" ></GiSofa>  {property.room}</p>
                                    <p>  <FaBed className="icons" ></FaBed>  {property.bedroom}</p>
                                    <p>  <FaBath className="icons" ></FaBath> {property.bathroom}</p>
                                    <p> <GiKnifeFork className="icons" > </GiKnifeFork> {property.kitchen}</p>
                                    <p> <GiHomeGarage className="icons" > </GiHomeGarage> {property.garage}</p>
                                    <p>{listImages}</p>
                                </div>

                            </Popup>

                        </Marker>
                    )

                })}

            </Map>

            {/* <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"> </FiPlus>
            </Link> */}

        </div>
    )

}

export default MapImoveis;