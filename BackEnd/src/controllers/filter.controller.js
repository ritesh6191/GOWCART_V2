import Cow from '../models/cow.model.js'

const getFilteredCows = async (req, res) => {
  try {
    const { breed, minPrice, maxPrice, minMilkCapacity, maxMilkCapacity } = req.body;

    const filter = {};

    // Filter by breed
    if (breed && breed.trim() !== "") {
      filter.Breed = breed.trim();
    }

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.Price = {};
      if (minPrice !== undefined) filter.Price.$gte = minPrice;
      if (maxPrice !== undefined) filter.Price.$lte = maxPrice;
    }

    // Filter by milk capacity range
    if (minMilkCapacity !== undefined || maxMilkCapacity !== undefined) {
      filter.MilkCapacity = {};
      if (minMilkCapacity !== undefined) filter.MilkCapacity.$gte = minMilkCapacity;
      if (maxMilkCapacity !== undefined) filter.MilkCapacity.$lte = maxMilkCapacity;
    }

    const cows = await Cow.find(filter)
      .populate("Owner", "firstName lastName phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: cows });
  } catch (error) {
    console.error("❌ Error fetching filtered cows:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


export { getFilteredCows };
