import {fire} from '../fire';
import axios from 'axios';

export function fetchUsersData() {
    let messagesRef = fire.database().ref('users');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_USERS_DATA',
                payload: snapshot.val()
            })
        })
    }
}

export function sendEmail(data) {
    return dispatch => {
        axios({
            method: 'post',
            url: 'http://localhost/table-tennis/php/sendEmail.php',
            data: {action : data['action'], to: data['to'], subject: data['subject'], body: data['body'] } ,
            headers: {
                'accept': 'application/json',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            dispatch({
                type: 'test',
                payload: response.data
            });
        })
    }

}



export function fetchChalenges() {
    let messagesRef = fire.database().ref('chalenge');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_CHALENGE',
                payload: snapshot.val()
            })
        })
    }
}
export function fetchPlayedGames() {
    let messagesRef = fire.database().ref('games');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_PLAYED_GAMES',
                payload: snapshot.val()
            })
        })
    }
}

export function updateChallenge(value, test) {
    let query  = fire.database().ref('chalenge').orderByChild("user_id").equalTo(value);
    var flag = false;
    return dispatch => {
        query.on("child_added",(snapshot) => {
            if (!flag) {
                snapshot.ref.update({active: 0})
                flag = true;
            }
             dispatch({
                type: 'RENDER_VIEW',
                payload: (Math.floor(Math.random() * 90 + 10))
            })
        });
    }
}

export function SwapRanks(user_id, challengedUser, firstScor, secondScore) {

    let query  = fire.database().ref('users').orderByChild("user_id").equalTo(user_id);
    return dispatch => {
        query.on("child_added", (snapshotUser) => {
            let userRank = snapshotUser.val().rank;
            let queryChallenged = fire.database().ref('users').orderByChild("user_id").equalTo(challengedUser);
            queryChallenged.on("child_added", (snapshotChallenged) => {
                let userChallengedRank = snapshotChallenged.val().rank;
                if (((userRank < userChallengedRank) && (firstScor > secondScore)) || ((userRank > userChallengedRank) && (firstScor < secondScore))) {
                    query.on("child_added", (snapshotUser) => {
                        snapshotUser.ref.update({rank: userChallengedRank})
                    });
                    queryChallenged.on("child_added", (snapshotChallenged) => {
                        snapshotChallenged.ref.update({rank: userRank})
                    });
                }
                dispatch({
                    type: 'RENDER_VIEW',
                    payload: (Math.floor(Math.random() * 90 + 10))
                })
            });

        });
    }

}


export function fetchResults() {
    let messagesRef = fire.database().ref('vote');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_RESULTS',
                payload: snapshot.val()
            })
        })
    }
}

export function renderView(value) {
    return {
        type: 'RENDER_VIEW',
        payload: value
    };
}



