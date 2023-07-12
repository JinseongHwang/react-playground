import {useParams} from "react-router-dom";
import {useEffect} from "react";

const Detail = () => {
    const {id} = useParams();
    useEffect(async () => {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        const json = await response.json()
        console.log(json)
    }, [])
    return <h1>Detail</h1>
}

export default Detail;