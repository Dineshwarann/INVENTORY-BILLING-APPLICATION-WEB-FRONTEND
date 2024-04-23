import * as yup from "yup";

export const addSchema=yup.object({
    productName:yup.string().required("Please enter name"),
    productQuantity:yup.number().required("Please enter quantity"),
    productPrice:yup.number().required("Please enter price"),
    productCategory:yup.string().required("Please enter category")
})

export const loginSchema=yup.object({
    email:yup.string().required("Please enter email"),
    password:yup.string().required("Please enter password")
})

export const registerSchema=yup.object({
    email:yup.string().required("Please enter email"),
    password:yup.string().required("Please enter password"),
    name:yup.string().required("Please enter name")
})

export const forgotSchema=yup.object({
    email:yup.string().required("Please enter email")
})

export const resetSchema=yup.object({
    password:yup.string().required("Please enter password")
})