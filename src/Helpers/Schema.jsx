import * as yup from "yup";

export const addSchema=yup.object({
    productName:yup.string().required("Please enter name"),
    productQuantity:yup.number().required("Please enter quantity"),
    productPrice:yup.number().required("Please enter price"),
    productCategory:yup.string().required("Please enter category")
})