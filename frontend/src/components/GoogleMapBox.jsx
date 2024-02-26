// Geocode docs: https://www.npmjs.com/package//react-geocode

import globalService from '../features/global/globalService'
import { setKey, fromAddress } from 'react-geocode'
import {
    APIProvider,
    AdvancedMarker,
    Map,
    Pin,
} from '@vis.gl/react-google-maps'
import Spinner from './Spinner'

import { useState, useEffect } from 'react'

function GoogleMapBox({ address }) {
    let [latLong, setLatLong] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let position = { lat: latLong[0], lng: latLong[1] }
    setKey(globalService.GOOGLE_MAPS_KEY)

    useEffect(() => {
        fromAddress(address).then(({ results }) => {
            let { lat, lng } = results[0].geometry.location
            setLatLong([lat, lng])
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <Spinner />

    return (
        <APIProvider apiKey={globalService.GOOGLE_MAPS_KEY}>
            <div className='map'>
                <Map
                    zoom={15}
                    center={position}
                    mapId={globalService.GOOGLE_MAP_ID}
                    disableDefaultUI={true}
                >
                    <AdvancedMarker position={position}>
                        <Pin
                            background={'#8650d4'}
                            borderColor={'#fff'}
                            glyphColor={'#ecf7ff'}
                            scale={1.5}
                        />
                    </AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    )
}

export default GoogleMapBox
