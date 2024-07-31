import { Gadget } from "./models/gadgets.js";

export const messageHandler = async (data) => {
  try {
    const { message, name } = data;
    console.log(`Received message => ${data}`);

    const item = await Gadget.findOne({ name: name });

    if (!item) {
      return {
        ...data,
        success: false,
        message: "Item not found",
        state: null,
      };
    }

    if (message === "on") {
      item.state = true;
    } else if (message === "off") {
      item.state = false;
    } else {
      return "Invalid message";
    }

    const newItem = await item.save();

    //want to return only if item is saved successfully
    return {
      name: newItem.name,
      state: newItem.state,
      success: true,
      message: "Item updated successfully",
    };
  } catch (error) {
    console.log(error);
    return error?.message;
  }
};
