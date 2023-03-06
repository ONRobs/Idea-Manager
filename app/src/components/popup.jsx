// ikonas
import Trash from '../assets/Trash.svg';
import Edit from '../assets/Edit.svg';
import Cross from '../assets/Cross.svg';

export default function Popup({ visibility, setVisibility, selectedIdea }) {
    // aizver popup logu, kad nospiests Cross
    const handleClose = () => {
        setVisibility(false);
    };
  
    return(
        <>
            {/* pārbauda vai visibility ir true, un ja ir, parāda popup logu */}
            <div className={visibility ? 'popup-screen visible' : 'popup-screen'}>

                <div className="block-form scrollbar">
                    {/* ikonu rinda */}
                    <div className="icon-wrapper">
                        <div>
                            <img src={Trash} alt="" className="icon"/>
                            <img src={Edit} alt="" className="icon"/>
                        </div>
                        <img src={Cross} alt="" className="cross" onClick={handleClose} />
                    </div>
                    {/* no datubāzes iegūtie dati */}
                    <div>
                        <div className="heading sub-heading bold-italic">{selectedIdea?.Idea}</div>
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
