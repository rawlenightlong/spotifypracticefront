import { Container } from 'react-bootstrap'

const authLogin = "https://accounts.spotify.com/authorize?client_id=0f1031b22d464246bd89f46eea042924&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-follow-modify%20user-follow-modify"

export default function Login (props){
    return (<>
    <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
        <a className="btn btn-success btn-log" href={authLogin}>Login with Spotify</a>
    </Container>
    
    </>)
}