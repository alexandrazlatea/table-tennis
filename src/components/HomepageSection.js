import React from 'react';

import {fire} from "../fire";
import Ranking from '../components/Ranking';
import NextGames from '../components/NextGames';
import GamesPlayed from '../components/GamesPlayed';
import * as classnames from 'classnames';
import {bindActionCreators} from "redux";
import {renderView} from "../actions/index";
import {connect} from "react-redux";

class HomepageSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: '',
            showLoginPopUp: false,
            challenges: '',
            type: '',
            renderHeader: '',
            expiredChallenges: ''
        };
    }

    componentDidMount() {

        if (localStorage['userId']) {
            this.checkLoginState();
        }
    }

    checkLoginState = () => {
        fire.auth().onAuthStateChanged(user => {
            if (!user || (user && user.uid !== localStorage['userId'])) {
                localStorage.removeItem('userId');
                this.setState({renderHeader: Math.floor(Math.random() * 90 + 10)})
                this.props.renderView(Math.floor(Math.random() * 90 + 10));
            }
        });
    }

    saveCurrentUser = (user) => {
        localStorage['userId'] = user.uid;
    }

    render() {
        const sectionClassnames = classnames({
            "section-about": true,
            "section-about--disabled": this.state.showLoginPopUp
        });
        return (
            <section className={sectionClassnames}>
                <div className="row">
                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small"> Ranking </h3>
                        <ul>
                            <Ranking/>
                        </ul>
                    </div>
                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small"> Next Games </h3>
                        <NextGames/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small"> Rules </h3>
                        <p className="paragraph">
                            1. New players may join the ladder at any time, entering at the bottom of the
                            ladder. <br></br>
                            2. At any time, you may challenge either of the players ranked one , two or three places
                            above you or bellow you.
                            <br></br>
                            3. The match must occur within 3 days of the challenge. If a challenged player is unable
                            to play
                            during those days please contact the admin to win by forfeit or otherwise the match will
                            end 0-0. <br></br>
                            4. You can challenge only one player. <br></br>
                            5. A match will consist of 3 of 5 games played to 11 points each.<br></br>
                            6. The winner of the match should report the scores using the Match Report form. If the
                            challenger
                            wins, the two players shall swap ranks, and the ladder will be updated.<br></br>
                        </p>
                    </div>
                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small"> Played Games </h3>
                        <GamesPlayed/>
                    </div>

                </div>
            </section>
        )

    }
}


function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView}, dispatch);
}

export default connect(null, mapDispatchtoProps)(HomepageSection);
