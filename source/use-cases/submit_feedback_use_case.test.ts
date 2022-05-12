import { SubmitFeedbackUseCase } from './submit_feedback_use_case';

const CreateFeedbackSpy = jest.fn();
const MailSendSpy = jest.fn();


const SubmitFeedback = new SubmitFeedbackUseCase(
    {create: CreateFeedbackSpy},
    {SendMail: MailSendSpy},
);

describe('Submit feedback', ()=>{
    it('should be able to submit a feedback', async ()=>{
        await expect(SubmitFeedback.execute({
            Type: 'BUG',
            Comment: 'Example comment',
            Screenshot: 'data:image/png;base64:Testsin.jpg',
        })).resolves.not.toThrow();

        expect(CreateFeedbackSpy).toHaveBeenCalled();
        expect(MailSendSpy).toHaveBeenCalled();
    })

    it('should not be able to submit a feedback without an type', async ()=>{
        await expect(SubmitFeedback.execute({
            Type: '',
            Comment: 'Example comment',
            Screenshot: 'data:image/png;base64:Testsin.jpg',
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback without an comment', async ()=>{
        await expect(SubmitFeedback.execute({
            Type: 'BUG',
            Comment: '',
            Screenshot: 'data:image/png;base64:Testsin.jpg',
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback with an image in the wrong format', async ()=>{
        await expect(SubmitFeedback.execute({
            Type: 'BUG',
            Comment: 'Example comment',
            Screenshot: 'Testsin.jpg',
        })).rejects.toThrow();
    })
})