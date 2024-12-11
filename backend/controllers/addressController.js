// import addressModel from "../models/addressModel";
import addresModel from '../models/addressModel.js'
// Add address to user
const addAddress = async (req, res) => {
    try {
        const { userId, street, city, state, postalCode, country, isDefault } = req.body;

        const userData = await addresModel.findById(userId);
        
        // Check if the address already exists (for example, by street or postal code)
        const addressExists = userData.addresses.some(
            (address) => address.street === street && address.postalCode === postalCode
        );

        if (addressExists) {
            return res.json({ success: false, message: "Address already exists" });
        }

        // If isDefault is true, set previous address isDefault to false
        if (isDefault) {
            userData.addresses.forEach((address) => {
                address.isDefault = false;
            });
        }

        // Add the new address
        userData.addresses.push({
            street,
            city,
            state,
            postalCode,
            country,
            isDefault: isDefault || false,
        });

        // Save updated user data
        await userData.save();

        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user address
const updateAddress = async (req, res) => {
    try {
        const { userId, addressId, street, city, state, postalCode, country, isDefault } = req.body;

        const userData = await addresModel.findById(userId);
        
        // Find address to update
        const address = userData.addresses.id(addressId);
        if (!address) {
            return res.json({ success: false, message: "Address not found" });
        }

        // Update the address
        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.postalCode = postalCode || address.postalCode;
        address.country = country || address.country;
        
        // If isDefault is true, set previous address isDefault to false
        if (isDefault) {
            userData.addresses.forEach((address) => {
                address.isDefault = false;
            });
            address.isDefault = true;
        }

        // Save updated user data
        await userData.save();

        res.json({ success: true, message: "Address updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user addresses
const getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await addresModel.findById(userId);
        const addresses = userData.addresses;

        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete user address
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.body;

        const userData = await addresModel.findById(userId);
        
        // Find and remove the address
        const address = userData.addresses.id(addressId);
        if (!address) {
            return res.json({ success: false, message: "Address not found" });
        }

        address.remove();
        
        // Save updated user data
        await userData.save();

        res.json({ success: true, message: "Address deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addAddress, updateAddress, getUserAddresses, deleteAddress };
