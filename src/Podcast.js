import React from "react";
import {Link} from "react-router-dom";

export default function Podcast(props) {
  return ( 
    <div className="column is-3">
        <Link to={`/infoPodcast/${props.podcast.podcastId}`}>
        <div className="card has-text-black">
          <div className="card-image">
            <figure className="image is-square">
              <img alt={props.podcast.name} src={props.podcast.artworkUrl}/>
            </figure>
          </div>
          <div className="card-content has-text-centered">
            <div className="content">
                <div className="mb-0">
              <p className="title">{props.podcast.name}</p>
                </div>
                <div className="mb-0">
              <p className="">{props.podcast.artist}</p>
                </div>
              <div className="mb-0">
                <span>Genres:<span className="">
                {props.podcast.genres.map((p) => {
                  return p
                }).join(" / ")}
                 </span></span>
                
              </div>
            </div>
          </div>
        </div>
        </Link>

    </div>
  )
}

