import { MailAdapter } from './../adapters/mail_adapter';
import { FeedbackRepository } from "../repositories/feedbaks_repository";

interface SubmitFeedbackUseCaseRequest {
    Type: string;
    Comment: string;
    Screenshot?: string;
}


export class SubmitFeedbackUseCase {
    constructor(
        private FeedbacksRepository: FeedbackRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const {Type, Comment, Screenshot} = request;

        if(!Type){
            throw new Error('Type must not be empty.')
        }

        if(!Comment){
            throw new Error('Comment must not be empty.')
        }

        if(Screenshot && !Screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.FeedbacksRepository.create({
            Type,
            Comment,
            Screenshot,
        })

        await this.mailAdapter.SendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style='font-family: sans-serif; font-size: 16px; color: #111'>`,
                `<p>Tipo do feedback: ${Type}</p>`,
                `<p>Comentário: ${Comment}</p>`,
                Screenshot ? `<img src="${Screenshot}/>"` : ``,
                `</div>`,
            ].join('\n'),
        })
    }

}