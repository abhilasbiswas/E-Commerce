
import {OAuth2Client} from 'google-auth-library'



export default async function googleOauth(token){
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload();
    // console.log(payload)
    return payload;
}