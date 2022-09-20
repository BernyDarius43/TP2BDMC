import React, {useState} from "react";
import {serveur} from "./constantes";
import Podcast from "./Podcast"
export function SearchFilter() {
    const [searchs, setSearchs] = useState([]);
    const [mots, setMots] = useState('');

    
      async function componentDidMount() {          
          // Il faut fetch le terme du search      
        
        let urlSearchs = `${serveur}/podcasts/search/${mots}`;
        let resultatSearchs = await fetch(urlSearchs);
        if (resultatSearchs.ok) {
          let data = await resultatSearchs.json();
          setSearchs(data)
          console.log(searchs)
          //setPodcasts(searchs)
          
        } else {
          console.log("une erreur s'est produite lors de l'appel");
        }
      }

    function handleChangeSearch(event) {
        setMots(event.target.value)
        //props.setSearchFilter(event.target.value);
      }

      return (
      <div className="field-body">
        <div className="field">
          <div className="control" >
          <h1 className="title is-4 has-text-centered"> Search </h1>
            <form id="form" className="columns is-horizontal is-centered mb-5" > 
               
                <input type="text" value={mots} onChange={handleChangeSearch} id="mots" name="mots" placeholder="Search..."></input>
                <button type="button" onClick={componentDidMount}  className="button is-info"><i className="fas fa-search"> Search </i></button>
            </form>
          </div>
          <div className="row columns is-multiline">
        {
          searchs.map((s) => {
            return <Podcast podcast={s} key={s.podcastId}/>;
          })
        }
      </div>
        </div>
      </div>);
}