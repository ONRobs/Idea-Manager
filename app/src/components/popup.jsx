import axios from 'axios';
// ikonas
import Trash from '../assets/Trash.svg';
import Edit from '../assets/Edit.svg';
import Cross from '../assets/Cross.svg';

export default function Popup({ visibility, setVisibility, selectedIdea }) {
    // aizver popup logu, kad nospiests Cross
    const handleClose = () => {
        setVisibility(false);
    };
  
    // izdzēš attiecīgo lauku datubāzē, kad nospiests Trash
    const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:3004/ideas/${selectedIdea.Idea_ID}`);
          setVisibility(false);
        } catch (error) {
          console.log(error);
        }
      };      

    return(
        <>
            {/* pārbauda vai visibility ir true, un ja ir, parāda popup logu */}
            <div className={visibility ? 'popup-screen visible' : 'popup-screen'}>

                <div className="block-form scrollbar">
                    <div className="icon-wrapper">
                        <img src={Cross} alt="" className="cross" onClick={handleClose} />
                    </div>
                    {/* no datubāzes iegūtie dati */}
                    <div>
                        <div className="icon-wrapper">
                            <div className="heading sub-heading bold-italic">{selectedIdea?.Idea}</div>
                            <img src={Trash} alt="" className="icon" onClick={handleDelete}/>
                        </div>
                        <p className="text">{selectedIdea?.Description}</p>
                        <div className="text">Tags: {selectedIdea?.Tags}</div>
                        <div className="text">Rating: {selectedIdea?.Rating}</div>
                        <div className="text">Date created: {selectedIdea?.Date_Created}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
