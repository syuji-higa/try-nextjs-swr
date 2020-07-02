import useSWR from 'swr'
import { request } from 'graphql-request'
import Link from 'next/link'

const API = 'https://api.graph.cool/simple/v1/movies'
const fetcher = query => request(API, query)

export default function App () {
  const { data, error, isValidating } = useSWR(
    `{
      Movie(title: "Inception") {
        releaseDate
        actors {
          id
          name
        }
      }
    }`,
    fetcher
  )

  const list = data?.Movie?.actors.map(({ id, name }) => {
    return <li key={id}>Name: { name }</li>
  })

  return (
    <>
      <Link href="/sample"><a>Sample</a></Link>
      {error ? (
        <div>Error</div>
      ) : (
        <>
          <ul>
            {list}
          </ul>
        </>
      )}
      {isValidating && (
        <div>loading...</div>
      )}
    </>
  )
}
