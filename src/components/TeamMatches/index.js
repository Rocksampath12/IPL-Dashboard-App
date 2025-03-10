import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard/index'
import LatestMatch from '../LatestMatch/index'
import './index.css'

class TeamMatches extends Component {
  state = {
    isLoader: true,
    teamLogo: '',
    latestMatch: {},
    recentMatchesDetails: [],
  }

  componentDidMount() {
    this.getDataFromServer()
  }

  getDataFromServer = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(url)
    const obj = await response.json()

    const {team_banner_url, latest_match_details, recent_matches} = obj

    const updatedLatestMatchDetails = {
      umpires: latest_match_details.umpires,
      result: latest_match_details.result,
      manOfTheMatch: latest_match_details.man_of_the_match,
      id: latest_match_details.id,
      date: latest_match_details.date, 
      venue: latest_match_details.venue,
      competingTeam: latest_match_details.competing_team,
      competingTeamLogo: latest_match_details.competing_team_logo,
      firstInnings: latest_match_details.first_innings,
      secondInnings: latest_match_details.second_innings,
      matchStatus: latest_match_details.match_status,
    }

    const updatedRecentMatchData = recent_matches.map(match => ({
      umpires: match.umpires,
      result: match.result,
      manOfTheMatch: match.man_of_the_match,
      id: match.id,
      date: match.date,
      venue: match.venue,
      competingTeam: match.competing_team,
      competingTeamLogo: match.competing_team_logo,
      firstInnings: match.first_innings,
      secondInnings: match.second_innings,
      matchStatus: match.match_status,
    }))

    this.setState({
      isLoader: false,
      teamLogo: team_banner_url,
      latestMatch: updatedLatestMatchDetails,
      recentMatchesDetails: updatedRecentMatchData,
    })
  }

  render() {
    const {isLoader, teamLogo, latestMatch, recentMatchesDetails} = this.state

    return (
      <div className="team-matches-container">
        <div className="team-match-container-main-box">
          {isLoader ? (
            <div data-testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <>
              <img src={teamLogo} alt="team banner" className="banner-img" />
              <h1 className="players-details-heading1">Latest Match</h1>
              <div className="latest-match-details">
                <LatestMatch data={latestMatch} />
              </div>
              <ul className="container-8">
                {recentMatchesDetails.map(match => (
                  <MatchCard key={match.id} data={match} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default TeamMatches
