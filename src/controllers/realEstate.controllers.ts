import { Request, Response } from "express";
import { realEstateServices } from "../services";
import { RealEstateCreate, RealEstateReturn } from "../interfaces";
import { RealEstateAdressReturn } from "../interfaces/realEstate.interfaces";

const createrealState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate: RealEstateAdressReturn =
    await realEstateServices.createrealState(req.body);
  return res.status(201).json(realEstate);
};

const readRealState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstates: RealEstateReturn =
    await realEstateServices.readRealState();
  return res.status(200).json(realEstates);
};

export default { createrealState, readRealState };
