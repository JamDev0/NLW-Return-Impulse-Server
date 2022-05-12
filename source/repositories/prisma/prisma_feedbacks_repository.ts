import { Prisma } from '../../prisma';
import { FeedbackCreateValues, FeedbackRepository } from './../feedbaks_repository';

export class PrismaFeedbacksRepository implements FeedbackRepository {
    async create({Type, Comment, Screenshot}: FeedbackCreateValues) {
        await Prisma.feedback.create({
            data: {
                Type: Type,
                Comment: Comment,
                Screenshot: Screenshot,
            }
        });
    }
}