import mongoose from 'mongoose'

export const TimeEntry = new mongoose.Schema({
    startTimeInMs: {
        type: Number,
        required: true,
    },
    endTimeInMs: {
        type: Number,
        required: true,
    },
})
