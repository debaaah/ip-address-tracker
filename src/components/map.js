import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, {useState, useEffect} from 'react'
import { Icon } from "leaflet";
import './map.css'

const Map = () =>{
    const [data, setData] = useState({
        ip: '...',
                    location: {
                        region: '...',
                        country: '...',
                        timezone: '...'
                    }, 
                    isp: '...'
    })
    const [ip, setIp] = useState()
    const [inputValue, setInputValue] = useState('')
    const url = 'https://geo.ipify.org/api/v2/country?apiKey=at_CK8ozFbsMUemLUqSUDkPMnb4n3C5t&ipAddress=' + ip
    
    const getUserIp = () => {
        fetch('https://geolocation-db.com/json/')
        .then(response => {
            if (response.ok){
                return response.json()
            }
            throw response 
        } )
        .then(data => {
            console.log(data)
            setIp(data.IPv4)
        })
        .catch(error => {
            console.log(error)
            setIp('')
        })
    }
    
   const getUserInput = () => {
    console.log('here function', url)
    fetch (url)
    .then(response => {
        if (response.ok){
            return response.json()
        }
        throw response 
    } )
    .then(data => {
        console.log(data)
        setData(data)
        setInputValue('')
    })
    .catch(error => {
        console.log(error)
    })
   }

   const submitted = (e) => {
    e.preventDefault()
    console.log('submitted')
    setIp(inputValue)
    getUserInput()
}
   useEffect(
        () => {
            getUserInput()
            getUserIp()
        }, []
   )
   const setInput = (e) =>{
    setInputValue(e.target.value)
   }
   return(
        <div>
            <div className='first-box'>
                <p className='title'>IP Address Tracker</p>
                <form onSubmit={submitted}>
                    <input type='text' className='text' value={inputValue} onChange={setInput}/>
                    <input type='submit' value='>' className='submit'/>
                </form>
                
                <ul className='row container-fluid'>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>ip address</p>
                            <p className='regular-text'>{data.ip}</p>
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>location</p>
                            <p className='regular-text'>{data.location.region}, {data.location.country}</p>
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>timezone</p>
                            <p className='regular-text'>UTC {data.location.timezone}</p>
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>isp</p>
                            <p className='regular-text'>{data.isp}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='second-box'>
            <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[45.4, -75.7]}>
                    <Popup>location</Popup>
                </Marker>
            </MapContainer>
            </div>
        </div>
    )
}

export default Map;
/*
<ul className='row container-fluid'>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>ip address</p>
                            <p className='regular-text'>{data.ip}</p>
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>location</p>
                            <p className='regular-text'>{data.location.region}, {data.location.country}</p>
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>timezone</p>
                            <p className='regular-text'>UTC {data.location.timezone}</p>
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>isp</p>
                            <p className='regular-text'>{data.isp}</p>
                        </div>
                    </li>
                </ul>
*/