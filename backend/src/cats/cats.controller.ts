import { Request, Response, NextFunction } from 'express'
import { getCats } from './cats.services'

export const CatsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cats = getCats();
    res.status(201).json(cats)
  } catch (error) {
    res.status(501).send({ msg: 'There was an error' })
  }
}