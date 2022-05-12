import { SubmitFeedbackUseCase } from './use-cases/submit_feedback_use_case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository';
import express from "express";
import nodemailer from 'nodemailer';
import { Prisma } from "./prisma";
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';


export const Routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a23fc2fe586af2",
      pass: "5b3d1f62ee28cb"
    }
});

Routes.post('/feedbacks', async (Req, Res)=>{
    const {Type, Comment, Screenshot} = Req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodeMailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter,
    );

    await submitFeedbackUseCase.execute({
        Type,
        Comment,
        Screenshot,
    })


    

    return Res.status(201).send();
})