import React from "react";

export default function InfosEpisodesPodcast(props) {
    return (
        <div>
            <div className="card has-text-justified" style={{ padding: "0px" }}>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-128x128">
                                <img className="is-rounded" alt={props.episodes.title} src={props.episodes.artworkUrl} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    {props.episodes.title}
                                </p>
                                <span>
                                    {props.episodes.content}
                                </span>
                                <div>
                                    <audio controls>
                                        <source type="audio/ogg" src={props.episodes.audioUrl} />
                                    </audio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}