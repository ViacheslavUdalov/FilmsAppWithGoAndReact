import {Component, Fragment} from "react";
import {Link} from "react-router-dom";

export default class Genres extends Component {

    state = {
        genres: [],
        isLoaded: false,
        error: null
    }

    componentDidMount() {
        fetch("http://localhost:4080/v1/genres")
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
                console.log(json)
                this.setState({
                        genres: json.genres,
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
        const {genres, isLoaded, error} = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        }

            return(
          <Fragment>
              <h2>Genres</h2>
              <div className={'list-group'}>
                  {genres.map((g, i) => (

                      <Link key={g.id}
                            className={'list-group-item list-group-item-action'} to={{
                          pathname: `/genres/${g.id}`,
                          state: {genreName: g.genre_name}
                      }}>{g.genre_name}</Link>

                  ))}
              </div>
          </Fragment>
            )
    }
}