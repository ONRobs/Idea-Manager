import { useState } from "react"
import Cross from '../assets/Cross.svg';
  
const idea = {
    idea: "A project management app.",
    description: "An app that lets you write down ideas and rate them a couple days after you have written them. It will then take the rating and tags into account and sort them all neatly! :)",
    date_created: "2023-02-21",
    rating: 9
}

const startNewIdeaValue = {
    idea: "",
    description: "",
    date_created: "",
    rating: 0
}

export default function Table() {
    const [visibility, setVisibility] = useState("false");

    const handleClick = event => {
        setVisibility(current => !current);
      };
    
    const [newIdeaValue, setNewIdeaValue] = useState(startNewIdeaValue)
    
    return(
        <>
            {/* popup logs */}
            <div className={visibility ? 'popup-screen' : 'popup-screen  visible'}>
                <div className="block-form">
                    {/* "x" poga */}
                    <img src={Cross} alt="" className="cross" onClick={handleClick}/>
                    {/* Virsraksts */}
                    <div className="heading sub-heading bold-italic">{idea.idea}</div>
                    {/* Teksts */}
                    <p className="text">{idea.description}</p>
                    {/* vērtējums */}
                    <div className="text">Rating: {idea.rating}</div>
                    {/* datums */}
                    <div className="text">Date created: {idea.date_created}</div>
                </div>
            </div>
            <div className="block_table">
                <form>
                    {/* Jaunas idejas poga */}
                    <div className="input-block">
                        <input type="button" value="Add New Idea" />
                    </div>
                    <div className="input-block">
                        {/* idejas meklēšanas lauks */}
                        <input name="search-idea" placeholder="Search for an Idea:" autoComplete="off" />
                        {/* Tag meklēšanas lauks */}
                        <input name="search-tags" placeholder="Search for Tags:" autoComplete="off" />
                    </div>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Idea</th>
                            <th>Tags</th>
                            <th>Date</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={handleClick}>{idea.idea}</td>
                            <td>School, Work</td>
                            <td>{idea.date_created}</td>
                            <td>{idea.rating}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}