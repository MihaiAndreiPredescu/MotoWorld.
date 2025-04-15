import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1>
        <span style={styles.red}>M</span>oto
        <span style={styles.red}>W</span>orld
        <span style={styles.red}>.</span>
      </h1>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/vehicles" style={styles.link}>Bikes</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: { 
    display: "flex", 
    justifyContent: "space-between", 
    padding: "10px", 
    background: "rgba(255, 0, 0, 0.2)", 
    color: "black" },

  link: { 
    margin: "0 10px", 
    textDecoration: "none", 
    color: "black", 
    border: "2px solid red", 
    padding: "5px 10px", 
    borderRadius: "5px" },

  navLinks: { 
    display: "flex",
    gap: "10px",
    textAlign: "center",
    alignItems: "center",
  },

  red: { 
    color: "red" },
};

export default Navbar;
