import fetch from "isomorphic-unfetch";
import Link from "next/link";

ProfilePage.getInitialProps = async ({ req, query }) => {
  const protocol = req
    ? `${req.headers["x-forwarded-proto"]}:`
    : location.protocol;
  const host = req ? req.headers["x-forwarded-host"] : location.host;
  const pageRequest = `${protocol}//${host}/api/profiles/${query.id}`;
  const res = await fetch(pageRequest);
  const json = await res.json();
  return json;
};

function ProfilePage({ profile }) {
  return (
    <>
      <div>
        <img src={profile.avatar} />
        <h1>{profile.name}</h1>
        <p>{profile.address}</p>
        <p>{profile.email}</p>
        <Link href="/">
          <a>← Back to profiles</a>
        </Link>
      </div>
    </>
  );
}

export default ProfilePage;
