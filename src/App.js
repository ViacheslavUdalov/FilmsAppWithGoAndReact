import {BrowserRouter as Router, Routes, Route, Link, useParams, useMatch, useResolvedPath} from 'react-router-dom';
import Movies from "./Components/Movies";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import OneMovie from "./Components/OneMovie";
import Genres from "./Components/Genres";
import OneGenre from "./Components/OneGenre";
import EditMovie from "./Components/EditMovie";
import {Component, Fragment} from "react";
import Login from "./Components/Login";
import {withRouter} from "./Components/helper/withRouter";
import GraphQl from "./Components/GraphQl";
import OneMovieGraphQl from "./Components/OneMovieGraphQl";

const LoginWithRouter = withRouter(Login);

export default class App extends Component{

  // constructor(props): Конструктор вызывается при создании экземпляра компонента.
  // Он инициализирует объект, который наследует этот компонент.
  constructor(props) {
    // super(props): Эта строка вызывает конструктор родительского класса (Component).
    // Это необходимо, потому что компонент наследует Component из React.
    // Передает props родительскому классу.
    //Инициализирует this.props в вашем компоненте.
    super(props);
    this.state = {
      jwt: "",
    }
    this.handleJWTChange = this.handleJWTChange.bind(this);

  }

  componentDidMount() {
    let t = window.localStorage.getItem("jwt")

    if (t) {
      if (this.state.jwt === "") {
        this.setState({jwt: JSON.parse(t)})
      }
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({jwt: jwt});
  }

  logout = () => {
    this.setState({jwt: ""})
    window.localStorage.removeItem("jwt")
  }

  render() {
    let loginLink;
    if (this.state.jwt === "") {
      loginLink = <Link to='/login'>Login</Link>
    } else {
      loginLink = <Link to='/logout' onClick={this.logout}>Logout</Link>
    }
  return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
            <h1 className="mt-3">
              Watch movie
            </h1>  </div>
            <div className="col mt-3 text-end">
              {loginLink}
            </div>
            <hr className="mb-3"/>
          </div>
          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/movies">Movies</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/genres">Genres</Link>
                  </li>
                  {this.state.jwt !== "" &&
                      <Fragment>
                        <li className="list-group-item">
                          <Link to="/admin/movie/0">Add movie</Link>
                        </li>
                        <li className="list-group-item">
                          <Link to="/admin">Manage Catalog</Link>
                        </li>
                        <li className="list-group-item">
                          <Link to="/graphql">GraphQl</Link>
                        </li>
                      </Fragment>
                  }

                </ul>
              </nav>
            </div>

            <div className="col-md-10">
            <Routes>
                <Route path="/movies/:id" element={<OneMovie/>}/>
              <Route path="/moviesgraphql/:id" element={<OneMovieGraphQl/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route exact path="/login" element={<Login  handleJWTChange={this.handleJWTChange}/>}/>
                <Route path="/genres/:id" element={<OneGenre/>}/>
                <Route path="/admin/movie/:id" element={<EditMovie jwt={this.state.jwt}/>}/>
                <Route exact path="/genres" element={<Genres />} />
                <Route path="/admin" element={<Admin jwt={this.state.jwt}/>} />
              <Route exact path="/grapghql" element={<GraphQl />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
};
}
