const Logout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }
  else {
      window.location.href = "/"; // if cancel → go back to dashboard
    }

  return null; // nothing to show
};

export default Logout;
