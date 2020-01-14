import React from 'react'
import { Link } from 'react-router-dom'
import userActions from '../stores/user/user.actions'
import { connect } from 'react-redux'


class Home extends React.Component {
    state = {
    }
    async componentDidMount() {

    }

    render() {
        const { user } = this.props
        return (
            <>
                <h1>Hello Snowboardddd</h1>
                <Link to="/game/doodoohead">Play DoodooHead</Link>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
}

export default connect(

)(Home)