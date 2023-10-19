import "./Search.css";
function Search({searchText, handleSearch}) {
  return (
    <div className="search-wrapper my-2">
      <input id="pokemon-name-search" value={searchText}  onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Pokemon name" />
    </div>
  );
}

export default Search;
