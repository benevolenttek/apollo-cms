import redirect from '../lib/redirect'

export default (context, loggedInUser) => {
  if (!loggedInUser.user) {
    // If not signed in, send them somewhere more useful
    console.log("Redirecting to login...");
    redirect(context, '/login')
  }
}