import {Component, Fragment} from "react";
import {withRouter} from "./helper/withRouter";

class OneMovieGraphQl extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null
    }

    componentDidMount() {
        const payload = `
        {
        search(titleContains: ${this.props.match.params.id}) {
        id
        title
        runtime
        year
        description
        release_date
        rating
        mpaa_rating
        poster
        }
        }`
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        const requestOptions = {
            method: "POST",
            body: payload,
            headers: myHeaders
        }
        fetch("http://localhost:4080/v1/graphql", requestOptions)
            .then((response) => {
                response.json()
        }).then((data) => {
            console.log(data)
                this.setState({
                    movies: data.data.movie,
                    isLoaded: true
                })
        })
    }

    render() {
        const {movie, isLoaded, error} = this.state
        if (movie.genres) {
            movie.genres = Object.values(movie.genres)
        } else {
            movie.genres = [];
        }

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {

            return (
                <Fragment>
                    <h2>
                        Movie: {movie.title}

                    </h2>

                    {movie.poster !== "" && (
                        <div>
                            <img src={`https://image.tmdb.org/t/w200${movie.poster}`} alt="poster"/>
                        </div>
                    )}
                    <div className="float-start">
                        <small>
                            Rating: {movie.mpaa_rating}
                        </small>
                    </div>
                    <div className="float-end">
                        {movie.genres.map((m, i) => (
                            <span key={i} className={'badge bg-secondary me-1'}>
                                {m}
                            </span>
                        ))}
                    </div>
                    <div className={"clearfix"}></div>
                    <hr/>
                    <table className={'table table-compact table-striped'}>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td>
                                <strong>
                                    Title:
                                </strong>
                            </td>
                            <td>{movie.title} {movie.year}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Description</strong>
                            </td>
                            <td>{movie.description}</td>
                        </tr>

                        <tr>
                            <td>
                                <strong>
                                    Run time:
                                </strong>
                            </td>
                            <td>{movie.runtime}</td>
                        </tr>
                        </tbody>
                    </table>
                </Fragment>
            )
        }
    }
}
export default withRouter(OneMovie)