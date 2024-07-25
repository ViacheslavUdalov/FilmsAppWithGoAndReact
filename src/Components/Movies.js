import {Component, Fragment} from "react";
import {json, Link} from "react-router-dom";

export default class Movies extends Component {
    state = {
        movies: [],
        isLoaded: false,
        error: null
    }
    componentDidMount() {
        fetch("http://localhost:4080/v1/movies")
            .then(res => {
                console.log(res.status)
                    if (res.status !== 200) {
                        let err = Error
                        err.message = res.status
this.setState({error: err})
                    }
                    return res.json()
            })
            .then((json) => {
                this.setState({
                    movies: json.movies,
                    isLoaded: true
                },
                    (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    })
                    })
            })
    }

    render() {
        const {movies, isLoaded, error} = this.state;
if (error) {
    return <div>Error: {error.message}</div>
} else if (!isLoaded) {
            return <p>Loading...</p>
        } else {

        return (
            <Fragment>
                <h2>Choose movie</h2>
                <div className={'list-group'}>


                {movies.map(movie => (

                        <Link key={movie.id}
                              className={'list-group-item list-group-item-action'}
                              to={`/movies/${movie.id}`}>{movie.title}</Link>

                ))}
                </div>
            </Fragment>
        )
    }
    }
}