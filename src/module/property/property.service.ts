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

//update property
const updateProperty = async (
  id: string,
  payload: any,
  landlordId: string
) => {
  // Check property exists
  const existingProperty = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!existingProperty) {
    throw new Error("Property not found.");
  }

  // Ownership check
  if (existingProperty.landlordId !== landlordId) {
    throw new Error("You are not authorized to update this property.");
  }

  // Check category (if provided)
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found.");
    }
  }

  // Update property
  const updatedProperty = await prisma.property.update({
    where: {
      id,
    },
    data: payload,
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

  return updatedProperty;
};


// Delete Property

const deleteProperty = async (
  id: string,
  landlordId: string
) => {
  // Check property exists

  const existingProperty = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!existingProperty) {
    throw new Error("Property not found.");
  }

  // Ownership check

  if (existingProperty.landlordId !== landlordId) {
    throw new Error("You are not authorized to delete this property.");
  }

  // Delete property

  await prisma.property.delete({
    where: {
      id,
    },
  });

  return null;
};


export const propertyService ={
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty

}