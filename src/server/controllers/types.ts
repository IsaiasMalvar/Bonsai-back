import { type Types } from "mongoose";

export interface MicrostoryStructure {
  _id: Types.ObjectId;
  title: string;
  dateOfCreation: string;
  genre: string;
  isPublic: boolean;
  image: string;
  story: string;
  author: string;
}

export interface RequestCreateMicroData {
  title: string;
  dateOfCreation: string;
  genre: string;
  isPublic: boolean;
  image: string;
  story: string;
  author: string;
}

export interface MicrostoryStructureData {
  id: string;
  title: string;
  dateOfCreation: string;
  genre: string;
  isPublic: boolean;
  image: string;
  story: string;
  author: string;
}
