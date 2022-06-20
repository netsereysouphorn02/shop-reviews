const Reviews = require("../models/reviews");

const findById = async(id) => {
    return await Stores.findById(id);
};

const findAll = async(req, res) => {
    const { storeId } = req.query;
    try {
        return await Reviews.find({ storeId: storeId }).populate([
<<<<<<< HEAD
            { path: "userId", select: { firstName: 1, lastName: 1, username: 1 } },
=======
            { path: "userId", select: { firstName: 1, lastName: 1 } },
>>>>>>> ac0cc60450b1c4b4df0909e4629a8efe24d9602b
        ]);
    } catch (error) {
        return error;
    }
};

const create = async(newStore) => {
    const createStore = await Reviews.create(newStore);
    return {
        success: true,
        message: "Ok store is Created",
        data: createStore,
    };
};

const update = async(updateReview) => {
    const { _id, star, comment } = updateReview;
    const updatenewReviews = await Reviews.findByIdAndUpdate(_id, {
        star: star,
        comment: comment,
    });
    return {
        success: true,
        message: "Now Store is updated",
        data: updatenewReviews,
    };
};

const remove = async(id) => {
    const removeStore = await Reviews.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "Store is delete successfull",
        data: removeStore,
    };
};

module.exports = {
    findById,
    update,
    remove,
    findAll,
    create,
};