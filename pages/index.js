import fetch from "isomorphic-unfetch";
import Link from "next/link";

HomePage.getInitialProps = async ({ req, query }) => {
  const protocol = req
    ? `${req.headers["x-forwarded-proto"]}:`
    : location.protocol;
  const host = req ? req.headers["x-forwarded-host"] : location.host;
  // const pageRequest = `${protocol}//${host}/api/profiles?page=${query.page ||
  //   1}&limit=${query.limit || 9}`;
  const pageRequest = `http://localhost:3000/api/profiles?page=${query.page ||
    1}&limit=${query.limit || 5}`;
  const res = await fetch(pageRequest);
  const json = await res.json();
  return json;
};

function HomePage({ profiles, page, pageCount }) {
  console.log(page);
  return (
    <>
      <ul>
        {profiles.map(p => (
          <li className="profile" key={p.id}>
            <Link href={`/profile?id=${p.id}`}>
              <a>
                <span>{p.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 && (
          <Link href={`/?page=${page - 1}&limit=9`}>
            <a>Previous</a>
          </Link>
        )}
        {page <= pageCount && (
          <Link href={`/?page=${page + 1}&limit=9`}>
            <a className="next">Next</a>
          </Link>
        )}
      </nav>
    </>
  );
}

export default HomePage;
