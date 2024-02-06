"use client"
import React, { useState, useEffect } from 'react';

function PostcodeLookup() {
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [prefecture, setPrefecture] = useState('');
    const [error, setError] = useState('');

    const handlePOstcodeChange = (event) =>{
        setPostcode(event.target.value);
    };
    useEffect(() => {
        const fetchLOcationData = async () =>{
            try{
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode},Japan&key=`);
                const data = await response.json();
                console.log(data)
                if(data.status == 'OK') {
                    const addressComponents = data.results[0].address_components;
                    const cityComponent = addressComponents.find(component => component.types.includes('locality'));
                    const prefectureComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));

                    if(cityComponent && prefectureComponent) {
                        const city = cityComponent.long_name;
                        const prefecture = prefectureComponent.long_name;
                        setCity(city);
                        setPrefecture(prefecture);
                        setError('');
                    }else{
                        setError('City or prefecture not found.');
                    }

                }else{
                    setError('Invalid response from server.');

                }


            }catch(error){
                setError('Error fetching location data.');
            }
        };
        fetchLOcationData();    
    }, [postcode]);

    return (
        <div>
            <label htmlFor='postcode'>Enter PostCode:</label>
            <input type='text'  id='postcode' value={postcode} onChange={handlePOstcodeChange}/>
            {error && <p>Error: {error}</p>}
            {city && prefecture && !error && (
                <p>
                    City: {city}, Prefecture : {prefecture}
                </p>
            )}
        </div>
    )
}

export default PostcodeLookup;
