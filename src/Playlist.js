import axios from "axios"
async function deleteSong(song){
   await axios.delete(`https://rawlifyplaylist.onrender.com/spotsongs/${song._id}`)
}


export default function Playlist({playlist, addSong, setPlayingTrack, setSong, user, showEdit, setShowEdit, setPlay, setSongInfo}){


    return (<>


<div className="w-2"><button onClick={addSong}> Add Song to Playlist</button></div>
    <h1 className="p-2 width-30%">Playlist</h1>
    <div>
        
        {playlist.map((song) => {
            if (user === song.username)
                return  ( <>
      
        <div key={song._id} className="p-1 bg-sky-500" >
        <div className="text-blue-300">

            <div className='d-flex flex-wrap-wrap'><h6>{song.title}</h6></div>
            {song.artist} 

            </div>

        <button className="m-1" onClick={
            () => {
                setSong(song)
                setPlayingTrack(null)
                }} >Play</button>

        <button onClick={() => {deleteSong(song)}}>Delete</button>
        <button className="m-1" onClick={
            () => {
                setSongInfo(song)
                if (showEdit === true){
                    setShowEdit(false)
                }else{
                    setShowEdit(true)
                }
            }
        }>Show/Edit</button>
        </div>
        </>)
      
     
    })}
    </div>

    
    </>
    )
}