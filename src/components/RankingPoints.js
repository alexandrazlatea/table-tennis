import React, {Component} from 'react';
import {fetchChalenges, fetchUsersData} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class RankingPoints extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        nextProps.usersData
    }

    render() {
        return (
            <div className="ranking-points">
            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        usersData: state.usersData,
    }
}


export default connect(mapStateToProps)(RankingPoints);
