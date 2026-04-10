import './navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRobot } from "@fortawesome/free-solid-svg-icons"

function Navbar() {

	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<a className="navbar-brand text-light" href="#"><FontAwesomeIcon icon={faRobot} /> AI Code Reviewer</a>
				</div>
			</nav>
		</>
	)
}

export default Navbar
