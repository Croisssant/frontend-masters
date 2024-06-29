import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import AdoptedPetContext from "./AdoptedPetContext";

const SearchParams = () => {
    
    // const [location, setLocation] = useState("");
    // const [breed, setBreed] = useState("");
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });
    const [animal, setAnimal] = useState("");
    // const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);
    const [adoptedPet, _] = useContext(AdoptedPetContext);

    // useEffect(() => {
    //     requestPets();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // async function requestPets() {
    //     const res = await fetch(
    //         `http://pets-v2.dev-apis.com/pets?animal=${animal}&
    //         location=${location}&breed=${breed}`
    //     );
    //     const json = await res.json();
    //     setPets(json.pets);
    // }

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];
    
    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                //requestPets();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                }

                setRequestParams(obj);
            }}>
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null
                }
                <label htmlFor="location">
                    Location
                    <input 
                        name="location"
                        // onChange={(e) => setLocation(e.target.value)} 
                        id="location" 
                        // value={location} 
                        placeholder="Location" 
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value)
                            //setBreed("");
                        }}>
                        <option />
                        {ANIMALS.map(animal => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option> 
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                    id="breed"
                    disabled={breeds.length === 0}
                    //value={breed}
                    name="breed"
                    // onChange={(e) => {
                    //     setBreed(e.target.value)
                    // }}
                    >
                        <option />
                        {breeds.map(breed => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
                <Results pets={pets} />
        </div>
    );
};

export default SearchParams;