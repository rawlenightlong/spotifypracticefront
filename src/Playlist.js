
export default function Playlist({playlist}){


    return (<>

    <div>Words</div>
<div><button> Add Song to Playlist</button></div>
    <h1>Playlist</h1>
    <div>

        {playlist.map((song) => {
      return  ( <>
        <div key={song._id}>
        {song.artist}
        {song.title}
        </div>
        </>)
      
     
    })}
    </div>

    
    </>
    )
}