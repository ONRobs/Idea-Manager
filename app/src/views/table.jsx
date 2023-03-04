import { useEffect, useState } from "react"
import Trash from '../assets/Trash.svg';
import Edit from '../assets/Edit.svg';
import Cross from '../assets/Cross.svg';
import axios from 'axios';

export default function Table() {
    const [idea, setIdea] = useState([]);
    const [tags, setTags] = useState("")
    // popup logam
    const [visibility, setVisibility] = useState(true);
    const [popupData, setPopupData] = useState([]);
    // meklēšanas laukiem
    const [searchIdea, setSearchIdea] = useState("");
    const [searchTags, setSearchTags] = useState("");
    const [filteredIdea, setFilteredIdea] = useState([]);
    // tabulas kārtošanai
    const [sort, setSort] = useState(null);

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

    // atbild par lauku kārtošanu tabulā
    const sortIdeaList = () => {
        const sortedIdea = [...filteredIdea];
        if (sort) {
            sortedIdea.sort((a, b) => {
                const columnA = a[sort.column];
                const columnB = b[sort.column];
                if (columnA < columnB) {
                    return sort.direction === 'asc' ? -1 : 1;
                } else if (columnA > columnB) {
                    return sort.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedIdea;
    }
    
    // atbild par to, pēc kura lauka tiek kārtots
    const handleSort = (column) => {
        const newSort = {
            column,
            direction: sort && sort.direction === 'asc' ? 'desc' : 'asc',
        };
        setSort(newSort);
    }
      
    // izmanto atgriezto sakārtoto tabulu
    useEffect(() => {
        setFilteredIdea(sortIdeaList());
    }, [idea, searchIdea, searchTags, sort]);
      

    return(
        <>
            {/* popup logs */}
            <div className={visibility ? 'popup-screen' : 'popup-screen visible'}>
                <div className="block-form">
                    <div>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <img src={Cross} alt="" className="cross" onClick={handleClose} />
                    </div>
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
                            <th onClick={() => handleSort('Idea')}>Idea</th>
                            <th>Tags</th>
                            <th onClick={() => handleSort('Date_Created')}>Date</th>
                            <th onClick={() => handleSort('Rating')}>Rating</th>
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
