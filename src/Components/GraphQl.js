import {Component, Fragment} from "react";
import Input from "./form-components/Input";
import {Link} from "react-router-dom";

export default class GraphQl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoaded: false,
            error: null,
            alert: {
                type: "d-none",
                message: ""
            },
            searchTerm: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        this.setState(
            (prevState) => ({
                searchTerm: value
            })
        )
        if (value.length > 2) {
            this.performSearch()
        } else {
            this.setState({
                movies: []
            })
        }

    }

    performSearch() {
        const payload = `
        {
        search(titleContains: "${this.state.searchTerm}") {
        id
        title
        runtime
        year
        description
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
            let theList = Object.values(data.data.search);
            return theList
        }).then((theList) => {
            console.log(theList)
           if (theList.length > 0) {
               this.setState({
                   movies: theList,
               })
           } else {
               this.setState({
                   movies: [],
               })
           }
        })
    }

    componentDidMount() {
        const payload = `
        {
        list {
        id
        title
        runtime
        year
        description
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
                let theList = Object.values(data.data.list);
                return theList
        }).then((theList) => {
            console.log(theList)
            this.setState({
                movies: theList,
            })
        })
    }
    render() {
        let {movies} = this.state
        return (
<Fragment>
    <h2>GraphQl</h2>
    <hr/>
    <Input
    title={"Search"}
    type={"text"}
    name={"search"}
    value={this.state.searchTerm}
    handleChange={this.handleChange}/>

    <div className="list-group">
        {movies.map((movie) => (
            <Link key={movie.id}
            className="list-group-item list-group-item-action"
             to={`/moviesgraphql/${movie.id}`}
            ><strong>{movie.title}</strong>
            <br/>
                <small className="text-muted">({movie.year}) - {movie.runtime} minutes</small>
                <br/>
                {movie.description.slice(0, 40)}...
            </Link>
        ))}
    </div>
</Fragment>
        )
    }
}