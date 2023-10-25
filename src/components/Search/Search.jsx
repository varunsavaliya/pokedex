import useDebounce from "../../hooks/useDebounce";
import "./Search.css";
function Search({searchText, handleSearch}) {
  const debouncedCallback = useDebounce((e) => handleSearch(e.target.value))
  return (
    <div className="search-wrapper my-2">
      <input id="pokemon-name-search" value={searchText}  onChange={debouncedCallback} type="text" placeholder="Pokemon name" />
    </div>
  );
}

export default Search;
