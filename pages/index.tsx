import { signOut, getSession } from "next-auth/react"
import { NextPageContext } from "next"

import useCurrentUser from "@/hooks/useCurrentUser"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import useMovieList from "@/hooks/useMovieList"
import useFavorites from "@/hooks/useFavorites"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending" />
        <MovieList data={favorites} title="My List" />
      </div>
      <Footer />
    </>
  )
}
