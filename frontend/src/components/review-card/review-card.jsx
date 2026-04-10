import './review-card.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBug, faBoltLightning, faUserShield, faStar } from "@fortawesome/free-solid-svg-icons"

function ReviewCard({ cardName, cardLength, listArr }) {

	const cardColorValue = {
		bugs: '#f24d55',
		performance: '#f78c06',
		security: '#8a52e6',
		quality: '#4681f1'
	}

	const cardBGColorValue = {
		bugs: 'rgba(242, 77, 85, 0.15)',
		performance: 'rgba(247, 140, 6, 0.15)',
		security: 'rgba(138, 82, 230, 0.15)',
		quality: 'rgba(70, 129, 241, 0.15)'
	}

	const iconMap = {
		bugs: faBug,
		performance: faBoltLightning,
		security: faUserShield,
		quality: faStar
	}

	return (
		<>
			<div className="card h-100" style={{ 'backgroundColor': cardBGColorValue[cardName] }}>
				<div className="fw-bold card-header">
					<FontAwesomeIcon icon={iconMap[cardName]} style={{ 'color': cardColorValue[cardName] }} />
					<span className="card-header-text">{cardName.slice(0, 1).toUpperCase()}{cardName.slice(1).toLowerCase()}</span>
					{(cardLength > 0) && <span id="bugs-badge" className="badge" style={{ 'backgroundColor': cardColorValue[cardName] }}>{cardLength}</span>}
				</div>
				<ul id="bug-items" className="list-style" style={{ 'color': cardColorValue[cardName] }}>
					{listArr.map((ele, index) => <li key={index}><span>{ele}</span></li>).slice(0, 5)}
				</ul>
				{(cardLength > 5) &&
					<div className="additional-issues"><span className="fw-bold" style={{ 'color': cardColorValue[cardName] }}>+ </span><span id="remaining-issues-bugs">{cardLength - 5}</span> more issues</div>
				}
			</div>

		</>
	)
}

export default ReviewCard
