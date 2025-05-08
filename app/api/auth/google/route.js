export async function GET(req) {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;
  const url = new URL(req.url); // 👈 construimos el URL a partir del req.url
  const userId = url.searchParams.get('userId'); // 👈 obtenemos userId del query param
  const scope = encodeURIComponent('https://www.googleapis.com/auth/contacts.readonly');

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${scope}&access_type=online&prompt=consent&state=${userId}`;

  return Response.redirect(authUrl);
}
