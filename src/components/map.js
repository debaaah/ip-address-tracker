import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, {useState, useEffect, useRef} from 'react'
import Geocode from 'react-geocode'
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
    const [ip, setIp] = useState('146.112.128.150')
    const [inputValue, setInputValue] = useState('')
    const [newPosition, setNewPosition] = useState()
    const [latAndLong, setLatAndLong] = useState({lat: '48.8584', long: '2.2945'})
    const url = 'https://geo.ipify.org/api/v2/country?apiKey=at_CK8ozFbsMUemLUqSUDkPMnb4n3C5t&ipAddress=' + ip
    const isMounted = useRef(false)
   
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
            getUserInput()
        })
        .catch(error => {
            console.log('user Ip error', error)
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
        //setNewPosition(data.location.region + ', ' + data.location.country)
        getGeocode(data.location.region, data.location.country)
    })
    .catch(error => {
        console.log(error)
    })
   }

   console.log(latAndLong.lat, latAndLong.long)
   
   const submitted = (e) => {
            e.preventDefault()
            console.log('submitted')
            setIp(inputValue)
            getUserInput()
            getGeocode()
}

    const getGeocode = (region, country) =>{

        const newLocation = region + ', ' + country
        Geocode.setLanguage('en')
        Geocode.fromAddress(newLocation ).then(
        (response) => {
            console.log(response.results[0].geometry.location)
            const {latitude, longitude} = response.results[0].geometry.location
            setLatAndLong({['lat']: latitude, ['long']: longitude})
            console.log(latAndLong.lat, latAndLong.long)
        },
        (error) => {
            console.log('geocode error', error)
        })
    }
    
   useEffect(
        () => {
            isMounted.current = true
            if(isMounted) {
                console.log(isMounted)
                getUserIp()
                getUserInput()
            }
            //return isMounted = false
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
                    <input type='text' className='text' value={inputValue} onChange={() => setInput}/>
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
            <MapContainer center={[48.8584, 2.2945]} zoom={12}scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[48.8584, 2.2945]}>
                    <Popup>location</Popup>
                </Marker>
            </MapContainer>
            </div>
        </div>
    )
}

export default Map;
