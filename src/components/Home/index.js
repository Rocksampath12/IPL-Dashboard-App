import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard/index'
import './index.css'

class Home extends Component {
  state = {isLoader: true, teamData: []}

  componentDidMount() {
    this.getDataFromServer()
  }

  getDataFromServer = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const obj = await response.json()
    const {teams} = obj
    const updatedData = teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({isLoader: false, teamData: updatedData})
  }

  render() {
    let {isLoader, teamData} = this.state
    return (
      <div className="home-container">
        {isLoader ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="logo-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="logo-img"
              />
              <h1 className="logo-heading">IPL Dashboard</h1>
            </div>
            <ul className="container-1">
              {teamData.map(obj => (
                <TeamCard key={obj.id} data={obj} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default Home
