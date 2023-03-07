import { useEffect, useState } from "react";
import qs from 'query-string'
import axios from "axios";

// popup logs
import Popup from "../components/popup";

// izveido kolonnu virsrakstus
const HeaderCell = ({ column, sorting, sortTable }) => {
    // neļaus kārtot pēc Idea un Tags
    const isSortable = column !== "Idea" && column !== "Tags";
    // ja pēc kolonnas kārto, piešķir tam atbilstošo bultiņas un saglabā kārtošanas secību
    const isDescSorting = sorting.column === column && sorting.order === "desc";
    const isAscSorting = sorting.column === column && sorting.order === "asc";
    // ja th spiedīs vairākas reizes, mainīsies starp ascending un descending
    const futureSortingOrder = isDescSorting ? "asc" : "desc";
    
    // nosaka nākamo kārtošanas secību
    const handleClick = () => {
        if (isSortable) {
            sortTable({ column, order: futureSortingOrder });
        }
    };
  
    // izveido kolonnu headers
    return (
        <th onClick={handleClick}>
            {column === "Date_Created" ? "Date" : column}
            {/* piešķir vienu no divām bultiņām */}
            {isSortable && (
                <>
                    {isDescSorting && <span> ▼ </span>}
                    {isAscSorting && <span> ▲ </span>}
                </>
            )}
        </th>
    );
};
  
// atbild par pareizu tabulas kārtošanos
const Header = ({ columns, sorting, sortTable }) => {
    return(
        <thead>
            <tr>
                {columns.map((column) => (
                    <HeaderCell column={column} sorting={sorting} key={column} sortTable={sortTable} />
                ))}
            </tr>
        </thead>
    );
};

// no datubāzes ieliek tabulā datus
const Content = ({ entries, columns, setSelectedIdea, setVisibility }) => {  
    // atgriež vērtības, kuras izmantos popup komponentā
    const handleClick = (entry) => {
        setSelectedIdea(entry);
        setVisibility(true);
    };
    
    // ievieto tabulā datus
    return (
        <tbody>
            {entries.map((entry) => (
                <tr key={entry.Idea_ID}>
                    {columns.map((column) => (
                        <td
                            key={column}
                            // ja klikšina uz kolonnu, izpaudīsies handleClick funkcija
                            onClick={column === "Idea" ? () => handleClick(entry) : null}
                        >
                            {entry[column]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

// meklēšanas ievadlauku izveide
const SearchBar = ({ searchTable }) => {
    const [searchValue, setSearchValue] = useState({
        searchIdea: "",
        searchTags: "",
    });
    
    // mainoties lauku vērtībām, tiks saglabātas meklēšanas vērtības un tiks meklēts tabulā
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchValue((prevSearchValue) => ({
            ...prevSearchValue,
            [name]: value,
        }));
        searchTable({
            ...searchValue,
            [name]: value,
        });
    };
    
    // atgriež ievadlaukus
    return (
        <form>
            <div className="input-block">
                <input
                    type="text"
                    className="table-input"
                    placeholder="Search for an Idea:"
                    autoComplete="off"
                    name="searchIdea"
                    value={searchValue.searchIdea}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="table-input"
                    placeholder="Search for a Tag:"
                    autoComplete="off"
                    name="searchTags"
                    value={searchValue.searchTags}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};  

// atgriež tabulas lapu
export default function IdeaTable () {
    // kur tiks glabātas idejas
    const [idea, setIdea] = useState([]);
    // tabulas kārtošanas vērtības ar pamata vērtībām
    const [sorting, setSorting] = useState({column: 'Date_Created', order: 'desc'})
    // tabulas meklēšanas vērtības
    const [searchValue, setSearchValue] = useState({searchIdea: '', searchTags: ''})
    // izvēlētā ideja, kura tiks rādīta popup elementā
    const [selectedIdea, setSelectedIdea] = useState(null);
    // popup elementa redzamība
    const [visibility, setVisibility] = useState(false);
    // tabulas kolonnas
    const columns = ['Idea', 'Tags', 'Date_Created', 'Rating']
  
    // kārtošana
    const sortTable = (newSorting) => {
        setSorting(newSorting)
    }
    // meklēšana
    const searchTable = (newSearchValue) => {
        setSearchValue(newSearchValue)
    }
    // datu iegūšana no datubāzes
    useEffect(() => {
        // datubāzes query veidošana
        const query = qs.stringify({
            _sort: sorting.column,
            _order: sorting.order,
            idea_like: searchValue.searchIdea,
            tags_like: searchValue.searchTags,
        });
        // datubāzes url
        const url = `http://localhost:3004/ideas?${query}`;
        // datu iegūšana
        axios.get(url)
            .then(response => {
                setIdea(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [sorting, searchValue]);

    // kad visibility nomainās uz false, pārlādē tabulu
    useEffect(() => {
        if (!visibility) {
            const query = qs.stringify({
                _sort: sorting.column,
                _order: sorting.order,
                idea_like: searchValue.searchIdea,
                tags_like: searchValue.searchTags,
            });
            const url = `http://localhost:3004/ideas?${query}`;
            setIdea([]);
            async function fetchData() {
                const { data } = await axios.get(url);
                setIdea(data);
            }
            fetchData();
        }
    }, [sorting, searchValue, visibility]);
    
    // atgriež Popup, Meklēšanas laukus un tabulu
    return(
        <>
            <Popup visibility={visibility} setVisibility={setVisibility} selectedIdea={selectedIdea} />
            <div className="block-table">
                <SearchBar searchTable={searchTable}/>
                <div className="scrollbar" style={{position: "absolute", height: "85%"}}>
                    <table>
                        <Header columns={columns} sorting={sorting} sortTable={sortTable} />
                        <Content entries={idea} columns={columns} setSelectedIdea={setSelectedIdea} setVisibility={setVisibility} />
                    </table>
                </div>
            </div>
        </>
    );
}