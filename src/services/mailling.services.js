import { createTransport } from "nodemailer";
import 'dotenv/config';

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_GMAIL,
    pass: process.env.PASS_GMAIL,
  },
});

const createMsgRegister = (first_name) =>
  `<h1>Hola ${first_name}, ¡Bienvenido</h1>`;

const createMsgReset = (first_name) => {
  return `<p>¡Hola ${first_name}! Hacé click <a href="http://localhost:8080/new-pass">AQUÍ</a> 
    para restablecer tu contraseña.
    </p>`;
};

const createMsgAccountDeletion = (first_name) =>
  `<p>Hola ${first_name},</p>
  <p>Tu cuenta ha sido eliminada debido a inactividad prolongada. Si tienes preguntas o deseas más información, por favor, contacta con nuestro equipo.</p>
  <p>Saludos,</p>`;

/**
 * 
 * @param {*} user 
 * @param {*} service register | resetPass
 * @param {*} token 
 * @returns 
 */
export const sendMail = async (user, service, token = null) => {
  try {
    const { first_name, email } = user;

    let msg = "";

    if (service === "register") {
      msg = createMsgRegister(first_name);
    } else if (service === "resetPass") {
      msg = createMsgReset(first_name);
    } else if (service === "accountDeletion") {
      msg = createMsgAccountDeletion(first_name); 
    } else {
      msg = "";
    }

    let subj = "";

    
    subj = service === "register"
      ? "Bienvenido/a"
      : service === "resetPass"
      ? "Restablecimiento de contraseña"
      : service === "accountDeletion"
      ? "Cuenta eliminada por inactividad"
      : "";

    const gmailOptions = {
      from: process.env.EMAIL_GMAIL,
      to: email,
      subject: subj,
      html: msg,
    };

    const response = await transporter.sendMail(gmailOptions);
    if (token) return token;
    console.log("email enviado", response);
  } catch (error) {
    throw new Error(error);
  }
};