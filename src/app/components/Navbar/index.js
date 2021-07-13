import "./index.css";

import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { routes } from "../../router/routes";
import actions from "../../../store/actions";
import { localUserStorage } from "../../../utils";

const { logout } = actions;

class Navbar extends Component {
  state = {
    user: localUserStorage.getUser(),
  };

  handleLogout = () => {
    this.props.logout(this.props.history);
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      let navbar = document.getElementById("Navbar");
      let sticky = navbar.offsetTop;
      if (window.pageYOffset > sticky) {
        navbar.classList.add("Navbar-fixed");
      } else {
        navbar.classList.remove("Navbar-fixed");
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", () => {
      let navbar = document.getElementById("Navbar");
      navbar.classList.remove("Navbar-fixed");
    });
  }

  render() {
    return (
      <div
        className={`Navbar Navbar-${this.props.backBtn ? `btw` : `end`}`}
        id="Navbar"
      >
        {this.props.backBtn && (
          <div onClick={() => window.history.back()}>
            <nav>
              <span className="material-icons">arrow_back</span>
              <p>Back</p>
            </nav>
          </div>
        )}
        <div className="Navbar-left">
          {this.props.api && this.state.user.is_superuser && (
            <Link to="https://blogbookapi.herokuapp.com">
              <nav>
                <span className="material-icons">construction</span>
                <p>API</p>
              </nav>
            </Link>
          )}
          {this.props.createBlog && (
            <Link to={routes.CREATE_BLOG}>
              <nav>
                <span className="material-icons">create</span>
                <p>New Blog</p>
              </nav>
            </Link>
          )}
          {this.props.search && (
            <Link to={routes.SEARCH}>
              <nav>
                <span className="material-icons">person_add_alt_1</span>
                <p>Search</p>
              </nav>
            </Link>
          )}
          {this.props.feed && (
            <Link to={routes.FEED}>
              <nav>
                <span className="material-icons">home</span>
                <p>Feed</p>
              </nav>
            </Link>
          )}
          {this.props.profile && (
            <Link to={routes.VIEW_WRITER(this.state.user.username)}>
              <nav>
                <span className="material-icons">account_circle</span>
                <p>Profile</p>
              </nav>
            </Link>
          )}
          {this.props.logout && (
            <div to={routes.LOGOUT} onClick={this.handleLogout}>
              <nav>
                <span className="material-icons">power_settings_new</span>
                <p>Logout</p>
              </nav>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
