import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'msaezcardenas@gmail.com',
    pass: 'nafj tmkb ehpu nnkt',
  },
});
