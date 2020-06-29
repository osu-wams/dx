let timerId = -1;
const TIMEOUT_MS = 60 * 60 * 1000;
const LOGIN_PATH = '/login';

const idleTimer = () => {
  // Redirect browser to login settings a returnTo to cause the user to come back
  // to the page that they were viewing when the timer lapsed.
  // Examples:
  //
  // /resources?category=Technology
  //    pathname = "/resources"
  //    search = "?category=Technology"
  // /profile
  //    pathname = "/profile"
  //    search = ""
  const redirectTo = () => {
    const { pathname, search } = window.location;
    const redirectWithReturnTo = `${LOGIN_PATH}?returnTo=${pathname}${search}`;
    window.location.assign(redirectWithReturnTo);
  };

  const resetTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(redirectTo, TIMEOUT_MS);
  };

  window.addEventListener('load', resetTimer, true);
  document.addEventListener('scroll', resetTimer, true);
  document.addEventListener('mousemove', resetTimer, false);
  document.addEventListener('mousedown', resetTimer, true);
  document.addEventListener('touchstart', resetTimer, true);
  document.addEventListener('click', resetTimer, true);
  document.addEventListener('keypress', resetTimer, true);
};

export default idleTimer;
