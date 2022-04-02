import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import React, {useState, useEffect, useRef} from 'react'
import { Icon } from "leaflet";
import './map.css'

const Map = () =>{
    const [isDataSet, setIsDataSet] = useState(false)
    const checkHeight = (string, dataSet) => {
        console.log('here', dataSet, newHeight.height !== null)
        if(dataSet || newHeight.height !== null){
                let value = string
                if(value !== null){
                    setNewHeight({height: value})
                    console.log(value)
                   }
                let heights = []
                let list = [...document.querySelectorAll('.regular-text')];
                console.log('list', list)
                list.map(item => {
                    console.log(item.offsetHeight)
                    return heights = [...heights, item.offsetHeight]
                })
               
                value = Math.max(...heights)
                setNewHeight({height: value + 'px'})
        }
       }
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
    const [newHeight, setNewHeight] = useState({height: null})
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

    console.log(ip===null, isDataSet)

   const getUserInput = () => {
    console.log('get user input function', 'ip', ip)
    fetch (url)
    .then(response => {
        if (response.ok){
            return response.json()
        }
        throw response 
    } )
    .then(data => {
        console.log('get user input: gotten')
        setData(data)
        setIsDataSet(true)
        setInputValue('')
        console.log(data)
        checkHeight(null, isDataSet)
    })
    .catch(error => {
        console.log('get user input: error')
    })

   }

   const submitted = (e) => {
            e.preventDefault()
            setIp(inputValue)
            console.log('submitted',inputValue, 'ip', ip)
            getUserInput(null)
}
    
   useEffect(
        () => {
                getUserIp()
                checkHeight(null, isDataSet)
                window.addEventListener('resize', () => {
                    setTimeout(
                        () => {
                            checkHeight('auto', isDataSet)
                            console.log(newHeight, isDataSet)
                        }, 150
                    )
                })
            
        }, []
   ) 

    useEffect(
        ()=>{
            getUserInput()
            console.log('2nd useEffect, on ip change', 'ip', ip)
            checkHeight(null, isDataSet)
        }, [ip]
    )
    useEffect(
        () => {
            console.log('isdataset useeffect')
            checkHeight(null, isDataSet)
        }, [isDataSet, data, ip]
    )
   const setInput = (e) =>{
    setInputValue(e.target.value)
   }
   
   
   console.log(isDataSet, newHeight) 
    
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
                            {isDataSet && <p className='regular-text' style={newHeight}>{data.ip}</p>}
                        
                    </li>
                    <li className='col-sm-3'> 
                        <p className='smaller-text'>location</p>
                                {isDataSet && <p className='regular-text' style={newHeight}> {data.location.region}, {data.location.country}</p>}
                    </li>
                    
                    <li className='col-sm-3'>
                        <p className='smaller-text'>timezone</p>
                                {isDataSet && <p className='regular-text' style={newHeight}> UTC {data.location.timezone}</p>}
                    </li>
                    <li className='col-sm-3'>
                        <p className='smaller-text'>isp</p>
                                {isDataSet && <p className='regular-text' style={newHeight}>{data.isp}</p>}
                    </li>
                </ul>
            </div>
            <div className='second-box'>
            <MapContainer center={[48.8584, 2.2945]} zoom={12}scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
            </div>
        </div>
    )
}

export default Map;

