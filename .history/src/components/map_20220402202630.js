import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import React, {useState, useEffect, useRef} from 'react'
import { Icon } from "leaflet";
import './map.css'

const Map = () =>{
    const [isDataSet, setIsDataSet] = useState(false)
    const [data, setData] = useState({
        ip: '  ',
                    location: {
                        region: ' ',
                        country: ' ',
                        timezone: ' '
                    }, 
                    isp: ' '
    })
    const [ip, setIp] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const url = 'https://geo.ipify.org/api/v2/country?apiKey=at_CK8ozFbsMUemLUqSUDkPMnb4n3C5t&ipAddress=' + ip
    const isMounted = useRef(false)
    
    let position = [9.081999, 8.675277]
    const getUserIp = () => {
        fetch('https://geolocation-db.com/json/')
        .then(response => {
            if (response.ok){
                return response.json()
            }
            throw response 
        } )
        .then(data => {
            console.log('get user ip: gotten')
            if (ip === null){
                
            setIp(data.IPv4)
        }
        })
        .catch(error => {
            console.log('get user Ip: error')
            setIp(null)
        })
    }

   const getUserInput = () => {
    fetch (url)
    .then(response => {
        if (response.ok){
            return response.json()
        }
        throw response 
    } )
    .then(data => {
        //console.log('get user input: gotten')
        setData(data)
        setIsDataSet(true)
        setInputValue('')
        //console.log(data, isDataSet)
        //checkHeight(null, isDataSet)
    })
    .catch(error => {
        console.log('get user input: error')
    })

   }

   const submitted = (e) => {
            e.preventDefault()
            setIp(inputValue)
            //console.log('submitted',inputValue, 'ip', ip)
            getUserInput(null)
}
    
   useEffect(
        () => {
                getUserIp()
        }, []
   )
                           // checkHeight('auto', isDataSet)

    useEffect(
        ()=>{
            getUserInput()
        }, [ip]
    )
   const setInput = (e) =>{
    setInputValue(e.target.value)
   }
   
    
   return(
        <div>
            <div className='first-box'>
                <p className='title'>IP Address Tracker</p>
                <form onSubmit={submitted}>
                    <input type='text' className='text' value={inputValue} onChange={setInput} placeholder='Search user IP or domain'/>
                    <input type='submit' value='>' className='submit'/>
                </form>
                
                <ul className='row container-fluid'>
                    <li className='col-sm-3'>
                        <p className='smaller-text'>ip address</p>
                            {isDataSet && <p className='regular-text' >{data.ip}</p>}
                        
                    </li>
                    <li className='col-sm-3'> 
                        <p className='smaller-text'>location</p>
                                {isDataSet && <p className='regular-text' > {data.location.region}, {data.location.country}</p>}
                    </li>
                    
                    <li className='col-sm-3'>
                        <p className='smaller-text'>timezone</p>
                                {isDataSet && <p className='regular-text' > UTC {data.location.timezone}</p>}
                    </li>
                    <li className='col-sm-3'>
                        <p className='smaller-text'>isp</p>
                                {isDataSet && <p className='regular-text' >{data.isp}</p>}
                    </li>
                </ul>
            </div>
            <div className='second-box'>
            <MapContainer center={[9.081999, 8.675277]} zoom={12}scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            </div>
        </div>
    )
}

export default Map;

