import { useState } from "react"
import Cross from './media/Cross.svg';

export default function Table() {
    const [visibility, setVisibility] = useState("false");

    function test() {
        console.log(123)
    }

    const handleClick = event => {
        setVisibility(current => !current);
      };

    return(
        <>
            {/* popup logs */}
            <div className={visibility ? 'popup-screen' : 'popup-screen  visible'}>
                <div className="block-form">
                    {/* "x" poga */}
                    <img src={Cross} alt="" className="cross" onClick={handleClick}/>
                    {/* Virsraksts */}
                    <div className="heading sub-heading bold-italic">A project management app.</div>
                    {/* Teksts */}
                    <p className="text">An app that lets you write down ideas and rate them a couple days after you have written them. It will then take the rating and tags into account and sort them all neatly! :)</p>
                    {/* vērtējums */}
                    <div className="text">Rating: 9</div>
                    {/* datums */}
                    <div className="text">Date created: 21.02.2023.</div>
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
                            <th onClick={test}>Date</th>
                            <th onClick={test}>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={handleClick}>A project management app.</td>
                            <td>School, Work</td>
                            <td>21.02.2023.</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>A game about cooking in a world of monsters.</td>
                            <td>Games, Creative</td>
                            <td>11.11.2022.</td>
                            <td>6</td>
                        </tr>
                        <tr>
                            <td>A joke about kittens.</td>
                            <td>Jokes, Creative, Cats</td>
                            <td>16.10.2022.</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>A story about a post-apocalyptic game show.</td>
                            <td>Stories, Creative</td>
                            <td>21.02.2023.</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}