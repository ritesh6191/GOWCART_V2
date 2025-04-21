import Cow from '../models/cow.model.js'
import Buffalo from '../models/buffalow.model.js'
import Goat from '../models/goat.model.js'
import Horse from '../models/horse.model.js'

const getAllAnimals = async (req, res) => {
  try {
    const ITEMS_PER_PAGE = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Fetch each type with populated Owner
    const [cows, buffaloes, goats, horses] = await Promise.all([
      Cow.find().sort({ createdAt: -1 }).skip(skip).limit(ITEMS_PER_PAGE).populate("Owner", "firstName lastName phone").lean(),
      Buffalo.find().sort({ createdAt: -1 }).skip(skip).limit(ITEMS_PER_PAGE).populate("Owner", "firstName lastName phone").lean(),
      Goat.find().sort({ createdAt: -1 }).skip(skip).limit(ITEMS_PER_PAGE).populate("Owner", "firstName lastName phone").lean(),
      Horse.find().sort({ createdAt: -1 }).skip(skip).limit(ITEMS_PER_PAGE).populate("Owner", "firstName lastName phone").lean(),

    ]);

    const allAnimals = [
      ...cows.map((a) => ({ ...a, modelType: "Cow" })),
      ...buffaloes.map((a) => ({ ...a, modelType: "Buffalo" })),
      ...goats.map((a) => ({ ...a, modelType: "Goat" })),
      ...horses.map((a) => ({ ...a, modelType: "Horse" })),
    ];

    // Sort and slice combined results
    allAnimals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const paginated = allAnimals.slice(0, ITEMS_PER_PAGE);

    res.status(200).json({ success: true, data: paginated });
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAnimalById = async (req, res) => {
  try {
    const { type, id } = req.params;

    const modelMap = {
      cow: Cow,
      buffalo: Buffalo,
      goat: Goat,
      horse: Horse,
    };

    const Model = modelMap[type.toLowerCase()];
    if (!Model) {
      return res.status(400).json({ success: false, message: 'Invalid animal type' });
    }

    const animal = await Model.findById(id).populate('Owner', 'firstName lastName phone').lean();
    if (!animal) {
      return res.status(404).json({ success: false, message: 'Animal not found' });
    }

    animal.modelType = type.charAt(0).toUpperCase() + type.slice(1); // add type to frontend
    res.status(200).json({ success: true, data: animal });
  } catch (err) {
    console.error('Error fetching animal by ID:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getNearbyAnimals = async (req, res) => {
  const { latitude, longitude } = req.body;
  const radiusInKm = 50; // example: 50 km radius

  try {
    const [cows, buffalos, goats, horses] = await Promise.all([
      Cow.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInKm * 1000, // meters
          },
        },
      }).populate("Owner"),

      Buffalo.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInKm * 1000,
          },
        },
      }).populate("Owner"),

      Goat.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInKm * 1000,
          },
        },
      }).populate("Owner"),

      Horse.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInKm * 1000,
          },
        },
      }).populate("Owner"),
    ]);

    const allNearbyAnimals = [...cows, ...buffalos, ...goats, ...horses];
    allNearbyAnimals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ data: allNearbyAnimals });
  } catch (err) {
    console.error("Nearby animal fetch error:", err);
    res.status(500).json({ error: "Failed to fetch nearby animals" });
  }
};



export { getAllAnimals,
        getAnimalById,
        getNearbyAnimals,
 }