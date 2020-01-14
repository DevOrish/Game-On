import React from 'react'
import userActions from '../stores/user/user.actions'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import utilService from '../services/utils.service'

class Login extends React.Component {
    state = {
        name: ''
    }
    async componentDidMount() {

    }

    updateName = (ev) => {
        const { value } = ev.target
        this.setState({ name: value })
    }

    login = async (ev) => {
        ev.preventDefault()
        const { name } = this.state
        var user;
        try {
            user = await this.props.checkLogin(name)            
        } catch (err) {
            Swal.fire({
                title: 'No user found',
                text: `Would you like to create this user?` ,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: 'gold',
                cancelButtonColor: 'gray',
                confirmButtonText: 'Create'
              }).then(async (result) => {
                if (result.value) {
                    user = await this.props.signUp(name)
                    utilService.showToast('User created successfully!','success')
                    this.props.history.push('/home')
                }
              })
        }        
        if (user) this.props.history.push('/home')
    }

    render() {
        return (
            <>
                <h1>Login / Signup</h1>
                <img className='bitcoin-img' src={require("../assets/img/bitcoin.png")} alt="bitcoin"/>
                <form onSubmit={(ev) => this.login(ev)}>
                    <label>Name:
                   <input onChange={(ev) => this.updateName(ev)} type="text" placeholder="Enter name" />
                    </label>
                    <button>Login</button>
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       
    }
}

const mapDispatchToProps = {
    checkLogin: userActions.checkLogin,
    signUp: userActions.signUp,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)