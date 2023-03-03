import { useEffect, useState } from "react"
import Cross from '../assets/Cross.svg';
import axios from 'axios';

export default function Table() {
    const [idea, setIdea] = useState([]);
    const [popupData, setPopupData] = useState([]);
    const [visibility, setVisibility] = useState(true);
    const [tags, setTags] = useState("")

    // iegūst datus no servera
    useEffect(() => {
        axios.get('http://localhost:3004/ideas')
            .then(response => {
                setIdea(response.data);
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
    }, [popupData]);
      
    // atver popup logu attiecīgajai idejai
    const handleClick = event => {
        const ideaId = event.target.parentNode.dataset.ideaId;
        const clickedIdea = idea.find(idea => idea.Idea_ID === parseInt(ideaId));
        setPopupData(clickedIdea);
        setVisibility(false);
    }

    // atbild par popup loga aizvēršanu
    const handleClose = event => {
        setTags("")
        setPopupData([])
        setVisibility(true)
    }
    
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
                        {/* idejas meklēšanas lauks */}
                        <input name="search-idea" placeholder="Search for an Idea:" autoComplete="off" />
                        {/* Tag meklēšanas lauks */}
                        <input name="search-tags" placeholder="Search for Tags:" autoComplete="off" />
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
                        {idea.map(idea => (
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
    )
}