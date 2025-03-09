import express, {NextFunction, Request, Response} from 'express'
import {IssueSchema} from '../schemas/issue.schema'
import {ITimeEntry} from '../types/ITimeEntry'
import {IIssue} from '../types/IIssue'

const issueController = express.Router()

interface RequestWithBody<T extends Object> extends Request {
    body: T
}

// get all issues
issueController.get('/', async (_, res: Response, next: NextFunction) => {
    try {
        const issues = await IssueSchema.find()
        res.json(issues)
    } catch (error) {
        next(error)
    }
})

// get all active issues (not archived)
issueController.get('/active', async (_, res: Response, next: NextFunction) => {
    try {
        const issues = await IssueSchema.find({archived: false})
        res.json(issues)
    } catch (error) {
        next(error)
    }
})

// get all archived issues
issueController.get(
    '/archived',
    async (_, res: Response, next: NextFunction) => {
        try {
            const issues = await IssueSchema.find({archived: true})
            res.json(issues)
        } catch (error) {
            next(error)
        }
    },
)

// get issue by id
issueController.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const issue = await IssueSchema.findById(req.params.id)
            res.json(issue)
        } catch (error) {
            next(error)
        }
    },
)

// create issue
issueController.post(
    '/',
    async (req: RequestWithBody<IIssue>, res: Response, next: NextFunction) => {
        try {
            console.log('req body:', req.body)
            const issue = new IssueSchema(req.body)
            await issue.save()
            res.status(201).json(issue)
        } catch (error) {
            next(error)
        }
    },
)

// update issue
issueController.put(
    '/:id',
    async (
        req: RequestWithBody<Partial<IIssue>>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const issue = await IssueSchema.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true},
            )
            res.json(issue)
        } catch (error) {
            next(error)
        }
    },
)

// delete issue
issueController.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const issue = await IssueSchema.findByIdAndDelete(req.params.id)
            res.json(issue)
        } catch (error) {
            next(error)
        }
    },
)

// add time entry to issue
issueController.post(
    '/:id/time-entries',
    async (
        req: RequestWithBody<ITimeEntry>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const issue = await IssueSchema.findById(req.params.id)
            if (!issue) {
                res.status(404).json({message: 'Issue not found'})
                return
            }
            issue.timeEntries.push(req.body)
            await issue.save()
            res.status(201).json(
                issue.timeEntries[issue.timeEntries.length - 1],
            )
        } catch (error) {
            next(error)
        }
    },
)

// delete time entry from issue
issueController.delete(
    '/:id/time-entries/:timeEntryId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const issue = await IssueSchema.findById(req.params.id)
            if (!issue) {
                res.status(404).json({message: 'Issue not found'})
                return
            }
            const timeEntry = issue.timeEntries.id(req.params.timeEntryId)
            if (!timeEntry) {
                res.status(404).json({message: 'Time entry not found'})
                return
            }
            timeEntry.deleteOne()
            await issue.save()
            res.json(timeEntry)
        } catch (error) {
            next(error)
        }
    },
)

export default issueController
