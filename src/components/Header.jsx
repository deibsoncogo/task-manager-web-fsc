import PropTypes from "prop-types"

export function Header({ children }) {
  return <header className="header">{children}</header>
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
}
