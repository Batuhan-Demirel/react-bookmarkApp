import React from 'react'
import "./search.scss"
import {GrSearch} from "react-icons/gr"

const Search = ({placeholder,search,setSearch}) => {
    return (
        <form className="api-search-form">
        <div className="icon">
        <GrSearch />
        </div>
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={placeholder}/>
      </form>
    )
}

export default Search;
