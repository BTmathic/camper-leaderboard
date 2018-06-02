import React from 'react';

export default class CamperLeaderboard extends React.Component {
    state = {
        campersAllTime: [],
        campersRecent: [],
        order: 'alltime'
    }

    handleUserDisplay = (user, count) => {
        return (
            <div className={(count%2 && 'green-user') || 'user'} key={user.username}>
                <div className='rank'>
                    {count}
                </div>
                <div className='image'>
                    <img src={user.img} alt='user-img' />
                </div>
                <div className='name'>
                    {user.username}
                </div>
                <div className='recent-points'>
                    {user.recent}
                </div>
                <div className='alltime-points'>
                    {user.alltime}
                </div>
            </div>
        )
    }

    loadLeaderboard = (order) => {
        let leaderboard = [];
        if (this.state.campersAllTime.length === 100) {
            for (let i=0; i < 100; i++) {
                if (order === 'alltime') {
                    leaderboard.push(this.handleUserDisplay(this.state.campersAllTime[i], i+1));
                } else {
                    leaderboard.push(this.handleUserDisplay(this.state.campersRecent[i], i+1));
                }
            }
        }
        return leaderboard;
    }

    sort = (order) => {
        if (this.state.order !== order) {
            this.setState(() => ({ order }));
        }
    }
    
    componentDidMount() {
        try {
            let campersAllTime = [];
            let campersRecent = [];
            fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
            .then(results => results.json().then((camperData) => {
                for (let i=0; i < 100; i++) {
                    campersAllTime.push(camperData[i]);
                }
                this.setState(() => ({ campersAllTime }));
            }));
            fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(results => results.json().then((camperData) => {
                for (let i=0; i < 100; i++) {
                    campersRecent.push(camperData[i]);
                }
                this.setState(() => ({ campersRecent }));
            }));
        }

        catch (e) {}
    }
    
    render() {
        return (
            <div>
                <div className='top-bar'>
                    <a href='https://www.freecodecamp.com'><img src='./Images/FCClogowhite.jpg' alt='FCC logo' className='logo'/></a>
                    <span className='title'>
                        FreeCodeCamp Leaderboard
                    </span>
                </div>
                <div className='leaderboard'>
                    <div className='header'>
                        <div className='rank'>
                            #
                        </div>
                        <div className='image'>
                            <img src='./Images/FCClogo.svg' alt='FCC logo' className='inline-logo'/>
                        </div>
                        <div className='name header-name'>
                            Camper
                        </div>
                        <div className='recent-points sort'>
                            <span onClick={() => {this.sort('recent')}}>
                                Points in last 30 days
                            </span>
                        </div>
                        <div className='alltime-points sort'>
                            <span onClick={() => {this.sort('alltime')}}>
                                Points All time
                            </span>
                        </div>
                    </div>
                    {this.loadLeaderboard(this.state.order)}
                </div>
            </div>
        );
    }
}