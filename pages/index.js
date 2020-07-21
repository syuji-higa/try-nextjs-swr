import useSWR from 'swr'
// import useSWR, { mutate } from 'swr'
import { request } from 'graphql-request'
import Link from 'next/link'

const API = 'https://api.graph.cool/simple/v1/movies'
const fetcher = (query) => request(API, query)

export default function App() {
  const key = `{
    Movie(title: "Inception") {
      releaseDate
      actors {
        id
        name
      }
    }
  }`
  // const initialData = {
  //   Movie: { actors: [{ id: 'hoge', name: 'Initial Data' }] },
  // }
  const { data, error, isValidating, mutate } = useSWR(
    key,
    fetcher,
    // { refreshInterval: 1000 }
    // initialData
  )
  // const shouldFetch = true
  // const { data, error, isValidating, mutate } = useSWR(
  //   shouldFetch ? key : null,
  //   fetcher
  // )

  const list = data?.Movie?.actors.map(({ id, name }) => {
    return <li key={id}>Name: {name}</li>
  })

  // const add = (item) => {
  //   // Patch
  //   mutate(
  //     {
  //       Movie: {
  //         actors: [...data?.Movie?.actors, item],
  //       },
  //     },
  //     false
  //   )
  // }

  return (
    <>
      <Link href="/sample">
        <a>other page</a>
      </Link>
      {error ? (
        <div>Error</div>
      ) : (
        <>
          <ul>{list}</ul>
        </>
      )}
      {/* <button onClick={() => mutate({ ...data })}>Revalidate</button> */}
      {/* <button onClick={() => add({ id: 'fuga', name: 'Added Data' })}>Add</button> */}
      {isValidating && <div>loading...</div>}
    </>
  )
}
