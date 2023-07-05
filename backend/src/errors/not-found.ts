import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './custom-api'

export class NotFoundError extends CustomAPIError {
    statusCode: number

    constructor(message: any) {
        super(message)

        this.statusCode = StatusCodes.NOT_FOUND
    }
}