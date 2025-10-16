import Cow from '../models/cow.model.js'
import Buffalo from '../models/buffalow.model.js'
import Goat from '../models/goat.model.js'
import Horse from '../models/horse.model.js'
import User from "../models/user.model.js";

const deleteAnimal = async (req, res) => {
  const { type, id } = req.params;
  const userId = req.user._id;

  try {
    let Model;
    // Determine the correct model based on the animal type
    if (type === 'cow') Model = Cow;
    else if (type === 'buffalo') Model = Buffalo;
    else if (type === 'goat') Model = Goat;
    else if (type === 'horse') Model = Horse;
    else return res.status(400).json({ message: 'Invalid animal type' });

    // Find the animal by id
    const animal = await Model.findById(id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    // Check if the logged-in user is the owner of the animal
    if (!animal.Owner.equals(userId)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete the animal
    await Model.findByIdAndDelete(id);

    // Remove the reference to the deleted animal from the user's posts array
    await User.findByIdAndUpdate(userId, {
      $pull: { posts: { itemId: animal._id } }, // Use animal._id directly here
    });

    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (err) {
    console.error('Error deleting animal:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const editAnimal = async(req, res) => {

    const { type, id } = req.params;
    const userId = req.user._id; // Ensure user is authenticated
    const updateData = req.body;
  
    try {
      let Model;
      if (type === 'Cow') Model = Cow;
      else if (type === 'Buffalo') Model = Buffalo;
      else if (type === 'Goat') Model = Goat;
      else if (type === 'Horse') Model = Horse;
      else return res.status(400).json({ message: 'Invalid animal type' });
  
      const animal = await Model.findById(id);
      if (!animal) return res.status(404).json({ message: 'Animal not found' });
  
      if (!animal.Owner.equals(userId)) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      const updatedAnimal = await Model.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      res.status(200).json({ message: 'Animal updated', data: updatedAnimal });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }

}

export { deleteAnimal,
        editAnimal,
 }