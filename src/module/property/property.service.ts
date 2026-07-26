import { Property } from "../../../prisma/generated/prisma/browser";
import { prisma } from "../../lib/prisma";


const createProperty = async(payload:Property,landlordId:string)=>{

    //check category exist

    const category = await prisma.category.findUnique({
        where:{
            id:payload.categoryId,
        }
    })

    if(!category){
        throw new Error("Category Not Found")
    }

    //create property

    const property = await prisma.property.create({
        data:{
            ...payload,
            landlordId,
        },
        include:{
            landlord:true,
            category:true,
        },
    })
    return property
}

export const propertyService ={
    createProperty
}