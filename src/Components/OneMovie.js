import {Component, Fragment} from "react";
import {withRouter} from "./helper/withRouter";

 class OneMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null
    }

    componentDidMount() {
        fetch("http://localhost:4080/v1/movie/" + this.props.router.params.id)
            .then(res => {
                console.log(res.status)
                if (res.status !== 200) {
                    let err = Error
                    err.message = res.status
                    this.setState({error: err})
                }
                return res.json()
            })
            // .then((response) => response.json())
            .then((json) => {
                this.setState({
                        movie: json.movie,
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