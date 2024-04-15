import { Resend } from "resend";
import { API_KEY_RESEND } from '../config.js';

export const sendEmail = async (req, res) => {

    const resend = new Resend(API_KEY_RESEND);

    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["raulgodii13@gmail.com"],
            subject: "Hola desde node",
            html: "<strong>Funciona desde NODE!</strong>",
        });

        if (error) {
            return res.status(400).json({ message: error });
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};