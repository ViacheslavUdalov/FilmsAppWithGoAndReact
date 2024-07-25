import {Component} from "react";
import cat from "./../images/cat.jpg"
import "./Home.css"

export default class extends Component {
    render() {
        return (
            <div className="text-center">
                <h2>Home</h2>
                <hr/>
                <img src={cat} alt="cat"/>
                <hr/>
                <div className="tickets">

                </div>
            </div>

        )
    }


}