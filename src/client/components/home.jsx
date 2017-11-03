import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
// import electrodeLogo from "../images/electrode.svg"
import Header from "./header"
import Footer from "./footer"

/* eslint-disable max-len */
export class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>

        <section>
          <p>{this.props.data}</p>
        </section>

        <Footer/>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.string
};

const mapStateToProps = (state) => ({
  data: state && state.data
});

export default connect(
  mapStateToProps
)(Home);
