import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import React, {useState, useEffect, useRef} from 'react'
import { Icon } from "leaflet";
import './map.css'

const Map = () =>{
    const [isDataSet, setIsDataSet] = useState(false)
<<<<<<< HEAD
    /*const checkHeight = (string, dataSet) => {
=======
    const checkHeight = (string, dataSet) => {
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
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
<<<<<<< HEAD
                value = Math.max(...heights)
                setNewHeight({height: value + 'px'})
        }
       }*/
=======
               
                value = Math.max(...heights)
                setNewHeight({height: value + 'px'})
        }
       }
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
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
<<<<<<< HEAD
    //const [newHeight, setNewHeight] = useState({height: null})
    let position = [9.081999, 8.675277]
=======
    const [newHeight, setNewHeight] = useState({height: null})
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
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
<<<<<<< HEAD
                
=======
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
            setIp(data.IPv4)
        }
        })
        .catch(error => {
            console.log('get user Ip: error')
            setIp(null)
        })
    }

<<<<<<< HEAD
   const getUserInput = () => {
=======
    console.log(ip===null, isDataSet)

   const getUserInput = () => {
    console.log('get user input function', 'ip', ip)
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
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
<<<<<<< HEAD
        console.log(data, isDataSet)
        //checkHeight(null, isDataSet)
=======
        console.log(data)
        checkHeight(null, isDataSet)
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
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
<<<<<<< HEAD
                //checkHeight(null, isDataSet)
                window.addEventListener('resize', () => {
                    setTimeout(
                        () => {
=======
                checkHeight(null, isDataSet)
                window.addEventListener('resize', () => {
                    setTimeout(
                        () => {
                            checkHeight('auto', isDataSet)
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
                            console.log(newHeight, isDataSet)
                        }, 150
                    )
                })
            
        }, []
   ) 
<<<<<<< HEAD
                           // checkHeight('auto', isDataSet)
=======
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9

    useEffect(
        ()=>{
            getUserInput()
<<<<<<< HEAD
        }, [ip]
    )
=======
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
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
   const setInput = (e) =>{
    setInputValue(e.target.value)
   }
   
<<<<<<< HEAD
    
=======
   
   console.log(isDataSet, newHeight)
   
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
   return(
        <div>
            <div className='first-box'>
                <p className='title'>IP Address Tracker</p>
                <form onSubmit={submitted}>
<<<<<<< HEAD
                    <input type='text' className='text' value={inputValue} onChange={setInput} placeholder='Search user IP or domain'/>
=======
                    <input type='text' className='text' value={inputValue} onChange={setInput}/>
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
                    <input type='submit' value='>' className='submit'/>
                </form>
                
                <ul className='row container-fluid'>
                    <li className='col-sm-3'>
                        <p className='smaller-text'>ip address</p>
<<<<<<< HEAD
                            {isDataSet && <p className='regular-text' >{data.ip}</p>}
=======
                            {isDataSet && <p className='regular-text' style={newHeight}>{data.ip}</p>}
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
                        
                    </li>
                    <li className='col-sm-3'> 
                        <p className='smaller-text'>location</p>
<<<<<<< HEAD
                                {isDataSet && <p className='regular-text' > {data.location.region}, {data.location.country}</p>}
=======
                                {isDataSet && <p className='regular-text' style={newHeight}> {data.location.region}, {data.location.country}</p>}
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
                    </li>
                    
                    <li className='col-sm-3'>
                        <p className='smaller-text'>timezone</p>
<<<<<<< HEAD
                                {isDataSet && <p className='regular-text' > UTC {data.location.timezone}</p>}
                    </li>
                    <li className='col-sm-3'>
                        <p className='smaller-text'>isp</p>
                                {isDataSet && <p className='regular-text' >{data.isp}</p>}
=======
                                {isDataSet && <p className='regular-text' style={newHeight}> UTC {data.location.timezone}</p>}
                    </li>
                    <li className='col-sm-3'>
                        <p className='smaller-text'>isp</p>
                                {isDataSet && <p className='regular-text' style={newHeight}>{data.isp}</p>}
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
                    </li>
                </ul>
            </div>
            <div className='second-box'>
<<<<<<< HEAD
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
=======
            <MapContainer center={[48.8584, 2.2945]} zoom={12}scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
            </MapContainer>
            </div>
        </div>
    )
}

export default Map;

<<<<<<< HEAD
=======
/**
 *    <li className='col-sm-3'>
                    <p className='smaller-text'>ip address</p>
                            {isDataSet && <p className='regular-text'>{data.ip}</p>}
                        <div>
                            
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>location</p>
                            {isDataSet && <p className='regular-text'> {data.location.region}, {data.location.country}</p>}
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>timezone</p>
                            {isDataSet && <p className='regular-text'> UTC {data.location.timezone}</p>}
                        </div>
                    </li>
                    <li className='col-sm-3'>
                        <div>
                            <p className='smaller-text'>isp</p>
                            {isDataSet && <p className='regular-text'>{data.isp}</p>}
                        </div>
                    </li>
                </ul>
 * 
 */
>>>>>>> 5683f1057b0d112b2e2be3e3ae192d1734303df9
