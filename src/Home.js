import React, {useEffect, useState} from "react";
import Podcast from "./Podcast";
import {serveur} from "./constantes";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      // obtenir les top 50 podcast
      let urlPodcasts = `${serveur}/podcasts/top`;
      let resultatPodcasts = await fetch(urlPodcasts);
      if (resultatPodcasts.ok) {
        let data = await resultatPodcasts.json();
        setPodcasts(data)
        console.log(data)
      } else {
        console.log("une erreur s'est produite lors de l'appel à /podcasts/top");
      }
    }

    componentDidMount().then(() => console.log("componentDidMount terminé"));
    console.log("Home.useEffect terminé");
  }, []);

  return (
    <div className="section">
      <h1 className="title is-1 has-text-centered">Top 50 Podcasts</h1>

      <div className="row columns is-multiline">
        {
          podcasts.map((podcast) => {
            return <Podcast podcast={podcast} key={podcast.podcastId}/>;
          })
        }
      </div>

    </div>
  );

}
