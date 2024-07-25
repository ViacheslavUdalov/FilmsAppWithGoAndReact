import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "./helper/withRouter";

 class OneGenre extends Component {
    state = {
        movies: [],
        isLoaded: false,
        error: null,
        genreName: ""
    }

    componentDidMount() {
        const genreName = this.props.router.location.state ? this.props.router.location.state.genreName : "";
        fetch("http://localhost:4080/v1/movies/" + this.props.router.params.id)
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
                        isLoaded: true,
                        genreName: genreName
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
        let {movies, isLoaded, error, genreName} = this.state;

        if (!movies) {
            movies = [];
        }
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {

            return (
                <Fragment>
                    <h2>Genre: {genreName}</h2>
                   <div className={'list-group'}>
                        {movies.map(movie => (
                                <Link className={'list-group-item list-group-item-action'} to={`/movies/${movie.id}`}>{movie.title}</Link>
                        ))}
                   </div>
                </Fragment>
            )
        }
    }
}
export default withRouter(OneGenre)