'use client'
import React, { useEffect } from 'react';
import Image from "next/image";
import { useState } from "react";

const GoogleMapAutoPlace = () => {
    const [postcode, setPostcode] = useState("");
    const [ken, setKen] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");

    const handleFindClick = async() => {
        try{
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${postcode},japan&key=)
            const data = await response.json();
            const { results } = data;
            console.log(data);
            if(results.length > 0) {
                const { address_components } = results[0];
                const kenComponent = address_components.find(component => component.types.includes('administrative_area_level_1'));
                const cityComponent = address_components.find(component => component.types.includes('locality'));
                const areaComponent = address_components.find(component => component.types.includes('sublocality_level_1'));

                // Updating state with fetched data
                if (kenComponent) setKen(kenComponent.long_name);
                if (cityComponent) setCity(cityComponent.long_name);
                if (areaComponent) setArea(areaComponent.long_name);

            }else {
                console.error('No results found for the given postcode.');

            }

        }catch(error){
            console.error('Error fetching data:', error);

        }
    }
    useEffect(() => {
        if(postcode) {
            handleFindClick();
        }
    }, [postcode]);
    return (
        <div>
            <h1 className='text-lg'>Auto Fill-up address</h1>

            <div className='p-2'>
                <label>Post Code</label>
                <input type="text" value={postcode} id='postCod' onChange={(e) => setPostcode(e.target.value)} />
                <button type='button'  onClick={handleFindClick}>Find</button>
            </div>
            <div className='p-2'>
                <label>Ken</label>
                <input type="text" name='ken' value={ken} readOnly />
            </div>
            <div className='p-2'>
                <label>City</label>
                <input type="text" name='city' value={city} readOnly/>
            </div>
            <div className='p-2'>
                <label>area</label>
                <input type="text" name='area' value={area} readOnly/>
            </div>
            
        </div>
    );
};

export default GoogleMapAutoPlace;
