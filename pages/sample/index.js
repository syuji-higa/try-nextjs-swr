// import { mutate } from 'swr'
// import { request } from 'graphql-request'
import Link from 'next/link'

// const API = 'https://api.graph.cool/simple/v1/movies'
// const fetcher = (query) => request(API, query)

export default function App () {
  // const key = `{
  //   Movie(title: "Inception") {
  //     releaseDate
  //     actors {
  //       id
  //       name
  //     }
  //   }
  // }`
  // mutate(key, fetcher(key))

  return (
    <>
      <Link href="/"><a>Top</a></Link>
    </>
  )
}
