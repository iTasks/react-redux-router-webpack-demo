import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router';
import Loader from 'react-loader';

const menu = [{
    path: "login",
    name: "Login"
}, {
    path: "home",
    name: "Home"
}
]

export default class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: null
        }
    }

    componentDidMount() {
        this.setState({
            menu: menu.map((item) =>
                (<li><Link to={item.path}>{item.name}</Link></li>))
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <ul className="nav nav-sidebar">
                            {this.state.menu}
                        </ul>
                    </div>
                    <div className="col-sm-15 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        {this.props.children}
                    </div>
                    {this.props.status === 'doing' && <Loader length={20} radius={30} width={8}/>}
                </div>
            </div>
        );


    }
}
