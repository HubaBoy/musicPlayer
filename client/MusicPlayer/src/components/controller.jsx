import React, { useRef, useState, useEffect } from "react";
import './controller.css'

function AudioController({ song }) {
    const [onPlay, setOnPlay] = useState(false);
    const [duration, setDuration] = useState("0:00");
    const [currentTime, setCurrentTime] = useState('0:00');
    const player = useRef(null);

    useEffect(() => {
        player.current.addEventListener("loadedmetadata", () => {
            const minutes = Math.floor(player.current.duration / 60);
            const seconds = Math.floor(player.current.duration % 60);
            setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        });

        player.current.addEventListener("timeupdate", () => {
            const minutes = Math.floor(player.current.currentTime / 60);
            const seconds = Math.floor(player.current.currentTime % 60);
            setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        });
    }, [song]);

    const handleClick = () => {
        if (onPlay === true) {
            setOnPlay(false);
            player.current.pause();
        } else {
            setOnPlay(true);
            player.current.play();
        }
    }

    const handleTimeChange = (e) => {
        // Update the audio's currentTime based on the input value
        player.current.currentTime = e.target.value;
        const minutes = Math.floor(player.current.currentTime / 60);
        const seconds = Math.floor(player.current.currentTime % 60);
        setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    return (
        <>
        <div className="audioController">
        <button onClick={handleClick}>{onPlay ? "||" : "▶"}</button>
        <div className="controller">
            <audio src={song} ref={player}></audio>
            <p>{currentTime}</p>
            <input
                type="range"
                min="0"
                max={player.current ? player.current.duration : 0}
                value={player.current ? player.current.currentTime : 0}
                onChange={handleTimeChange}
            ></input>
            <p>{duration}</p>
        </div>
        </div>
        </>
    )
}

export default AudioController;
