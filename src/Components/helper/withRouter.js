import {useLocation, useNavigate, useParams} from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouter(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{navigate, location, params}} />
        )
    }
    return ComponentWithRouter
}