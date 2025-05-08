import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  const userId = searchParams.get('state');
  console.log('userId', userId);

  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
  } = process.env;

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const accessToken = tokenRes.data.access_token;

    const peopleRes = await axios.get('https://people.googleapis.com/v1/people/me/connections', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        personFields: 'names,emailAddresses,phoneNumbers',
        pageSize: 1000,
      },
    });

    const contacts = (peopleRes.data.connections || []).map(p => ({
      name: p.names?.[0]?.displayName || '',
      email: p.emailAddresses?.[0]?.value || '',
      phone: p.phoneNumbers?.[0]?.value || ''
    })).filter(c => c.name || c.email || c.phone);
    

    return Response.json({ contacts });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error importing contacts' }), { status: 500 });
  }
}
