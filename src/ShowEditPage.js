import {useState} from "react"
import axios from "axios"

export default function ShowEditPage({setShowEdit, songInfo, setPlay}){

    const [updateTitle, setUpdateTitle] = useState(songInfo.title)
    const [updateArtist, setUpdateArtist] = useState(songInfo.artist)

    function updateSong(songInfo){
        axios.put(`https://rawlifyplaylist.onrender.com/spotsongs/${songInfo._id}`, {
            title: updateTitle,
            artist: updateArtist
        })
    }
    return (<>
    
    
    <div>
    <button onClick={() => {
        setShowEdit(false)
        }}>
        X
    </button>
    <h5>Song Info</h5>
        {console.log(songInfo)}
        <form>
        Artist: <input type='text' name="artist" defaultValue={updateArtist} required onChange={(e) => {setUpdateArtist(e.target.value)}}></input><br></br>
        Title: <input type='text' name="artist" defaultValue={updateTitle} required onChange={(e) => {setUpdateTitle(e.target.value)}}></input><br></br>
        </form>
    <button
    onClick={() => {
        updateSong(songInfo)
        setShowEdit(false)
    }}
    >Update Info</button>
    </div>
    
    
    </>)
}