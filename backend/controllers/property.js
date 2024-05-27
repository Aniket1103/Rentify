import ErrorHandler from "../middleware/error.js";
import { Property } from "../models/property.js";

export const getAllProperties = async (req, res) => {
    try {
        const userid = req.user._id;

        const properties = await Property.find();

        res.status(200).json({
            success: true,
            properties,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyProperties = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const properties = await Property.find({ user: userid });

        res.status(200).json({
            success: true,
            properties,
        });
    } catch (error) {
        next(error);
    }
};

export const createProperty = async (req, res, next) => {
    try {
        const { place, area, bedrooms, bathrooms, hospitals, colleges_nearby } = req.body;

        await Property.create({
            place,
            area,
            user: req.user,
            bedrooms,
            bathrooms,
            hospitals,
            colleges_nearby
        });

        res.status(201).json({
            success: true,
            message: "Property added Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const updateProperty = async (req, res, next) => {
    try {
        const { id, place, area, bedrooms, bathrooms, hospitals, colleges_nearby } = req.body;
        const property = await Property.findById(id);

        if (!property) return next(new ErrorHandler("Property not found", 404));

        property.place = place || property.place;
        property.area = area || property.area;
        property.bedrooms = bedrooms || property.bedrooms;
        property.bathrooms = bathrooms || property.bathrooms;
        property.hospitals = hospitals || property.hospitals;
        property.colleges_nearby = colleges_nearby || property.colleges_nearby;
        await property.save();

        res.status(200).json({
            success: true,
            message: "Property Updated!",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.query.id);
        console.log(property)

        if (!property) return next(new ErrorHandler("Property not found", 404));
        await property.deleteOne();

        res.status(200).json({
            message: "Property Deleted!",
            success: true,
        });
    } catch (error) {
        next(error);
    }
};