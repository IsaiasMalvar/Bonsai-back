import { Types } from "mongoose";
import {
  type RequestCreateMicroData,
  type MicrostoryStructure,
} from "../../server/controllers/types";

export const microstoryMock: MicrostoryStructure = {
  _id: new Types.ObjectId(),
  title: "The Lost Key",
  dateOfCreation: "2022-10-15",
  genre: "Horror",
  isPublic: true,
  image: "https://example.com/images/lost-key.jpg",
  story: "In a quiet town, a mysterious key was discovered...",
  author: "Tomas",
};

export const microstoryListMock: MicrostoryStructure[] = [
  {
    _id: new Types.ObjectId(),
    title: "The Lost Key",
    dateOfCreation: "2022-10-15",
    genre: "Horror",
    isPublic: true,
    image: "https://example.com/images/lost-key.jpg",
    story: "In a quiet town, a mysterious key was discovered...",
    author: "Tomas",
  },
  {
    _id: new Types.ObjectId(),
    title: "Sunset Dreams",
    dateOfCreation: "2023-01-02",
    genre: "Horror",
    isPublic: true,
    image: "https://example.com/images/sunset-dreams.jpg",
    story: "As the sun dipped below the horizon, their hearts intertwined...",
    author: "Tomenos",
  },
  {
    _id: new Types.ObjectId(),
    title: "Whispers in the Woods",
    dateOfCreation: "2022-11-19",
    genre: "Horror",
    isPublic: true,
    image: "https://example.com/images/whispers-woods.jpg",
    story: "Lost in the dark forest, they heard eerie whispers all around...",
    author: "Tomasomenos",
  },
];

export const microMock: RequestCreateMicroData = {
  title: "The Lost Key",
  dateOfCreation: "2022-10-15",
  genre: "Horror",
  isPublic: true,
  image: "https://example.com/images/lost-key.jpg",
  story: "In a quiet town, a mysterious key was discovered...",
  author: "Tomas",
};
