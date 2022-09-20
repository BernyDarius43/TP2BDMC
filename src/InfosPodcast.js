import { useParams } from "react-router-dom";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { serveur } from "./constantes";
//import Podcast from "./Podcast";
import { TokenContext } from "./App";
import InfosEpisodesPodcast from "./infosEpisodesPodcast";



export function InfosPodcast() {
  const lecontext = useContext(TokenContext)
  let params = useParams();
  let { podcastId } = params;
  let [podcast, setPodcast] = useState();
  let bearerToken = `bearer ${lecontext.access_token}` || null;
  let [checkUserSub, setCheckUserSub] = useState([]);


  useEffect(() => {
    async function componentDidMount() {
      const response = await fetch(`${serveur}/podcast/${podcastId}`);
      if (response.ok) {
        let data = await response.json();
        setPodcast(data);
      }
    }
    if (lecontext.access_token !== null) {
      async function getSubsriptions() {
        const response = await fetch(`${serveur}/subscriptions?id=${podcastId}`,
          {
            method: 'GET',
            headers: {
              Authorization: bearerToken,
              'Content-Type': 'application/json'
            }
          });
        if (response.ok) {
          let subsriptions = await response.json();
          setCheckUserSub(subsriptions);
          console.log(subsriptions)
        } else {
          console.log(response.statusText);
        }
      }

      getSubsriptions().then(() => console.log("getSubsriptions terminé"));
    console.log("getSubsriptions.useEffect terminé");
    }


    componentDidMount().then(() => console.log("componentDidMount terminé"));
    console.log("infoPodcast.useEffect terminé");
    

  }, [podcastId, bearerToken, lecontext.access_token, checkUserSub]);

  async function addFavorites() {
    console.log(checkUserSub)
    if (lecontext.access_token !== null) {
      const response = await fetch(`${serveur}/subscriptions?id=${parseInt(podcastId)}`,
        {
          method: 'POST',
          headers: {
            Authorization: bearerToken,
            'Content-Type': 'application/json'
          }
        });
      if (response.ok) {
        console.log(checkUserSub.isSubscribed)
        // alert("Podcast added");
      } else {
        console.log(response.statusText);
        alert(response.statusText);

      }
    }
  }
  async function removeFavorites() {
    if (lecontext.access_token !== null) {
      const response = await fetch(`${serveur}/subscriptions?id=${parseInt(podcastId)}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: bearerToken,
            'Content-Type': 'application/json',
          },
        });
      if (response.ok) {
        console.log(checkUserSub)
        alert("Podcast deleted");
      } else {
        console.log(response.statusText);
        alert(response.statusText);

      }
    }
  }


  return (
    podcast != null &&
    <div >
      <div className="section has-text-centered">
        <div><img alt={podcast.name} src={podcast.artworkUrl} /></div>
        {
          (checkUserSub.isSubscribed === false) &&
          <div>
            <button className="button is-success" onClick={addFavorites}><i className="fas fa-heart"></i></button>
          </div>
        }
        {
          checkUserSub.isSubscribed === true &&
          <div>
            <button className="button is-danger" onClick={removeFavorites}><i className="fas fa-times">{checkUserSub.isSubscribed}</i></button>
          </div>
        }
        <div><span className="has-text-weight-bold">Name : </span> {podcast.name}</div>
        <div><span className="has-text-weight-bold">artist : </span> {podcast.artist}</div>
        <div >
          {
            <span className="has-text-weight-bold">Genres :
            <span>
              {podcast.genres.map((p) => {
                return p
              }).join(" / ")}
              </span>
            </span>
          }
        </div>
        <div className="has-text-justified"><span className="has-text-weight-bold ">description : </span> {podcast.description}</div>

        <div>
          {
            podcast.episodes.map((episode) => {
              return <InfosEpisodesPodcast episodes={episode} key={episode.episodeId}/>;
            })
          }

        </div>
      </div>
    </div>
  )
}
