import React, {useEffect, useState, useContext} from "react";
import {serveur} from "./constantes";
import { TokenContext } from "./App";
import Podcast from "./Podcast.js";


export function Subscriptions() {
    const [favoritesPodcasts, setFavoritesPodcasts] = useState([]);
    const lecontext = useContext(TokenContext);
    let bearerToken = `bearer ${lecontext.access_token}` || null;


    useEffect(() => {
        async function componentDidMount() {
          // obtenir les podcast favoris
          let urlFavoritesPodcasts = `${serveur}/subscriptions`;
          let resultatFavoritesPodcasts = await fetch(urlFavoritesPodcasts, {
            method: "GET",
            headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
            }
           });
          if (resultatFavoritesPodcasts.ok) {
            let data = await resultatFavoritesPodcasts.json();
            setFavoritesPodcasts(data)
            console.log(data)
          } else {
            console.log("une erreur s'est produite lors de l'appel à /subsriptions");
            console.log(resultatFavoritesPodcasts)
          }
        }
    
        componentDidMount().then(() => console.log("componentDidMount terminé"));
        console.log("favoritesPodcasts.useEffect terminé");
      }, [bearerToken]);

      return (
            <div className="section">
                {
                    favoritesPodcasts.length < 1  && 
                    <span>There's no subscriptions</span>
                }
                {
                    favoritesPodcasts !== null &&
                    <div className="row columns is-multiline">
                        {
                            favoritesPodcasts.map((podcast) => {
                            return <Podcast podcast={podcast} key={podcast.podcastId}/>;
                            })
                        }
                    </div>
                }
              
            </div>
      );
}