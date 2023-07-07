import { DeepPartial } from "typeorm";
import { RealEstate } from "../entities";
import { errorsErrors } from "../errors";
import { RealEstateCreate, RealEstateReturn } from "../interfaces";
import { categoryRepository, realEstateRepository } from "../repositories";
import addressRepository from "../repositories/address.repository";
import { RealEstateAdressReturn } from "../interfaces/realEstate.interfaces";

const createrealState = async (
  payload: RealEstateCreate
): Promise<RealEstateAdressReturn> => {

  const where = await addressRepository.findOneBy({
    street: payload.address.street,
    number: payload.address.number ?? "",
  });
  if(where) {
    throw new errorsErrors.AppError("Address already exists", 409)
  }
  const realEstateAddress = addressRepository.create(payload.address);

  await addressRepository.save(realEstateAddress)

  const category = await categoryRepository.findOneBy({
    id: Number(payload.categoryId)
  })
  if(!category){
    throw new errorsErrors.AppError("Category not found", 404)
  }
  const realEstate = realEstateRepository.create({
    ...payload,
    address: realEstateAddress,
    category: category,
  } as DeepPartial<RealEstate>);
  await realEstateRepository.save(realEstate);

  return realEstate;

};

const readRealState = async (): Promise<RealEstateReturn> => {
   const realEstate: Array<RealEstate> = await realEstateRepository
   .createQueryBuilder("r")
   .leftJoinAndSelect("r.address", "a")
   .getMany();

   return realEstate;
 
};

export default { createrealState, readRealState };
