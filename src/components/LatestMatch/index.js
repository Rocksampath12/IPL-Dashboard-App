import './index.css'

const LatestMatch = props => {
  const {data} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = data

  return (
    <div className="box-8">
      <div>
        <p className="players-details-heading2 left">{competingTeam}</p>
        <p className="players-details-heading3 left">{date}</p> {/* FIXED DATE */}
        <p className="players-details-heading1 left">{venue}</p>
        <p className="players-details-heading1 left">{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="logo-8"
      />
      <div>
        <h1 className="players-details-heading1 right">First Innings</h1>
        <p className="players-details-heading1 right">{firstInnings}</p>
        <h1 className="players-details-heading1 right">Second Innings</h1>
        <p className="players-details-heading1 right">{secondInnings}</p>
        <h1 className="players-details-heading1 right">Man Of The Match</h1>
        <p className="players-details-heading1 right">{manOfTheMatch}</p>
        <h1 className="players-details-heading1 right">Umpires</h1>
        <p className="players-details-heading1 right">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
