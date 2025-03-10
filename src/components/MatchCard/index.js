import './index.css'

const MatchCard = props => {
  const {data} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = data
  const textColor = matchStatus === 'Won' ? 'green' : 'red'

  return (
    <li className="list-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="list-item-img"
      />
      <p className="list-item-team-name">{competingTeam}</p>
      <p className="list-item-result">{result}</p>
      <p className={`list-item-won-or-lose ${textColor}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
