import { useEffect, useState } from "react"
import Cross from '../assets/Cross.svg';
import axios from 'axios';

export default function Table() {
    const [idea, setIdea] = useState([]);
    const [popupData, setPopupData] = useState([]);
    const [visibility, setVisibility] = useState(true);
    const [tags, setTags] = useState("")
    const [searchIdea, setSearchIdea] = useState("");
    const [searchTags, setSearchTags] = useState("");
    const [filteredIdea, setFilteredIdea] = useState([]);

    // iegūst datus no servera
    useEffect(() => {
        axios.get('http://localhost:3004/ideas')
            .then(response => {
                setIdea(response.data);
                setFilteredIdea(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // formatē Tag vērtības, lai tās būtu atdalītas ar ", " popup logā
    useEffect(() => {
        if (popupData && popupData.Tags) {
          setTags(popupData.Tags.split(",").map(tag => tag.trim()).join(", "));
        }
    }, [popupData, filteredIdea]);

    // atver popup logu attiecīgajai idejai
    const handleClick = event => {
        const ideaId = event.target.parentNode.dataset.ideaId;
        const clickedIdea = filteredIdea.find(idea => idea.Idea_ID === parseInt(ideaId));
        setPopupData(clickedIdea);
        setVisibility(false);
    }

    // atbild par popup loga aizvēršanu
    const handleClose = event => {
        setTags("")
        setPopupData([])
        setVisibility(true)
    }

    // filtrē ideju sarakstu pēc meklēšanas vērtībām
    useEffect(() => {
        let newFilteredIdea = idea;
        if (searchIdea !== "") {
            newFilteredIdea = newFilteredIdea.filter(
                idea => idea.Idea.toLowerCase().includes(searchIdea.toLowerCase())
            );
        }
        if (searchTags !== "") {
            newFilteredIdea = newFilteredIdea.filter(
                idea => idea.Tags.toLowerCase().includes(searchTags.toLowerCase())
            );
        }

        setFilteredIdea(newFilteredIdea);
    }, [idea, searchIdea, searchTags]);

    // atbild par Idea meklēšanas ievadlauka izmaiņām
    const handleSearchChange = event => {
        setSearchIdea(event.target.value);
    };

    // atbild par Tag meklēšanas ievadlauka izmaiņām
    const handleTagSearchChange = event => {
        setSearchTags(event.target.value);
    };

    return(
        <>
            {/* popup logs */}
            <div className={visibility ? 'popup-screen' : 'popup-screen visible'}>
                <div className="block-form">
                    <img src={Cross} alt="" className="cross" onClick={handleClose} />
                    <div className="heading sub-heading bold-italic">{popupData.Idea}</div>
                    <p className="text">{popupData.Description}</p>
                    <div className="text">Tags: {tags}</div>
                    <div className="text">Rating: {popupData.Rating}</div>
                    <div className="text">Date created: {popupData.Date_Created}</div>
                </div>
            </div>
            <div className="block-table">
                <form>
                    <div className="input-block">
                        {/* Idea meklēšanas lauks */}
                        <input 
                            name="search-idea" 
                            placeholder="Search for an Idea:" 
                            autoComplete="off"
                            value={searchIdea}
                            onChange={handleSearchChange}
                        />
                        {/* Tag meklēšanas lauks */}
                        <input 
                            name="search-tags" 
                            placeholder="Search for Tags:" 
                            autoComplete="off" 
                            value={searchTags}
                            onChange={handleTagSearchChange}
                        />
                    </div>
                </form>

                <table>
                    {/* tabulas kolonnu virsraksti */}
                    <thead>
                        <tr>
                            <th>Idea</th>
                            <th>Tags</th>
                            <th>Date</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    {/* tabulas rindas */}
                    <tbody>
                        {filteredIdea.map(idea => (
                            <tr key={idea.Idea_ID} data-idea-id={idea.Idea_ID}>
                                <td onClick={handleClick}>{idea.Idea}</td>
                                <td>{idea.Tags.split(",").map(tag => tag.trim()).join(", ")}</td>
                                <td>{idea.Date_Created}</td>
                                <td>{idea.Rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
