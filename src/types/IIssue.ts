import {ITimeEntry} from './ITimeEntry'

export interface IIssue {
    code: string
    name: string
    timeEntries: ITimeEntry[]
    archived?: boolean
    priority?: number
}
