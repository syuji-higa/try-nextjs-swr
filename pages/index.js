import useSWR from 'swr'
// import useSWR, { mutate } from 'swr'
import { request } from 'graphql-request'
import Link from 'next/link'

const API = 'https://api.spacex.land/graphql/'
const fetcher = (query) => request(API, query)

export default function App() {
  const key = `{
    launchesPast(limit: 10) {
      mission_name
      ships {
        name
        home_port
        image
      }
    }
  }`
  // const initialData = {
  //   launchesPast: { ships: [{ name: 'Initial Data' }] },
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

  const list = data?.launchesPast[0]?.ships.map(({ name }) => {
    return <li key={name}>Name: {name}</li>
  })

  // const add = (item) => {
  //   // Patch
  //   mutate(
  //     {
  //       launchesPast: {
  //         ships: [...data?.launchesPast[0]?.ships, item],
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
      {/* <button onClick={() => add({ name: 'Added Data' })}>Add</button> */}
      {isValidating && <div>loading...</div>}
    </>
  )
}
