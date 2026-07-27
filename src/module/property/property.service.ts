import { tr } from "zod/v4/locales";
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

//get all property

const getAllProperties = async()=>{
    const properties = await prisma.property.findMany({
        include:{
            landlord:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                    phone:true,
                    role:true
                },
            },
            category:true,
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return properties
}

//get single property

// Get Single Property

const getSingleProperty = async (id: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
      category: true,
    },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  return property;
};




export const propertyService ={
    createProperty,
    getAllProperties,
    getSingleProperty 
}