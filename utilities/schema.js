import yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    age: yup.number().required(),
    color: yup.string().required(),
    image: yup.string().required(),
});

export async function checkSchema(req) {
    try {
        await schema.validate(req.body);
    } catch (err) {
        throw new Error("Invalid schema");
    }
}