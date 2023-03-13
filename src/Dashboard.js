import Auth from "./Auth"
import { Container, Form } from "react-bootstrap"
import { useState, useEffect} from "react"
import SpotifyWebApi from "spotify-web-api-node"
import TrackSearchResult from "./TrackSearchResult"
import Player from "./Player"
import Playlist from "./Playlist"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
    clientId: "0f1031b22d464246bd89f46eea042924",
    clientSecret: "02c3a81043954e3f90acd488e5cb66c1"
})


export default function Dashboard({code}){
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [currentUser, setCurrentUser] = useState(null)

    const accessToken = Auth(code)
 
    // async function fetchUser(){
            
    //         await  fetch("https://api.spotify.com/v1/me", {
    //             headers: { "Authorization": `Bearer ${accessToken}`}
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             setCurrentUser(data)
    //             console.log(currentUser)
    //         })
    // }

  

    async function fetchUser(){
        if (!accessToken) return
        let response = await fetch("https://api.spotify.com/v1/me", {
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
        let data = await response.json()
        setCurrentUser(data.display_name)
        console.log(currentUser)
    }

    useEffect(() => {fetchUser()}, [accessToken, currentUser])

    function chooseTrack(track){
        setPlayingTrack(track)
        setSearch("")
    }

    function addSong(){
        axios.post("https://rawlifyplaylist.onrender.com/spotsongs", {
            username: currentUser,
            title: playingTrack.name,
            artist: playingTrack.artist,
            url: playingTrack.uri
        })
    }



    const [playlist, setPlaylist] = useState(null)

    useEffect( () => {
        fetch("https://rawlifyplaylist.onrender.com/spotsongs")
        .then((response) => response.json())
        .then(data => {
            setPlaylist(data)
        })
    }, [])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false

        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return () => cancel = true
    }, [search, accessToken])
   
    const playlistLoaded = () => {
        return  <div className="playlist"><Playlist playlist={playlist}/></div>
    }

    const playlistLoading = () => {
        return <div>Loading...</div>
    }


   return (<>
<div className="d-flex">
{playlist ? playlistLoaded() : playlistLoading()}
    <Container className='d-flex flex-column my-5 py-2 bg-blue' style={{height: "60vh", width: "50%", backgroundColor: "lightblue"}}>
        
        <Form.Control type='search' placeholder='Search songs' value={search} onChange={e => setSearch(e.target.value)}></Form.Control>
        <div className='flex-grow-1 my-2' style={{overflowY: "auto"}}>
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
             
            ))}
        </div>
        <div>
            Bottom
        </div>
        <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
    </Container>
    </div>
    </>)
}