import {Component, Fragment} from "react";
import {Link} from "react-router-dom";

export default class Admin extends Component {
    state = {
        movies: [],
        isLoaded: false,
        error: null
    }
    componentDidMount() {

        if (this.props.jwt === "") {
            this.props.router.navigate({
                pathname: '/login'
            });
            return;
        }
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
                    <h2>Manage Catalog</h2>
                    <div className='list-group'>


                        {movies.map(movie => (

                            <Link key={movie.id}
                                  className={'list-group-item list-group-item-action'}
                                  to={`/admin/movie/${movie.id}`}>{movie.title}</Link>

                        ))}
                    </div>
                </Fragment>
            )
        }
    }
}