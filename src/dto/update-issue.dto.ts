import {IIssue} from '../types/IIssue'

export interface UpdateIssueDto extends Partial<IIssue> {
    id: string
}
