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

    // const {team_banner_url, latest_match_details, recent_matches} = obj
    const teamBannerUrl = obj.team_banner_url
    const latestMatchDetails = obj.latest_match_details
    const recentMatches = obj.recent_matches
    console.log(obj)
    // team_banner_url, latest_match_details, recent_matches change

    const updatedLatestMatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }

    const updatedRecentMatchData = recentMatches.map(obj8 => ({
      umpires: obj8.umpires,
      result: obj8.result,
      manOfTheMatch: obj8.man_of_the_match,
      id: obj8.id,
      date: obj8.date,
      venue: obj8.venue,
      competingTeam: obj8.competing_team,
      competingTeamLogo: obj8.competing_team_logo,
      firstInnings: obj8.first_innings,
      secondInnings: obj8.second_innings,
      matchStatus: obj8.match_status,
    }))

    this.setState({
      isLoader: false,
      teamLogo: teamBannerUrl,
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
