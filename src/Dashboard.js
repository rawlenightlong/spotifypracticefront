import Auth from "./Auth"
import { Container, Form } from "react-bootstrap"
import { useState, useEffect} from "react"
import SpotifyWebApi from "spotify-web-api-node"
import TrackSearchResult from "./TrackSearchResult"

const spotifyApi = new SpotifyWebApi({
    clientId: "0f1031b22d464246bd89f46eea042924",
    clientSecret: "02c3a81043954e3f90acd488e5cb66c1"
})

export default function Dashboard({code}){
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const accessToken = Auth(code)

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
   
   return (<>
    
    <Container className='d-flex flex-column py-2' style={{height: "100vh"}}>
        {code}
        <Form.Control type='search' placeholder='Search songs' value={search} onChange={e => setSearch(e.target.value)}></Form.Control>
        <div className='flex-grow-1 my-2' style={{overflowY: "auto"}}>
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri}/>
             
            ))}
        </div>
        <div>
            Bottom
        </div>
    </Container>

    </>)
}