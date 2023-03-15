import { NextApiRequest, NextApiResponse } from 'next'
import { without } from 'lodash'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { user } = await serverAuth(req)

      const { movieId } = req.body

      const movie = await prismadb.movie.findUnique({
        where: { id: movieId },
      })

      if (!movie) {
        throw new Error('Movie not found')
      }

      const updatedUser = await prismadb.user.update({
        where: {
          email: user.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      })

      return res.status(200).json(updatedUser)
    }

    if (req.method === 'DELETE') {
      const { user } = await serverAuth(req)

      const { movieId } = req.body

      const movieToUpdate = await prismadb.movie.findUnique(
        {
          where: { id: movieId },
        }
      )

      if (!movieToUpdate) {
        throw new Error('Movie not found')
      }

      const updatedFavorites = without(
        user.favoriteIds,
        movieId
      )

      const updatedUser = await prismadb.user.update({
        where: {
          email: user.email || '',
        },
        data: {
          favoriteIds: {
            set: updatedFavorites,
          },
        },
      })

      return res.status(200).json(updatedUser)
    }

    return res.status(405).end()
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
