import { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import ApiItem from "./components/ApiItem/ApiItem";
import Alert from "./components/Alert/Alert";

import "./style.scss";

function App() {
  const [search, setSearch] = useState("");
  const [apis, setApis] = useState([]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setApis(data)
      );
  }, []);

  const bookmarks = apis.filter((api) => api.bookmark === true);
  const filteredApis = apis.filter((api) =>
    api.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBookmark = (id) => {
    setApis(
      apis.map((api) => {
        if (api.id === id) {
          api.bookmark = !api.bookmark;
        }
        return api;
      })
    );
  };

  return (
    <div className="App">
      <h3>
        A collective list of free APIs for use in <br /> software and web
        development.
      </h3>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Find development, games, images APIs"
      />
      <div className="container">
        <h4>Featured APIs of this week</h4>
        <div className="api-list">
          {filteredApis.map((api) => (
            <ApiItem toggleBookmark={toggleBookmark} key={api.id} data={api} />
          ))}
          {filteredApis.length === 0 && <Alert message="API not found." />}
        </div>
      </div>
      <div className="container">
        <h4>Your Bookmarks</h4>
        <div className="api-list">
          {bookmarks.map((api) => (
            <ApiItem toggleBookmark={toggleBookmark} key={api.id} data={api} />
          ))}
          {bookmarks.length === 0 && (
            <Alert message="There is no item on your bookmarks" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
