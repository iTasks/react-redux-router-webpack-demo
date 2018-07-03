import React, {
    Component
} from 'react';
import Routes from '../routes';
import {
    Link
} from 'react-router';
import {
    Nav,
    NavItem
} from 'react-bootstrap';
import Loader from 'react-loader';
let menu = [{
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
                    <Loader loaded={this.props.status !== 'doing'} length={20} radius={30} width={8}></Loader>
                  </div>
                </div>
        );



    }
}