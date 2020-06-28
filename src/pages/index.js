import React from 'react'
import Particles from 'react-particles-js'

import Layout from '../components/layout'
import Timer from '../components/timer'
import EmailInput from '../components/emailInput'
import firebaseDB from '../util/firebase'

import backgroundImage from '../images/shopping-together.jpg'
// import imageLogo from '../images/Tushare.png'

const particlesOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out',
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
}

class IndexPage extends React.Component {
  state = {
    email: '',
  }

  onEmailChangeHandler = event => {
    this.setState({
      email: event.target.value,
    })
  }

  submitEmailAddress = () => {
    firebaseDB
      .ref()
      .push({ email: this.state.email })
      .then(result => {
        this.setState({ email: '' })
        alert(
          'Thank you your interest! We will notify you on our platform launch early access!'
        )
      })
      .catch(err => {
        console.log(err)
        alert("There's something wrong. Please re-submit")
      })
  }

  render() {
    return (
      <Layout backgroundImage={backgroundImage}>
        <div className="bg-layout">
          <Particles className="particles" params={particlesOptions} />
          <div className="middle">
            <div className="content">
              <h1 className="h1">COMING SOON</h1>
              <Timer date="2020-08-17" time="00:00" />
              <p>We will be launching soon.</p>
              <p>
                Enter your email address to get early notifications on our
                upcoming platform.
              </p>
              <EmailInput
                email={this.state.email}
                onEmailChangeHandler={this.onEmailChangeHandler}
                submitEmailAddress={this.submitEmailAddress}
              />
              <div id="mc_embed_signup" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
