import mongoose from 'mongoose'
import {TimeEntry} from './time-entry.schema'

export const IssueSchema = mongoose.model(
    'Issue',
    new mongoose.Schema({
        code: {type: String, required: true},
        name: {type: String, required: true},
        timeEntries: [TimeEntry],
        archived: {type: Boolean, default: false},
        priority: {type: Number, required: false},
    }),
)
